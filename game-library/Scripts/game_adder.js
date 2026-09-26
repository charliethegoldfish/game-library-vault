

async function getValidFileName(inputPrompt, context, directory) {
	const name = await inputPrompt(`${context}?`);

	if (name === "") {
		new Notice(`Need to enter a ${context}!`);
		throw new Error(`${context} input is an empty string`)
	}

	// Check if there are any illegal characters that would prevent creating a file of this name
	illegalCharRegex = /[\[\]:\\\/^|#]/;
	foundIllegal = name.match(illegalCharRegex);

	if (foundIllegal != null) {
		new Notice(`${context} contains illegal characters such as ${foundIllegal[0]}`);
		throw new Error("Illegal characters found");
	}

	// Check if a file already exists with this name
	if (app.vault.getFileByPath(`${directory}/${name}.md`) != null) {
		new Notice(`You need to enter a ${context} that doesn't already exist`);
		throw new Error(`File already exists that matches ${name}`)
	}

	return name;
}

async function getNumberFromInputPrompt(inputPrompt, message, defaultInsteadOfError = false, defaultValue = 0) {
	const inputValue = await inputPrompt(message);
	const numValue = parseInt(inputValue);

	if (isNaN(numValue)) {
		if (defaultInsteadOfError) {
			new Notice("Need to enter a number as input, defaulting to 0!");
			return defaultValue;
		}
		throw new Error("Input is not a number!")
	}
	return numValue;
}

async function getFileSuggestor(suggester, folder, description) {
	fileToGet = await suggester(
		(file) => file.name.replace(".md", ""),
		folder.children,
		description
	);

	return fileToGet;
}

async function getFileListSuggestor(suggester, numToSelect, folder, descriptionPrefix) {
	files = [];
	for (i = 0; i < numToSelect; i++) {
		file = await getFileSuggestor(suggester, folder, `${descriptionPrefix} ${i + 1}`);
		files.push(file);
	}

	return files;
}

function getTitleForFile(file) {
	return file.name.replace(".md", "");
}

let params,Settings;
async function addGame(e,t) {
	params=e,Settings=t;
	const {quickAddApi: {inputPrompt, suggester, executeChoice}} = params;

	const gameLibraryFolderPath = Settings["Game Library Folder"];
	const gameStoreFolderPath = Settings["Game Store Folder"];
	const gamePlatformFolderPath = Settings["Game Platform Folder"];
	const gameStatusFolderPath = Settings["Game Status Folder"];

	try {
		// Get the game name
		const gameName = await getValidFileName(inputPrompt, "Game name", gameLibraryFolderPath);
		
		// Get details for stores we own it on (be it steam, physical etc)
		const gameStoreFolder = await app.vault.getFolderByPath(gameStoreFolderPath);
		const numStores = await getNumberFromInputPrompt(inputPrompt, `How many places do you own ${gameName}?`);
		storeFiles = await getFileListSuggestor(suggester, numStores, gameStoreFolder, "Select store for copy number");

		// Get details for platforms we have it on
		const gamePlatformFolder = await app.vault.getFolderByPath(gamePlatformFolderPath)
		const numPlatforms = await getNumberFromInputPrompt(inputPrompt, `How many platforms do you own ${gameName} on?`)
		platformFiles = await getFileListSuggestor(suggester, numPlatforms, gamePlatformFolder, "Select platform number");

		// Get the genre details - we'll take in one comma separated entry for this
		const genreValue = await inputPrompt(`Enter genre/s for ${gameName}`, "Enter genre's separated by commas");

		// Year released in
		const yearReleased = await getNumberFromInputPrompt(inputPrompt, `What year was ${gameName} released in?`);

		// Link to image - to be downloaded later
		const imageLink = await inputPrompt(`Enter link to image for ${gameName}`, "Paste image link here");

		// Current status: Backlog, Playing, Completed etc
		const gameStatusFolder = await app.vault.getFolderByPath(gameStatusFolderPath);
		const statusFile = await getFileSuggestor(suggester, gameStatusFolder, `Select status for ${gameName}`);
  
		const hoursLogged = await getNumberFromInputPrompt(inputPrompt, `How many hours have you played ${gameName}?`, true, 0);

		// Format the data we've gathered
		// Stores:
		storeLinkString = ``;
		storeProperties = [];
		for (i = 0; i < storeFiles.length; i++) {
			storeName = getTitleForFile(storeFiles[i]);
			storeLinkString += `[[${storeName}]] `;
			storeProperties.push(storeName);
		}

		// Platforms:
		platformLinkString = ``;
		platformProperties = [];
		for (i = 0; i < platformFiles.length; i++) {
			platformName = getTitleForFile(platformFiles[i])
			platformLinkString += `[[${platformName}]] `;
			platformProperties.push(platformName);
		}

		// Status:
		statusString = getTitleForFile(statusFile);
		statusLinkString = `[[${statusString}]] `;
		
		// Genre:
		genreValues = genreValue.split(",");
		genreProperties = genreValues.map((genre) => genre.trim());

		if (imageLink == null) {
			imageLink = "";
		}

		imagePath = `![[Attachments/02 Library/${gameName}/IMG-${gameName}.webp]]`

		// Add our variables to send through to the template
		params.variables.gameName = gameName;
		params.variables.image = imagePath;

		await executeChoice("Game Template", params.variables);

		const currentFile = await app.workspace.getActiveFile();
		if (currentFile != null) {
			app.fileManager.processFrontMatter(currentFile, (frontmatter) => {
				frontmatter['status'] = statusString;
				frontmatter['platform'] = platformProperties;
				frontmatter['store'] = storeProperties;
				frontmatter['released'] = yearReleased;
				frontmatter['hours-logged'] = hoursLogged;
				frontmatter['genre'] = genreProperties;
				frontmatter['image'] = imageLink;
			});

			// Only try to download if there is probably something to download
			if (imageLink != "") {
				await executeChoice("Download Images");
			}
		}

	} catch (error) {
		console.error("Game library error:", error);
		new Notice(`Error: ${error.message}`);
	}
}

module.exports = {
	entry:addGame,
	settings:{
		name: "Add Game To Library",
		author: "Charlie Cassidy",
		options: {
			"Game Library Folder": {
				type: "text",
				defaultValue: "",
				placeholder: "Folder path here",
				description: "Root folder where all games will live",
			},
			"Game Store Folder": {
				type: "text",
				defaultValue: "",
				placeholder: "Folder path here",
				description: "Root folder where all stores live",
			},
			"Game Platform Folder": {
				type: "text",
				defaultValue: "",
				placeholder: "Folder path here",
				description: "Root folder where all platforms live",
			},
			"Game Status Folder": {
				type: "text",
				defaultValue: "",
				placeholder: "Folder path here",
				description: "Root folder where all status notes live",
			},
			"Templates Folder": {
				type: "text",
				defaultValue: "",
				placeholder: "Templates folder path here",
				description: "Root folder where all templates live",
			},
			"Game Template Name": {
				type: "text",
				defaultValue: "",
				placeholder: "Template name here",
				description: "Template to use when adding a new game",
			}
		}
	}
}
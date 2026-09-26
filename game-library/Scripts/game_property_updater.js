module.exports = {
	entry:updateProperties,
	settings:{
		name: "Update Properties of Game",
		author: "Charlie Cassidy",
		options: {
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
			}
		}
	}
}

function getNameForFile(file) {
	return file.name.replace(".md", "");
}

let params,Settings;
async function updateProperties(e,t) {
	params=e,Settings=t;
	const {quickAddApi: {inputPrompt, suggester}} = params;

	const STORE = "store";
	const PLATFORM = "platform";
	const STATUS = "status";
	const HOURS = "hours-logged";


	const gameStoreFolderPath = Settings["Game Store Folder"];
	const gamePlatformFolderPath = Settings["Game Platform Folder"];
	const gameStatusFolderPath = Settings["Game Status Folder"];

	try {
		const currentFile = await app.workspace.getActiveFile();

		if (currentFile == null) {
			new Notice("Can't update a game without a game note open!");
			return;
		}

		const gameName = getNameForFile(currentFile);
		
		const projectAction = await suggester(["Add Store", "Add Platform", "Change Status", "Log Hours"], [STORE, PLATFORM, STATUS, HOURS], `Select action for ${gameName}`);

		if (projectAction == STORE || projectAction == PLATFORM) {
			const folderPath = projectAction == STORE ? gameStoreFolderPath : gamePlatformFolderPath;
			const folder = await app.vault.getFolderByPath(folderPath);
			file = await suggester(
				(file) => file.name.replace(".md", ""),
				folder.children,
				`Select ${projectAction} to add to ${gameName}`
			);
			const fileName = getNameForFile(file);
			await addToProperty(currentFile, projectAction, fileName);
		}
		else if (projectAction == STATUS) {
			const folder = await app.vault.getFolderByPath(gameStatusFolderPath);
			file = await suggester(
				(file) => file.name.replace(".md", ""),
				folder.children,
				`Select ${projectAction} to update for ${gameName}`
			);
			const fileName = getNameForFile(file);
			await setProperty(currentFile, projectAction, fileName);
		}
		else if (projectAction == HOURS) {
			const hoursValue = await inputPrompt(`How many hours to log for ${gameName}?`);
			const hoursToLog = parseInt(hoursValue);
			if (isNaN(hoursToLog)) {
				new Notice("Need to enter a number for hours to log!");
				return;
			}
			await incrementProperty(currentFile, projectAction, hoursToLog);
		}
		else {
			new Notice("Valid action not selected!");
		}
		
	} catch {
		console.error("Library property updater error:", error);
		new Notice(`Error: ${error.message}`);
	}
}

// Add to a property list
async function addToProperty(currentFile, property, value) {
	await app.fileManager.processFrontMatter(currentFile, (frontmatter) => {
		if (frontmatter[property] != null && Array.isArray(frontmatter[property])) {
			frontmatter[property].push(value);
		}
	});
}

// Increment a property number
async function incrementProperty(currentFile, property, value) {
	await app.fileManager.processFrontMatter(currentFile, (frontmatter) => {
		if (frontmatter[property] != null && typeof(frontmatter[property]) === "number" && typeof(value) === "number") {
			frontmatter[property] += value;
		}
	});
}

// Set a property to a new value
async function setProperty(currentFile, property, value) {
	await app.fileManager.processFrontMatter(currentFile, (frontmatter) => {
		if (frontmatter[property] != null) {
			frontmatter[property] = value;
		}
	}); 
}
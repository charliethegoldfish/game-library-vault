module.exports = {
	entry:update,
	settings:{
		name: "Library Updater",
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
			},
			"Game Tracking Folder": {
				type: "text",
				defaultValue: "",
				placeholder: "Folder path here",
				description: "Root folder where all tracking notes live",
			},
			"Store Choice Name": {
				type: "text",
				defaultValue: "",
				placeholder: "Choice name here",
				description: "Choice to use when updating the store notes",
			},
			"Platform Choice Name": {
				type: "text",
				defaultValue: "",
				placeholder: "Choice name here",
				description: "Choice to use when updating the platform notes",
			},
			"Status Choice Name": {
				type: "text",
				defaultValue: "",
				placeholder: "Choice name here",
				description: "Choice to use when updating the status notes",
			},
			"Tracking Choice Name": {
				type: "text",
				defaultValue: "",
				placeholder: "Choice name here",
				description: "Choice to use when updating the tracking notes",
			}
		}
	}
}

async function executeTemplate(folderPath, choiceName) {
	const {quickAddApi: {executeChoice}} = params;

	const folder = await app.vault.getFolderByPath(folderPath);
	for (i = 0; i < folder.children.length; i++) {
		params.variables.folder = folderPath;
		params.variables.fileName = folder.children[i].name.replace(".md", "");
		await executeChoice(choiceName, params.variables);
	}
}

let params,Settings;
async function update(e,t) {
	params=e,Settings=t;

	const storeFolderPath = Settings["Game Store Folder"];
	const platformFolderPath = Settings["Game Platform Folder"];
	const statusFolderPath = Settings["Game Status Folder"];
	const trackingFolderPath = Settings["Game Tracking Folder"]

	const storeChoice = Settings["Store Choice Name"]
	const platformChoice = Settings["Platform Choice Name"]
	const statusChoice = Settings["Status Choice Name"]
	const trackingChoice = Settings["Tracking Choice Name"]


	try {
		// **********************************
		// STORE NOTES
		// **********************************
		await executeTemplate(storeFolderPath, storeChoice);

		// **********************************
		// PLATFORM NOTES
		// **********************************
		await executeTemplate(platformFolderPath, platformChoice);

		// **********************************
		// STATUS NOTES
		// **********************************
		await executeTemplate(statusFolderPath, statusChoice);

		// **********************************
		// TRACKING NOTES
		// **********************************
		await executeTemplate(trackingFolderPath, trackingChoice);
	} catch {
		console.error("Library Updater error:", error);
		new Notice(`Error: ${error.message}`);
	}
	

}
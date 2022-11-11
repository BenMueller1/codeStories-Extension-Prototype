// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Data Provider for the Code Stories TreeView 
// documentaion on TreeDataProvider: https://code.visualstudio.com/api/extension-guides/tree-view




//class CodeStoriesProvider implements vscode.TreeDataProvider
class CodeStoriesProvider implements vscode.TreeDataProvider<TreeItem> {
	onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;

	data: TreeItem[];  


	// constructor full of arbitrary data (use this for display purposes)
	// constructor() {
	// 	this.data = [new TreeItem('Subgoal 1', [
	// 		new TreeItem("Change 1", [
	// 			new TreeItem("Web Resources", [
	// 				new TreeItem("www.test.com")
	// 			]),
	// 			new TreeItem("Errors Fixed By Change", [
	// 				new TreeItem("Error 1")
	// 			])
	// 		]),
	// 		new TreeItem("Change 2", [
	// 			new TreeItem("Web Resources", [
	// 				new TreeItem("www.test2.com")
	// 			]),
	// 			new TreeItem("Errors Fixed By Change", [
	// 				new TreeItem("Error 1")
	// 			])
	// 		]),
	// 	]),
	// 	new TreeItem('Subgoal 2', [
	// 		new TreeItem("Change 1", [
	// 			new TreeItem("Web Resources", [
	// 				new TreeItem("www.test.com")
	// 			]),
	// 			new TreeItem("Errors Fixed By Change", [
	// 				new TreeItem("Error 1")
	// 			])
	// 		]),
	// 		new TreeItem("Change 2", [
	// 			new TreeItem("Web Resources", [
	// 				new TreeItem("www.test2.com")
	// 			]),
	// 			new TreeItem("Errors Fixed By Change", [
	// 				new TreeItem("Error 1")
	// 			])
	// 		]),
	// 	])
	// ];
	// }

	constructor () {
		// this.data = this.formatCodeStoryData(this.getStoriesForCurrentFile());
		this.data = [];
	}

	getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
		return element;
	}
	
	getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
		if (element === undefined) {  // case where we are at the root
			return this.data;
		}
		return element.children;
	}

	getStoriesForCurrentFile(): Object {
		/* Get Code Story Data for Current File */

		// get current working file
		// var currentlyOpenTabfilePath = vscode.window.activeTextEditor?.document.uri.fsPath;
		let pathToCurFile = vscode.window.activeTextEditor?.document.uri.fsPath;

		// get name of file
		let splitFilePath = pathToCurFile?.split("\\");
		let fileName = splitFilePath?[splitFilePath.length - 1]

		// In practice, we will have a database that we can query for all information about pathToCurFile

		return {};
	}
	
	formatCodeStoryData(): Array<TreeItem> {
		/* Formats given Code Story JSON data as a hierarchy of TreeItems */
		return [];
	}

}


// Define the TreeItem for our TreeView (change name of this later?)
// documentation: https://code.visualstudio.com/api/extension-guides/tree-view
class TreeItem extends vscode.TreeItem {
	children: TreeItem[]|undefined;   // the | ("pipe") denotes that children can either be type TreeItem[] or undefined

	constructor(label: string, children?: TreeItem[]) {  // the question mark means the parameter is optional
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed); // change to Expanded to be expanded by default
	  this.children = children;
	}
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codestories" is now active!');

	// console.log(vscode.window.activeTextEditor?.document.uri.fsPath);
	console.log(vscode.window.activeTextEditor?.document.uri.fsPath);


	// create TreeView and register the TreeView Data Provider (for our Tree View called Code Stories)
	vscode.window.registerTreeDataProvider('codeStories', new CodeStoriesProvider());

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codestories.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from CodeStoriesPrototype!');
	});

	let dispoTwo = vscode.commands.registerCommand('codestories.commandTwo', () => {
		vscode.window.showInformationMessage('This is another command');
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(dispoTwo);
}

// This method is called when your extension is deactivated
export function deactivate() {}

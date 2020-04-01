/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as vscode from 'vscode';
import {CqlItemProvider} from './cql/treeview/CqlItemProvider';
import * as webviewCreator from './webview/WebviewCreator';
import {NodeCompiler} from './cql/NodeCompiler';
import * as path from 'path';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;
let window: typeof vscode.window;
let treeViewProvider: CqlItemProvider;
let compiler: NodeCompiler;

export function activate(context: vscode.ExtensionContext) {
	registerCommands(context);
	
	window = vscode.window;
	compiler = new NodeCompiler();

	// The server is implemented in node
	let serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for cql files
		documentSelector: [{ scheme: 'file', language: 'cql' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// When the client is ready, execute:
	client.onReady().then(() => {
		let func = function(){
			compiler.compileCQL(data => {
				if(!treeViewProvider){
					treeViewProvider = new CqlItemProvider(vscode.window.activeTextEditor.document.fileName, data);
					//treeViewProvider = new CqlItemProvider(vscode.workspace.workspaceFolders[0].uri.fsPath, data);
					vscode.window.registerTreeDataProvider('treeView', treeViewProvider);
				}
				treeViewProvider.refresh(data); 
			});
		};
		func();

		// When the server sends the appropriate notifcation, compile the CQL
		client.onNotification("compile", func);
	});

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}




function registerCommands(context: vscode.ExtensionContext){
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = vscode.commands.registerCommand('schemaView.start', () => {
		window.showInputBox({prompt: "Enter the name of a Schema"}).then(schema => { // get input to determine which schema to use for the graph
			if(Object.keys(compiler.getData().schemas).includes(schema))
				webviewCreator.createWebviewSchema(schema, compiler.getData());
			else
				window.showErrorMessage("There is no such Schema");
		});
	});

	let disposable2 = vscode.commands.registerCommand('typesideView.start', () => {
		window.showInputBox().then(typeside => { // get input to determine which schema to use for the graph
			if(Object.keys(compiler.getData().typesides).includes(typeside))
				webviewCreator.createWebviewTypeside(typeside, compiler.getData());
			else
				window.showErrorMessage("There is no such Typeside");
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}




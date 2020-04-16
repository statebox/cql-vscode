"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode = require("vscode");
const CqlItemProvider_1 = require("./cql/treeview/CqlItemProvider");
const webviewCreator = require("./webview/WebviewCreator");
const NodeCompiler_1 = require("./cql/NodeCompiler");
const path = require("path");
const vscode_languageclient_1 = require("vscode-languageclient");
let client;
let window;
let treeViewProvider;
let compiler;
function activate(context) {
    registerCommands(context);
    window = vscode.window;
    compiler = new NodeCompiler_1.NodeCompiler();
    // The server is implemented in node
    let serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    // Options to control the language client
    let clientOptions = {
        // Register the server for cql files
        documentSelector: [{ scheme: 'file', language: 'cql' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Create the language client and start the client.
    client = new vscode_languageclient_1.LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);
    // When the client is ready, execute:
    client.onReady().then(() => {
        let func = function () {
            compiler.compileCQL(data => {
                if (!treeViewProvider) {
                    treeViewProvider = new CqlItemProvider_1.CqlItemProvider(vscode.window.activeTextEditor.document.fileName, data);
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
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
function registerCommands(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('schemaView.start', () => {
        window.showInputBox({ prompt: "Enter the name of a Schema" }).then(schema => {
            if (Object.keys(compiler.getData().schemas).includes(schema))
                webviewCreator.createWebviewSchema(schema, compiler.getData());
            else
                window.showErrorMessage("There is no such Schema");
        });
    });
    let disposable2 = vscode.commands.registerCommand('typesideView.start', () => {
        window.showInputBox().then(typeside => {
            if (Object.keys(compiler.getData().typesides).includes(typeside))
                webviewCreator.createWebviewTypeside(typeside, compiler.getData());
            else
                window.showErrorMessage("There is no such Typeside");
        });
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
}
//# sourceMappingURL=extension.js.map
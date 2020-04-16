"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
class NodeCompiler {
    compileCQL(post) {
        child_process_1.exec(`cql ` + vscode.window.activeTextEditor.document.uri.fsPath + ` --format=json`, (err, stdout, stderr) => {
            // Check if something went wrong in the command execution. 
            // ** Which is different from a compilation error in CQL ** 
            if (err) {
                console.log(stderr);
                vscode.window.showErrorMessage("Make sure you have CQL installed.");
                return;
            }
            // If the CQL compiled correctly, stdout will have proper JSON data. If it wasn't it will contain 
            // text which is the error to why it couldn't compile, which is then displayed to the user.
            try {
                this.data = JSON.parse(stdout);
                post(this.data);
            }
            catch (err) {
                console.log(err);
                vscode.window.showErrorMessage(stdout);
            }
        });
    }
    getData() {
        return this.data;
    }
}
exports.NodeCompiler = NodeCompiler;
//# sourceMappingURL=NodeCompiler.js.map
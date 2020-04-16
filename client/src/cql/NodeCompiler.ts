import * as vscode from 'vscode';
import {exec} from 'child_process';
import { Compiler } from './Compiler';

export class NodeCompiler implements Compiler{
	private data: {};

	public compileCQL(post: Function) {
		exec(`cql ` +  vscode.window.activeTextEditor.document.uri.fsPath + ` --format=json`, (err, stdout, stderr) => {
			// Check if something went wrong in the command execution. 
			// ** Which is different from a compilation error in CQL ** 
			if (err) {
				console.log(stderr);
				vscode.window.showErrorMessage("Make sure you have CQL installed.");
				return;
			}
			
			// If the CQL compiled correctly, stdout will have proper JSON data. If it wasn't it will contain 
			// text which is the error to why it couldn't compile, which is then displayed to the user.
			try{
				this.data = JSON.parse(stdout);
				post(this.data);
			}catch(err){
				console.log(err);
				vscode.window.showErrorMessage(stdout);
			}
		});
	}

	public getData(): any{
		return this.data;
	}
}




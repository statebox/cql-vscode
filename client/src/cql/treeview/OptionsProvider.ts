import { CqlItem } from "./CqlItem";
import * as vscode from 'vscode';

export class OptionsProvider {
	public getOptions(json: any): CqlItem[]{
		if(json.other){
			let options: CqlItem[] = [];

			Object.entries(json.other).forEach((x: any) => {
				options.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, [
					new CqlItem("" + x[1], vscode.TreeItemCollapsibleState.None, [], "")
				], ""));
			});
			return options;
		}else{
			throw new Error("Options not found.");
		}
	}
}
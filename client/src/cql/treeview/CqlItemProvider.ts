import * as vscode from 'vscode';
import { CqlItem } from "./CqlItem";
import { TypeSideProvider } from "./TypeSideProvider";
import { SchemaProvider } from "./SchemaProvider";
import { InstanceProvider } from "./InstanceProvider";
import { OptionsProvider } from './OptionsProvider';

export class CqlItemProvider implements vscode.TreeDataProvider<CqlItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<CqlItem | undefined> = new vscode.EventEmitter<CqlItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<CqlItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string, private json: any) {
	}

	refresh(json): void {
		this.json = json;
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: CqlItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: CqlItem): Thenable<CqlItem[]> {
		// if (!this.workspaceRoot) {
		// 	vscode.window.showInformationMessage('No dependency in empty workspace');
		// 	return Promise.resolve([]);
		// }

		if (element) {
			return Promise.resolve(element.children);
		} else {
			return Promise.resolve(this.getItemsInJson());
		}

	}

	private getItemsInJson(): CqlItem[] {
		let items: CqlItem[] = [];
		
		try{
			items.push(new CqlItem("Options", vscode.TreeItemCollapsibleState.Collapsed, new OptionsProvider().getOptions(this.json), ""));
		}catch(err){
			vscode.window.showInformationMessage("There was an issue loading the Options.");
			console.log(err);
		}

		try{
			new TypeSideProvider().getTypeSides(this.json).forEach((typeside) => {
				items.push(typeside);
			});
		}catch(err){
			vscode.window.showInformationMessage("There was an issue loading the Typesides.");
			console.log(err);
		}

		try{
			new SchemaProvider().getSchemas(this.json).forEach((schema) => {
				items.push(schema);
			});
		}catch(err){
			vscode.window.showInformationMessage("There was an issue loading the Schemas.");
			console.log(err);
		}

		try{
			new InstanceProvider().getInstances(this.json).forEach((instance) => {
				items.push(instance);
			});
		}catch(err){
			vscode.window.showInformationMessage("There was an issue loading the Instances.");
			console.log(err);
		}
		
		
		return items;
	}
}
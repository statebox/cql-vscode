import * as vscode from 'vscode';
import * as path from 'path';

export class CqlItem extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly kids: CqlItem[],
		public readonly kind: string
		//public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label}`;
	}

	get children(): CqlItem[]{
		return this.kids;
	}

	get description(): string {
	 	return this.kind;
 	}

	iconPath = {
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};

	//contextValue = 'dependency';
}
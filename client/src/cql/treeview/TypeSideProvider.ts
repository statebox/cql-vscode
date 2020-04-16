import { CqlItem } from "./CqlItem";
import * as vscode from 'vscode';

export class TypeSideProvider {
	public getTypeSides(json: any): CqlItem[] {
		if(json.typesides){
			let typesideItems: CqlItem[] = [];

			Object.entries(json.typesides).forEach((x: any) => {
				let children: CqlItem[] = [];
				children.push(new CqlItem("Symbols", vscode.TreeItemCollapsibleState.Collapsed, this.getSymbols(x[1]), "symbols"));
				children.push(new CqlItem("Equations", vscode.TreeItemCollapsibleState.Collapsed, this.getEquations(x[1]), "equations"));
				children.push(new CqlItem("Types", vscode.TreeItemCollapsibleState.Collapsed, this.getTypes(x[1]), "types"));

				typesideItems.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, children, "typeside"));
			});
			return typesideItems;
		}else{
			throw new Error("Typesides not found.");
		}
	}

	getSymbols(obj: any): CqlItem[] {
		if(obj.syms){
			let children: CqlItem[] = [];
			Object.entries(obj.syms).forEach(x => {
				children.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x[1])));
			});
			return children;
		}else{
			throw new Error("Symbols not found.");
		}
	}

	getEquations(obj: any): CqlItem[] { // DOESNT WORK I DONT THINK, BECAUSE DONT HAVE TEST DATA
		if(obj.eqs){
			// let children: CqlItem[] = [];
			// Object.entries(obj.eqs).forEach(x => {
			// 	children.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x)));
			// });
			return [];
		}else{
			throw new Error("Equations not found.");
		}
	}

	getTypes(obj: any): CqlItem[] {
		if(obj.tys){
			let children: CqlItem[] = [];
			for (let i = 0; i < obj.tys.length; i++) {
				children.push(new CqlItem(obj.tys[i], vscode.TreeItemCollapsibleState.None, [], ""));
			}
			return children;
		}else{
			throw new Error("Types not found.");
		}
	}

	formatFunction(arr: any): string {
		if(arr.length == 2){
			if((arr[0]).length === 0){
				return "[] -> " + arr[1];
			}
			else{
				return arr[0] + " -> " + arr[1];
			}
		}else{
			throw new Error("Error formatting function.");
		}
	}
}
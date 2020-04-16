import { CqlItem } from "./CqlItem";
import * as vscode from 'vscode';

export class SchemaProvider {
	public getSchemas(json: any): CqlItem[] {
		let schemas: CqlItem[] = [];

		if(json.schemas){
			Object.entries(json.schemas).forEach((x: any) => {
				let children: CqlItem[] = [];
				children.push(new CqlItem("Attributes"  , vscode.TreeItemCollapsibleState.Collapsed, this.getAttributes(x[1]) , "attributes"  ));
				children.push(new CqlItem("Entities"    , vscode.TreeItemCollapsibleState.Collapsed, this.getEntities(x[1])   , "entities"    ));
				children.push(new CqlItem("Foreign Keys", vscode.TreeItemCollapsibleState.Collapsed, this.getForeignKeys(x[1]), "foreign keys"));

				schemas.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, children, "schema"));
			});
			return schemas;
		}else{
			throw new Error("Schemas not found.");
		}
	}

	getAttributes(obj: any): CqlItem[] {
		if(obj.atts){
			let attributes: CqlItem[] = [];
			Object.entries(obj.atts).forEach(x => {
				attributes.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x[1])));
			});
			return attributes;
		}else{
			throw new Error("Attributes not found.");
		}
	}

	getEntities(obj: any): CqlItem[] {
		if(obj.ens){
			let entities: CqlItem[] = [];
			for (let i = 0; i < obj.ens.length; i++) {
				entities.push(new CqlItem(obj.ens[i], vscode.TreeItemCollapsibleState.None, [], ""));
			}
			return entities; 
		}else{
			throw new Error("Entities not found.");
		}
	}

	getForeignKeys(obj: any): CqlItem[] {
		if(obj.fks){
			let foreignKeys: CqlItem[] = [];
			Object.entries(obj.fks).forEach(x => {
				foreignKeys.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x[1])));
			});
			return foreignKeys;
		}else{
			throw new Error("ForeignKeys not found.");
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
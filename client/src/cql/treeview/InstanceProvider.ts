import { CqlItem } from "./CqlItem";
import * as vscode from 'vscode';

export class InstanceProvider {
	public getInstances(json: any): CqlItem[] {
		let instances: CqlItem[] = [];

		if(json.instances){
			Object.entries(json.instances).forEach((x: any) => {
				let children: CqlItem[] = [];
				children.push(new CqlItem("Generators"  , vscode.TreeItemCollapsibleState.Collapsed, this.getGenerators(x[1].pres) , "generators"));
				children.push(new CqlItem("Equations" , vscode.TreeItemCollapsibleState.Collapsed, this.getEquations(x[1].pres), "equations"));

				instances.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, children, "instance"));
			});
			return instances;
		}else{
			throw new Error("Instances not found.");
		}
	}

	getGenerators(obj: any): CqlItem[] {
		if(obj.sks && obj.gens){
			let generators: CqlItem[] = [];
			Object.entries(obj.gens).forEach(x => {
				generators.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], ""+x[1]));
			});
			Object.entries(obj.sks).forEach(x => {
				generators.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], ""+x[1]));
			});
			return generators;
		}else{
			throw new Error("Generators not found.");
		}
	}

	getEquations(obj: any): CqlItem[] {
		if(obj.eqs){
			let equations: CqlItem[] = [];
			for (let i = 0; i < obj.eqs.length; i++) {
				equations.push(new CqlItem(obj.eqs[i], vscode.TreeItemCollapsibleState.None, [], ""));
			}
			return equations; 
		}else{
			throw new Error("Equations not found.");
		}
	}

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CqlItem_1 = require("./CqlItem");
const vscode = require("vscode");
class InstanceProvider {
    getInstances(json) {
        let instances = [];
        if (json.instances) {
            Object.entries(json.instances).forEach((x) => {
                let children = [];
                children.push(new CqlItem_1.CqlItem("Generators", vscode.TreeItemCollapsibleState.Collapsed, this.getGenerators(x[1].pres), "generators"));
                children.push(new CqlItem_1.CqlItem("Equations", vscode.TreeItemCollapsibleState.Collapsed, this.getEquations(x[1].pres), "equations"));
                instances.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, children, "instance"));
            });
            return instances;
        }
        else {
            throw new Error("Instances not found.");
        }
    }
    getGenerators(obj) {
        if (obj.sks && obj.gens) {
            let generators = [];
            Object.entries(obj.gens).forEach(x => {
                generators.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], "" + x[1]));
            });
            Object.entries(obj.sks).forEach(x => {
                generators.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], "" + x[1]));
            });
            return generators;
        }
        else {
            throw new Error("Generators not found.");
        }
    }
    getEquations(obj) {
        if (obj.eqs) {
            let equations = [];
            for (let i = 0; i < obj.eqs.length; i++) {
                equations.push(new CqlItem_1.CqlItem(obj.eqs[i], vscode.TreeItemCollapsibleState.None, [], ""));
            }
            return equations;
        }
        else {
            throw new Error("Equations not found.");
        }
    }
}
exports.InstanceProvider = InstanceProvider;
//# sourceMappingURL=InstanceProvider.js.map
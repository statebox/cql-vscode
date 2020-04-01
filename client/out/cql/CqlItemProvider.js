"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CqlItem_1 = require("./CqlItem");
const TypeSideProvider_1 = require("./TypeSideProvider");
const SchemaProvider_1 = require("./SchemaProvider");
const InstanceProvider_1 = require("./InstanceProvider");
const OptionsProvider_1 = require("./OptionsProvider");
class CqlItemProvider {
    constructor(workspaceRoot, json) {
        this.workspaceRoot = workspaceRoot;
        this.json = json;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh(json) {
        this.json = json;
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        // if (!this.workspaceRoot) {
        // 	vscode.window.showInformationMessage('No dependency in empty workspace');
        // 	return Promise.resolve([]);
        // }
        if (element) {
            return Promise.resolve(element.children);
        }
        else {
            return Promise.resolve(this.getItemsInJson());
        }
    }
    getItemsInJson() {
        let items = [];
        try {
            items.push(new CqlItem_1.CqlItem("Options", vscode.TreeItemCollapsibleState.Collapsed, new OptionsProvider_1.OptionsProvider().getOptions(this.json), ""));
        }
        catch (err) {
            vscode.window.showInformationMessage("There was an issue loading the Options.");
            console.log(err);
        }
        try {
            new TypeSideProvider_1.TypeSideProvider().getTypeSides(this.json).forEach((typeside) => {
                items.push(typeside);
            });
        }
        catch (err) {
            vscode.window.showInformationMessage("There was an issue loading the Typesides.");
            console.log(err);
        }
        try {
            new SchemaProvider_1.SchemaProvider().getSchemas(this.json).forEach((schema) => {
                items.push(schema);
            });
        }
        catch (err) {
            vscode.window.showInformationMessage("There was an issue loading the Schemas.");
            console.log(err);
        }
        try {
            new InstanceProvider_1.InstanceProvider().getInstances(this.json).forEach((instance) => {
                items.push(instance);
            });
        }
        catch (err) {
            vscode.window.showInformationMessage("There was an issue loading the Instances.");
            console.log(err);
        }
        return items;
    }
}
exports.CqlItemProvider = CqlItemProvider;
//# sourceMappingURL=CqlItemProvider.js.map
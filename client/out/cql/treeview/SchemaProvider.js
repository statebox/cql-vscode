"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CqlItem_1 = require("./CqlItem");
const vscode = require("vscode");
class SchemaProvider {
    getSchemas(json) {
        let schemas = [];
        if (json.schemas) {
            Object.entries(json.schemas).forEach((x) => {
                let children = [];
                children.push(new CqlItem_1.CqlItem("Attributes", vscode.TreeItemCollapsibleState.Collapsed, this.getAttributes(x[1]), "attributes"));
                children.push(new CqlItem_1.CqlItem("Entities", vscode.TreeItemCollapsibleState.Collapsed, this.getEntities(x[1]), "entities"));
                children.push(new CqlItem_1.CqlItem("Foreign Keys", vscode.TreeItemCollapsibleState.Collapsed, this.getForeignKeys(x[1]), "foreign keys"));
                schemas.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, children, "schema"));
            });
            return schemas;
        }
        else {
            throw new Error("Schemas not found.");
        }
    }
    getAttributes(obj) {
        if (obj.atts) {
            let attributes = [];
            Object.entries(obj.atts).forEach(x => {
                attributes.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x[1])));
            });
            return attributes;
        }
        else {
            throw new Error("Attributes not found.");
        }
    }
    getEntities(obj) {
        if (obj.ens) {
            let entities = [];
            for (let i = 0; i < obj.ens.length; i++) {
                entities.push(new CqlItem_1.CqlItem(obj.ens[i], vscode.TreeItemCollapsibleState.None, [], ""));
            }
            return entities;
        }
        else {
            throw new Error("Entities not found.");
        }
    }
    getForeignKeys(obj) {
        if (obj.fks) {
            let foreignKeys = [];
            Object.entries(obj.fks).forEach(x => {
                foreignKeys.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x[1])));
            });
            return foreignKeys;
        }
        else {
            throw new Error("ForeignKeys not found.");
        }
    }
    formatFunction(arr) {
        if (arr.length == 2) {
            if ((arr[0]).length === 0) {
                return "[] -> " + arr[1];
            }
            else {
                return arr[0] + " -> " + arr[1];
            }
        }
        else {
            throw new Error("Error formatting function.");
        }
    }
}
exports.SchemaProvider = SchemaProvider;
//# sourceMappingURL=SchemaProvider.js.map
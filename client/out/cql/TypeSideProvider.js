"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CqlItem_1 = require("./CqlItem");
const vscode = require("vscode");
class TypeSideProvider {
    getTypeSides(json) {
        if (json.typesides) {
            let typesideItems = [];
            Object.entries(json.typesides).forEach((x) => {
                let children = [];
                children.push(new CqlItem_1.CqlItem("Symbols", vscode.TreeItemCollapsibleState.Collapsed, this.getSymbols(x[1]), "symbols"));
                children.push(new CqlItem_1.CqlItem("Equations", vscode.TreeItemCollapsibleState.Collapsed, this.getEquations(x[1]), "equations"));
                children.push(new CqlItem_1.CqlItem("Types", vscode.TreeItemCollapsibleState.Collapsed, this.getTypes(x[1]), "types"));
                typesideItems.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, children, "typeside"));
            });
            return typesideItems;
        }
        else {
            throw new Error("Typesides not found.");
        }
    }
    getSymbols(obj) {
        if (obj.syms) {
            let children = [];
            Object.entries(obj.syms).forEach(x => {
                children.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x[1])));
            });
            return children;
        }
        else {
            throw new Error("Symbols not found.");
        }
    }
    getEquations(obj) {
        if (obj.eqs) {
            // let children: CqlItem[] = [];
            // Object.entries(obj.eqs).forEach(x => {
            // 	children.push(new CqlItem(x[0], vscode.TreeItemCollapsibleState.None, [], this.formatFunction(x)));
            // });
            return [];
        }
        else {
            throw new Error("Equations not found.");
        }
    }
    getTypes(obj) {
        if (obj.tys) {
            let children = [];
            for (let i = 0; i < obj.tys.length; i++) {
                children.push(new CqlItem_1.CqlItem(obj.tys[i], vscode.TreeItemCollapsibleState.None, [], ""));
            }
            return children;
        }
        else {
            throw new Error("Types not found.");
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
exports.TypeSideProvider = TypeSideProvider;
//# sourceMappingURL=TypeSideProvider.js.map
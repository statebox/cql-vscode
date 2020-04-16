"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
class CqlItem extends vscode.TreeItem {
    constructor(label, collapsibleState, kids, kind
    //public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.kids = kids;
        this.kind = kind;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
        };
    }
    get tooltip() {
        return `${this.label}`;
    }
    get children() {
        return this.kids;
    }
    get description() {
        return this.kind;
    }
}
exports.CqlItem = CqlItem;
//# sourceMappingURL=CqlItem.js.map
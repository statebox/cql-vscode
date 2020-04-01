"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CqlItem_1 = require("./CqlItem");
const vscode = require("vscode");
class OptionsProvider {
    getOptions(json) {
        if (json.other) {
            let options = [];
            Object.entries(json.other).forEach((x) => {
                options.push(new CqlItem_1.CqlItem(x[0], vscode.TreeItemCollapsibleState.Collapsed, [
                    new CqlItem_1.CqlItem("" + x[1], vscode.TreeItemCollapsibleState.None, [], "")
                ], ""));
            });
            return options;
        }
        else {
            throw new Error("Options not found.");
        }
    }
}
exports.OptionsProvider = OptionsProvider;
//# sourceMappingURL=OptionsProvider.js.map
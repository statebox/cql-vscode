"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const OptionsProvider_1 = require("../../cql/treeview/OptionsProvider");
const mocha_1 = require("mocha");
suite('Options Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    let o;
    mocha_1.beforeEach('create the typeside provider', () => {
        o = new OptionsProvider_1.OptionsProvider();
    });
    test('getOptions is empty list when given empty options', () => {
        const data = {
            other: {}
        };
        assert.deepEqual(o.getOptions(data), []);
    });
    test('getOptions error when given data without options', () => {
        const data = {
            schemas: {},
            instances: {}
        };
        assert.throws(() => { o.getOptions(data); }, new Error("Options not found."));
    });
});
//# sourceMappingURL=OptionsProvider.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const InstanceProvider_1 = require("../../cql/treeview/InstanceProvider");
const mocha_1 = require("mocha");
suite('InstanceProvider Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    let i;
    mocha_1.beforeEach('create the schema provider', () => {
        i = new InstanceProvider_1.InstanceProvider();
    });
    // getInstances Tests
    test('getInstances is empty list when given empty instances', () => {
        const data = {
            instances: {}
        };
        assert.deepEqual(i.getInstances(data), []);
    });
    test('getInstances error when given data without instances', () => {
        const data = {
            typesides: {},
            schemas: {}
        };
        assert.throws(() => { i.getInstances(data); }, new Error("Instances not found."));
    });
    test('getInstances gets right number of instances', () => {
        const data = {
            instances: {
                J: { pres: { gens: {}, sks: {}, eqs: {} } },
                I: { pres: { gens: {}, sks: {}, eqs: {} } }
            }
        };
        assert.equal(i.getInstances(data).length, 2);
    });
    // getGenerators Tests
    test('getGenerators is empty list when given empty generators', () => {
        const data = {
            instances: {
                I: { pres: { gens: {}, sks: {} } }
            }
        };
        assert.deepEqual(i.getGenerators(data.instances.I.pres), []);
    });
    test('getGenerators error when given data without generators', () => {
        const data = {
            typesides: {},
            instances: {
                I: { pres: {} }
            }
        };
        assert.throws(() => { i.getGenerators(data.instances.I.pres); }, new Error("Generators not found."));
    });
    test('getGenerators gets right number of generators', () => {
        const data = {
            gens: {
                x: "a",
                y: "b"
            },
            sks: {
                i: "int"
            }
        };
        assert.equal(i.getGenerators(data).length, 3);
    });
    // getEquations Tests
    test('getEquations is empty list when given empty equations', () => {
        const data = {
            instances: {
                I: { pres: { eqs: [] } }
            }
        };
        assert.deepEqual(i.getEquations(data.instances.I.pres), []);
    });
    test('getEquations error when given data without equations', () => {
        const data = {
            typesides: {},
            instances: {
                I: { pres: {} }
            }
        };
        assert.throws(() => { i.getEquations(data); }, new Error("Equations not found."));
    });
    test('getEquations gets right number of equations', () => {
        const data = {
            instances: { I: { pres: {
                        eqs: [
                            "a.b=c",
                            "x=y",
                            "succ(x).succ(y)=z"
                        ]
                    }
                } }
        };
        assert.equal(i.getEquations(data.instances.I.pres).length, 3);
    });
});
//# sourceMappingURL=InstanceProvider.test.js.map
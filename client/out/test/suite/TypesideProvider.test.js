"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const TypeSideProvider_1 = require("../../cql/treeview/TypeSideProvider");
const mocha_1 = require("mocha");
suite('TypeSideProvider Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    let t;
    mocha_1.beforeEach('create the typeside provider', () => {
        t = new TypeSideProvider_1.TypeSideProvider();
    });
    // getTypeSides Tests
    test('getTypeSides is empty list when given empty schemas', () => {
        const data = {
            typesides: {}
        };
        assert.deepEqual(t.getTypeSides(data), []);
    });
    test('getTypeSides error when given data without typesides', () => {
        const data = {
            schemas: {},
            instances: {}
        };
        assert.throws(() => { t.getTypeSides(data); }, new Error("Typesides not found."));
    });
    test('getTypeSides gets right number of typesides', () => {
        const data = {
            typesides: {
                T: { syms: {}, eqs: {}, tys: {} },
                O: { syms: {}, eqs: {}, tys: {} },
                P: { syms: {}, eqs: {}, tys: {} }
            }
        };
        assert.equal(t.getTypeSides(data).length, 3);
    });
    // getSymbols Tests
    test('getSymbols is empty list when given empty symbols', () => {
        const data = {
            typesides: {
                T: { syms: {} }
            }
        };
        assert.deepEqual(t.getSymbols(data.typesides.T), []);
    });
    test('getSymbols error when given data without symbols', () => {
        const data = {
            typesides: {
                T: {}
            }
        };
        assert.throws(() => { t.getSymbols(data); }, new Error("Symbols not found."));
    });
    test('getSymbols gets right number of symbols', () => {
        const data = {
            typesides: { T: {
                    syms: {
                        test1: [[], "y"],
                        test2: [[], "x"]
                    }
                }
            }
        };
        assert.equal(t.getSymbols(data.typesides.T).length, 2);
    });
    // getTypes Tests
    test('getTypes is empty list when given empty types', () => {
        const data = {
            typesides: {
                T: { tys: [] }
            }
        };
        assert.deepEqual(t.getTypes(data.typesides.T), []);
    });
    test('getTypes error when given data without types', () => {
        const data = {
            typesides: {
                T: {}
            }
        };
        assert.throws(() => { t.getTypes(data); }, new Error("Types not found."));
    });
    test('getTypes gets right number of types', () => {
        const data = {
            typesides: { T: {
                    tys: [
                        "test1",
                        "test2",
                        "test3",
                        "test4"
                    ]
                }
            }
        };
        assert.equal(t.getTypes(data.typesides.T).length, 4);
    });
    // getEquations Tests
    test('getEquations is empty list when given empty equations', () => {
        const data = {
            typesides: {
                T: { eqs: {} }
            }
        };
        assert.deepEqual(t.getEquations(data.typesides.T), []);
    });
    test('getEquations error when given data without equations', () => {
        const data = {
            typesides: { T: {} }
        };
        assert.throws(() => { t.getEquations(data); }, new Error("Equations not found."));
    });
    // test('getEquations gets right number of equations', () => {
    // 	const data = {
    // 		typesides: { T: {
    // 			eqs: {
    // 				// Don't know how to construct an object for equations. They're confusing.
    // 			}}
    // 		}
    // 	};
    // 	assert.equal(t.getEquations(data.typesides.T).length, 3);
    // });
    // Other Testing
    test('formatFunction gives correct output for standard input', () => {
        const data = {
            test: ["x", "y"]
        };
        assert.equal(t.formatFunction(data.test), "x -> y");
    });
    test('formatFunction gives correct output for single element input', () => {
        const data = {
            test: [[], "x"]
        };
        assert.equal(t.formatFunction(data.test), "[] -> x");
    });
    test('formatFunction throws error for input too big', () => {
        const data = {
            test: ["x", "y", "z"]
        };
        assert.throws(() => {
            t.formatFunction(data.test);
        }, new Error("Error formatting function."));
    });
    test('formatFunction throws error for input too small', () => {
        const data = {
            test: ["x"]
        };
        assert.throws(() => {
            t.formatFunction(data.test);
        }, new Error("Error formatting function."));
    });
});
//# sourceMappingURL=TypesideProvider.test.js.map
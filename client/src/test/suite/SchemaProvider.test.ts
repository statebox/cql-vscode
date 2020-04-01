import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import {SchemaProvider} from '../../cql/treeview/SchemaProvider';
import { beforeEach } from 'mocha';

suite('SchemaProvider Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	let s: SchemaProvider;

	beforeEach('create the schema provider', () => {
		s = new SchemaProvider();
	});


	
	// getSchemas Tests
	test('getSchemas is empty list when given empty schemas', () => {
		const data = {
			schemas: {}
		};
		assert.deepEqual(s.getSchemas(data), []);
	});

	test('getSchemas error when given data without schemas', () => {
		const data = {
			typesides: {},
			instances: {}
		};
		assert.throws(() => { s.getSchemas(data); }, 
			new Error("Schemas not found."));
	});

	test('getSchemas gets right number of schemas', () => {
		const data = {
			schemas: {
				S: {atts: {}, fks: {}, ens: {}},
				R: {atts: {}, fks: {}, ens: {}},
				P: {atts: {}, fks: {}, ens: {}}
			}
		};
		assert.equal(s.getSchemas(data).length, 3);
	});



	// getAttributes Tests
	test('getAttributes is empty list when given empty attributes', () => {
		const data = {
			schemas: {
				S: {atts: {}}	
			}
		};
		assert.deepEqual(s.getAttributes(data.schemas.S), []);
	});

	test('getAttributes error when given data without attributes', () => {
		const data = {
			typesides: {},
			schemas: {
				S: {}
			}};
		assert.throws(() => { s.getAttributes(data); }, 
			new Error("Attributes not found."));
	});

	test('getAttributes gets right number of attributes', () => {
		const data = {
			schemas: { S: {
				atts: {
					test1: ["x", "y"],
					test2: ["y", "x"]
				}}
			}
		};
		assert.equal(s.getAttributes(data.schemas.S).length, 2);
	});


	// getEntities Tests
	test('getEntities is empty list when given empty entities', () => {
		const data = {
			schemas: {
				S: {ens: []}	
			}
		};
		assert.deepEqual(s.getEntities(data.schemas.S), []);
	});

	test('getEntities error when given data without entities', () => {
		const data = {
			typesides: {},
			schemas: {
				S: {}
			}};
		assert.throws(() => { s.getEntities(data); }, 
			new Error("Entities not found."));
	});

	test('getEntities gets right number of entities', () => {
		const data = {
			schemas: { S: {
				ens: [
					"test1",
					"test2",
					"test3",
					"test4"
				]}
			}
		};
		assert.equal(s.getEntities(data.schemas.S).length, 4);
	});


	// getForeignKeys Tests
	test('getForeignKeys is empty list when given empty foreignKeys', () => {
		const data = {
			schemas: {
				S: {fks: {}}	
			}
		};
		assert.deepEqual(s.getForeignKeys(data.schemas.S), []);
	});

	test('getForeignKeys error when given data without foreign keys', () => {
		const data = {
			typesides: {},
			schemas: {
				S: {}
			}};
		assert.throws(() => { s.getForeignKeys(data); }, 
			new Error("ForeignKeys not found."));
	});

	test('getForeignKeys gets right number of foreign keys', () => {
		const data = {
			schemas: { S: {
				fks: {
					test1: ["x", "y"],
					test2: ["y", "z"],
					test3: ["x", "z"]
				}}
			}
		};
		assert.equal(s.getForeignKeys(data.schemas.S).length, 3);
	});

	// Other Testing
	test('formatFunction gives correct output for standard input', () => {
		const data = {
			test: ["x", "y"]
		};
		assert.equal(s.formatFunction(data.test), "x -> y");
	});

	test('formatFunction gives correct output for single element input', () => {
		const data = {
			test: [[], "x"]
		};
		assert.equal(s.formatFunction(data.test), "[] -> x");
	});

	test('formatFunction throws error for input too big', () => {
		const data = {
			test: ["x", "y", "z"]
		};
		assert.throws(() => {
			s.formatFunction(data.test);
		}, 
		new Error("Error formatting function."));
	});

	test('formatFunction throws error for input too small', () => {
		const data = {
			test: ["x"]
		};
		assert.throws(() => {
			s.formatFunction(data.test);
		}, 
		new Error("Error formatting function."));
	});
});
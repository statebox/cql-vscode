import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import {OptionsProvider} from '../../cql/treeview/OptionsProvider';
import { beforeEach } from 'mocha';

suite('Options Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	let o: OptionsProvider;

	beforeEach('create the typeside provider', () => {
		o = new OptionsProvider();
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
		assert.throws(() => { o.getOptions(data); }, 
			new Error("Options not found."));
	});

});
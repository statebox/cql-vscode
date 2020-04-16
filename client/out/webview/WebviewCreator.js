"use strict";
/**
 * A collection of functions for creating webview panels in the VSCode window,
 * which contain different visualisations of the data passed to them.
 * @author Aidan McPhelim
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const GREEN = '#32CD32';
const DARK_GREEN = '#008000';
function createWebviewSchema(schemaName, json) {
    // Creates the window which the webview will be displayed in
    let panel = undefined;
    panel = vscode.window.createWebviewPanel('schemaView', // Identifies the type of the webview. Used internally
    'Schema ' + schemaName, // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    { enableScripts: true } // This is needed to make sure the code for the graph is ran.
    );
    // And set its HTML content
    Object.entries(json.schemas).forEach(x => {
        if (x[0] == schemaName && !panel.webview.html) {
            // Define the physics that the Vis.js graph will follow
            // see https://visjs.github.io/vis-network/docs/network/physics.html for more options.
            let physics = {
                enabled: true,
                barnesHut: {
                    theta: 0.5,
                    gravitationalConstant: -2000,
                    centralGravity: 0.1,
                    springLength: 300,
                    springConstant: 0.04,
                    damping: 0.09,
                    avoidOverlap: 0
                }
            };
            panel.webview.html = getWebviewContent("Schema " + schemaName, getSchemaData(x[1]), physics);
        }
    });
}
exports.createWebviewSchema = createWebviewSchema;
function createWebviewTypeside(typesideName, json) {
    // Creates the window which the webview will be displayed in
    let panel = undefined;
    panel = vscode.window.createWebviewPanel('typesideView', // Identifies the type of the webview. Used internally
    'Typeside ' + typesideName, // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    { enableScripts: true } // This is needed to make sure the code for the graph is ran.
    );
    // And set its HTML content
    Object.entries(json.typesides).forEach(x => {
        if (x[0] == typesideName && !panel.webview.html) {
            // Define the physics that the Vis.js graph will follow
            // see https://visjs.github.io/vis-network/docs/network/physics.html for more options.
            let physics = {
                enabled: true,
                barnesHut: {
                    theta: 0.5,
                    gravitationalConstant: -1000,
                    centralGravity: 0.5,
                    springLength: 75,
                    springConstant: 0.04,
                    damping: 0.09,
                    avoidOverlap: 0
                }
            };
            panel.webview.html = getWebviewContent("Typeside " + typesideName, getTypesideData(x[1]), physics);
        }
    });
}
exports.createWebviewTypeside = createWebviewTypeside;
/**
 * A function to compute how the data in a Typeside should be translated into
 * nodes and edges to create a graph.
 * @param typeside An object containing the entire information in the format of a typeside
 * @return An object containing a list of nodes, and a list of edges
 */
function getTypesideData(typeside) {
    function getIdOfNodeFromName(name) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].label == name)
                return nodes[i].id;
        }
    }
    // Figure out the nodes
    var nodes = [];
    let i = 0;
    for (; i < typeside.tys.length; i++) {
        nodes[i] = { id: i, label: typeside.tys[i], color: GREEN };
    }
    Object.entries(typeside.syms).forEach(symbol => {
        nodes[i] = { id: i, label: symbol[0] }; // symbol[0] is the name given to it
        i++;
    });
    // Figure out the edges
    var edges = [];
    let j = 0;
    Object.entries(typeside.syms).forEach(x => {
        edges[j] = { from: getIdOfNodeFromName(x[0]), to: getIdOfNodeFromName(x[1][1]) };
        j++;
    });
    // create a network
    var data = {
        nodes: nodes,
        edges: edges
    };
    return data;
}
function getSchemaData(schema) {
    var getIdFromName = function getIdFromName(name) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].label == name)
                return nodes[i].id;
        }
    };
    var nodes = [];
    let i = 0;
    for (; i < schema.ens.length; i++) {
        nodes[i] = { id: i, label: schema.ens[i] };
    }
    for (let j = 0; j < schema.typeside.tys.length; j++) {
        nodes[j + i] = { id: j + i, label: schema.typeside.tys[j], color: GREEN };
    }
    // create an array with edges
    var edges = [];
    i = 0;
    Object.entries(schema.fks).forEach(x => {
        edges[i] = { from: getIdFromName(x[1][0]), to: getIdFromName(x[1][1]), label: x[0] };
        i++;
    });
    Object.entries(schema.atts).forEach(x => {
        edges[i] = { from: getIdFromName(x[1][0]), to: getIdFromName(x[1][1]), label: x[0], color: DARK_GREEN };
        i++;
    });
    // create a network
    var data = {
        nodes: nodes,
        edges: edges
    };
    return data;
}
function getWebviewContent(title, data, physics) {
    return `
	<!doctype html>
	<html>
	<head>
	  <title>Network</title>
	  <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
	  <style type="text/css">
		#mynetwork {
		  width: 90vw;
		  height: 90vh;
		  border: 1px solid lightgray;
		}
	  </style>
	</head>
	<body>
	<h1>` + title + `</h1>
	<div id="mynetwork"></div>

	<script type="text/javascript">

	var network;

	var container = document.getElementById('mynetwork');
	var options = {
		autoResize: true,
		edges: {
			arrows: 'to',
			font: {
				color: '#ffffff',
				strokeColor: '#000000',
				strokeWidth: 1
			}
		},
		physics: ` + JSON.stringify(physics) + `
	};
	
	var data = {
		nodes: ` + JSON.stringify(data.nodes) + `,
		edges: ` + JSON.stringify(data.edges) + `
	};
	
	network = new vis.Network(container, data, options);
	</script>
	</body>
	</html>
	
	`;
}
//# sourceMappingURL=WebviewCreator.js.map
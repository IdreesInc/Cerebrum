
var Node = function(ID, val) {
	this.id = ID;
	this.incomingConnections = [];
	this.outgoingConnections = [];
	if (val === undefined) {
		val = 0;
	}
	this.value = val;
	this.bias = 0;
};

var Connection = function(inID, outID, weight) {
	this.in = inID;
	this.out = outID;
	if (weight === undefined) {
		weight = 1;
	}
	this.weight = weight;
};

function Network() {
	this.nodes = {};
	this.inputs = [];
	this.hidden = [];
	this.outputs = [];
	this.connections = {};
	this.nodes.BIAS = new Node("BIAS", 1);
}

/**
 * Populates the network with the given number of nodes of each type.
 * @param  {Number} inputNum The number of input nodes to create.
 * @param  {Number} hiddenNum The number of hidden nodes to create.
 * @param  {Number} outputNum The number of output nodes to create.
 */
 Network.prototype.createNetwork = function createNetwork(inputNum, hiddenNum, outputNum) {
 	this.nodes = {};
 	this.inputs = [];
 	this.hidden = [];
 	this.outputs = [];
 	for (var i = 0; i < inputNum; i++) {
 		this.addInput("INPUT: " + i, 0);
 	}
 	for (var j = 0; j < hiddenNum; j++) {
 		this.addInput("HIDDEN: " + j);
 	}
 	for (var k = 0; k < outputNum; k++) {
 		this.addInput("OUTPUT: " + k);
 	}
 };

/**
 * @param {String} nodeID The ID to reference the node.
 * @param {Number} value The value to set the node to [Default is 0].
 */
 Network.prototype.addInput = function addInput(nodeID, value) {
 	if (value === undefined) {
 		value = 0;
 	}
 	this.nodes[nodeID] = new Node(nodeID, value);
 	this.inputs.push(nodeID);
 };

/**
 * Creates a hidden node.
 * @param {String} nodeID The ID to reference the node.
 */
 Network.prototype.addHidden = function addHidden(nodeID) {
 	this.nodes[nodeID] = new Node(nodeID);
 	this.hidden.push(nodeID);
 };

/**
 * Creates an output node.
 * @param {String} nodeID The ID to reference the node.
 */
 Network.prototype.addOutput = function addOutput(nodeID) {
 	this.nodes[nodeID] = new Node(nodeID);
 	this.outputs.push(nodeID);
 };

/**
 * @param  {String} nodeID The ID of the node to return.
 * @return {Node} The node with the given ID.
 */
 Network.prototype.getNode = function getNode(nodeID) {
 	return this.nodes[nodeID];
 };

/**
 * @param  {String} connectionID The ID of the connection to return.
 * @return {Connection} The connection with the given ID.
 */
 Network.prototype.getConnection = function getConnection(connectionID) {
 	return this.connection[connectionID];
 };

/**
 * Calculates the values of the nodes in the neural network.
 */
 Network.prototype.calculate = function calculate() {
 	this.updateNodeConnections();
 	for (var i = 0; i < this.hidden.length; i++) {
 		this.calculateNodeValue(this.hidden[i]);
 	}
 	for (var j = 0; j < this.outputs.length; j++) {
 		this.calculateNodeValue(this.outputs[j]);
 	}
 };

/**
 * Updates the node's to reference the current connections.
 */
 Network.prototype.updateNodeConnections = function updateNodeConnections() {
 	for (var nodeKey in this.nodes) {
 		this.nodes[nodeKey].incomingConnections = [];
 		this.nodes[nodeKey].outgoingConnections = [];
 	}
 	for (var connectionKey in this.connections) {
 		this.nodes[this.connections[connectionKey].in].outgoingConnections.push(connectionKey);
 		this.nodes[this.connections[connectionKey].out].incomingConnections.push(connectionKey);
 	}
 };

/**
 * Calculates and updates the value of the node with the given ID.
 * @param  {String} nodeId The ID of the node to update.
 */
 Network.prototype.calculateNodeValue = function calculateNodeValue(nodeID) {
 	var sum = 0;
 	for (var incomingIndex = 0; incomingIndex < this.nodes[nodeID].incomingConnections.length; incomingIndex++) {
 		var connection = this.connections[this.nodes[nodeID].incomingConnections[incomingIndex]];
 		sum += this.nodes[connection.in].value * connection.weight;
 	}
 	this.nodes[nodeID].value = sigmoid(sum);
 };

/**
 * Creates a connection with the given values.
 * @param {String} inID The ID of the node that the connection comes from. 
 * @param {String} outID The ID of the node that the connection enters.
 * @param {Number} weight The weight of the connection.
 */
 Network.prototype.addConnection = function addConnection(inID, outID, weight) {
 	if (weight === undefined) {
 		weight = 1;
 	}
 	this.connections[inID + ":" + outID] = new Connection(inID, outID);
 };

/**
 * Sets the value of the node with the given ID to the given value.
 * @param {String} nodeID The ID of the node to modify.
 * @param {Number} value The value to set the node to.
 */
 Network.prototype.setNodeValue = function setNodeValue(nodeID, value) {
 	this.nodes[nodeID].value = value;
 };

//Private static functions
function sigmoid(t) {
	return 1 / (1 + Math.exp(-t));
}

var Node = function (ID, val) {
	this.id = ID;
	this.incomingConnections = [];
	this.outgoingConnections = [];
	if (val === undefined) {
		val = 0;
	}
	this.value = val;
	this.bias = 0;
};

var Connection = function (inID, outID, weight) {
	this.in = inID;
	this.out = outID;
	if (weight === undefined) {
		weight = 1;
	}
	this.id = inID + ":" + outID;
	this.weight = weight;
};

function Network(config) {
	this.nodes = {};
	this.inputs = [];
	this.hidden = [];
	this.outputs = [];
	this.connections = {};
	this.nodes.BIAS = new Node("BIAS", 1);

	if (config !== undefined) {
		var inputNum = config.inputNodes || 0;
		var hiddenNum = config.hiddenNodes || 0;
		var outputNum = config.outputNodes || 0;
		this.createNodes(inputNum, hiddenNum, outputNum);

		if (config.createAllConnections) {
			this.createAllConnections(true);
		}
	}
}

/**
 * Populates the network with the given number of nodes of each type.
 * @param  {Number} inputNum The number of input nodes to create.
 * @param  {Number} hiddenNum The number of hidden nodes to create.
 * @param  {Number} outputNum The number of output nodes to create.
 */
 Network.prototype.createNodes = function (inputNum, hiddenNum, outputNum) {
 	for (var i = 0; i < inputNum; i++) {
 		this.addInput();
 	}
 	for (var j = 0; j < hiddenNum; j++) {
 		this.addHidden();
 	}
 	for (var k = 0; k < outputNum; k++) {
 		this.addOutput();
 	}
 };

/**
 * @param {Number} [value] The value to set the node to [Default is 0].
 */
 Network.prototype.addInput = function (value) {
 	var nodeID = "INPUT:" + this.inputs.length;
 	if (value === undefined) {
 		value = 0;
 	}
 	this.nodes[nodeID] = new Node(nodeID, value);
 	this.inputs.push(nodeID);
 };

/**
 * Creates a hidden node.
 */
 Network.prototype.addHidden = function () {
 	var nodeID = "HIDDEN:" + this.hidden.length;
 	this.nodes[nodeID] = new Node(nodeID);
 	this.hidden.push(nodeID);
 };

/**
 * Creates an output node.
 */
 Network.prototype.addOutput = function () {
 	var nodeID = "OUTPUT:" + this.outputs.length;
 	this.nodes[nodeID] = new Node(nodeID);
 	this.outputs.push(nodeID);
 };

/**
 * @param  {String} nodeID The ID of the node to return.
 * @return {Node} The node with the given ID.
 */
 Network.prototype.getNodeByID = function (nodeID) {
 	return this.nodes[nodeID];
 };

/**
 * Returns the node of the given type at the given index.
 * @param  {String} type  The type of node requested [Accepted arguments: "INPUT", "HIDDEN", "OUTPUT"].
 * @param  {Number} index The index of the node (from the array containing nodes of the requested type).
 * @return {Node} The node requested. Will return null if no node is found.
 */
 Network.prototype.getNode = function (type, index) {
 	if (type.toUpperCase() == "INPUT") {
 		return this.nodes[this.inputs[index]];
 	} else 	if (type.toUpperCase() == "HIDDEN") {
 		return this.nodes[this.hidden[index]];
 	} else 	if (type.toUpperCase() == "OUTPUT") {
 		return this.nodes[this.outputs[index]];
 	}
 	return null;
 };

/**
 * @param  {String} connectionID The ID of the connection to return.
 * @return {Connection} The connection with the given ID.
 */
 Network.prototype.getConnection = function (connectionID) {
 	return this.connections[connectionID];
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
 Network.prototype.updateNodeConnections = function () {
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
 Network.prototype.calculateNodeValue = function (nodeID) {
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
 * @param {Number} [weight] The weight of the connection [Default is 1].
 */
 Network.prototype.addConnection = function (inID, outID, weight) {
 	if (weight === undefined) {
 		weight = 1;
 	}
 	this.connections[inID + ":" + outID] = new Connection(inID, outID, weight);
 };

 /**
 * Creates all possible connections between nodes, including connections to the bias node.
 * @param  {Boolean} randomWeights Whether to choose a random weight between -1 and 1, or to default to 1.
 */
 Network.prototype.createAllConnections = function (randomWeights) {
 	if (randomWeights === undefined) {
 		randomWeights = false;
 	}
 	var weight = 1;
 	for (var i = 0; i < this.inputs.length; i++) {
 		for (var j = 0; j < this.hidden.length; j++) {
 			if (randomWeights) {
 				weight = Math.random() * 4 - 2;
 			}
 			this.addConnection(this.inputs[i], this.hidden[j], weight);
 		}
 	}
 	for (var k = 0; k < this.hidden.length; k++) {
 		for (var l = 0; l < this.outputs.length; l++) {
 			if (randomWeights) {
 				weight = Math.random() * 4 - 2;
 			}
 			this.addConnection(this.hidden[k], this.outputs[l], weight);
 		}
 		if (randomWeights) {
 			weight = Math.random() * 4 - 2;
 		}
 		this.addConnection("BIAS", this.hidden[k]);
 	}
 	for (var m = 0; m < this.outputs.length; m++) {
 		if (randomWeights) {
 			weight = Math.random() * 4 - 2;
 		}
 		this.addConnection("BIAS", this.outputs[m], weight);
 	}
 };

/**
 * Sets the value of the node with the given ID to the given value.
 * @param {String} nodeID The ID of the node to modify.
 * @param {Number} value The value to set the node to.
 */
 Network.prototype.setNodeValue = function (nodeID, value) {
 	this.nodes[nodeID].value = value;
 };


 Network.prototype.setInputs = function(array) {
 	for (var i = 0; i < array.length; i++) {
 		this.nodes[this.inputs[i]].value = array[i];
 	}
 };

/**
 * Sets the value of multiple nodes, given an object with node ID's as parameters and node values as values.
 * @param {Object} The values to set the nodes to.
 */
 Network.prototype.setMultipleNodeValues = function (valuesByID) {
 	for (var key in valuesByID) {
 		this.nodes[key].value = valuesByID[key];
 	}
 };

/**
 * Neural network that is optimized via backpropagation.
 * @type {Network}
 */
 BackpropNetwork.prototype = new Network();
 BackpropNetwork.prototype.constructor = BackpropNetwork;

 function BackpropNetwork(config) {
 	Network.call(this, config);
 	this.inputData = {};
 	this.targetData = {};
 	this.learningRate = 0.5;
 	this.iteration = 0;
 	this.totalErrorSum = 0;
 	this.averageError = [];

 	if (config !== undefined) {
 		if (config.learningRate !== undefined) {
 			this.learningRate = config.learningRate;
 		}
 		if (config.inputData !== undefined) {
 			this.setInputData(config.inputData);
 		}
 		if (config.targetData !== undefined) {
 			this.setTargetData(config.targetData);
 		}
 	}
 }

/**
 * Adds a target result to the target data. This will be compared to the output in order to determine error.
 * @param {String} outputNodeID The ID of the output node whose value will be compared to the target.
 * @param {Number} target The value to compare against the output when checking for errors.
 */
 BackpropNetwork.prototype.addTarget = function (outputNodeID, target) {
 	this.targetData[outputNodeID] = target;
 };

/**
 * Sets the input data that will be compared to the target data.
 * @param {Array} An array containing the data to be inputted (ex. [0, 1] will set the first input node
 * to have a value of 0 and the second to have a value of 1). Each array argument represents a single
 * iteration, and will be compared against the parallel set in the target data.
 */
 BackpropNetwork.prototype.setInputData = function () {
 	var all = arguments;
 	if (arguments.length == 1 && arguments[0].constructor == Array) {
 		all = arguments[0];
 	} 
 	this.inputData = {};
 	for (var i = 0; i < all.length; i++) {
 		var data = all[i];
 		var instance = {};
 		for (var j = 0; j < data.length; j++) {
 			instance["INPUT:" + j] = data[j]; 
 		}
 		this.inputData[i] = instance;
 	}
 };

/**
 * Sets the target data that will be used to check for total error.
 * @param {Array} An array containing the data to be compared against (ex. [0, 1] will compare the first
 * output node against 0 and the second against 1). Each array argument represents a single iteration.
 */
 BackpropNetwork.prototype.setTargetData = function () {
 	var all = arguments;
 	if (arguments.length == 1 && arguments[0].constructor == Array) {
 		all = arguments[0];
 	} 
 	this.targetData = {};
 	for (var i = 0; i < all.length; i++) {
 		var data = all[i];
 		var instance = {};
 		for (var j = 0; j < data.length; j++) {
 			instance["OUTPUT:" + j] = data[j]; 
 		}
 		this.targetData[i] = instance;
 	}
 };

/**
 * Calculates the total error of all the outputs' values compared to the target data.
 * @return {Number} The total error.
 */
 BackpropNetwork.prototype.getTotalError = function () {
 	var sum = 0;
 	for (var i = 0; i < this.outputs.length; i++) {
 		sum += Math.pow(this.targetData[this.iteration][this.outputs[i]] - this.nodes[this.outputs[i]].value, 2) / 2;
 	}
 	return sum;
 };

/**
 * Backpropagates the neural network, using the input and training data given.
 */
 BackpropNetwork.prototype.backpropagate = function () {
 	this.iteration++;
 	if (this.inputData[this.iteration] === undefined) {
 		this.averageError.push(this.totalErrorSum / this.iteration);
 		this.totalErrorSum = 0;
 		this.iteration = 0;
 	}
 	for (var inputKey in this.inputData[this.iteration]) {
 		this.nodes[inputKey].value = this.inputData[this.iteration][inputKey];
 	}
 	this.calculate();
 	var currentTargetData = this.targetData[this.iteration];
 	var totalError = this.getTotalError();
 	this.totalErrorSum += totalError;
 	var newWeights = {};
 	for (var i = 0; i < this.outputs.length; i++) {
 		var outputNode = this.nodes[this.outputs[i]];
 		for (var j = 0; j < outputNode.incomingConnections.length; j++) {
 			var hiddenToOutput = this.connections[outputNode.incomingConnections[j]];
 			var deltaRuleResult = -(currentTargetData[this.outputs[i]] - outputNode.value) * outputNode.value * (1 - outputNode.value) * this.nodes[hiddenToOutput.in].value;
 			newWeights[hiddenToOutput.id] = hiddenToOutput.weight - this.learningRate * deltaRuleResult;
 		}
 	}
 	for (var k = 0; k < this.hidden.length; k++) {
 		var hiddenNode = this.nodes[this.hidden[k]];
 		for (var l = 0; l < hiddenNode.incomingConnections.length; l++) {
 			var inputToHidden = this.connections[hiddenNode.incomingConnections[l]];
 			var total = 0;
 			for (var m = 0; m < hiddenNode.outgoingConnections.length; m++) {
 				var outgoing = this.connections[hiddenNode.outgoingConnections[m]];
 				var outgoingNode = this.nodes[outgoing.out];
 				total += ((-(currentTargetData[outgoing.out] - outgoingNode.value)) * (outgoingNode.value * (1 - outgoingNode.value))) * outgoing.weight;
 			}
 			var outOverNet = hiddenNode.value * (1 - hiddenNode.value);
 			var netOverWeight = this.nodes[inputToHidden.in].value;
 			var result = total * outOverNet * netOverWeight;
 			newWeights[inputToHidden.id] = inputToHidden.weight - this.learningRate * result;
 		}
 	}
 	for (var key in newWeights) {
 		this.connections[key].weight = newWeights[key];
 	}
 };

//Private static functions
function sigmoid(t) {
	return 1 / (1 + Math.exp(-t));
}

function log(text) {
	console.log(text);
}
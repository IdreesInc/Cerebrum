var Network = function () {
	//Global variables
	this.nodes = {};
	this.inputs = [];
	this.hidden = [];
	this.outputs = [];
	this.connections = {};

	//Inner classes
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

	//Add bias node
	this.nodes.BIAS = new Node("BIAS", 1);

	//Public functions
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

	Network.prototype.addInput = function addInput(nodeID, value) {
		this.nodes[nodeID] = new Node(nodeID, value);
		this.inputs.push(nodeID);
	};

	Network.prototype.addHidden = function addHidden(nodeID) {
		this.nodes[nodeID] = new Node(nodeID);
		this.hidden.push(nodeID);
	};

	Network.prototype.addOutput = function addOutput(nodeID) {
		this.nodes[nodeID] = new Node(nodeID);
		this.outputs.push(nodeID);
	};

	Network.prototype.getNode = function getNode(nodeID) {
		return this.nodes[nodeID];
	};

	Network.prototype.getConnection = function getConnection(connectionID) {
		return this.connection[connectionID];
	};

	Network.prototype.calculate = function calculate() {
		this.updateNodeConnections();
		for (var i = 0; i < this.hidden.length; i++) {
			this.calculateNodeValue(this.hidden[i]);
		}
		for (var j = 0; j < this.outputs.length; j++) {
			this.calculateNodeValue(this.outputs[j]);
		}
	};

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

	Network.prototype.calculateNodeValue = function calculateNodeValue(nodeID) {
		var sum = 0;
		for (var incomingIndex = 0; incomingIndex < this.nodes[nodeID].incomingConnections.length; incomingIndex++) {
			var connection = this.connections[this.nodes[nodeID].incomingConnections[incomingIndex]];
			sum += this.nodes[connection.in].value * connection.weight;
		}
		this.nodes[nodeID].value = sigmoid(sum);
	};

	Network.prototype.addConnection = function addConnection(inID, outID, weight) {
		if (weight === undefined) {
			weight = 1;
		}
		this.connections[inID + ":" + outID] = new Connection(inID, outID);
	};

	Network.prototype.setNodeValue = function setNodeValue(nodeID, value) {
		this.nodes[nodeID].value = value;
	};

	//Private static functions
	function sigmoid(t) {
		return 1 / (1 + Math.exp(-t));
	}
};
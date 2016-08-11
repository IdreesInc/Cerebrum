[header]
# Cerebrum.js
Give your applications a mind of their own with the power of deep learning algorithms.

## Features
  - Create multilayer neural networks with a single hidden layer
  - Use backpropagation or neuroevolution to train the networks
  - Simple and easy to use syntax
  - No external dependencies

### Examples
#### Example 1: Backpropagation:
Lets try out Cerebrum.js by creating a simple XOR test case that we will train using backpropagation.

First, you will want to reference the library:
```html
<script src="cerebrum.js"></script>
```
Then, you wil create a backpropagating network and configure it to best match the problem at hand:
```js
var network = new BackpropNetwork({				
				inputNodes: 2,
				hiddenNodes: 3,
				outputNodes: 1,
				createAllConnections: true, //Whether to initialize the network with all the possible connections (alternatively, you create the connections manually)
				inputData: [[1, 0], [0, 1], [0, 0], [1, 1]], //The data to set the input nodes to on each instance. Alternatively, you can set the input node values manually.
				targetData: [[1], [1], [0], [0]], //The expected values for the output nodes. Will be used to train the network
				learningRate: 0.5 //The rate at which the propagation occurs. Higher values = faster learning, but also make the learning more inaccurate.
			});;
```
Now, you want to train your network. Lets backpropagate this network 500 times:
```js
for (var i = 0; i < 500; i++) {
    network.backpropagate();
}
```
Great, now your network is trained! To test it, lets set the input nodes to a certain test case:
```js
network.setInputs([1, 0]);
network.calculate(); //Calculate the values for each node
console.log(network.getNode("OUTPUT", 0)); //Should print something close to "1" (depending on how well the network trained, this value should vary from 1 by a very small amount)
```

#### Example 2: Neuroevolution
Backpropagation is all fun and good, but sometimes there are cases where you prefer to evolve a network instead (such as when you don't know what the topography of the network will end up like). This is where neuroevolution comes in! Neuroevolution in Cerebrum is based on the N.E.A.T. algorithm, so features such as speciation and innovation are built in!

First off, reference the library:
```html
<script src="cerebrum.js"></script>
```
Then, create a variable in javascript such as the one below:
```js
neuroevolution = new Neuroevolution({				
	inputNodes: 2,
	outputNodes: 1,
	hiddenNodeCap: 3, //The max amount of hidden nodes that can be created
	populationSize: 100 //The number of genomes create and evolve in each generation
});
```
Neuroevolution works by creating a population of genomes that represent networks. These genomes evolve, mutate, and breed in order to create networks with new innovations. But in order to determine which genomes should breed and which should die in each generation, each genome's "fitness" needs to be determined so that they can be compared against other genomes. That's where the fitness function comes in:

```js
var inputData = [[1, 0], [0, 1], [0, 0], [1, 1]];
var targetData = [[1], [1], [0], [0]];

neuroevolution.fitnessFunction = function (network) { //This function is used by Cerebrum to determine the fitness of each genome. Alternatively, the fitness can be set manually for each genome before the population evolves.
	var fitness = 0;
	for (var j = 0; j < inputData.length; j++) {
		network.setInputs(inputData[j]);
		network.calculate();
		fitness += 1 - Math.pow(Math.abs(network.getNode("OUTPUT", 0).value - targetData[j][0]),  2); //This equation will set the fitness for each genome by comparing how close the genome's network's output is to the target data, when the genome's network is fed the input data. The squaring function is used to disproportionally punish genomes that produce outputs that extremely vary from the target data.
	}
	return fitness / inputData.length;
};
neuroevolution.createInitialPopulation(); //Create the initial, random population of genomes
```
Great, now let's evolve our population about 750 times!
```js
for (var i = 0; i < 750; i++) {
	neuroevolution.calculateFitnesses();
	neuroevolution.evolve();
}
```
Now that we have evolved the population of genomes, let's see the results by creating a test case!
```js
var network = neuroevolution.getElite().getNetwork(); //Get the best genome from the population, and get the network it represents
network.setInputs(inputData[0]); //Feed the network the first test case's values
network.calculate(); //Calculate the values for each node
console.log(network.getNode("OUTPUT", 0)); //Should print something close to "1" (depending on how well the network trained, this value should vary from 1 by a very small amount)
```
[/header]

[examples]
[Network]
```js
var network = new Network({
	inputNodes: 1, //The number of input nodes to create
	hiddenNodes: 1, //The number of hidden nodes to create
	outputNodes: 1, //The number of output nodes to create
	createAllConnections: true //Whether to create all possible connections
});
```
[/Network]

[BackpropNetwork]
```js
var network = new BackpropNetwork({
	inputNodes: 2, //The number of input nodes to create
	hiddenNodes: 3, //The number of hidden nodes to create
	outputNodes: 1, //The number of output nodes to create
	createAllConnections: true, //Whether to create all possible connections
	inputData: [[1, 0], [0, 1], [0, 0], [1, 1]], //The values to set the input nodes to when training. Each array corresponds to the array at the same index in the target data.
	targetData: [[1], [1], [0], [0]], //The values to expect from the output nodes when training
	learningRate: 0.5 //The rate at which to update the connection weights
});
```
[/BackpropNetwork]

[Neuroevolution]
```js
var neuroevolution = new Neuroevolution({
	inputNodes: 2, //The number of input nodes to create
	outputNodes: 1, //The number of output nodes to create
	hiddenNodeCap: 3, //The maximum number of hidden nodes to create through mutation
	populationSize: 100, //The number of individuals to create
	deltaDisjoint: 2, //The weight of disjoint genes when determining the distance between genomes
	deltaWeights: 0.4, //The weight of weight differences when determining the distance between genomes
	deltaThreshold: 2, //The difference between genomes required for the genomes to be classified as being of different species
	mutationRates: { //The probability that a given mutation occurs when evolving a genome (Note: Some mutation probabilities are calculated per gene, rather than per genome)
		createConnection: 0.05, //The probability of a new connection to be created
 		createNode: 0.02, //The probability of a new node being created (by splitting a connection and placing a node in between it)
 		modifyWeight: 0.15, //The probability of modifying a connection's weight
 		enableGene: 0.05, //The probability of enabling a disabled gene
 		disableGene: 0.1, //The probability of disabling an enabled gene
 		createBias: 0.1, //The probability of creating a connection from a node to the bias node
 		weightMutationStep: 2 //The maximum amount that a modifyWeight mutation will modify the weight of a connection
 	}
});
```
[/Neuroevolution]

[NetworkVisualizer]
```js
var visualizer = new NetworkVisualizer({
 	this.canvas = "NetworkVisualizer", //The id of the canvas element to draw the visualizer on
 	this.backgroundColor = "#FFFFFF", //The background color of the visualizer
 	this.nodeRadius = -1, //The node radius [If left at -1, the node radius will be calculated automatically to best fit the dimensions of the visualizer (this is recommended)]
 	this.nodeColor = "grey", //The color of the node (Note: transparency will vary depending on the node's value)
 	this.positiveConnectionColor = "green", //The color to represent a positive connection
 	this.negativeConnectionColor = "red", //The color to represent a negative connection
 	this.connectionStrokeModifier = 1 //The maximum stroke to draw the connection line with (Note: stroke varies based on connection weight)
});
visualizer.drawNetwork(network); //Draws the given network
```
[/NetworkVisualizer]

[setInputs]
```js
var network = new Network({
	inputNodes: 3
});
network.setInputs([0.25, 0.5, 0.75]); //Set the three input node values to 0.25, 0.5, and 0.75
```
[/setInputs]
[/examples]
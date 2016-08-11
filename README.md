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

Reference the library:
```html
<script src="cerebrum.js"></script>
```
Then, create a variable in javascript such as the one below:
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
***
## Quicklinks
 -  [Node](#Node)
 -  [Connection](#Connection)
 -  [Network](#Network)
    - [createNodes](#createNodes)
    - [addInput](#addInput)
    - [addHidden](#addHidden)
    - [addOutput](#addOutput)
    - [getNodeByID](#getNodeByID)
    - [getNode](#getNode)
    - [getConnection](#getConnection)
    - [calculate](#calculate)
    - [updateNodeConnections](#updateNodeConnections)
    - [calculateNodeValue](#calculateNodeValue)
    - [addConnection](#addConnection)
    - [createAllConnections](#createAllConnections)
    - [setNodeValue](#setNodeValue)
    - [setMultipleNodeValues](#setMultipleNodeValues)
 -  [NetworkVisualizer](#NetworkVisualizer)
    - [drawNetwork](#drawNetwork)
 -  [BackpropNetwork](#BackpropNetwork)
    - [backpropagate](#backpropagate)
    - [addTarget](#addTarget)
    - [setInputData](#setInputData)
    - [setTargetData](#setTargetData)
    - [getTotalError](#getTotalError)
 -  [Gene](#Gene)
    - [getConnection](#getConnection)
 -  [Genome](#Genome)
    - [getNetwork](#getNetwork)
 -  [Species](#Species)
    - [cull](#cull)
    - [calculateAverageFitness](#calculateAverageFitness)
 -  [Neuroevolution](#Neuroevolution)
    - [createInitialPopulation](#createInitialPopulation)
    - [mutate](#mutate)
    - [linkMutate](#linkMutate)
    - [pointMutate](#pointMutate)
    - [crossover](#crossover)
    - [evolve](#evolve)
    - [speciate](#speciate)
    - [cullSpecies](#cullSpecies)
    - [calculateSpeciesAvgFitness](#calculateSpeciesAvgFitness)
    - [makeBaby](#makeBaby)
    - [calculateFitnesses](#calculateFitnesses)
    - [getCompatibility](#getCompatibility)
    - [isSameSpecies](#isSameSpecies)
    - [getElite](#getElite)
***

<a name="Node"></a>
### Node
A node, representing a biological neuron.

| Parameter Name | Type | Description |
| --- | --- | --- |
| ID | `Number` | The ID of the node.|
| val | `Number` | The value of the node.|
***

<a name="Connection"></a>
### Connection
A connection, representing a biological synapse.

| Parameter Name | Type | Description |
| --- | --- | --- |
| inID | `String` | The ID of the incoming node.|
| outID | `String` | The ID of the outgoing node.|
| weight | `Number` | The weight of the connection.|
***

<a name="Network"></a>
### Network
The neural network, containing nodes and connections.

| Parameter Name | Type | Description |
| --- | --- | --- |
| config | `Object` | The configuration to use.|
***
<a name="createNodes"></a>
> ### createNodes(*inputNum, hiddenNum, outputNum*)
Populates the network with the given number of nodes of each type.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | inputNum | `Number` | The number of input nodes to create.|
 > | hiddenNum | `Number` | The number of hidden nodes to create.|
 > | outputNum | `Number` | The number of output nodes to create.|
***
<a name="addInput"></a>
> ### addInput(*[value]*)


 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | [value] | `Number` | The value to set the node to [Default is 0].|
***
<a name="addHidden"></a>
> ### addHidden()
Creates a hidden node.
***
<a name="addOutput"></a>
> ### addOutput()
Creates an output node.
***
<a name="getNodeByID"></a>
> ### getNodeByID(*nodeID*)


 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | nodeID | `String` | The ID of the node to return.|
***Returned*** : 
`Node` - The node with the given ID.
***
<a name="getNode"></a>
> ### getNode(*type, index*)
Returns the node of the given type at the given index.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | type | `String` | The type of node requested [Accepted arguments: "INPUT", "HIDDEN", "OUTPUT"].|
 > | index | `Number` | The index of the node (from the array containing nodes of the requested type).|
***Returned*** : 
`Node` - The node requested. Will return null if no node is found.
***
<a name="getConnection"></a>
> ### getConnection(*connectionID*)


 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | connectionID | `String` | The ID of the connection to return.|
***Returned*** : 
`Connection` - The connection with the given ID.
***
<a name="calculate"></a>
> ### calculate()
Calculates the values of the nodes in the neural network.
***
<a name="updateNodeConnections"></a>
> ### updateNodeConnections()
Updates the node's to reference the current connections.
***
<a name="calculateNodeValue"></a>
> ### calculateNodeValue(*nodeId*)
Calculates and updates the value of the node with the given ID.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | nodeId | `String` | The ID of the node to update.|
***
<a name="addConnection"></a>
> ### addConnection(*inID, outID, [weight]*)
Creates a connection with the given values.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | inID | `String` | The ID of the node that the connection comes from.|
 > | outID | `String` | The ID of the node that the connection enters.|
 > | [weight] | `Number` | The weight of the connection [Default is 1].|
***
<a name="createAllConnections"></a>
> ### createAllConnections(*randomWeights*)
Creates all possible connections between nodes, not including connections to the bias node.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | randomWeights | `Boolean` | Whether to choose a random weight between -1 and 1, or to default to 1.|
***
<a name="setNodeValue"></a>
> ### setNodeValue(*nodeID, value*)
Sets the value of the node with the given ID to the given value.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | nodeID | `String` | The ID of the node to modify.|
 > | value | `Number` | The value to set the node to.|
***
<a name="setMultipleNodeValues"></a>
> ### setMultipleNodeValues(*valuesByID*)
Sets the value of multiple nodes, given an object with node ID's as parameters and node values as values.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | valuesByID | `Object` | The values to set the nodes to.|
***

<a name="NetworkVisualizer"></a>
### NetworkVisualizer
Used to visualize a neural network.

| Parameter Name | Type | Description |
| --- | --- | --- |
| config | `Object` | The configuration to use.|
***
<a name="drawNetwork"></a>
> ### drawNetwork(*network*)
Draws the visualized network upon the canvas.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | network | `Network` | The network to visualize.|
***

<a name="BackpropNetwork"></a>
### BackpropNetwork
Neural network that is optimized via backpropagation.

| Parameter Name | Type | Description |
| --- | --- | --- |
| config | `Object` | The configuration to use.|
***
<a name="backpropagate"></a>
> ### backpropagate()
Backpropagates the neural network, using the input and training data given.
***
<a name="addTarget"></a>
> ### addTarget(*outputNodeID, target*)
Adds a target result to the target data. This will be compared to the output in order to determine error.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | outputNodeID | `String` | The ID of the output node whose value will be compared to the target.|
 > | target | `Number` | The value to compare against the output when checking for errors.|
***
<a name="setInputData"></a>
> ### setInputData(*array*)
Sets the input data that will be compared to the target data.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | array | `Array` | An array containing the data to be inputted (ex. [0, 1] will set the first input node|
***
<a name="setTargetData"></a>
> ### setTargetData(*array*)
Sets the target data that will be used to check for total error.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | array | `Array` | An array containing the data to be compared against (ex. [0, 1] will compare the first|
***
<a name="getTotalError"></a>
> ### getTotalError()
Calculates the total error of all the outputs' values compared to the target data.
***Returned*** : 
`Number` - The total error.
***

<a name="Gene"></a>
### Gene
A gene containing the data for a single connection in the neural network.

| Parameter Name | Type | Description |
| --- | --- | --- |
| inID | `String` | The ID of the incoming node.|
| outID | `String` | The ID of the outgoing node.|
| weight | `Number` | The weight of the connection to create.|
| innovation | `Number` | The innovation number of the gene.|
| enabled | `Boolean` | Whether the gene is expressed or not.|
***
<a name="getConnection"></a>
> ### getConnection()
Returns the connection that the gene represents.
***Returned*** : 
`Connection` - The generated connection.
***

<a name="Genome"></a>
### Genome
A genome containing genes that will make up the neural network.

| Parameter Name | Type | Description |
| --- | --- | --- |
| inputNodes | `Number` | The number of input nodes to create.|
| outputNodes | `Number` | The number of output nodes to create.|
***
<a name="getNetwork"></a>
> ### getNetwork()
Returns the network that the genome represents.
***Returned*** : 
`Network` - The generated network.
***

<a name="Species"></a>
### Species
A species of genomes that contains genomes which closely resemble one another, enough so that they are able to breed.
***
<a name="cull"></a>
> ### cull(*[remaining]*)
Culls the genomes to the given amount by removing less fit genomes.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | [remaining] | `Number` | The number of genomes to cull to [Default is half the size of the species (rounded up)].|
***
<a name="calculateAverageFitness"></a>
> ### calculateAverageFitness()
Calculates the average fitness of the species.
***

<a name="Neuroevolution"></a>
### Neuroevolution
Creates and optimizes neural networks via neuroevolution.

| Parameter Name | Type | Description |
| --- | --- | --- |
| config | `Object` | The configuration to use.|
***
<a name="createInitialPopulation"></a>
> ### createInitialPopulation()
Populates the population with empty genomes, and then mutates the genomes.
***
<a name="mutate"></a>
> ### mutate()
Mutates the entire population based on the mutation rates.
***
<a name="linkMutate"></a>
> ### linkMutate(*genome*)
Attempts to create a new connection gene in the given genome.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | genome | `Genome` | The genome to mutate.|
***Returned*** : 
`Genome` - The mutated genome.
***
<a name="pointMutate"></a>
> ### pointMutate(*gene*)
Mutates the given gene based on the mutation rates.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | gene | `Gene` | The gene to mutate.|
***Returned*** : 
`Gene` - The mutated gene.
***
<a name="crossover"></a>
> ### crossover(*firstGenome, secondGenome*)
Crosses two parent genomes with one another, forming a child genome.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | firstGenome | `Genome` | The first genome to mate.|
 > | secondGenome | `Genome` | The second genome to mate.|
***Returned*** : 
`Genome` - The resultant child genome.
***
<a name="evolve"></a>
> ### evolve()
Evolves the population by creating a new generation and mutating the children.
***
<a name="speciate"></a>
> ### speciate()
Sorts the genomes into different species.
***
<a name="cullSpecies"></a>
> ### cullSpecies(*[remaining]*)
Culls all the species to the given amount by removing less fit members of each species.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | [remaining] | `Number` | The number of genomes to cull all the species to [Default is half the size of the species].|
***
<a name="calculateSpeciesAvgFitness"></a>
> ### calculateSpeciesAvgFitness()
Calculates the average fitness of all the species.
***
<a name="makeBaby"></a>
> ### makeBaby(*species*)
Creates a baby in the given species, with fitter genomes having a higher chance to reproduce.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | species | `Species` | The species to create a baby in.|
***Returned*** : 
`Genome` - The resultant baby.
***
<a name="calculateFitnesses"></a>
> ### calculateFitnesses()
Calculates the fitness of all the genomes in the population.
***
<a name="getCompatibility"></a>
> ### getCompatibility(*genomeA, genomeB*)
Returns the relative compatibility metric for the given genomes.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | genomeA | `Genome` | The first genome to compare.|
 > | genomeB | `Genome` | The second genome to compare.|
***Returned*** : 
`Number` - The relative compatibility metric.
***
<a name="isSameSpecies"></a>
> ### isSameSpecies(*genomeA, genomeB*)
Determines whether the given genomes are from the same species.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | genomeA | `Genome` | The first genome to compare.|
 > | genomeB | `Genome` | The second genome to compare.|
***Returned*** : 
`Boolean` - Whether the given genomes are from the same species.
***
<a name="getElite"></a>
> ### getElite()
Returns the genome with the highest fitness in the population.
***Returned*** : 
`Genome` - The elite genome.
***



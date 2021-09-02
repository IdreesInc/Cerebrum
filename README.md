# Cerebrum.js
Give your applications a mind of their own with the power of deep learning algorithms.

## Features
  - Create multilayer neural networks with a single hidden layer
  - Use backpropagation or neuroevolution to train the networks
  - Simple and easy to use syntax
  - No external dependencies
  
 ### Important Note
 This project was created more as a learning experience than anything, and I would recommend others to use machine learning libraries that have greater community support and more technologies implemented. Some notable examples include [Synaptic.js](http://caza.la/synaptic/#/) and of course TensorFlow. Whatever you decide to do, good luck and happy coding!

To check out more of my projects, click [here](https://idreesinc.com?utm_source=github&utm_medium=readme&utm_campaign=cerebrum)

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
    - [setInputs](#setInputs)
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
***Example Usage: *** 
```js
var network = new Network({
    inputNodes: 1, //The number of input nodes to create
    hiddenNodes: 1, //The number of hidden nodes to create
    outputNodes: 1, //The number of output nodes to create
    createAllConnections: true //Whether to create all possible connections
});
```
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
Returns the node with the given ID.

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
Returns the connection with the given ID.

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
Calculates and updates the value of the node with the given ID. Node values are computed using a sigmoid function.

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
<a name="setInputs"></a>
> ### setInputs(*array*)
Sets the values of the input neurons to the given values.

 > | Parameter Name | Type | Description |
| --- | --- | --- |
 > | array | `Array` | An array of values to set the input node values to.|
***Example Usage: *** 
```js
var network = new Network({
    inputNodes: 3
});
network.setInputs([0.25, 0.5, 0.75]); //Set the three input node values to 0.25, 0.5, and 0.75
```
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
A visualization of the neural network, showing all connections and nodes.

| Parameter Name | Type | Description |
| --- | --- | --- |
| config | `Object` | The configuration to use.|
***Example Usage: *** 
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
***Example Usage: *** 
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
***
<a name="backpropagate"></a>
> ### backpropagate()
Backpropagates the neural network, using the input and training data given. Currently does not affect connections to the bias node.
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
Creates and optimizes neural networks via neuroevolution, using the Neuroevolution of Augmenting Topologies method.

| Parameter Name | Type | Description |
| --- | --- | --- |
| config | `Object` | The configuration to use.|
***Example Usage: *** 
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

# Flow
### A node-based programming language engine in JavaScript, geared towards stability, useability and portability.
Flow itself is stored as a static webpage, which you can fork and customise to your liking. (Just don't remove the terms and conditions popup without reading it first).
To use it offline, download the repo as a .zip, extract it, and open `flow.html`.

If you want to use this, I encourage you to read the code. This helps learn a lot more than the tutorial in README.md.

## Changing CSS
All styles a held in the [styles.css file](css/style.css). This includes the classes for the nodes, canvas and even buttons.

## Adding nodes
<ol>
<li>First, create a new .js file in the `scripts/input/` folder. Name it anything you like.</li>
<li>To add nodes, you must call the `addNode()` function in the script. Examples below:</li>
<details>
<summary>Value node (addition, subtraction, etc)</summary>

```javascript
addNode("addition", {
    alias: ["Add", "addition", "+", "plus"], //Aliases for the node. When searching for nodes in the toolbar, it searches through aliases too. Eg: division, divide, /, div
    title: "Add", //Title for the node. Defaults to first entry in alias
    renameable: false, //Can the title of the node be renamed in editor
    inputs: ["A", "B"], //The node's inputs
    outputs: ["sum"], //The node's outputs
    func: function (a, b) {

        return [parseFloat(a) + parseFloat(b)]; //Return an array, with the array corresponding to outputs.

    }, //The node's behaviour. If you want to interact with the node's div element, use the this keyword
    color: "darkred", //The CSS color of the node's title. I personally find that dark___ colors work quite well. Defaults to 'darkcyan'.
    doc: "Adds A and B together", //The documentation for this node. Can be accessed by opening the documentation page by clicking the '?' button.
});
```
</details>
<details>
<summary>Logic node (wait, alert, etc)</summary>

```javascript
addNode("wait", {
    command: true, //Is the node a command node (Does it have an execution flow),
    hat: false, //Is the node a hat node (Does it start command nodes when triggered) [needs `command: true`]
    alias: ["wait", "sleep"], //Aliases for the node. When searching for nodes in the toolbar, it searches through aliases too. Eg: division, divide, /, div
    title: "Wait n seconds", //Title for the node. Defaults to first entry in alias
    renameable: false, //Can the title of the node be renamed in editor
    inputs: ["n"], //The node's inputs
    outputs: ["⏩"], //The node's outputs. To add output executionary branches, add entries that contain the ⏩ text character. If an invalid entry is detected, 'outputs' is ignored.
    func: function (n) {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{

                resolve([0]); //Resolve with an array of branches to run, in order.

            }, parseFloat(n) * 1000)
        });
    }, //The node's behaviour. If you want to interact with the node's div element, use the this keyword
    color: "darkcyan", //The CSS color of the node's title. I personally find that dark___ colors work quite well. Defaults to 'darkcyan'.
    doc: "Waits for n seconds.", //The documentation for this node. Can be accessed by opening the documentation page by clicking the '?' button.
});
```
</details>
<details>
<summary>Logic node (if, sequence, branch, etc)</summary>

```javascript
addNode("ifelse", {
    command: true, //Is the node a command node (Does it have an execution flow),
    hat: false, //Is the node a hat node (Does it start command nodes when triggered) [needs `command: true`]
    alias: ["if then else", "otherwise"], //Aliases for the node. When searching for nodes in the toolbar, it searches through aliases too. Eg: division, divide, /, div
    title: "If Else", //Title for the node. Defaults to first entry in alias
    renameable: false, //Can the title of the node be renamed in editor
    inputs: ["x"], //The node's inputs
    outputs: ["⏩A", "⏩B"], //The node's outputs. To add output executionary branches, add entries that contain the ⏩ text character. If an invalid entry is detected, 'outputs' is ignored.
    func: function (x) {
        return new Promise((resolve, reject)=>{
            if (Boolean.valueOf(x) === true) {
                resolve([0]);
            } else {
                resolve([1]);
            }
        });
    }, //The node's behaviour. If you want to interact with the node's div element, use the this keyword
    color: "darkcyan", //The CSS color of the node's title. I personally find that dark___ colors work quite well. Defaults to 'darkcyan'.
    doc: "If x is true, runs A. Otherwise, runs B.", //The documentation for this node. Can be accessed by opening the documentation page by clicking the '?' button.
});
```
</details>
<details>
<summary>Hat node (start, tick, when blah, etc)</summary>

```javascript
addNode("a_key_event", {
    command: true, //Is the node a command node (Does it have an execution flow),
    hat: true, //Is the node a hat node (Does it start command nodes when triggered) [needs `command: true`]
    alias: ["When A key pressed"], //Aliases for the node. When searching for nodes in the toolbar, it searches through aliases too. Eg: division, divide, /, div
    renameable: false, //Can the title of the node be renamed in editor
    func: function (x) {
        return new Promise((resolve, reject)=>{
            resolve([0]);
        });
    }, //The node's behaviour. If you want to interact with the node's div element, use the this keyword
    color: "darkcyan", //The CSS color of the node's title. I personally find that dark___ colors work quite well. Defaults to 'darkcyan'.
    doc: "Starts whenever the A key is pressed.", //The documentation for this node. Can be accessed by opening the documentation page by clicking the '?' button.
});
window.addEventListener("keydown", (e)=>{
    if (e.key.toLowerCase() === "a") {
        startHats("a_key_event");
    }
})
```
</details>

<li>Link the script in flow.html, where the comment indicates. (near the bottom of the file.)</li>
</ol>

## Running code
This is actually quite simple:
Just find the node element (has the `node` class), and run either `getValue()` or `exec()` on it, depending on whether it's a command/hat node or a value node.
Eg:
```javascript
var node = document.querySelector(".node");
node.getValue(); //Returns an array of outputs

//OR, if it is a command node:

node.exec(); //Will start running the execution flow from this node.
```

This, by nature, is far slower than if the nodes are first compiled in to an abstract graph before usage.

## Serialising, deserialising and exporting code.
Flow has built in functions for serialising, deserialising and exporting graphs made in the editor.


Run `serialise()` to serialise on-screen nodes. (Returns an object representing the workspace).
Run `deserialise(serialised)` to load the serialised object.




Run `compileGraph(nodeElement, false)` to generate an abstract graph that can be used to run and evaluate the nodes much faster.
Eg:
```javascript
var node = document.querySelector(".node");
var graph = compileGraph(node, false);

graph.getValue(); //Returns an array of outputs

//OR, if it is a command node:

graph.exec(); //Will start running the execution flow from this node.
```
To disable interaction with the node elements in `compileGraph`, simply pass `true` as the second argument.



Run `stringifyGraph(graph)` to stringify a graph.

Run `translateGraph(graph, "nameOfFunction")` to further optimise a graph and stringify it into a single function. (does not support command/hat nodes);
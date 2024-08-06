addNode("proc/f1", {
    alias: ["Scalar Function", "fv1", "procedure", "function", "subroutine"],
    inputs: ["x"],
    func: function (out1) {
        window.callStack[this.querySelector("span.header").innerText].pop();
        return [out1];
    },
    color: "darkpurple",
    renameable: true,
    doc: "Function that returns a scalar value.",
    outputs: [],
    command: false,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/arg1", {
    alias: ["Scalar Function Argument", "arg1", "argument", "input"],
    inputs: ["Parent Function Name"],
    func: function (argName) {
        var args = (window.callStack || {})[argName] || [[0]];
        return args[args.length - 1];
    },
    color: "darkpurple",
    doc: "Argument node for use in a scalar function",
    outputs: ["x"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/call1", {
    alias: ["Scalar Function Call", "fc1", "procedure", "function", "subroutine"],
    inputs: ["Function Name", "x"],
    func: function (fname, in1) {
        var op = (window.fnMap || {})[fname] || ({calculate: ()=>{[0,0,0,0]}});
        if (!window.callStack[fname]) {
            window.callStack[fname] = [];
        }
        if (window.callStack[fname].length > 50) {
            window.callStack[fname] = [];
            alert("Function call stack too large!");
        }
        window.callStack[fname].push([in1]);
        return op.calculate();
    },
    color: "darkpurple",
    doc: "Call to a function that returns a scalar value",
    outputs: ["x"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});

//Vector2 Functions
addNode("proc/f2", {
    alias: ["Vector 2 Function", "fv2", "procedure", "function", "subroutine"],
    inputs: ["x", "y"],
    func: function (out1, out2) {
        window.callStack[this.querySelector("span.header").innerText].pop();
        return [out1, out2];
    },
    color: "darkpurple",
    renameable: true,
    doc: "Function that returns a vector 2 value.",
    outputs: [],
    command: false,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/arg2", {
    alias: ["Vector 2 Function Argument", "arg2", "argument", "input"],
    inputs: ["Parent Function Name"],
    func: function (argName) {
        var args = (window.callStack || {})[argName] || [[0]];
        return args[args.length - 1];
    },
    color: "darkpurple",
    doc: "Argument node for use in a vector 2 function",
    outputs: ["x", "y"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/call2", {
    alias: ["Vector 2 Function Call", "fc2", "procedure", "function", "subroutine"],
    inputs: ["Function Name", "x", "y"],
    func: function (fname, in1, in2) {
        var op = (window.fnMap || {})[fname] || ({calculate: ()=>{[0,0,0,0]}});
        if (!window.callStack[fname]) {
            window.callStack[fname] = [];
        }
        if (window.callStack[fname].length > 50) {
            window.callStack[fname] = [];
            alert("Function call stack too large!");
        }
        window.callStack[fname].push([in1, in2]);
        return op.calculate();
    },
    color: "darkpurple",
    doc: "Call to a function that returns a vector 2 value",
    outputs: ["x", "y"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});

//Vector3 Functions
addNode("proc/f3", {
    alias: ["Vector 3 Function", "fv3", "procedure", "function", "subroutine"],
    inputs: ["x", "y", "z"],
    func: function (out1, out2, out3) {
        window.callStack[this.querySelector("span.header").innerText].pop();
        return [out1, out2, out3];
    },
    color: "darkpurple",
    renameable: true,
    doc: "Function that returns a vector 3 value.",
    outputs: [],
    command: false,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/arg3", {
    alias: ["Vector 3 Function Argument", "arg3", "argument", "input"],
    inputs: ["Parent Function Name"],
    func: function (argName) {
        var args = (window.callStack || {})[argName] || [[0]];
        return args[args.length - 1];
    },
    color: "darkpurple",
    doc: "Argument node for use in a vector 3 function",
    outputs: ["x", "y", "z"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/call3", {
    alias: ["Vector 3 Function Call", "fc3", "procedure", "function", "subroutine"],
    inputs: ["Function Name", "x", "y", "z"],
    func: function (fname, in1, in2, in3) {
        var op = (window.fnMap || {})[fname] || ({calculate: ()=>{[0,0,0,0]}});
        if (!window.callStack[fname]) {
            window.callStack[fname] = [];
        }
        if (window.callStack[fname].length > 50) {
            window.callStack[fname] = [];
            alert("Function call stack too large!");
        }
        window.callStack[fname].push([in1, in2, in3]);
        return op.calculate();
    },
    color: "darkpurple",
    doc: "Call to a function that returns a vector 3 value",
    outputs: ["x", "y", "z"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});

//Vector4 Functions
addNode("proc/f4", {
    alias: ["Vector 4 Function", "fv4", "procedure", "function", "subroutine"],
    inputs: ["x", "y", "z", "w"],
    func: function (out1, out2, out3, out4) {
        window.callStack[this.querySelector("span.header").innerText].pop();
        return [out1, out2, out3, out4];
    },
    color: "darkpurple",
    renameable: true,
    doc: "Function that returns a vector 4 value.",
    outputs: [],
    command: false,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/arg4", {
    alias: ["Vector 4 Function Argument", "arg4", "argument", "input"],
    inputs: ["Parent Function Name"],
    func: function (argName) {
        var args = (window.callStack || {})[argName] || [[0]];
        return args[args.length - 1];
    },
    color: "darkpurple",
    doc: "Argument node for use in a vector 4 function",
    outputs: ["x", "y", "z", "w"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});
addNode("proc/call4", {
    alias: ["Vector 4 Function Call", "fc4", "procedure", "function", "subroutine"],
    inputs: ["Function Name", "x", "y", "z", "w"],
    func: function (fname, in1, in2, in3, in4) {
        var op = (window.fnMap || {})[fname] || ({calculate: ()=>{[0,0,0,0]}});
        if (!window.callStack[fname]) {
            window.callStack[fname] = [];
        }
        if (window.callStack[fname].length > 50) {
            window.callStack[fname] = [];
            alert("Function call stack too large!");
        }
        window.callStack[fname].push([in1, in2, in3, in4]);
        return op.calculate();
    },
    color: "darkpurple",
    doc: "Call to a function that returns a vector 2 value",
    outputs: ["x", "y", "z", "w"],
    command: false,
    renameable: true,
    usespkg: ["libs/fnmap.js"]
});
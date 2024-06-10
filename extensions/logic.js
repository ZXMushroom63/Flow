addNode("start", {
    alias: ["Start", "Experimental"],
    inputs: [],
    func: () => {
        return new Promise((resolve, reject) => {
            resolve([0]);
        });
    },
    color: "darkcyan",
    doc: "Called when script is started.",
    outputs: [],
    command: true,
    hat: true,
});
addNode("logic/log", {
    alias: ["Log to Console", "Console"],
    inputs: ["Text"],
    func: (text) => {
        return new Promise((resolve, reject) => {
            console.log(text);
            resolve([0]);
        });
    },
    color: "darkcyan",
    doc: "Logs a message to the console.",
    outputs: [],
    command: true,
});
addNode("logic/set", {
    alias: ["Set Variable", "variable", "memory"],
    inputs: ["Var Name", "Value"],
    func: (varname, value) => {
        return new Promise((resolve, reject) => {
            window.varMap.set(`${varname}`, value);
            resolve([0]);
        });
    },
    color: "darkcyan",
    doc: "Sets a variable's value.",
    outputs: ["Value"],
    command: true,
    usespkg: ["libs/varmap.js"],
});
addNode("logic/delete", {
    alias: ["Delete Variable", "variable", "memory"],
    inputs: ["Var Name"],
    func: (varname) => {
        return new Promise((resolve, reject) => {
            window.varMap.delete(`${varname}`);
            resolve([0]);
        });
    },
    color: "darkcyan",
    usespkg: ["libs/varmap.js"],
    doc: "Sets a variable's value.",
    outputs: [],
    command: true,
});
addNode("logic/clear", {
    alias: ["Clear Variables", "wipe", "memory"],
    inputs: [],
    func: () => {
        return new Promise((resolve, reject) => {
            window.varMap.clear();
            resolve([0]);
        });
    },
    color: "darkcyan",
    doc: "Clears the variable database.",
    outputs: [],
    usespkg: ["libs/varmap.js"],
    command: true,
});
addNode("logic/get", {
    alias: ["Get Variable", "variable", "memory"],
    inputs: ["Var Name"],
    func: (varname) => {
        return [window.varMap.get(`${varname}`) || 0];
    },
    color: "darkcyan",
    doc: "Gets a variable's value.",
    outputs: ["Value"],
    command: false,
    usespkg: ["libs/varmap.js"],
});
addNode("logic/wait", {
    alias: ["Wait n secs", "sleep", "wait"],
    inputs: ["n"],
    func: (n) => {
        return new Promise((resolve, reject) => {
            var time = parseFloat(n) * 1000;
            setTimeout(() => {
                resolve([0]);
            }, time);
        });
    },
    color: "darkcyan",
    doc: "Logs a message to the console.",
    outputs: [],
    command: true,
});
addNode("logic/sequence", {
    alias: ["Sequence", "branch", "fork"],
    inputs: [],
    func: () => {
        return new Promise((resolve, reject) => {
            resolve([0, 1]);
        });
    },
    color: "darkcyan",
    doc: "Logs a message to the console.",
    outputs: ["⏩1", "⏩2"],
    command: true,
});
var runLogicButtonTd = document.createElement("td");
var runLogicButton = document.createElement("div");
runLogicButton.classList.add("btn");
runLogicButton.role = "button";
runLogicButton.onclick = () => {
    startHats("start");
}
runLogicButton.innerText = "Run";
runLogicButtonTd.appendChild(runLogicButton);
document.querySelector("#toolbar table tr").appendChild(runLogicButtonTd);
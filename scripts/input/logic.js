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
    alias: ["Log", "Console"],
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
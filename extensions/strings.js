addNode("strings/join", {
    alias: ["Join String", "Concatenate String"],
    inputs: ["A", "B"],
    func: (a, b) => {
        return [`${a}${b}`];
    },
    color: "darkcyan",
    doc: "Adds inputs A and B together and then returns it.",
});
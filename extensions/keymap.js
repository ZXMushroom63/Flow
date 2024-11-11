var keymap = {};
var current_keycode = -1;
var current_key = "";
window.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" && !e.altKey) {
        keymap[e.key] = true;
        current_key = e.key;
        current_keycode = e.keyCode;
    }
});
window.addEventListener("keyup", (e) => {
    keymap[e.key] = false;
});
addNode("keys/is_pressed", {
    alias: ["Is Key Pressed", "Key Pressed"],
    inputs: ["Key"],
    outputs: ["?"],
    func: (key) => {
        if (keymap[key]) {
            return [1]
        } else {
            return [0]
        }
    },
    color: "darkgreen",
    doc: `Checks if a key is pressed.`,
});
addNode("keys/keycode", {
    alias: ["Last Key", "Key", "Key Code", "Key Codes", "Unicode", "Keyboard"],
    outputs: ["Key Code", "Key"],
    inputs: [],
    func: () => {
        return [current_keycode, current_key];
    },
    color: "darkgreen",
    doc: `Returns the data of the last key pressed.`,
});
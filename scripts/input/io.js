var keymap = {};
addNode("anykeydown", {
  alias: ["Any key pressed?", "any key pressed", "any key down"],
  outputs: ["?"],
  func: () => {
    var anyKeyDown = 0;
    var keycodes = Object.keys(keymap);
    for (let i = 0; i < keycodes.length; i++) {
      const keycode = keycodes[i];
      if (keymap[keycode] === 1) {
        anyKeyDown = 1;
      }
    }
    return [anyKeyDown];
  },
  color: "darkmagenta",
  doc: `Returns 1 if any key is pressed, else 0.`,
});
addNode("keydown", {
  alias: ["Keycode x pressed?", "key pressed", "key down"],
  outputs: ["?"],
  inputs: ["k"],
  func: (k) => {
    return [keymap[k] || 0];
  },
  color: "darkmagenta",
  doc: `Returns 1 if keycode 'k' is pressed, else 0.`,
});
addNode("keycode", {
  alias: ["Current keycode"],
  outputs: ["k"],
  inputs: [],
  func: () => {
    var k = 0;
    var keys = Object.keys(keymap);
    for (let i = 0; i < keys.length; i++) {
      if (keymap[keys[i]] === 1) {
        k = parseInt(keys[i]);
      }
    }
    return [k];
  },
  color: "darkmagenta",
  doc: `Returns the current keycode pressed.`,
});
window.addEventListener("keydown", (e)=>{
  keymap[e.keyCode] = 1;
});
window.addEventListener("keyup", (e)=>{
  aKeyDown = 0;
  keymap[e.keyCode] = 0;
});
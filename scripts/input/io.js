addNode("anykeydown", {
  alias: ["Any key pressed?", "any key pressed", "any key down"],
  outputs: ["?"],
  func: function () {
    if (!window.fKeymap) {
      window.fKeymap = {};
    }
    if (!window.fKeyDownListener) {
      window.addEventListener("keydown", (e) => {
        window.fKeymap[e.keyCode] = 1;
      });
      window.fKeyDownListener = true;
    }
    if (!window.fKeyUpListener) {
      window.addEventListener("keyup", (e) => {
        window.fKeymap[e.keyCode] = 0;
      });
      window.fKeyUpListener = true;
    }
    var anyKeyDown = 0;
    var keycodes = Object.keys(fKeymap);
    for (let i = 0; i < keycodes.length; i++) {
      const keycode = keycodes[i];
      if (fKeymap[keycode] === 1) {
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
    if (!window.fKeymap) {
      window.fKeymap = {};
    }
    if (!window.fKeyDownListener) {
      window.addEventListener("keydown", (e) => {
        window.fKeymap[e.keyCode] = 1;
      });
      window.fKeyDownListener = true;
    }
    if (!window.fKeyUpListener) {
      window.addEventListener("keyup", (e) => {
        window.fKeymap[e.keyCode] = 0;
      });
      window.fKeyUpListener = true;
    }
    return [window.fKeymap[k] || 0];
  },
  color: "darkmagenta",
  doc: `Returns 1 if keycode 'k' is pressed, else 0.`,
});
addNode("keycode", {
  alias: ["Current keycode"],
  outputs: ["k"],
  inputs: [],
  func: () => {
    if (!window.fKeymap) {
      window.fKeymap = {};
    }
    if (!window.fKeyDownListener) {
      window.addEventListener("keydown", (e) => {
        window.fKeymap[e.keyCode] = 1;
      });
      window.fKeyDownListener = true;
    }
    if (!window.fKeyUpListener) {
      window.addEventListener("keyup", (e) => {
        window.fKeymap[e.keyCode] = 0;
      });
      window.fKeyUpListener = true;
    }
    var k = 0;
    var keys = Object.keys(window.fKeymap);
    for (let i = 0; i < keys.length; i++) {
      if (window.fKeymap[keys[i]] === 1) {
        k = parseInt(keys[i]);
      }
    }
    return [k];
  },
  color: "darkmagenta",
  doc: `Returns the current keycode pressed.`,
});
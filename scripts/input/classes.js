addNode("add", {
  alias: ["Add", "addition", "plus", "+"],
  inputs: ["A", "B"],
  func: (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return [a + b];
  },
  color: "darkcyan",
  doc: "Adds inputs A and B together and then returns it.",
});
addNode("subtract", {
  alias: ["Minus", "subtract", "subtraction", "-"],
  inputs: ["A", "B"],
  func: (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return [a - b];
  },
  color: "darkcyan",
  doc: "Subtracts B from A and then returns it.",
});
addNode("multiply", {
  alias: ["Multiply", "times", "product", "mult", "*"],
  inputs: ["A", "B"],
  func: (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return [a * b];
  },
  color: "darkcyan",
  doc: "Multiples A by B and then returns it.",
});
addNode("divide", {
  alias: ["Divide", "div", "/"],
  inputs: ["A", "B"],
  func: (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return [a / b];
  },
  color: "darkcyan",
  doc: "Divides A by B and then returns it.",
});
addNode("power", {
  alias: ["Power", "exponent", "exp", "pow", "^"],
  inputs: ["Base", "Exp"],
  func: (base, exp) => {
    return [Math.pow(base, exp)];
  },
  color: "darkcyan",
  doc: "Returns Base to the power Exponent and then returns it.",
});
addNode("if", {
  alias: ["If"],
  inputs: ["A", "B", "A>B", "A=B", "A<B"],
  func: (a, b, agtb, aeb, alsb) => {
    if (a > b) {
      return [agtb];
    } else if (b > a) {
      return [alsb];
    } else {
      return [aeb];
    }
  },
  color: "darkgreen",
  doc: `Takes in inputs 'A' and 'B', then if 'A' is greater than 'B', it returns the value of the input labeled 'A>B'.
    <br>If 'A' is less than 'B', it returns the value of the input labeled 'A<B'.
    <br>If 'A' is equal to 'B', it returns the value of the input labeled 'A=B'.
    `,
});
addNode("mod", {
  alias: ["Modulo", "remainder", "%"],
  inputs: ["N", "Mod"],
  func: (n, mod) => {
    return [n % mod];
  },
  color: "darkcyan",
  doc: `Finds the remainder of 'N' over 'Mod'. Eg:
    <br> 0 mod 2 = 0;
    <br> 1 mod 2 = 1;
    <br> 2 mod 2 = 0;`,
});
addNode("min", {
  alias: ["Smallest", "minimum"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [Math.min(a, b)];
  },
  color: "darkred",
  doc: `Returns the smallest of A and B.`,
});
addNode("max", {
  alias: ["Largest", "maximum", "biggest"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [Math.max(a, b)];
  },
  color: "darkred",
  doc: `Returns the largest of A and B.`,
});
addNode("unknown", {
  alias: ["Unknown Node"],
  inputs: [],
  func: () => {
    return [0];
  },
  color: "fuchsia",
  outputs: [],
  doc: "Replaces any nodes whose type does not exist when loading from a save.",
});
addNode("clamp", {
  alias: ["Clamp"],
  inputs: ["Value", "Min", "Max"],
  func: (v, min, max) => {
    return [Math.min(Math.max(v, min), max)];
  },
  color: "darkred",
  doc: `Limits 'V' to the Minimum and Maximum values provided.`,
});

addNode("rnd", {
  alias: ["Random (0.0-1.0)", "random", "rand", "ran"],
  func: () => {
    return [Math.random()];
  },
  color: "darkred",
  doc: `Returns a random decimal between 0.0 to 1.0.`,
});
addNode("rndint", {
  alias: ["Random Integer", "randomint", "randint", "ranint"],
  inputs: ["Min", "Max"],
  func: (min, max) => {
    return [Math.floor(Math.random() * (max + 1 - min) + min)];
  },
  color: "darkred",
  doc: `Returns a random integer between Min and Max.`,
});
addNode("rndchoose", {
  alias: ["Random A/B", "randomab", "randomchoose"],
  inputs: ["A", "B"],
  func: (a, b) => {
    var rng = Math.floor(Math.random() * 2);
    return [rng === 0 ? a : b];
  },
  color: "darkred",
  doc: `Randomly returns A or B`,
});
addNode("root", {
  alias: ["Root", "n-root"],
  inputs: ["Num", "Root Index"],
  func: (n, i) => {
    var b = Math.pow(i, -1);
    return [Math.pow(n, b)];
  },
  color: "darkred",
  doc: `Gets the root of a number. Eg:
    <br>25 root 2 = 5;
    <br>125 root 3 = 5;
    <br>36 root 2 = 6;`,
});
addNode("sin", {
  alias: ["Sine"],
  inputs: ["deg"],
  func: (deg) => {
    return [Math.sin(deg * (Math.PI / 180))];
  },
  color: "darkred",
  doc: `Gets the sine of the angle in degrees provided.`,
});
addNode("cos", {
  alias: ["Cosine"],
  inputs: ["deg"],
  func: (deg) => {
    return [Math.cos(deg * (Math.PI / 180))];
  },
  color: "darkred",
  doc: `Gets the cosine of the angle in degrees provided.`,
});
addNode("abs", {
  alias: ["Absolute"],
  inputs: ["Num"],
  func: (n) => {
    return [Math.abs(n)];
  },
  color: "darkred",
  doc: `Returns the absolute of the input number Can be described as removing the number's sign. Eg:
    <br>Abs(4)=4;
    <br>Abs(-3)=3;
    <br>Abs(0)=0;
    <br>Abs(-1)=1;
    `,
});
addNode("lerp", {
  alias: ["Linear Interpolate", "lerper"],
  inputs: ["A", "B", "Alpha"],
  func: (a, b, k) => {
    return [(b - a) * k + a];
  },
  color: "darkred",
  doc: `Linear interpolates (blends) between A and B with an Alpha ranging from 0.0 to 1.0. Eg:
    <br>Lerping with A=0, B=10, Alpha=0.0 returns 0.
    <br>Lerping with A=0, B=10, Alpha=0.5 returns 5.
    <br>Lerping with A=0, B=10, Alpha=1.0 returns 10.
    `,
});
addNode("time", {
  alias: ["Time (ms)", "current time", "t"],
  func: () => {
    if (performance && performance.now) {
      return [performance.now()];
    } else {
      return [Date.now()];
    }
  },
  color: "grey",
  doc: `Returns the current time in milliseconds (one thousandth of a second).`,
});
addNode("comment", {
  alias: ["Comment Node"],
  inputs: [],
  outputs: [],
  renameable: true,
  doc: `Used to annotate graphs.`,
  init: function () {
    var container = document.createElement("div");
    container.innerText = "Comment Text Here";
    container.style = `width: 100%; height: 100%; color: white; outline: 0 !important;`;
    container.contentEditable = true;
    container.setAttribute("data-container", "");
    this.append(container);
  },
});

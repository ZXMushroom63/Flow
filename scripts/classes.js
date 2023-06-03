addNode(
  "add",
  ["Add", "addition", "plus", "+"],
  ["A", "B"],
  (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return a + b;
  },
  "darkcyan"
);
addNode(
  "subtract",
  ["Minus", "subtract", "subtraction", "-"],
  ["A", "B"],
  (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return a - b;
  },
  "darkcyan"
);
addNode(
  "multiply",
  ["Multiply", "times", "product", "mult", "*"],
  ["A", "B"],
  (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return a * b;
  },
  "darkcyan"
);
addNode(
  "divide",
  ["Divide", "div", "/"],
  ["A", "B"],
  (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
      return 0;
    }
    return a / b;
  },
  "darkcyan"
);
addNode(
  "const",
  [
    "Constant",
    "vector",
    "vector1",
    "number",
    "int",
    "integer",
    "float",
    "float32",
    "float64",
  ],
  ["N"],
  (n) => {
    return n;
  },
  "darkred",
  {
    contentEditable: true,
    onblur: "this.innerText = this.innerText.replaceAll('\\n', '')",
  }
);
addNode(
  "power",
  ["Power", "exponent", "exp", "pow", "^"],
  ["Base", "Exp"],
  (base, exp) => {
    return Math.pow(base, exp);
  },
  "darkcyan"
);
addNode(
  "if",
  ["If"],
  ["A", "B", "A>B", "A=B", "A<B"],
  (a, b, agtb, aeb, alsb) => {
    if (a > b) {
      return agtb;
    } else if (b > a) {
      return alsb;
    } else {
      return aeb;
    }
  },
  "darkgreen"
);
addNode(
  "mod",
  ["Modulo", "remainder", "%"],
  ["N", "Mod"],
  (n, mod) => {
    return n % mod;
  },
  "darkcyan"
);
addNode(
  "min",
  ["Smallest", "minimum"],
  ["A", "B"],
  (a, b) => {
    return Math.min(a, b);
  },
  "darkred"
);
addNode(
  "max",
  ["Largest", "maximum", "biggest"],
  ["A", "B"],
  (a, b) => {
    return Math.max(a, b);
  },
  "darkred"
);
addNode(
  "unknown",
  ["Unknown Node"],
  [],
  () => {
    return 0;
  },
  "fuchsia",
  {},
  {
    no_out: true,
  }
);
addNode(
  "clamp",
  ["Clamp"],
  ["Value", "Min", "Max"],
  (v, min, max) => {
    return Math.min(Math.max(v, min), max);
  },
  "darkred"
);


addNode(
  "rnd",
  ["Random (0.0-1.0)", "random", "rand", "ran"],
  [],
  () => {
    return Math.random();
  },
  "darkred",
  {},
  {
    dynamic: true,
  }
);
addNode(
  "rndint",
  ["Random Integer", "randomint", "randint", "ranint"],
  ["Min", "Max"],
  (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  },
  "darkred",
  {},
  {
    dynamic: true,
  }
);
addNode(
  "root",
  ["Root"],
  ["Num", "Root Index"],
  (n, i) => {
    var b = Math.pow(i, -1);
    return Math.pow(n, b);
  },
  "darkred"
);
addNode(
  "debug",
  ["Debug", "print", "alert"],
  ["In"],
  (input) => {
    alert("Type: " + typeof input + "\nValue: " + input);
    return input;
  },
  "darkred"
);
addNode(
  "output",
  ["Output"],
  ["Out"],
  (output) => {
    return output;
  },
  "darkorange",
  {
    "data-flag-isOutput": "true",
  },
  {
    no_out: true,
  }
);
addNode(
  "sin",
  ["Sine"],
  ["deg"],
  (deg) => {
    return Math.sin(deg * (Math.PI / 180));
  },
  "darkred"
);
addNode(
  "cos",
  ["Cosine"],
  ["deg"],
  (deg) => {
    return Math.cos(deg * (Math.PI / 180));
  },
  "darkred"
);
addNode(
  "abs",
  ["Absolute"],
  ["Num"],
  (n) => {
    return Math.abs(n);
  },
  "darkred"
);
addNode(
  "lerp",
  ["Linear Interpolate", "lerper"],
  ["A", "B", "Alpha"],
  (a, b, k) => {
    return (b - a) * k + a;
  },
  "darkred"
);
addNode(
  "time",
  ["Time", "current time", "t"],
  [],
  () => {
    if (window.performance && window.performance.now) {
      return performance.now();
    } else {
      return Date.now();
    }
  },
  "grey",
  {},
  {
    dynamic: true,
  }
);

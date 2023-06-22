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
  "darkcyan",
  {},
  {
    doc: "Adds inputs A and B together and then returns it.",
  }
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
  "darkcyan",
  {},
  {
    doc: "Subtracts B from A and then returns it.",
  }
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
  "darkcyan",
  {},
  {
    doc: "Multiples A by B and then returns it.",
  }
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
  "darkcyan",
  {},
  {
    doc: "Divides A by B and then returns it.",
  }
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
  },
  {
    doc: "A constant. Can be used to reroute flow or as an input.",
  }
);
addNode(
  "power",
  ["Power", "exponent", "exp", "pow", "^"],
  ["Base", "Exp"],
  (base, exp) => {
    return Math.pow(base, exp);
  },
  "darkcyan",
  {},
  {
    doc: "Returns Base to the power Exponent and then returns it.",
  }
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
  "darkgreen",
  {},
  {
    doc: `Takes in inputs 'A' and 'B', then if 'A' is greater than 'B', it returns the value of the input labeled 'A>B'.
    If 'A' is less than 'B', it returns the value of the input labeled 'A<B'.
    If 'A' is equal to 'B', it returns the value of the input labeled 'A=B'.
    `,
  }
);
addNode(
  "mod",
  ["Modulo", "remainder", "%"],
  ["N", "Mod"],
  (n, mod) => {
    return n % mod;
  },
  "darkcyan",
  {},
  {
    doc: `Finds the remainder of 'N' over 'Mod'. Eg:
    <br> 0 mod 2 = 0;
    <br> 1 mod 2 = 1;
    <br> 2 mod 2 = 0;`,
  }
);
addNode(
  "min",
  ["Smallest", "minimum"],
  ["A", "B"],
  (a, b) => {
    return Math.min(a, b);
  },
  "darkred",
  {},
  {
    doc: `Returns the smallest of A and B.`,
  }
);
addNode(
  "max",
  ["Largest", "maximum", "biggest"],
  ["A", "B"],
  (a, b) => {
    return Math.max(a, b);
  },
  "darkred",
  {},
  {
    doc: `Returns the largest of A and B.`,
  }
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
    doc: "Replaces any nodes whose type does not exist when loading from a save.",
  }
);
addNode(
  "clamp",
  ["Clamp"],
  ["Value", "Min", "Max"],
  (v, min, max) => {
    return Math.min(Math.max(v, min), max);
  },
  "darkred",
  {},
  {
    doc: `Limits 'V' to the Minimum and Maximum values provided.`,
  }
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
    doc: `Returns a random decimal between 0.0 to 1.0.`,
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
    doc: `Returns a random integer between Min and Max.`,
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
  "darkred",
  {},
  {
    doc: `Gets the root of a number. Eg:
    <br>25 root 2 = 5;
    <br>125 root 3 = 5;
    <br>36 root 2 = 6;`,
  }
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
    doc: `Serves as the output in number mode. The value it gets from 'Out' is displayed in the toolbar.`,
  }
);
addNode(
  "sin",
  ["Sine"],
  ["deg"],
  (deg) => {
    return Math.sin(deg * (Math.PI / 180));
  },
  "darkred",
  {},
  {
    doc: `Gets the sine of the angle in degrees provided.`,
  }
);
addNode(
  "cos",
  ["Cosine"],
  ["deg"],
  (deg) => {
    return Math.cos(deg * (Math.PI / 180));
  },
  "darkred",
  {},
  {
    doc: `Gets the cosine of the angle in degrees provided.`,
  }
);
addNode(
  "abs",
  ["Absolute"],
  ["Num"],
  (n) => {
    return Math.abs(n);
  },
  "darkred",
  {},
  {
    doc: `Returns the absolute of the input number Can be described as removing the number's sign. Eg:
    <br>Abs(4)=4;
    <br>Abs(-3)=3;
    <br>Abs(0)=0;
    <br>Abs(-1)=1;
    `,
  }
);
addNode(
  "lerp",
  ["Linear Interpolate", "lerper"],
  ["A", "B", "Alpha"],
  (a, b, k) => {
    return (b - a) * k + a;
  },
  "darkred",
  {},
  {
    doc: `Linear Interpolates between A and B with an Alpha ranging from 0.0 to 1.0. Eg:
    <br>Lerping with A=0, B=10, Alpha=0.0 returns 0.
    <br>Lerping with A=0, B=10, Alpha=0.5 returns 5.
    <br>Lerping with A=0, B=10, Alpha=1.0 returns 10.
    `,
  }
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
    doc: `Returns the current time in milliseconds (one thousandth of a second).`,
  }
);

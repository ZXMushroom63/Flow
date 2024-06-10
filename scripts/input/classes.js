addNode("add", {
  alias: ["Add", "addition", "plus", "+"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [parseFloat(a) + parseFloat(b)];
  },
  color: "darkcyan",
  doc: "Adds inputs A and B together and then returns it.",
});
addNode("subtract", {
  alias: ["Minus", "subtract", "subtraction", "-"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [parseFloat(a) - parseFloat(b)];
  },
  color: "darkcyan",
  doc: "Subtracts B from A and then returns it.",
});
addNode("multiply", {
  alias: ["Multiply", "times", "product", "mult", "*"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [parseFloat(a) * parseFloat(b)];
  },
  color: "darkcyan",
  doc: "Multiples A by B and then returns it.",
});
addNode("divide", {
  alias: ["Divide", "div", "/"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [parseFloat(a) / parseFloat(b)];
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
addNode("mathif", {
  alias: ["Math If"],
  inputs: ["A", "B", "A>B", "A=B", "A<B"],
  func: (a, b, agtb, aeb, alsb) => {
    if (parseFloat(a) > parseFloat(b)) {
      return [agtb];
    } else if (parseFloat(b) > parseFloat(a)) {
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
addNode("min", {
  alias: ["Smallest", "minimum"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [Math.min(parseFloat(a), parseFloat(b))];
  },
  color: "darkred",
  doc: `Returns the smallest of A and B.`,
});
addNode("max", {
  alias: ["Largest", "maximum", "biggest"],
  inputs: ["A", "B"],
  func: (a, b) => {
    return [Math.max(parseFloat(a), parseFloat(b))];
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
    return [Math.min(Math.max(parseFloat(v), parseFloat(min)), parseFloat(max))];
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
    return [Math.floor(Math.random() * (parseInt(max) + 1 - parseInt(min)) + parseInt(min))];
  },
  color: "darkred",
  doc: `Returns a random integer between Min and Max.`,
});
addNode("rndfloat", {
  alias: ["Random Decimal", "randomfloat", "randfloat", "ranfloat"],
  inputs: ["Min", "Max"],
  func: (min, max) => {
    return [Math.random() * (parseFloat(max) - parseFloat(min)) + parseFloat(min)];
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
    container.style = `width: 100%; height: 100%; color: white; outline: 0 !important; white-space: nowrap;`;
    container.contentEditable = true;
    container.setAttribute("data-container", "");
    this.append(container);
  },
});
addNode("hash", {
  alias: ["Hash"],
  inputs: ["x"],
  func: (x) => {
    const inputString = "" + x;
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
      const charCode = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash = hash & hash;
    }
    return [(Math.abs(hash) / 32767) % 1];
  },
  color: "darkred",
  doc: `Calculated a hash between 0.0 and 1.0 for the input provided.`,
});
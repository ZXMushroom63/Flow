addNode("pi", {
  alias: ["π", "3.14"],
  func: () => {
    return Math.PI;
  },
  color: "darkmagenta",
  doc: `Returns pi.`,
});
addNode("e", {
  alias: ["e", "2.71"],
  func: () => {
    return Math.E;
  },
  color: "darkmagenta",
  doc: `Returns e.`,
});
addNode("sqrt", {
  alias: ["Square-Root", "squareroot"],
  inputs: ["X"],
  func: (x) => {
    return Math.sqrt(x);
  },
  color: "darkred",
  doc: `Returns the square-root of x.`,
});
addNode("cbrt", {
  alias: ["Cube-Root", "cuberoot"],
  inputs: ["X"],
  func: (x) => {
    return Math.cbrt(x);
  },
  color: "darkred",
  doc: `Returns the cube-root of x.`,
});
addNode("floor", {
  alias: ["Floor", "truncate", "round down"],
  inputs: ["N"],
  func: (x) => {
    return Math.floor(x);
  },
  color: "darkred",
  doc: `Returns the floor of N; can be described as rounding down or removes decimals.`,
});
addNode("ceil", {
  alias: ["Ceiling", "round up"],
  inputs: ["N"],
  func: (x) => {
    return Math.floor(x);
  },
  color: "darkred",
  doc: `Returns the ceil of N; can be described as rounding up.`,
});
addNode("round", {
  alias: ["Round"],
  inputs: ["N"],
  func: (x) => {
    return Math.round(x);
  },
  color: "darkred",
  doc: `Rounds N.`,
});
addNode("tan", {
  alias: ["Tangent"],
  inputs: ["deg"],
  func: (deg) => {
    return Math.tan(deg * (Math.PI / 180));
  },
  color: "darkred",
  doc: `Returns the tangent of the input angle.`,
});
addNode("collatz", {
  alias: ["3n+1"],
  inputs: ["n", "step"],
  func: (n, step) => {
    var num = Math.round(n);
    step = Math.max(0, step);
    step = Math.min(step, 1000);
    for (let i = 0; i < step; i++) {
      if (num === 1) {
        break;
      }
      if (num % 2 === 0) {
        num /= 2;
      } else {
        num *= 3;
        num += 1;
      }
    }
    return num;
  },
  color: "darkred",
  doc: `Oh no.`,
});

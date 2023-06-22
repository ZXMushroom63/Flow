addNode(
  "pi",
  ["π", "3.14"],
  [],
  () => {
    return Math.PI;
  },
  "darkmagenta",
  {},
  {
    dynamic: true,
    doc: `Returns pi.`,
  }
);
addNode(
  "e",
  ["e", "2.71"],
  [],
  () => {
    return Math.E;
  },
  "darkmagenta",
  {},
  {
    dynamic: true,
    doc: `Returns e.`,
  }
);

addNode(
  "sqrt",
  ["Square-Root", "squareroot"],
  ["X"],
  (x) => {
    return Math.sqrt(x);
  },
  "darkred",
  {},
  {
    dynamic: true,
    doc: `Returns the square-root of x.`,
  }
);
addNode(
  "cbrt",
  ["Cube-Root", "cuberoot"],
  ["X"],
  (x) => {
    return Math.cbrt(x);
  },
  "darkred",
  {},
  {
    dynamic: true,
    doc: `Returns the cube-root of x.`,
  }
);

addNode(
  "floor",
  ["Floor", "truncate", "round down"],
  ["N"],
  (x) => {
    return Math.floor(x);
  },
  "darkred",
  {},
  {
    doc: `Returns the floor of N; can be described as rounding down or removes decimals.`,
  }
);
addNode(
  "ceil",
  ["Ceiling", "round up"],
  ["N"],
  (x) => {
    return Math.floor(x);
  },
  "darkred",
  {},
  {
    doc: `Returns the ceil of N; can be described as rounding up.`,
  }
);
addNode(
  "round",
  ["Round"],
  ["N"],
  (x) => {
    return Math.round(x);
  },
  "darkred",
  {},
  {
    doc: `Rounds N.`,
  }
);
addNode(
  "tan",
  ["Tangent"],
  ["deg"],
  (deg) => {
    return Math.tan(deg * (Math.PI / 180));
  },
  "darkred",
  {},
  {
    doc: `Returns the tangent of the input angle.`,
  }
);

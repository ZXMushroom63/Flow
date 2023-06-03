addNode(
  "pi",
  ["π", "3.14"],
  [],
  () => {
    return Math.PI;
  },
  "darkmagenta"
);
addNode(
  "e",
  ["e", "2.71"],
  [],
  () => {
    return Math.E;
  },
  "darkmagenta"
);

addNode(
  "sqrt",
  ["Square-Root", "squareroot"],
  ["X"],
  (x) => {
    return Math.sqrt(x);
  },
  "darkred"
);
addNode(
  "cbrt",
  ["Cube-Root", "cuberoot"],
  ["X"],
  (x) => {
    return Math.cbrt(x);
  },
  "darkred"
);

addNode(
  "floor",
  ["Floor", "truncate", "round down"],
  ["N"],
  (x) => {
    return Math.floor(x);
  },
  "darkred"
);
addNode(
  "ceil",
  ["Ceiling", "round up"],
  ["N"],
  (x) => {
    return Math.floor(x);
  },
  "darkred"
);
addNode(
  "round",
  ["Round"],
  ["N"],
  (x) => {
    return Math.round(x);
  },
  "darkred"
);
addNode(
  "tan",
  ["Tangent"],
  ["deg"],
  (deg) => {
    return Math.tan(deg * (Math.PI / 180));
  },
  "darkred"
);

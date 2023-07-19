addNode("const", {
  alias: [
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
  inputs: ["x"],
  outputs: ["x"],
  func: (x) => {
    return [x];
  },
  color: "darkred",
  renameable: true,
  doc: "A constant. Can be used to reroute flow or as an input.",
});

addNode("vec2", {
  alias: [
    "Vector 2",
    "vector2",
    "constant2",
    "xy",
    "coordinate",
    "cartesian",
    "vec2",
    "point",
  ],
  inputs: ["x", "y"],
  outputs: ["x", "y"],
  func: (x, y) => {
    return [x, y];
  },
  color: "darkred",
  renameable: true,
  doc: "A two-dimensional constant.",
});

addNode("vec3", {
  alias: [
    "Vector 3",
    "vector3",
    "constant3",
    "xyz",
    "3d",
    "position",
    "vec3",
    "point",
  ],
  inputs: ["x", "y", "z"],
  outputs: ["x", "y", "z"],
  func: (x, y, z) => {
    return [x, y, z];
  },
  color: "darkred",
  renameable: true,
  doc: "A three-dimensional constant.",
});

addNode("vec4", {
  alias: ["Vector 4", "vector4", "constant4", "xyzw", "rgba", "vec4"],
  inputs: ["x", "y", "z", "w"],
  outputs: ["x", "y", "z", "w"],
  func: (x, y, z, w) => {
    return [x, y, z, w];
  },
  color: "darkred",
  renameable: true,
  doc: "A four-dimensional constant.",
});

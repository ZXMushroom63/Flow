addNode("simplex", {
  alias: ["Simplex Noise", "noise"],
  inputs: ["x", "y", "seed"],
  func: (x, y, seed) => {
    if (typeof x !== "number" || typeof y !== "number") {
      return 0;
    }
    if (typeof seed === "number") {
      noise.seed(seed);
    } else {
      noise.seed(0);
    }
    return [noise.simplex2(x, y)];
  },
  color: "darkgreen",
  doc: `Returns the simplex noise of X and Y with the Seed, a number ranging from -1.0 to 1.0.`,
});
addNode("perlin", {
  alias: ["Perlin Noise", "noise"],
  inputs: ["x", "y", "seed"],
  func: (x, y, seed) => {
    if (typeof x !== "number" || typeof y !== "number") {
      return 0;
    }
    if (typeof seed === "number") {
      noise.seed(seed);
    } else {
      noise.seed(0);
    }
    return [noise.perlin2(x, y)];
  },
  color: "darkgreen",
  doc: `Returns the perlin noise of X and Y with the Seed, a number ranging from -1.0 to 1.0. Please note that perlin noise will always be zero for integers (whole numbers).`,
});
addNode("perlin3", {
  alias: ["3D Perlin Noise", "noise"],
  inputs: ["x", "y", "z", "seed"],
  func: (x, y, z, seed) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number") {
      noise.seed(seed);
    } else {
      noise.seed(0);
    }
    return [noise.perlin3(x, y, z)];
  },
  color: "darkgreen",
  doc: `Returns the perlin noise of X, Y and Z with the Seed, a number ranging from -1.0 to 1.0. Please note that perlin noise will always be zero for integers (whole numbers).`,
});
addNode("simplex3", {
  alias: ["3D Simplex Noise", "noise"],
  inputs: ["x", "y", "z", "seed"],
  func: (x, y, z, seed) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number") {
      noise.seed(seed);
    } else {
      noise.seed(0);
    }
    return [noise.simplex3(x, y, z)];
  },
  color: "darkgreen",
  doc: `Returns the simplex noise of X, Y and Z with the Seed, a number ranging from -1.0 to 1.0.`,
});
addNode("worley_euclidean", {
  alias: [
    "Worley Noise (Euclidean)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "euclidean",
  ],
  inputs: ["x", "y", "z", "seed"],
  outputs: ["0", "1", "2"],
  func: (x, y, z, seed) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number" && seed !== noise.worley._seedValue) {
      noise.worley.setSeed(seed);
    }
    return window.noise.worley.Euclidean(x, y, z);
  },
  color: "darkgreen",
  doc: `Returns the worley euclidean noise of X, Y and Z with the Seed, a number ranging from 0.0 to 1.0.`,
});
addNode("worley_manhattan", {
  alias: [
    "Worley Noise (Manhattan)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "manhattan",
  ],
  inputs: ["x", "y", "z", "seed"],
  outputs: ["0", "1", "2"],
  func: (x, y, z, seed) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number" && seed !== noise.worley._seedValue) {
      noise.worley.setSeed(seed);
    }
    return window.noise.worley.Manhattan(x, y, z);
  },
  color: "darkgreen",
  doc: `Returns the worley manhattan noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
});
addNode("worley_minkovski", {
  alias: [
    "Worley Noise (Minkovski)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "minkovski",
  ],
  inputs: ["x", "y", "z", "seed"],
  outputs: ["0", "1", "2"],
  func: (x, y, z, seed) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number" && seed !== noise.worley._seedValue) {
      noise.worley.setSeed(seed);
    }
    return window.noise.worley.Minkovski(x, y, z);
  },
  color: "darkgreen",
  doc: `Returns the worley minkovski noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
});

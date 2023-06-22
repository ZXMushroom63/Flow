addNode(
  "simplex",
  ["Simplex Noise", "noise"],
  ["x", "y", "seed"],
  (x, y, seed) => {
    if (typeof x !== "number" || typeof y !== "number") {
      return 0;
    }
    if (typeof seed === "number") {
      noise.seed(seed);
    } else {
      noise.seed(0);
    }
    return noise.simplex2(x, y);
  },
  "darkgreen",
  {},
  {
    doc: `Returns the simplex noise of X and Y with the Seed, a number ranging from -1.0 to 1.0.`,
  }
);
addNode(
  "perlin",
  ["Perlin Noise", "noise"],
  ["x", "y", "seed"],
  (x, y, seed) => {
    if (typeof x !== "number" || typeof y !== "number") {
      return 0;
    }
    if (typeof seed === "number") {
      noise.seed(seed);
    } else {
      noise.seed(0);
    }
    return noise.perlin2(x, y);
  },
  "darkgreen",
  {},
  {
    doc: `Returns the perlin noise of X and Y with the Seed, a number ranging from -1.0 to 1.0.`,
  }
);
addNode(
  "perlin3",
  ["3D Perlin Noise", "noise"],
  ["x", "y", "z", "seed"],
  (x, y, z, seed) => {
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
    return noise.perlin3(x, y, z);
  },
  "darkgreen",
  {},
  {
    doc: `Returns the perlin noise of X, Y and Z with the Seed, a number ranging from -1.0 to 1.0.`,
  }
);
addNode(
  "simplex3",
  ["3D Simplex Noise", "noise"],
  ["x", "y", "z", "seed"],
  (x, y, z, seed) => {
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
    return noise.simplex3(x, y, z);
  },
  "darkgreen",
  {},
  {
    doc: `Returns the simplex noise of X, Y and Z with the Seed, a number ranging from -1.0 to 1.0.`,
  }
);
addNode(
  "worley_euclidean",
  [
    "Worley Noise (Euclidean)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "euclidean",
  ],
  ["x", "y", "z", "seed", "Index"],
  (x, y, z, seed, index) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number") {
      noise.worley.setSeed(seed);
    } else {
      noise.worley.setSeed(0);
    }
    if (typeof index === "number") {
      var i = Math.floor(index);
      i = Math.min(Math.max(i, 0), 2);
      return window.noise.worley.Euclidean(x, y, z)[i];
    } else {
      return window.noise.worley.Euclidean(x, y, z)[0];
    }
  },
  "darkgreen",
  {},
  {
    doc: `Returns the worley euclidean noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
  }
);
addNode(
  "worley_manhattan",
  [
    "Worley Noise (Manhattan)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "manhattan",
  ],
  ["x", "y", "z", "seed", "Index"],
  (x, y, z, seed, index) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number") {
      noise.worley.setSeed(seed);
    } else {
      noise.worley.setSeed(0);
    }
    if (typeof index === "number") {
      var i = Math.floor(index);
      i = Math.min(Math.max(i, 0), 2);
      return window.noise.worley.Manhattan(x, y, z)[i];
    } else {
      return window.noise.worley.Manhattan(x, y, z)[0];
    }
  },
  "darkgreen",
  {},
  {
    doc: `Returns the worley manhattan noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
  }
);
addNode(
  "worley_minkovski",
  [
    "Worley Noise (Minkovski)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "minkovski",
  ],
  ["x", "y", "z", "seed", "Index"],
  (x, y, z, seed, index) => {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      return 0;
    }
    if (typeof seed === "number") {
      noise.worley.setSeed(seed);
    } else {
      noise.worley.setSeed(0);
    }
    if (typeof index === "number") {
      var i = Math.floor(index);
      i = Math.min(Math.max(i, 0), 2);
      return window.noise.worley.Minkovski(x, y, z)[i];
    } else {
      return window.noise.worley.Minkovski(x, y, z)[0];
    }
  },
  "darkgreen",
  {},
  {
    doc: `Returns the worley minkovski noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
  }
);

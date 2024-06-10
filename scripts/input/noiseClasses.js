addNode("simplex", {
  alias: ["Simplex Noise", "noise"],
  inputs: ["x", "y", "seed"],
  func: (x, y, seed) => {
    if ((parseFloat(seed) || 0) !== noise.currentSeed) {
      noise.seed(parseFloat(seed) || 0);
    }
    return [noise.simplex2(parseFloat(x) || 0, parseFloat(y) || 0)];
  },
  color: "darkgreen",
  usespkg: ["libs/noise.js"],
  doc: `Returns the simplex noise of X and Y with the Seed, a number ranging from -1.0 to 1.0.`,
});
addNode("perlin", {
  alias: ["Perlin Noise", "noise"],
  inputs: ["x", "y", "seed"],
  func: (x, y, seed) => {
    if ((parseFloat(seed) || 0) !== noise.currentSeed) {
      noise.seed(parseFloat(seed) || 0);
    }
    return [noise.perlin2(parseFloat(x) || 0, parseFloat(y) || 0)];
  },
  color: "darkgreen",
  usespkg: ["libs/noise.js"],
  doc: `Returns the perlin noise of X and Y with the Seed, a number ranging from -1.0 to 1.0. Please note that perlin noise will always be zero for integers (whole numbers).`,
});
addNode("perlin3", {
  alias: ["3D Perlin Noise", "noise"],
  inputs: ["x", "y", "z", "seed"],
  func: (x, y, z, seed) => {
    if ((parseFloat(seed) || 0) !== noise.currentSeed) {
      noise.seed(parseFloat(seed) || 0);
    }
    return [noise.perlin3(parseFloat(x) || 0, parseFloat(y) || 0, parseFloat(z) || 0)];
  },
  color: "darkgreen",
  usespkg: ["libs/noise.js"],
  doc: `Returns the perlin noise of X, Y and Z with the Seed, a number ranging from -1.0 to 1.0. Please note that perlin noise will always be zero for integers (whole numbers).`,
});
addNode("simplex3", {
  alias: ["3D Simplex Noise", "noise"],
  inputs: ["x", "y", "z", "seed"],
  func: (x, y, z, seed) => {
    if ((parseFloat(seed) || 0) !== noise.currentSeed) {
      noise.seed(parseFloat(seed) || 0);
    }
    return [noise.simplex3(parseFloat(x) || 0, parseFloat(y) || 0, parseFloat(z) || 0)];
  },
  color: "darkgreen",
  usespkg: ["libs/noise.js"],
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
    if ((parseFloat(seed) || 0) !== noise.worley._seedValue) {
      noise.worley.setSeed(parseFloat(seed) || 0);
    }
    return window.noise.worley.Euclidean(parseFloat(x) || 0, parseFloat(y) || 0, parseFloat(z) || 0);
  },
  color: "darkgreen",
  usespkg: ["libs/worley.js"],
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
    if ((parseFloat(seed) || 0) !== noise.worley._seedValue) {
      noise.worley.setSeed(parseFloat(seed) || 0);
    }
    return window.noise.worley.Manhattan(parseFloat(x) || 0, parseFloat(y) || 0, parseFloat(z) || 0);
  },
  color: "darkgreen",
  usespkg: ["libs/worley.js"],
  doc: `Returns the worley manhattan noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
});
addNode("worley_minkowski", {
  alias: [
    "Worley Noise (Minkowski)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "minkowski",
  ],
  inputs: ["x", "y", "z", "seed"],
  outputs: ["0", "1", "2"],
  func: (x, y, z, seed) => {
    if ((parseFloat(seed) || 0) !== noise.worley._seedValue) {
      noise.worley.setSeed(parseFloat(seed) || 0);
    }
    return window.noise.worley.Minkowski(parseFloat(x) || 0, parseFloat(y) || 0, parseFloat(z) || 0);
  },
  color: "darkgreen",
  usespkg: ["libs/worley.js"],
  doc: `Returns the worley minkowski noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
});
addNode("worley_chebyshev", {
  alias: [
    "Worley Noise (Chebyshev)",
    "cellnoise",
    "cell",
    "voronoi",
    "noise",
    "worley",
    "chebyshev",
  ],
  inputs: ["x", "y", "z", "seed"],
  outputs: ["0", "1", "2"],
  func: (x, y, z, seed) => {
    if ((parseFloat(seed) || 0) !== noise.worley._seedValue) {
      noise.worley.setSeed(parseFloat(seed) || 0);
    }
    return window.noise.worley.Chebyshev(parseFloat(x) || 0, parseFloat(y) || 0, parseFloat(z) || 0);
  },
  color: "darkgreen",
  usespkg: ["libs/worley.js"],
  doc: `Returns the worley chebyshev noise of X, Y and Z with the Seed and index, a number ranging from 0.0 to 1.0.`,
});
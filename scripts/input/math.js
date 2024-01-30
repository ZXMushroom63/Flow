addNode("pi", {
  alias: ["π", "3.14"],
  outputs: ["π"],
  func: () => {
    return [Math.PI];
  },
  color: "darkmagenta",
  doc: `Returns pi.`,
});
addNode("infinity", {
  alias: ["∞", "3.14"],
  outputs: ["∞"],
  func: () => {
    return [Infinity];
  },
  color: "darkmagenta",
  doc: `Returns infinity.`,
});
addNode("e", {
  alias: ["e", "2.71"],
  outputs: ["e"],
  func: () => {
    return [Math.E];
  },
  color: "darkmagenta",
  doc: `Returns e.`,
});
addNode("sqrt", {
  alias: ["Square-Root", "squareroot"],
  inputs: ["X"],
  func: (x) => {
    return [Math.sqrt(x)];
  },
  color: "darkred",
  doc: `Returns the square-root of x.`,
});
addNode("log", {
  alias: ["Logarithm"],
  inputs: ["X"],
  func: (x) => {
    return [Math.log(x)];
  },
  color: "darkred",
  doc: `Returns the logarithm of x.`,
});
addNode("cbrt", {
  alias: ["Cube-Root", "cuberoot"],
  inputs: ["X"],
  func: (x) => {
    return [Math.cbrt(x)];
  },
  color: "darkred",
  doc: `Returns the cube-root of x.`,
});
addNode("floor", {
  alias: ["Floor", "truncate", "round down"],
  inputs: ["N"],
  func: (x) => {
    return [Math.floor(x)];
  },
  color: "darkred",
  doc: `Returns the floor of N; can be described as rounding down or removes decimals.`,
});
addNode("ceil", {
  alias: ["Ceiling", "round up"],
  inputs: ["N"],
  func: (x) => {
    return [Math.ceil(x)];
  },
  color: "darkred",
  doc: `Returns the ceil of N; can be described as rounding up.`,
});
addNode("round", {
  alias: ["Round"],
  inputs: ["N"],
  func: (x) => {
    return [Math.round(x)];
  },
  color: "darkred",
  doc: `Rounds N.`,
});
addNode("tan", {
  alias: ["Tangent"],
  inputs: ["deg"],
  func: (deg) => {
    return [Math.tan(deg * (Math.PI / 180))];
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
    return [num];
  },
  color: "darkred",
  doc: `Oh no.`,
});
addNode("acos", {
  alias: ["Arccos"],
  inputs: ["cos"],
  outputs: ["deg"],
  func: (cos) => {
    return [Math.acos(cos) * (180 / Math.PI)];
  },
  color: "darkred",
  doc: `Returns the inverse cosine (in degrees) of a number.`,
});
addNode("asin", {
  alias: ["Arcsine"],
  inputs: ["sin"],
  outputs: ["deg"],
  func: (sin) => {
    return [Math.asin(sin) * (180 / Math.PI)];
  },
  color: "darkred",
  doc: `Returns the inverse sine (in degrees) of a number.`,
});
addNode("atan", {
  alias: ["Arctan"],
  inputs: ["tan"],
  outputs: ["deg"],
  func: (tan) => {
    return [Math.atan(tan) * (180 / Math.PI)];
  },
  color: "darkred",
  doc: `Returns the inverse tangent (in degrees) of a number.`,
});
addNode("atan2", {
  alias: ["Angle from A to B"],
  inputs: ["x1", "y1", "x2", "y2"],
  outputs: ["deg"],
  func: (nx1, ny1, nx2, ny2) => {
    function getAngle(x1, y1, x2, y2) {
      var dx = x2 - x1,
        dy = y2 - y1;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    }
    return [getAngle(nx1, ny1, nx2, ny2)];
  },
  color: "darkred",
  doc: `Returns the angle from point A to point B.`,
});

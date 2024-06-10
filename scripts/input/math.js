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
    return [Math.log10(x)];
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
    step = Math.max(0, parseInt(step));
    step = Math.min(step, 1000);
    var idx = 0;
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
      idx = i;
    }
    return [num, idx];
  },
  outputs: ["O", "# Steps"],
  color: "darkred",
  doc: `Oh no.`,
});
addNode("ncollatz", {
  alias: ["xn+1"],
  inputs: ["n", "step", "x"],
  func: (n, step, x) => {
    var num = Math.round(n);
    var xn = parseInt(x);
    step = Math.max(0, parseInt(step));
    step = Math.min(step, 1000);
    var idx = 0;
    for (let i = 0; i < step; i++) {
      if (num === 1) {
        break;
      }
      if (num % 2 === 0) {
        num /= 2;
      } else {
        num *= xn;
        num += 1;
      }
      idx = i;
    }
    return [num, idx];
  },
  outputs: ["O", "# Steps"],
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
  alias: ["Angle from A to B", "arctan 2"],
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
addNode("sin", {
  alias: ["Sine"],
  inputs: ["deg"],
  func: (deg) => {
    return [Math.sin(deg * (Math.PI / 180))];
  },
  color: "darkred",
  doc: `Gets the sine of the angle in degrees provided.`,
});
addNode("cos", {
  alias: ["Cosine"],
  inputs: ["deg"],
  func: (deg) => {
    return [Math.cos(deg * (Math.PI / 180))];
  },
  color: "darkred",
  doc: `Gets the cosine of the angle in degrees provided.`,
});
addNode("abs", {
  alias: ["Absolute"],
  inputs: ["Num"],
  func: (n) => {
    return [Math.abs(n)];
  },
  color: "darkred",
  doc: `Returns the absolute of the input number Can be described as removing the number's sign. Eg:
    <br>Abs(4)=4;
    <br>Abs(-3)=3;
    <br>Abs(0)=0;
    <br>Abs(-1)=1;
    `,
});
addNode("lerp", {
  alias: ["Linear Interpolate", "lerper"],
  inputs: ["A", "B", "Alpha"],
  func: (a, b, k) => {
    return [(parseFloat(b) - parseFloat(a)) * parseFloat(k) + parseFloat(a)];
  },
  color: "darkred",
  doc: `Linear interpolates (blends) between A and B with an Alpha ranging from 0.0 to 1.0. Eg:
    <br>Lerping with A=0, B=10, Alpha=0.0 returns 0.
    <br>Lerping with A=0, B=10, Alpha=0.5 returns 5.
    <br>Lerping with A=0, B=10, Alpha=1.0 returns 10.
    `,
});
addNode("root", {
  alias: ["Root", "n-root"],
  inputs: ["Num", "Root Index"],
  func: (n, i) => {
    var b = Math.pow(i, -1);
    return [Math.pow(n, b)];
  },
  color: "darkred",
  doc: `Gets the root of a number. Eg:
    <br>25 root 2 = 5;
    <br>125 root 3 = 5;
    <br>36 root 2 = 6;`,
});
addNode("mod", {
  alias: ["Modulo", "remainder", "%"],
  inputs: ["N", "Mod"],
  func: (n, mod) => {
    return [parseFloat(n) % parseFloat(mod)];
  },
  color: "darkcyan",
  doc: `Finds the remainder of 'N' over 'Mod'. Eg:
    <br> 0 mod 2 = 0;
    <br> 1 mod 2 = 1;
    <br> 2 mod 2 = 0;`,
});
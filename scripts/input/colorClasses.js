addNode("hsl2rgb", {
  alias: ["HSL to RGB", "hsv", "rgb", "hsl"],
  inputs: ["H", "S", "L"],
  func: (h, s, l) => {
    function hslToRgb(h, s, l) {
      h /= 360;
      h = h % 1;
      s /= 100;
      l /= 100;
      var r, g, b;

      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        var hue2rgb = function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    return hslToRgb(parseFloat(h) || 0, parseFloat(s) || 0, parseFloat(l) || 0);
  },
  color: "fuchsia",
  outputs: ["R", "G", "B"],
  doc: "Converts hue, saturation and lightness inputs into red, green and blue.",
});
addNode("rgb2hsl", {
  alias: ["RGB to HSL", "hsv", "rgb", "hsl"],
  inputs: ["R", "G", "B"],
  func: (r, g, b) => {
    const RGBToHSL = (r, g, b) => {
      r /= 255;
      g /= 255;
      b /= 255;
      const l = Math.max(r, g, b);
      const s = l - Math.min(r, g, b);
      const h = s
        ? l === r
          ? (g - b) / s
          : l === g
          ? 2 + (b - r) / s
          : 4 + (r - g) / s
        : 0;
      return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
      ];
    };
    return RGBToHSL(parseFloat(r) || 0, parseFloat(g) || 0, parseFloat(b) || 0);
  },
  color: "fuchsia",
  outputs: ["H", "S", "L"],
  doc: "Converts red, green and blue inputs into hue, saturation and lightness.",
});
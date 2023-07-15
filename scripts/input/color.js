addNode("hsl2rgb", {
  alias: ["HSL to RGB", "hsv", "rgb", "hsl"],
  inputs: ["H", "S", "L"],
  func: (h, s, l) => {
    console.log(h);
    return hslToRgb(h || 0, s || 0, l || 0);
  },
  color: "fuchsia",
  outputs: ["R", "G", "B"],
  doc: "Converts hue, saturation and lightness inputs into red, green and blue.",
});

addNode("rgb2hsl", {
  alias: ["RGB to HSL", "hsv", "rgb", "hsl"],
  inputs: ["R", "G", "B"],
  func: (r, g, b) => {
    return RGBToHSL(r || 0, g || 0, b || 0);
  },
  color: "fuchsia",
  outputs: ["H", "S", "L"],
  doc: "Converts red, green and blue inputs into hue, saturation and lightness.",
});

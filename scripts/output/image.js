addNode(
  "xpos",
  ["X Position", "xcoord", "X"],
  [],
  () => {
    return rentex.rx;
  },
  "grey",
  {},
  {
    dynamic: true,
    doc: `In 2D RenTex mode: The X position of the pixel, 0 being the very left most column.`,
  }
);

addNode("size", {
  alias: ["Render Size", "render"],
  inputs: ["Width", "Height"],
  func: (width, height) => {
    rentex.width = width || 300;
    rentex.height = height || 300;
    document.querySelector("#rentex").setAttribute("width", rentex.width);
    document.querySelector("#rentex").setAttribute("height", rentex.height);
    return;
  },
  color: "grey",
  headerAttrs: {
    "data-sizeoutput": "true",
  },
  doc: `In 2D RenText mode, this node sets the width and height of the rendered image.`,
  no_out: true,
});

addNode("width", {
  alias: ["Render Width", "image width"],
  func: () => {
    return rentex.width;
  },
  color: "grey",
  doc: `Returns the width of the render, 300 by default.`,
});

addNode("height", {
  alias: ["Render Height", "image height"],
  func: () => {
    return rentex.height;
  },
  color: "grey",
  doc: `Returns the height of the render, 300 by default.`,
});

addNode("ypos", {
  alias: ["Y Position", "ycoord", "Y"],
  func: () => {
    return rentex.ry;
  },
  color: "grey",
  doc: `In 2D RenTex mode: The Y position of the pixel, 0 being the very top most row.`,
});
addNode("redout", {
  alias: ["Red (0-255)", "r", "red"],
  inputs: ["R"],
  func: (output) => {
    return output;
  },
  color: "darkred",
  headerAttrs: {
    "data-redoutput": "true",
  },
  no_out: true,
  doc: `Sets the red value of the pixel in 2D RenTex mode.`,
});
addNode("greenout", {
  alias: ["Green (0-255)", "g", "green"],
  inputs: ["G"],
  func: (output) => {
    return output;
  },
  color: "darkgreen",
  headerAttrs: {
    "data-greenoutput": "true",
  },
  no_out: true,
  doc: `Sets the green value of the pixel in 2D RenTex mode.`,
});
addNode("blueout", {
  alias: ["Blue (0-255)", "b", "blue"],
  inputs: ["B"],
  func: (output) => {
    return output;
  },
  color: "darkblue",
  headerAttrs: {
    "data-blueoutput": "true",
  },
  no_out: true,
  doc: `Sets the blue value of the pixel in 2D RenTex mode.`,
});
addNode("alphaout", {
  alias: ["Opacity (0-255)", "a", "alpha", "opacity"],
  inputs: ["A"],
  func: (output) => {
    return output;
  },
  color: "grey",
  headerAttrs: {
    "data-alphaoutput": "true",
  },
  no_out: true,
  doc: `Sets the alpha value of the pixel in 2D RenTex mode. 0 means transparent, 255 means fully opaque.`,
});

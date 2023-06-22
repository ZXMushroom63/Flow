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

addNode(
  "size",
  ["Render Size", "render"],
  ["Width", "Height"],
  (width, height) => {
    rentex.width = width || 300;
    rentex.height = height || 300;
    document.querySelector("#rentex").setAttribute("width", rentex.width);
    document.querySelector("#rentex").setAttribute("height", rentex.height);
    return;
  },
  "grey",
  {
    "data-sizeoutput": "true",
  },
  {
    no_out: true,
    static: true,
    doc: `In 2D RenText mode, this node sets the width and height of the rendered image.`,
  }
);

addNode(
  "width",
  ["Render Width", "image width"],
  [],
  () => {
    return rentex.width;
  },
  "grey",
  {},
  {
    doc: `Returns the width of the render, 300 by default.`,
  }
);

addNode(
  "height",
  ["Render Height", "image height"],
  [],
  () => {
    return rentex.height;
  },
  "grey",
  {},
  {
    doc: `Returns the height of the render, 300 by default.`,
  }
);

addNode(
  "ypos",
  ["Y Position", "ycoord", "Y"],
  [],
  () => {
    return rentex.ry;
  },
  "grey",
  {},
  {
    dynamic: true,
    doc: `In 2D RenTex mode: The Y position of the pixel, 0 being the very top most row.`,
  }
);
addNode(
  "redout",
  ["Red (0-255)", "r", "red"],
  ["R"],
  (output) => {
    return output;
  },
  "darkred",
  {
    "data-redoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the red value of the pixel in 2D RenTex mode.`,
  }
);
addNode(
  "greenout",
  ["Green (0-255)", "g", "green"],
  ["G"],
  (output) => {
    return output;
  },
  "darkgreen",
  {
    "data-greenoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the green value of the pixel in 2D RenTex mode.`,
  }
);
addNode(
  "blueout",
  ["Blue (0-255)", "b", "blue"],
  ["B"],
  (output) => {
    return output;
  },
  "darkblue",
  {
    "data-blueoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the blue value of the pixel in 2D RenTex mode.`,
  }
);
addNode(
  "alphaout",
  ["Opacity (0-255)", "a", "alpha", "opacity"],
  ["A"],
  (output) => {
    return output;
  },
  "grey",
  {
    "data-alphaoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the alpha value of the pixel in 2D RenTex mode. 0 means transparent, 255 means fully opaque.`,
  }
);
var rentex = {
  rx: 0,
  ry: 0,
  width: 300,
  height: 300,
};
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
  }
);

addNode(
  "width",
  ["Render Width", "image width"],
  [],
  () => {
    return rentex.width;
  },
  "grey"
);

addNode(
  "height",
  ["Render Height", "image height"],
  [],
  () => {
    return rentex.height;
  },
  "grey"
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
  }
);
function renderTexture2D() {
  try {
    getSize();
    getRed();
    getGreen();
    getBlue();
    getAlpha();
  } catch (error) {
    alert(error);
  }
  var ctx = document.querySelector("#rentex").getContext("2d");
  var imageData = ctx.createImageData(rentex.width, rentex.height);
  var data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    rentex.rx = (i / 4) % rentex.width;
    rentex.ry = Math.floor(i / 4 / rentex.width);
    data[i] = getRed(true);
    data[i + 1] = getGreen(true);
    data[i + 2] = getBlue(true);
    data[i + 3] = getAlpha(true);
  }
  ctx.putImageData(imageData, 0, 0);
}
function downloadRenderTexture() {
  var link = document.createElement("a");
  link.download = "rentex.png";
  link.href = document.querySelector("#rentex").toDataURL();
  link.click();
}
function rModeUpdate(mode) {
  switch (mode) {
    case "number":
      document.querySelector("#rentex").classList.add("hidden");
      document.querySelector("#rdownload").classList.add("hidden");
      document.querySelector("#render").classList.add("hidden");
      document.querySelector("#nOutputDisp").classList.remove("hidden");
      document.querySelector("#run").classList.remove("hidden");
      document
        .querySelector("#autoEval")
        .parentElement.classList.remove("hidden");
      break;

    case "rentex":
      document.querySelector("#rdownload").classList.remove("hidden");
      document.querySelector("#rentex").classList.remove("hidden");
      document.querySelector("#render").classList.remove("hidden");
      document.querySelector("#nOutputDisp").classList.add("hidden");
      document.querySelector("#run").classList.add("hidden");
      document.querySelector("#autoEval").parentElement.classList.add("hidden");
      break;
  }
}
function getRed(auto = false) {
  if (!document.querySelector(".node .header[data-redoutput]")) {
    if (!auto) {
      alert(
        "Unable to get red output due to lack of a redout node. Insert an redout node to continue."
      );
    }
    return 0;
  }
  var outputNode = document.querySelector(
    ".node .header[data-redoutput]"
  ).parentElement;
  return outputNode.getValue();
}
function getSize() {
  if (!document.querySelector(".node .header[data-sizeoutput]")) {
    return;
  }
  var outputNode = document.querySelector(
    ".node .header[data-sizeoutput]"
  ).parentElement;
  outputNode.getValue();
}
function getAlpha(auto = false) {
  if (!document.querySelector(".node .header[data-alphaoutput]")) {
    if (!auto) {
      alert(
        "Unable to get alpha output due to lack of a alphaout node. Insert an alphaout node to continue."
      );
    }
    return 255;
  }
  var outputNode = document.querySelector(
    ".node .header[data-alphaoutput]"
  ).parentElement;
  return outputNode.getValue();
}
function getGreen(auto = false) {
  if (!document.querySelector(".node .header[data-greenoutput]")) {
    if (!auto) {
      alert(
        "Unable to get green output due to lack of a greenout node. Insert an greenout node to continue."
      );
    }
    return 0;
  }
  var outputNode = document.querySelector(
    ".node .header[data-greenoutput]"
  ).parentElement;
  return outputNode.getValue();
}
function getBlue(auto = false) {
  if (!document.querySelector(".node .header[data-blueoutput]")) {
    if (!auto) {
      alert(
        "Unable to get blue output due to lack of a blueout node. Insert an blueout node to continue."
      );
    }
    return 0;
  }
  var outputNode = document.querySelector(
    ".node .header[data-blueoutput]"
  ).parentElement;
  return outputNode.getValue();
}

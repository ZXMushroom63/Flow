window.rentex = {
  width: 255,
  height: 255,
  rx: 0,
  ry: 0,
};
addNode("canvas", {
  alias: ["Canvas (2D)", "render", "rentex", "2drentex", "pixel", "rgb", "rgba"],
  inputs: ["R", "G", "B", "A", "Width", "Height"],
  outputs: [],
  renameable: true,
  func: function (r, g, b, a, width, height) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.width = Math.floor(width) || 255;
    this.height = Math.floor(height) || 255;
    return [];
  },
  init: function () {
    let self = this;
    var canvas = document.createElement("canvas");
    canvas.width = 255;
    canvas.height = 255;
    canvas.style.display = "block";
    this.append(canvas);
    var renderBtn = document.createElement("div");
    renderBtn.classList.add("btn");
    renderBtn.style.display = "block";
    renderBtn.style.float = "right";
    renderBtn.innerText = "Render";
    this.append(renderBtn);
    var downloadBtn = document.createElement("div");
    downloadBtn.classList.add("btn");
    downloadBtn.style.display = "block";
    downloadBtn.style.float = "right";
    downloadBtn.innerText = "Download";
    this.append(downloadBtn);
    downloadBtn.addEventListener("click", function () {
      var link = document.createElement("a");
      link.download = "rentex.png";
      canvas.toBlob(blob => {
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(blob);
      });
    });
    renderBtn.addEventListener("click", function () {
      if (flags.benchmarking) {
        var start = performance.now();
      }
      window.rentex.rx = 0;
      window.rentex.ry = 0;

      var graph = compileGraph(self);
      graph.calculate(true);
      var recompiled = recompileGraph(graph);
      canvas.width = self.width;
      rentex.width = canvas.width;
      canvas.height = self.height;
      rentex.height = canvas.height;
      var ctx = canvas.getContext("2d");
      var imageData = ctx.createImageData(self.width, self.height);
      var data = imageData.data;
      var aspectRatio = (self.width / self.height);
      for (let i = 0; i < data.length; i += 4) {
        rentex.rx = (i / 4) % self.width;
        rentex.ry = Math.floor(i / 4 / self.height / aspectRatio);
        recompiled();
        data[i] = self.r;
        data[i + 1] = self.g;
        data[i + 2] = self.b;
        data[i + 3] = self.a;
      }
      ctx.putImageData(imageData, 0, 0);
      if (flags.benchmarking) {
        console.log("Rendered image with graph in "+(performance.now()-start).toFixed(2)+"ms");
      }
      soundEffect("chime");
      self.dragListeners.forEach((func) => {
        func();
      });
    });
  },
  doc: `Used to make renders. 
  <br>The R, G and B inputs represent the red, green and blue value of an image. 0 is the minimum, and 255 is the maximum. 
  <br>A: the opacity. 255 is fully opaque, and 0 is fully transparent. 
  <br>Width and Height: The width and height of the render in pixels. How to use: press (Render) to draw the image, and (Download) to save it to your device.`,
});

addNode("xpos", {
  alias: ["X Position", "xcoord", "X"],
  func: () => {
    return [window?.rentex?.rx || 0];
  },
  color: "grey",
  doc: `The X position of the pixel, 0 being the very left most column.`,
});

addNode("width", {
  alias: ["Render Width", "image width"],
  func: () => {
    return [window?.rentex?.width || 0];
  },
  color: "grey",
  doc: `Returns the width of the render, 255 by default.`,
});

addNode("height", {
  alias: ["Render Height", "image height"],
  func: () => {
    return [window?.rentex?.height || 0];
  },
  color: "grey",
  doc: `Returns the height of the render, 255 by default.`,
});

addNode("ypos", {
  alias: ["Y Position", "ycoord", "Y"],
  func: () => {
    return [window?.rentex?.ry || 0];
  },
  color: "grey",
  doc: `The Y position of the pixel, 0 being the very top most row.`,
});

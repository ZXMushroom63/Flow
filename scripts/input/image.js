addNode("texturesample", {
  alias: ["Texture Sample", "image", "image2d", "2d image", "2d texture", "texture"],
  inputs: ["X", "Y"],
  usespkg: ["(texturesample is not packageeable)"],
  outputs: ["R", "G", "B", "A", "Width", "Height"],
  func: function (x, y) {
    var tx = Math.max(Math.min(Math.floor(x), this.dataWidth - 1), 0);
    var ty = Math.max(Math.min(Math.floor(y), this.dataHeight - 1), 0);
    var i = (ty * this.dataWidth + tx) * 4;
    return [this.imageData[i], this.imageData[i + 1], this.imageData[i + 2], this.imageData[i + 3], this.dataWidth, this.dataHeight];
  },
  init: function () {
    let self = this;
    self.imageData = [0, 0, 0, 0];
    self.dataWidth = 1;
    self.dataHeight = 1;

    var displayCanvas = document.createElement("canvas");
    displayCanvas.width = 256;
    displayCanvas.height = 256;
    displayCanvas.style.display = "block";
    this.append(displayCanvas);

    var internalCanvas = document.createElement("canvas");
    internalCanvas.width = 256;
    internalCanvas.height = 256;
    internalCanvas.style.display = "none";
    this.append(internalCanvas);

    var imageUrl = null;
    var displayCtx = displayCanvas.getContext("2d");
    var ctx = internalCanvas.getContext("2d");

    var imgInfo = document.createElement("span");
    imgInfo.style.display = "block";
    imgInfo.style.color = "white";
    self.append(imgInfo);

    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "block";
    fileInput.style.color = "white";
    fileInput.addEventListener("input", () => {
      if (fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = () => {
          fileInput.value = "";
          const blob = new Blob([reader.result], { type: 'image/*' });
          if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
          }
          imageUrl = URL.createObjectURL(blob);
          const img = new Image()
          img.src = imageUrl;
          img.onload = function () {
            internalCanvas.width = img.naturalWidth;
            internalCanvas.height = img.naturalHeight;
            imgInfo.innerText = `Res: ${img.naturalWidth}x${img.naturalHeight}`;
            self.dataWidth = img.naturalWidth;
            self.dataHeight = img.naturalHeight;
            ctx.clearRect(0, 0, img.naturalWidth, img.naturalHeight);
            displayCtx.drawImage(img, 0, 0, 256, 256);
            ctx.drawImage(img, 0, 0);
            self.imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
          }
        };
        reader.readAsArrayBuffer(fileInput.files[0]);
      }
    });
    this.append(fileInput);
  },
  color: "darkcyan",
  doc: "Returns RGBA colors at the X and Y coordinates of a selected image. Also outputs with and height of the image.",
});
addNode("output2", {
  alias: ["Vec2 Output", "out2"],
  inputs: ["x", "y"],
  func: (x, y) => {
    return [x, y];
  },
  color: "darkorange",
  outputs: [],
  doc: `Serves as an output for two numbers.`,
  renameable: true,
  init: function () {
    var self = this;

    var canvasVisible = false;
    var fadingEnabled = true;
    var canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    canvas.innerText = "Your browser does not support canvas.";
    canvas.style = `margin-top: 1.5rem; display: none;`;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, 256, 256);

    canvas.addEventListener("click", (e)=>{
      e.preventDefault();
      ctx.fillStyle = "rgb(20,20,20)";
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = "rgba(20,20,20,0.15)";
    });

    canvas.addEventListener("contextmenu", (e)=>{
      e.preventDefault();
      fadingEnabled = !fadingEnabled;
    });

    self.append(canvas);

    var captions = document.createElement("span");
    captions.style = `color: white; display: none;`
    captions.innerText = "Left-click to clear, Right-click to toggle fade";
    self.append(captions);

    var exportBtn = document.createElement("div");
    exportBtn.classList.add("btn");
    exportBtn.innerText = "Export";
    exportBtn.style = `
    margin-top: 2rem;
    `;
    exportBtn.style.display = "block";
    exportBtn.style.float = "right";
    exportBtn.addEventListener("click", () => {
      if (flags.benchmarking) {
        var start = performance.now();
      }
      function sanitise(str, arr) {
        var newStr = str;
        arr.forEach((x) => {
          newStr = newStr.replaceAll(x, "");
        });
        return newStr;
      }
      function sanitiseJS(str) {
        str = str.replaceAll(/^[^a-zA-Z_]+/g, "_");
        str = str.replaceAll(/\W+/g, "_");
        return str;
      }
      var title = sanitise(self.querySelector(".header").innerText, [
        "\\",
        "/",
        ":",
        "?",
        '"',
        "<",
        ">",
        "|",
      ]);
      function dl(filename, text) {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }
      var gStr = translateGraph(
        compileGraph(self, true, true),
        sanitiseJS(self.querySelector(".header").innerText)
          ? sanitiseJS(self.querySelector(".header").innerText)
          : "main"
      );
      if (flags.benchmarking) {
        console.log(
          "Exported graph in " + (performance.now() - start).toFixed(2) + "ms"
        );
      }
      dl(
        title + ".js",
        `//Check for missing dependencies! If the exporter gave any alert messages, pay attention to them!\n\n${gStr};\n\n//Call ${sanitiseJS(self.querySelector(".header").innerText)}() to get the results as an array of numbers.`
      );
    });
    self.append(exportBtn);

    var toggleDisplayBtn = document.createElement("div");
    toggleDisplayBtn.classList.add("btn");
    toggleDisplayBtn.innerText = "Preview";
    toggleDisplayBtn.style = `
    margin-top: 2rem;
    `;
    toggleDisplayBtn.addEventListener("click", ()=>{
      if (canvasVisible) {
        canvasVisible = false;
        canvas.style.display = "none";
        captions.style.display = "none";
      } else {
        canvasVisible = true;
        canvas.style.display = "block";
        captions.style.display = "inline-block";
      }
    });
    toggleDisplayBtn.style.display = "block";
    toggleDisplayBtn.style.float = "right";
    self.append(toggleDisplayBtn);

    let calculationsPerSecond = 30;

    let delay = 1000 / calculationsPerSecond;
    let getVal = self.getValue;
    var prev = null;
    ctx.fillStyle = "rgba(20,20,20,0.15)";
    function run() {
      setTimeout(() => {
        var out = getVal();

        if (!prev) {
          prev = out;
        }

        if (canvasVisible) {
          if (fadingEnabled) {
            ctx.fillRect(0, 0, 256, 256);
          }

          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.moveTo(((prev[0] + 1) / 2) * 256, ((prev[1] * -1 + 1) / 2) * 256);
          ctx.lineTo(((out[0] + 1) / 2) * 256, ((out[1] * -1 + 1) / 2) * 256);
          ctx.stroke();
        }

        prev = out;

        run();
      }, delay);
    }
    run();
  },
});

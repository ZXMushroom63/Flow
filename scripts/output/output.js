addNode("output", {
  alias: ["Output", "out", "out1"],
  inputs: ["x"],
  func: (out) => {
    return [out];
  },
  color: "darkorange",
  outputs: [],
  doc: `Serves as an output for a number.`,
  renameable: true,
  init: function () {
    var self = this;
    var display = document.createElement("div");
    display.innerText = "0.00";
    display.style = `
    background-color: rgb(20,20,20);
    color: rgb(240,240,240);
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    font-size: 3rem;
    border-radius: 0.5rem;
    border: 2px solid rgb(40,40,40);
    padding: 0.1rem;
    margin-top: 1.5rem;
    white-space: nowrap;
    `;
    self.append(display);
    
    var exportBtn = document.createElement("div");
    exportBtn.classList.add("btn");
    exportBtn.innerText = "Export";
    exportBtn.style = `
    margin-top: 2rem;
    `;
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

    let calculationsPerSecond = 10;

    let delay = 1000 / calculationsPerSecond;
    let getVal = self.getValue;
    function run() {
      setTimeout(() => {
        display.innerText = (parseFloat(getVal()[0]) || 0.0).toFixed(3);
        if (display.innerText.length > 7) {
          display.innerText = display.innerText.split(".")[0];
        }
        if (display.innerText.length > 7) {
          display.innerText = parseFloat(display.innerText).toExponential(2);
        }
        run();
      }, delay);
    }
    run();
  },
});

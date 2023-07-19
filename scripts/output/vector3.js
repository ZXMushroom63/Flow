addNode("output3", {
  alias: ["Vec3 Output", "out3"],
  inputs: ["x", "y", "z"],
  func: (x, y, z) => {
    return [x, y, z];
  },
  color: "darkorange",
  outputs: [],
  doc: `Serves as an output for three numbers.`,
  renameable: true,
  init: function () {
    var self = this;
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

    let calculationsPerSecond = 3;

    let delay = 1000 / calculationsPerSecond;
    let getVal = self.getValue;
    function run() {
      setTimeout(() => {
        getVal();
        run();
      }, delay);
    }
    run();
  },
});

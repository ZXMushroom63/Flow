addNode("output", {
  alias: ["Output"],
  inputs: ["Out"],
  func: (out) => {
    return [out];
  },
  color: "darkorange",
  outputs: [],
  doc: `Serves as an output for a number.`,
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
      function sanitise(str, arr) {
        var newStr = str;
        arr.forEach((x) => {
          newStr = newStr.replaceAll(x, "");
        });
        return newStr;
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
      dl(
        title + ".js",
        `//Check for missing dependencies! If the exporter gave any alert messages, pay attention to them!\nconst graph = ${stringifyGraph(
          compileGraph(self, true, true)
        )};\n//Call graph.calculate() to get the results.`
      );
    });
    self.append(exportBtn);

    let calculationsPerSecond = 5;

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

addNode("table", {
  alias: ["Table", "map", "mapping", "linear relationship", "relationship"],
  inputs: ["start", "stop", "step", "y"],
  func: function (start, stop, step, y) {
    this.start = parseFloat(start);
    this.stop = parseFloat(stop);
    this.step = parseFloat(step);
    this.y = parseFloat(y);
    return [y];
  },
  color: "darkorange",
  outputs: [],
  doc: `Maps x to y between the provided range. Use X position to read the x value.`,
  renameable: true,
  init: function () {
    var self = this;
    var table = document.createElement("table");
    table.innerHTML = `<tr><td>x</td><td>y</td></tr><tr><td>0</td><td>0</td></tr>`;
    table.style = `display: block; height: 256px; overflow-y: scroll;`
    table.classList.add("outlineTable");
    self.append(table);

    var toggleDisplayBtn = document.createElement("div");
    toggleDisplayBtn.classList.add("btn");
    toggleDisplayBtn.innerText = "Build";
    toggleDisplayBtn.style = `
    margin-top: 2rem;
    `;
    toggleDisplayBtn.addEventListener("click", ()=>{
      run();
    });
    toggleDisplayBtn.style.display = "block";
    toggleDisplayBtn.style.float = "right";
    self.append(toggleDisplayBtn);
    
    function run() {
      window.rentex.rx = 0;
      window.rentex.ry = 0;
      var graph = compileGraph(self);
      graph.calculate(true);
      var start = self.start;
      window.rentex.rx = start;
      var stop = self.stop;
      var step = self.step;
      graph.calculate(true);
      var cap = 1000;
      var count = 0;
      var recompiled = recompileGraph(graph);
      var extraHtml = `<tr><td>x</td><td>y</td></tr>`;
      for (let x = start; x <= stop; x += step) {
        window.rentex.rx = x;
        recompiled();
        count += 1;
        if (count > cap) {
          break;
        }
        extraHtml += `<tr><td>${x}</td><td>${self.y}</td></tr>`
      }
      table.innerHTML = extraHtml;
    }
  },
});

addNode("output", {
  alias: ["Output"],
  inputs: ["Out"],
  func: (output) => {
    return output;
  },
  color: "darkorange",
  no_out: true,
  doc: `Serves as an output for an individual value. The value it gets from 'Out' is displayed in the toolbar.`,
  init: function () {
    let calculationsPerSecond = 5;

    let delay = 1000 / calculationsPerSecond;
    let getVal = this.getValue;
    function run() {
      setTimeout(() => { 
        getVal();
        run();
      }, delay);
    }
    run();
  },
});

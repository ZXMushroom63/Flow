addNode("output", {
  alias: ["Output"],
  inputs: ["Out"],
  func: (output) => {
    return output;
  },
  color: "darkorange",
  no_out: true,
  doc: `Serves as an output for a number.`,
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

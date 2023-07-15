addNode("output", {
  alias: ["Output"],
  inputs: ["Out"],
  func: () => {
    return [];
  },
  color: "darkorange",
  outputs: [],
  doc: `Serves as an output for a number.`,
  renameable: true,
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

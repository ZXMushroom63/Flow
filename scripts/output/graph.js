addNode("analoggraph", {
  alias: ["Analog Graph", "analog", "graph"],
  inputs: ["x"],
  func: (x) => {
    return [x];
  },
  color: "darkorange",
  outputs: [],
  doc: `Plots a number input from -1.0 to 1.0 as a scrolling graph.`,
  renameable: true,
  init: function () {
    var self = this;
    var circularBuffer = Array(256).fill(0);
    var canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    canvas.innerText = "Your browser does not support canvas.";
    canvas.style = `margin-top: 1.5rem; display: block;`;

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, 256, 256);

    canvas.addEventListener("click", (e)=>{
      e.preventDefault();
      circularBuffer.fill(0.0);
    });

    self.append(canvas);

    var captions = document.createElement("span");
    captions.style = `color: white; display: inline-block;`
    captions.innerText = "Left-click to clear";
    self.append(captions);

    let calculationsPerSecond = 32;

    let delay = 1000 / calculationsPerSecond;
    let getVal = self.getValue;
    
    function circularPush(elem) {
      circularBuffer.shift();
      circularBuffer.push(elem);
    }
    ctx.fillStyle = "rgb(0,0,0)";
    function run() {
      setTimeout(() => {
        var out = getVal();

        ctx.fillRect(0, 0, 256, 256);
        circularPush(out[0]);
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(0, ((circularBuffer[0] * -1 + 1) / 2) * 256);
        for (let i = 1; i < 256; i++) {
          ctx.lineTo(i, ((circularBuffer[i] * -1 + 1) / 2) * 256);
        }
        ctx.lineWidth = 2;
        ctx.stroke();

        run();
      }, delay);
    }
    run();
  },
});

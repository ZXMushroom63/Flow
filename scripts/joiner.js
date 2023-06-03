function lerp(a, b, k) {
  return (b - a) * k + a;
}
function makeJoiner(output, input) {
  var outRect = output.getBoundingClientRect();
  var inRect = input.getBoundingClientRect();
  var x1 = outRect.x + outRect.width;
  var y1 = outRect.y + outRect.height / 2;
  var x2 = inRect.x;
  var y2 = inRect.y + inRect.height / 2;
  var svg = document.createElement("svg");
  svg.setAttribute("width", Math.abs(x1 - x2));
  svg.setAttribute("height", Math.abs(y1 - y2));
  svg.setAttribute("viewBox", `${x1} ${y1} ${x2} ${y2}`);
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("version", "1.1");
  //var path = document.createElement("path");
//   path.setAttribute(
//     "d",
//     `M${x1},${y1} L${x2},${y2}`
//   );
  /*/
  C${lerp(x1, x2, 0.25)},${lerp(y1, y2, 0.25)} ${lerp(
      x1,
      x2,
      0.75
    )},${lerp(y1, y2, 0.75)} ${x2},${y2}
  /*/
  //path.setAttribute("stroke", "red");
  //path.setAttribute("stroke-width", "5");
  //path.setAttribute("class", "SamplePath");
  //svg.append(path);
  var line = document.createElement("line");
  line.setAttribute("x1", x1);
  line.setAttribute("x2", x2);
  line.setAttribute("y1", y1);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "red");
  line.setAttribute("stroke-width", "2");
  svg.append(line);
  svg.classList.add("joiner");
  svg.style = `top: ${y1}px; left: ${x1}px; width: ${Math.abs(x1 - x2)}; height: ${Math.abs(y1 - y2)}`;
  document.querySelector("#canvas").append(svg);
}

function linkDragHandler(outputElem) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  outputElem.onmousedown = dragMouseDown;
  outputElem.ontouchstart = dragMouseDown;
  line = undefined;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    /*/ get the mouse cursor position at startup:/*/
    pos3 = typeof e.touches === "object" ? e.touches[0].clientX : e.clientX;
    pos4 = typeof e.touches === "object" ? e.touches[0].clientY : e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    document.ontouchcancel = closeDragElement;
    /*/ call a function whenever the cursor moves:/*/
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
    //hey dont know what i was doing, if something breaks, uncomment!
    // if (outputElem["link"]) {
    //   var l = outputElem["link"];
    //   var k = l["outputNode"];
    //   k["link"] = null;
    //   outputElem["link"] = null;
    // }
    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttributeNS(null, "x1", pos3);
    line.setAttributeNS(null, "x2", pos3);
    line.setAttributeNS(null, "y1", pos4);
    line.setAttributeNS(null, "y2", pos4);
    line.setAttributeNS(null, "stroke", "white");
    line.setAttributeNS(null, "stroke-width", "4");
    line.setAttributeNS(
      null,
      "style",
      "stroke:white;stroke-width:4;stroke-linecap:round;"
    );
    document.querySelector("#linkCanvas").appendChild(line);
    soundEffect("click");
    window.graphUpdateListeners.forEach(listener => {listener()});
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 =
      pos3 - (typeof e.touches === "object" ? e.touches[0].clientX : e.clientX);
    pos2 =
      pos4 - (typeof e.touches === "object" ? e.touches[0].clientY : e.clientY);
    pos3 = typeof e.touches === "object" ? e.touches[0].clientX : e.clientX;
    pos4 = typeof e.touches === "object" ? e.touches[0].clientY : e.clientY;
    if (line) {
      line.setAttributeNS(null, "x2", pos3);
      line.setAttributeNS(null, "y2", pos4);
    }
    /*/ set the element's new position:/*/
  }

  function closeDragElement() {
    /*/ stop moving when mouse button is released:/*/
    var el = document.elementFromPoint(pos3, pos4);
    if (
      el.tagName.toLowerCase() === "td" &&
      el.classList.contains("input") &&
      outputElem.parentElement.parentElement.outerHTML !==
      el.parentElement.parentElement.parentElement.outerHTML
    ) {
      if (el.innerText.includes("⏩") && !outputElem.innerText.includes("⏩") || !el.innerText.includes("⏩") && outputElem.innerText.includes("⏩")) {
        if (line.remove) {
          line.remove();
        }
      } else {
        if (outputElem.innerText.includes("⏩")) {
          if (outputElem["link"]) {
            outputElem["link"]["inputNode"] = null;
            outputElem["link"]["outputNode"] = null;
            if (outputElem["link"].remove) {
              outputElem["link"].remove();
            }
            outputElem["link"] = null;
          }
        }
        if (el["link"]) {
          if (el["link"]["outputNode"]) {
            var offenders = el["link"]["outputNode"].parentElement.parentElement.removeListeners.filter((elem)=>{return elem.relevantlink === el["link"]});
            offenders.forEach(offender => {
              var idx = el["link"]["outputNode"].parentElement.parentElement.removeListeners.indexOf(offender);
              if (idx !== -1) {
                el["link"]["outputNode"].parentElement.parentElement.removeListeners.splice(idx, 1);
              }
            });
          }
          el["link"]["inputNode"] = null;
          if (el["link"].remove) {
            el["link"].remove();
          }
          el["link"] = null;
        }
        if (line.remove) {
          line.remove();
        }
        soundEffect("connect");

        makeLink(outputElem, el);
        window.graphUpdateListeners.forEach(listener => {listener()});
      }
    } else {
      if (line.remove) {
        line.remove();
      }
    }
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchcancel = null;
    document.ontouchmove = null;
  }
}

function lerp(a, b, k) {
  return (b - a) * k + a;
}

function resize() {
  document
    .querySelector("#linkCanvas")
    .setAttribute("width", window.innerWidth);
  document
    .querySelector("#linkCanvas")
    .setAttribute("height", window.innerHeight);
  document
    .querySelector("#linkCanvas")
    .setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    document.querySelectorAll(".node").forEach(node=>{
      if (node["dragListeners"]) {
        node["dragListeners"].forEach(listener => {listener()});
      }
    });
}

function makeLink(output, input) {
  var outRect = output.getBoundingClientRect();
  var inRect = input.getBoundingClientRect();
  var x1 = outRect.x + outRect.width;
  var y1 = outRect.y + outRect.height / 2;
  var x2 = inRect.x;
  var y2 = inRect.y + inRect.height / 2;
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
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttributeNS(
    null,
    "style",
    "stroke:white;stroke-width:4;stroke-linecap:round;fill:none;"
  );
  path.setAttributeNS(
    null,
    "d",
    `M${x1},${y1} C${lerp(x1, x2, 0.8)},${lerp(y1, y2, 0.2)} ${lerp(
      x1,
      x2,
      0.2
    )},${lerp(y1, y2, 0.8)} ${lerp(x1, x2, 1)},${lerp(y1, y2, 1)}`
  );
  path["outputNode"] = output;

  path["inputNode"] = input;

  output["link"] = path;
  input["link"] = path;
  output.closest(".node")["removeListeners"].push((() => {
    var func = () => {
      output["link"] = null;
      input["link"] = null;
      path.remove();
    };
    func.relevantlink = path;
    return func;
  })());
  input.closest(".node")["removeListeners"].push((() => {
    var func = () => {
      output["link"] = null;
      input["link"] = null;
      path.remove();
    };
    func.relevantlink = path;
    return func;
  })());
  output.closest(".node")["dragListeners"].push(() => {
    var outRect = output.getBoundingClientRect();
    var inRect = input.getBoundingClientRect();
    var x1 = outRect.x + outRect.width;
    var y1 = outRect.y + outRect.height / 2;
    var x2 = inRect.x;
    var y2 = inRect.y + inRect.height / 2;
    path.setAttributeNS(
      null,
      "d",
      `M${x1},${y1} C${lerp(x1, x2, 0.8)},${lerp(y1, y2, 0.2)} ${lerp(
        x1,
        x2,
        0.2
      )},${lerp(y1, y2, 0.8)} ${lerp(x1, x2, 1)},${lerp(y1, y2, 1)}`
    );
  });
  input.closest(".node")["dragListeners"].push(() => {
    var outRect = output.getBoundingClientRect();
    var inRect = input.getBoundingClientRect();
    var x1 = outRect.x + outRect.width;
    var y1 = outRect.y + outRect.height / 2;
    var x2 = inRect.x;
    var y2 = inRect.y + inRect.height / 2;
    path.setAttributeNS(
      null,
      "d",
      `M${x1},${y1} C${lerp(x1, x2, 0.8)},${lerp(y1, y2, 0.2)} ${lerp(
        x1,
        x2,
        0.2
      )},${lerp(y1, y2, 0.8)} ${lerp(x1, x2, 1)},${lerp(y1, y2, 1)}`
    );
  });
  document.querySelector("#linkCanvas").appendChild(path);
  return path;
}

resize();
window.addEventListener("resize", resize);

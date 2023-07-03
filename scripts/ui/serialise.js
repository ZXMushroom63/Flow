function serialise() {
  var nodes = document.querySelectorAll(".node");
  var serialised = {
    nodes: [],
    zoomIndex: zoomIndex,
  };
  console.log("Parsed "+nodes.length+" nodes.");
  for (let i = 0; i < nodes.length; i++) {
    
    const node = nodes[i];
    var inputRows = node.querySelectorAll(".inputRow");
    var inputs = [];
    for (let x = 0; x < inputRows.length; x++) {
      var row = inputRows[x];
      var link = null;
      if (row.childNodes[0]["link"]) {
        link = Array.prototype.indexOf.call(
          nodes,
          row.childNodes[0]["link"]["outputNode"].closest(".node")
        );
      }
      if (link === -1) {
        link = null;
      }
      inputs.push({
        link: link,
        value: row.childNodes[1].querySelector("input").value,
      });
    }
    var label = node.querySelector(".header").innerText;
    serialised.nodes.push({
      type: node.getAttribute("data-type"),
      x: node.getAttribute("data-x"),
      y: node.getAttribute("data-y"),
      label: label,
      inputs: inputs,
    });
  }
  return serialised;
}

function deserialise(serialised) {
  if (!serialised) {
    return;
  }
  var nodes = document.querySelectorAll(".node");
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node["removeListeners"].forEach((func) => {
      func();
    });
    node.remove();
  }
  zoomIndex = serialised.zoomIndex || 1;
  updateZoom();
  
  serialised.nodes.forEach((nodeData) => {
    var n = addNodeToCanvas(
      window.library[nodeData.type] || window.library["unknown"],
      0,
      0
    );
    n.setAttribute("style", `top: ${nodeData.y}px; left: ${nodeData.x}px;`);
    n.setAttribute("data-x", nodeData.x);
    n.setAttribute("data-y", nodeData.y);
  });
  var newNodes = document.querySelectorAll(".node");
  serialised.nodes.forEach((nodeData, index) => {
    var node = newNodes[index];
    var inputRows = node.querySelectorAll(".inputRow");
    nodeData.inputs.forEach((iData, subindex) => {
      var row = inputRows[subindex];
      if (iData.value) {
        row.childNodes[1].querySelector("input").value = iData.value;
      }
      if (typeof iData.link === "number") {
        makeLink(
          newNodes[iData.link].querySelector(".output"),
          row.childNodes[0]
        );
      }
      node.querySelector(".header").innerText = nodeData.label;
    });
  });
}

function exportProject() {
  download("project.json", JSON.stringify(serialise()));
}

function download(filename, text) {
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
function loadProject() {
  var picker = document.createElement("input");
  picker.type = "file";
  picker.accept = ".json";
  picker.oninput = () => {
    if (picker.files[0]) {
      var reader = new FileReader();
      reader.addEventListener("load", () => {
        var valid = true;
        try {
          var json = JSON.parse(reader.result);
        } catch (err) {
          valid = false;
          alert("Invalid save file");
        }
        if (valid) {
          deserialise(json);
        }
      });
      reader.readAsText(picker.files[0]);
    }
  };
  picker.click();
}
window.addEventListener("beforeunload", () => {
  localStorage.setItem("saveslot:save", JSON.stringify(serialise()));
});
(() => {
  var valid = true;
  try {
    var json = JSON.parse(localStorage.getItem("saveslot:save"));
  } catch (err) {
    valid = false;
  }
  if (valid) {
    deserialise(json);
  } else {
    var constant = addNodeToCanvas(window.library["const"], 50, 50);
    var a = constant.querySelector(".output");
    var output = addNodeToCanvas(window.library["output"], 400, 100);
    var b = output.querySelector("td");
    makeLink(a, b);
  }
})();
function clearProject() {
  var nodes = document.querySelectorAll(".node");
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node["removeListeners"].forEach((func) => {
      func();
    });
    node.remove();
  }
}

function serialise() {
  var nodes = document.querySelectorAll(".node");
  var serialised = {
    nodes: [],
    zoomIndex: zoomIndex,
    cx: scrollingUI.x || 0,
    cy: scrollingUI.y || 0,
  };
  console.log("Parsed " + nodes.length + " nodes.");
  for (let i = 0; i < nodes.length; i++) {
    var exec = null;
    var execIdx = 0;
    const node = nodes[i];
    var inputRows = node.querySelectorAll(".inputRow:not(.execrow)");
    var inputs = [];
    for (let x = 0; x < inputRows.length; x++) {
      var row = inputRows[x];
      var link = null;
      var outputIndex = 0;
      if (row.childNodes[0]["link"]) {
        outputIndex = row.childNodes[0]["link"]["outputNode"]["index"];
        link = Array.prototype.indexOf.call(
          nodes,
          row.childNodes[0]["link"]["outputNode"].closest(".node")
        );
      }
      if (link === -1) {
        link = null;
      }
      inputs.push({
        outputIndex: outputIndex || 0,
        link: link,
        value: row.childNodes[1].querySelector("input").value,
      });
    }
    if (node.querySelector(".execrow td") && node.querySelector(".execrow td").link) {
      exec = Array.prototype.indexOf.call(
        nodes,
        node.querySelector(".execrow td")["link"]["outputNode"].closest(".node")
      );
      execIdx = node.querySelector(".execrow td")["link"]["outputNode"].index;
    }
    var label = node.querySelector(".header").innerText;
    if (label === window.library[node.getAttribute("data-type")].title) {
      label = null;
    }
    var data = {
      type: node.getAttribute("data-type"),
      x: node.getAttribute("data-x"),
      y: node.getAttribute("data-y"),
      inputs: inputs,
      execInput: [exec, execIdx]
    };
    if (label) {
      data.label = label;
    }
    if(data.type === "comment"){
      data.commentText = node.querySelector("div[data-container]").innerText;
    }
    serialised.nodes.push(data);
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
  oldZoomIndex = serialised.zoomIndex || 1;
  zoomIndex = serialised.zoomIndex || 1;

  serialised.nodes.forEach((nodeData) => {
    var n = addNodeToCanvas(
      window.library[nodeData.type] || window.library["unknown"],
      0,
      0
    );
    n.setAttribute("style", `top: ${nodeData.y}px; left: ${nodeData.x}px;`);
    n.setAttribute("data-x", nodeData.x);
    n.setAttribute("data-y", nodeData.y);
    if (nodeData.type === "comment") {
      n.querySelector("div[data-container]").innerText = nodeData.commentText || "Comment Text Here";
    }
    if(nodeData.label) {
      n.querySelector(".header").innerText = nodeData.label;
    }
  });
  var newNodes = document.querySelectorAll(".node");
  serialised.nodes.forEach((nodeData, index) => {
    var node = newNodes[index];
    var inputRows = node.querySelectorAll(".inputRow:not(.execrow)");
    nodeData.inputs.forEach((iData, subindex) => {
      var row = inputRows[subindex];
      if (iData.value && row?.childNodes?.[1]?.querySelector("input")) {
        row.childNodes[1].querySelector("input").value = iData.value;
      }
      if (typeof iData.link === "number" && newNodes?.[iData.link]?.querySelectorAll(".output")?.[iData.outputIndex || 0] && row?.childNodes?.[0]) {
        makeLink(
          newNodes[iData.link].querySelectorAll(".output")[iData.outputIndex || 0],
          row.childNodes[0]
        );
      }
    });
    if (nodeData.execInput && nodeData.execInput[0] !== null) {
      makeLink(newNodes[nodeData.execInput[0]].querySelectorAll(".output")[nodeData.execInput[1]], node.querySelector(".execrow td"));
    }
  });
  scrollingUI.x = serialised.cx || 0;
  scrollingUI.y = serialised.cy || 0;
  updateScroll();
}

function exportProject() {
  download("myProject.flow.json", JSON.stringify(serialise()));
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
  picker.accept = ".flow.json";
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
    async function waitUntilReady() {
      if (window.extensionsLoaded) {
        deserialise(json);
        return;
      }
      await (()=>{
        return new Promise((res, rej)=>{
          setTimeout(()=>{res()}, 50);
        })
      })();
      if (window.extensionsLoaded) {
        deserialise(json);
      } else {
        waitUntilReady();
      }
    }
    waitUntilReady();
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
  scrollingUI.x = 0;
  scrollingUI.y = 0;
  updateScroll();
}

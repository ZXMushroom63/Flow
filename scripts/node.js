window.library = {};
function getOutput(auto = false) {
  if (!document.querySelector(".node .header[data-flag-isOutput]")) {
    if (!auto) {
      alert(
        "Unable to get output due to lack of an output node. Insert an output node to continue."
      );
    }
    return 0;
  }
  var outputNode = document.querySelector(
    ".node .header[data-flag-isOutput]"
  ).parentElement;
  return outputNode.getValue();
}
function dispOutput(auto = false) {
  document.getElementById("nOutputDisp").innerText =
    Math.round(getOutput(auto) * 1000000) / 1000000;
}
function addNode(
  namespace,
  alias,
  argv,
  func,
  color,
  headerAttrs = {},
  attrs = {}
) {
  window.library[namespace] = {
    namespace: namespace,
    alias: alias,
    title: alias[0] || "Untitled",
    argv: argv || [],
    func: func,
    color: color || "darkcyan",
    headerAttrs: headerAttrs,
    attrs: attrs,
  };
}
function addNodeToCanvas(nodetype, x, y) {
  var bounds = document.querySelector("#canvas").getBoundingClientRect();
  var node = document.createElement("div");
  node.setAttribute("data-type", nodetype.namespace);
  node.classList.add("node");
  node.style = `
    top:${y + bounds.y};
    left:${x + bounds.x};
    `;
  node.setAttribute("data-y", y + bounds.y);
  node.setAttribute("data-x", x + bounds.x);
  var title = document.createElement("span");
  title.innerText = nodetype.title;
  ``;
  title.classList.add("header");
  title.style = "background: " + nodetype.color + ";";
  Object.keys(nodetype.headerAttrs).forEach((attr) => {
    title.setAttribute(attr, nodetype.headerAttrs[attr]);
  });
  node.append(title);

  if (!nodetype.attrs["no_out"]) {
    var output = document.createElement("div");
    output.innerText = "O";
    output.classList.add("output");
    linkDragHandler(output);
    node.append(output);
  }
  if (nodetype.attrs["dynamic"]) {
    node.setAttribute("data-dynamic", true);
  }

  var inputs = document.createElement("table");
  nodetype.argv.forEach((argv) => {
    var tr = document.createElement("tr");
    tr.classList.add("inputRow");
    var td = document.createElement("td");
    td.classList.add("input");
    td.onclick = () => {
      if (td["link"]) {
        td["link"]["outputNode"]["link"] = null;
        if (td["link"].remove) {
          td["link"].remove();
        }
        td["link"] = null;
      }
    };
    var i = document.createElement("input");
    var td2 = document.createElement("td");
    i.classList.add("inputField");
    td2.append(i);
    td.innerText = argv;
    tr.append(td);
    tr.append(td2);
    inputs.append(tr);
  });
  node.append(inputs);

  window.addEventListener("keydown", (event) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      node.hasAttribute("grabbing")
    ) {
      node["removeListeners"].forEach((func) => {
        func();
      });
      node.remove();
    }
  });
  node["removeListeners"] = [];
  node["dragListeners"] = [];
  node["cacheValue"] = undefined;
  node["getValue"] = function () {
    var fields = [];
    var iFields = node.querySelectorAll("tr");
    for (let i = 0; i < iFields.length; i++) {
      const row = iFields[i];
      if (
        row.childNodes[1] &&
        row.childNodes[1].querySelector("input") &&
        row.childNodes[1].querySelector("input").value &&
        parseFloat(row.childNodes[1].querySelector("input").value)
      ) {
        fields.push(parseFloat(row.childNodes[1].querySelector("input").value));
      } else if (
        row.childNodes[0] &&
        row.childNodes[0]["link"] &&
        row.childNodes[0]["link"]["outputNode"] &&
        row.childNodes[0]["link"]["outputNode"].closest(".node") &&
        row.childNodes[0]["link"]["outputNode"].closest(".node")["getValue"]
      ) {
        fields.push(
          row.childNodes[0]["link"]["outputNode"]
            .closest(".node")
            ["getValue"]() || 0
        );
      } else {
        fields.push(0);
      }
    }
    return nodetype.func(...fields);
  };
  dragElem(node);
  document.querySelector("#canvas").append(node);
  return node;
}
function insertNode() {
  var results = [];
  var name = document.querySelector("#input").innerText;
  var keys = Object.keys(window.library);
  try {
    keys.forEach((key) => {
      if (key.toLowerCase() === name.toLowerCase()) {
        results.push(key);
      }
      window.library[key].alias.forEach((alias) => {
        if (alias.toLowerCase() === name.toLowerCase()) {
          results.push(key);
        }
      });
    });
  } catch (error) {
    alert(error);
  }
  if (!window.library[results[0]]) {
    return;
  }
  addNodeToCanvas(window.library[results[0]], 0, 0);
}

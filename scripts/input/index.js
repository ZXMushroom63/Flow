window.library = {};
window.documentation = {};
window.graphUpdateListeners = [];
function addNode(namespace, data = {}) {
  if (!namespace) {
    return;
  }
  if (typeof data !== "object") {
    return;
  }
  data.command ||= false;
  data.hat = data.command ? data.hat || false : false;
  data.namespace = namespace;
  data.alias ||= [namespace];
  data.title ||= data.alias[0];
  data.renameable ||= false;
  data.argv ||= data.inputs || [];
  if (data.hat) {
    data.argv = data.inputs = [];
  }
  data.outputs ||= ["O"];
  if (data.command) {
    var bad = false;
    data.outputs.forEach(out => {
      if (!out.includes("⏩")) {
        bad = true;
      }
    });
    if (data.outputs.length < 1) {
      bad = true;
    }
    if (bad) {
      data.outputs = ["⏩"];
    }
  }
  data.func ||= function () {
    return [];
  };
  data.color ||= "darkcyan";
  data.init ||= () => {};
  data.usespkg ||= [];
  data.headerAttrs ||= {};
  window.library[namespace] = data;
  if (typeof data["doc"] === "string") {
    window.documentation[namespace] = data["doc"];
  }
}

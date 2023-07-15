window.library = {};
window.documentation = {};

function addNode(namespace, data = {}) {
  if (!namespace) {
    return;
  }
  if (typeof data !== "object") {
    return;
  }
  data.namespace = namespace;
  data.alias ||= [namespace];
  data.title ||= data.alias[0];
  data.renameable ||= false;
  data.argv ||= data.inputs || [];
  data.outputs ||= ["O"];
  data.func ||= function () {
    return 0;
  };
  data.color ||= "darkcyan";
  data.init ||= () => {};
  data.headerAttrs ||= {};
  window.library[namespace] = data;
  if (typeof data["doc"] === "string") {
    window.documentation[namespace] = data["doc"];
  }
}

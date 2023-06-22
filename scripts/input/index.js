window.library = {};
window.documentation = {};

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
  if (typeof attrs["doc"] === "string") {
    window.documentation[namespace] = attrs["doc"];
  }
}


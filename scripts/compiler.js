let currentId = 0;
function compileGraph(node) {
  var libraryEntry = window["library"][node.getAttribute("data-type")];
  var rows = node.querySelectorAll("tr");
  var func = libraryEntry.func;
  var argv = [];
  if (node.refId === undefined) {
    node.refId = currentId++;
  }
  for (let i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (
      row.childNodes[1]?.childNodes[0]?.value &&
      parseFloat(row.childNodes[1].childNodes[0].value)
    ) {
      argv.push(parseFloat(row.childNodes[1].childNodes[0].value));
    } else if (row.childNodes[0]?.["link"]?.["outputNode"]?.parentElement) {
      argv.push(
        compileGraph(row.childNodes[0]?.["link"]?.["outputNode"]?.parentElement)
      );
    } else {
      argv.push(0);
    }
  }
  return {
    func: func,
    argv: argv,
    nodeRef: node,
    fields: undefined,
    refId: node.refId,
    calculate: function (label = false) {
      let values = [];
      let cache = {};
      for (let arg = 0; arg < this.argv.length; arg++) {
        const argument = this.argv[arg];
        if (typeof argument === "object") {
          if (!cache[argument.refId]) {
            cache[argument.refId] = argument.calculate(label);
          }
          values.push(cache[argument.refId]);
        } else {
          values.push(argument || 0);
        }
      }
      if (label) {
        if (!this.fields) this.fields = this.nodeRef.querySelectorAll("input");
        values.forEach((v, i) => {
          this.fields[i]?.setAttribute("placeholder", v);
        });
      }
      return this.func(...values) || 0;
    },
  };
}

function compileGraph(node) {
  var libraryEntry = window["library"][node.getAttribute("data-type")];
  var rows = node.querySelectorAll("tr");
  var func = libraryEntry.func;
  var argv = [];
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
    calculate: function (label = false) {
      var values = [];
      for (let arg = 0; arg < this.argv.length; arg++) {
        const argument = this.argv[arg];
        if (typeof argument === "object") {
          values.push(argument.calculate(label));
        } else {
          values.push(argument || 0);
        }
      }
      if (label && this.nodeRef?.childNodes) {
        if (!this.fields) this.fields = this.nodeRef.querySelectorAll("input");
        values.forEach((v, i) => {
          this.fields[i]?.setAttribute("placeholder", v);
        });
      }
      return this.func(...values) || 0;
    },
  };
}

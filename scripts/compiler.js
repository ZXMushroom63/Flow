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
    calculate: function () {
      var values = [];
      for (let arg = 0; arg < argv.length; arg++) {
        const argument = argv[arg];
        if (typeof argument === "object") {
          return argument.calculate();
        } else {
          values.push(argument || 0);
        }
      }
      return func(...values) | 0;
    },
  };
}

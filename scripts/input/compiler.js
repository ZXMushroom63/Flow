function compileGraph(
  node,
  stripped = false,
  alertMessages = false,
  lIndex = 0
) {
  if (flags.benchmarking) {
    var start = performance.now();
  }
  var libraryEntry = window["library"][node.getAttribute("data-type")];
  if (alertMessages) {
    libraryEntry.usespkg.forEach((lib) => {
      alert(
        "Node type " +
          node.getAttribute("data-type") +
          " uses package " +
          lib +
          `\n\nMake sure that this package is loaded when using the compiled graph.`
      );
    });
  }
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
    } else if (
      row.childNodes[0]?.["link"]?.["outputNode"]?.parentElement?.parentElement
    ) {
      argv.push(
        compileGraph(
          row.childNodes[0]?.["link"]?.["outputNode"]?.parentElement
            ?.parentElement,
          stripped,
          alertMessages,
          row.childNodes[0]?.["link"]?.["outputNode"]?.["index"]
        )
      );
    } else {
      argv.push(0);
    }
  }
  if (flags.benchmarking) {
    console.log(
      "Compiled graph in " + (performance.now() - start).toFixed(2) + "ms"
    );
  }
  return {
    func: func,
    argv: argv,
    nodeRef: stripped ? undefined : node,
    fields: undefined,
    refId: node.refId,
    lIndex: lIndex || 0,
    calculate: function (label = false, index = 0) {
      let values = [];
      let cache = {};
      for (let arg = 0; arg < this.argv.length; arg++) {
        const argument = this.argv[arg];
        if (typeof argument === "object") {
          if (!cache[argument.refId]) {
            cache[argument.refId] = argument.calculate(label);
          }
          values.push(cache[argument.refId][argument.lIndex]);
        } else {
          values.push(argument || 0);
        }
      }
      if (label && this.nodeRef) {
        if (!this.fields) this.fields = this.nodeRef.querySelectorAll("input");
        values.forEach((v, i) => {
          this.fields[i]?.setAttribute("placeholder", v);
        });
      }
      return this.func.apply(this?.nodeRef || null, values) || [0];
    },
  };
}

function stringifyGraph(graph) {
  function stringifyArg(arg) {
    if (typeof arg === "object") {
      return stringifyGraph(arg);
    } else {
      return arg.toString();
    }
  }
  function stringifyArgs(args) {
    var js = "[\n";
    var l = args.length;
    args.forEach((arg, i) => {
      js += stringifyArg(arg) + (i !== l - 1 ? ",\n" : "");
    });
    return js + `\n]`;
  }
  return `{\nfunc: ${graph.func.toString()},\nrefId: ${graph.refId},\nlIndex: ${
    graph.lIndex
  },\ncalculate: ${graph.calculate.toString()},\nargv: ${stringifyArgs(
    graph.argv
  )}}`;
}

function _DEEPCOMPILE(graph, surface = false) {
  function stringifyArg(arg) {
    if (typeof arg === "object") {
      return "(" + _DEEPCOMPILE(arg) + ")";
    } else {
      return arg.toString();
    }
  }
  function stringifyArgs(args) {
    var l = args.length;
    var j = "";
    args.forEach((arg, i) => {
      j += stringifyArg(arg) + (i !== l - 1 ? "," : "");
    });
    return j;
  }
  return `(${graph.func.toString()})(${stringifyArgs(graph.argv)})${
    surface ? "" : `[${graph.lIndex}]`
  }`;
}
function stringifyGraphV2(graph, name = "main") {
  return `(()=>{\nfunction ${name} () {\nvar result = ${_DEEPCOMPILE(
    graph,
    true
  )};\n return result;\n}\nreturn ${name}\n})()`;
}

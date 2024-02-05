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
  var rows = node.querySelectorAll("tr:not(.execrow)");
  var func = libraryEntry.func;
  var execout = [];
  var execoutElements = node.querySelectorAll(".execout");
  var argv = [];
  for (let i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (
      row.childNodes[1]?.childNodes[0]?.value &&
      row.childNodes[1].childNodes[0].value
    ) {
      argv.push(row.childNodes[1].childNodes[0].value);
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
  execoutElements.forEach((elm)=>{
    if (elm && elm.link) {
      execout.push(compileGraph(elm.link.inputNode.parentElement.parentElement.parentElement, stripped, alertMessages, 0));
    } else {
      execout.push(null);
    }
  });
  
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
    execout: execout,
    command: libraryEntry.command,
    refId: node.refId,
    lIndex: lIndex || 0,
    calculate: function (label = false, index = 0) {
      if (this.command) {
        return [];
      }
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
    exec: async function (label = false, index = 0) {
      if (!this.command) {
        return;
      }
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
      var branchIdx = await this.func.apply(this?.nodeRef || null, values);
      branchIdx ||= [0];
      if (!Array.isArray(branchIdx)) {
        branchIdx = [branchIdx];
      }
      for (let i = 0; i < branchIdx.length; i++) {
        const idx = branchIdx[i];
        if (this.execout[idx]) {
          await this.execout[idx].exec();
        }
      }
    },
  };
}

function stringifyGraph(graph) {
  function stringifyArg(arg) {
    if (typeof arg === "object") {
      return stringifyGraph(arg);
    } else {
      return '"' + arg.toString() + '"';
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
  return `{\nfunc: ${graph.func.toString()},\nrefId: ${graph.refId},\nlIndex: ${graph.lIndex
    },\ncalculate: ${graph.calculate.toString()},\nargv: ${stringifyArgs(
      graph.argv
    )},\ncommand: ${graph.command},\nexecout: ${
      stringifyArgs(graph.execout)
    },\nexec: ${graph.exec.toString()}}`;
}

function _DEEPCOMPILE(graph, surface = false) {
  if (graph.command) {
    throw new Error("Deepcompiled or translated graphs do not support execution or logic flow, only values.")
  }
  function stringifyArg(arg) {
    if (typeof arg === "object") {
      return "(" + _DEEPCOMPILE(arg) + ")";
    } else {
      return '"' + arg.toString() + '"';
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
  return `(${graph.func.toString()})(${stringifyArgs(graph.argv)})${surface ? "" : `[${graph.lIndex}]`
    }`;
}
function translateGraph(graph, name = "main") {
  if (flags.benchmarking) {
    var start = performance.now();
  }
  var value = `function ${name}() {\nvar result = ${_DEEPCOMPILE(
    graph,
    true
  )};\n return result;\n}`;
  if (flags.benchmarking) {
    console.log(
      "Translated graph in " + (performance.now() - start).toFixed(2) + "ms"
    );
  }
  return value;
}
function _compressGraph(graph, surface = false) {
  function stringifyArg(arg) {
    if (typeof arg === "object") {
      return "(" + _compressGraph(arg) + ")";
    } else {
      return '"' + arg.toString() + '"';
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
  return `(${graph.func.toString()}).apply(window.nodemap[${graph.refId
  }], [${stringifyArgs(graph.argv)}])${surface ? "" : `[${graph.lIndex}]`}`;
}
function recompileGraph(graph, name = "main") {
  if (graph.command) {
    throw new Error("Recompiled graphs do not support execution or logic flow, only values.")
  }
  if (flags.benchmarking) {
    var start = performance.now();
  }
  var value = `(()=>{\nfunction ${name}() {\nvar result = ${_compressGraph(
    graph,
    true
  )};\n return result;\n}\nreturn ${name}\n})()`;
  if (flags.benchmarking) {
    console.log(
      "Translated graph in " + (performance.now() - start).toFixed(2) + "ms"
    );
  }
  return eval(value);
}
function displayDocumentation() {
  try {
    var docWin = window.open();
    var keys = Object.keys(documentation);
    keys.forEach((key) => {
      var title = window.library[key].alias[0];
      var isCommand = window.library[key].command;
      var h2 = document.createElement("h2");
      h2.style.borderTop = "1px solid black";
      h2.innerText = title;
      if (isCommand) {
        h2.innerText = "⏩ " + h2.innerText;
      }
      var p = document.createElement("p");
      p.innerHTML = window.documentation[key];
      docWin.document.body.appendChild(h2);
      docWin.document.body.appendChild(p);

      if (window.library[key].argv.length > 0) {
        var argumentsHeader = document.createElement("h4");
        argumentsHeader.innerText = "Arguments: ";
        argumentsHeader.style = "margin-bottom: 0;"
        var inputsTable = document.createElement("table");
        for (let i = 0; i < window.library[key].argv.length; i++) {
          var arg = window.library[key].argv[i];
          var tr = document.createElement("tr");
          tr.innerText = arg;
          tr.style = "border: 1px solid black;";
          inputsTable.append(tr);
        }
        docWin.document.body.appendChild(argumentsHeader);
        docWin.document.body.appendChild(inputsTable);
      }
      if (window.library[key].outputs.length > 1) {
        var outputsHeader = document.createElement("h4");
        outputsHeader.innerText = "Outputs: ";
        var outputs = document.createElement("table");
        for (let i = 0; i < window.library[key].outputs.length; i++) {
          var arg = window.library[key].outputs[i];
          var tr = document.createElement("tr");
          tr.innerText = arg;
          tr.style = "border: 1px solid black;";
          outputs.append(tr);
        }
        docWin.document.body.appendChild(outputsHeader);
        docWin.document.body.appendChild(outputs);
      }
    });
  } catch (error) {
    alert(error);
  }
}

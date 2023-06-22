function displayDocumentation() {
  try {
    var docWin = window.open();
    var keys = Object.keys(documentation);
    keys.forEach((key) => {
      var title = window.library[key].alias[0];
      var h2 = document.createElement("h2");
      h2.innerText = title;
      var p = document.createElement("p");
      p.innerHTML = window.documentation[key];
      docWin.document.body.appendChild(h2);
      docWin.document.body.appendChild(p);

      if (window.library[key].argv.length > 0) {
        var h4 = document.createElement("h4");
        h4.innerText = "Arguments: ";
        var t = document.createElement("table");
        for (let i = 0; i < window.library[key].argv.length; i++) {
          var arg = window.library[key].argv[i];
          var tr = document.createElement("tr");
          tr.innerText = arg;
          tr.style = "border: 1px solid black;";
          t.append(tr);
        }
        docWin.document.body.appendChild(h4);
        docWin.document.body.appendChild(t);
      }
    });
  } catch (error) {
    alert(error);
  }
}

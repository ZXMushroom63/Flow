function positionSuggestions() {
  var s = document.querySelector("#suggestions");
  var bounds = document.querySelector("#input").getBoundingClientRect();
  s.setAttribute(
    "style",
    `top: ${bounds.y + bounds.height}px; left: ${bounds.x}px; width: ${
      bounds.width
    }px;`
  );
}
function showSuggestions() {
  positionSuggestions();
  updateSuggestions();
  document.querySelector("#suggestions").setAttribute("visible", "true");
}
function hideSuggestions() {
  setTimeout(() => {
    document.querySelector("#suggestions").removeAttribute("visible");
  }, 100);
}
function updateSuggestions() {
  document.querySelector("#suggestions").innerHTML = "";
  var results = {};
  var name = document.querySelector("#input").innerText;
  var keys = Object.keys(window.library);
  keys.forEach((key) => {
    if (key.toLowerCase().includes(name.toLowerCase())) {
      results[key] = window.library[key].alias[0];
    }
    window.library[key].alias.forEach((alias) => {
      if (alias.toLowerCase().includes(name.toLowerCase())) {
        results[key] = window.library[key].alias[0];
      }
    });
  });
  function displayResults() {
    var rKeys = Object.keys(results);
    rKeys.forEach((key) => {
      var r = document.createElement("div");
      r.innerText = results[key];
      r.onclick = () => {
        document.querySelector("#input").innerText = key;
        addNodeToCanvas(window.library[key], 0, 0);
      };
      document.querySelector("#suggestions").append(r);
    });
  }
  displayResults();
}
window.addEventListener("resize", positionSuggestions);
document.querySelector("#input").addEventListener("focus", showSuggestions);
document.querySelector("#input").addEventListener("keyup", updateSuggestions);
document.querySelector("#input").addEventListener("blur", hideSuggestions);
positionSuggestions();

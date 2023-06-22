function positionSuggestions() {
  var s = document.querySelector("#suggestions");
  var bounds = document.querySelector("#input").getBoundingClientRect();
  s.setAttribute(
    "style",
    `top: ${bounds.y + bounds.height}px; left: ${bounds.x}px; width: ${bounds.width
    }px;`
  );
}
function showSuggestions() {
  positionSuggestions();
  updateSuggestions({ target: document.querySelector("#input") });
  document.querySelector("#suggestions").setAttribute("visible", "true");
}
function hideSuggestions() {
  setTimeout(() => {
    document.querySelector("#suggestions").removeAttribute("visible");
  }, 200);
}
function updateSuggestions(e) {
  document.querySelector("#suggestions").innerHTML = "";
  var results = {};
  var name = e.target.value;
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
        e.target.value = "";
        addNodeToCanvas(window.library[key], 0, 0);
      };
      document.querySelector("#suggestions").append(r);
    });
  }
  displayResults();
}
window.addEventListener("resize", positionSuggestions);

const search = document.querySelector("#input");

search.addEventListener("focus", showSuggestions);
search.addEventListener("keyup", updateSuggestions);
search.addEventListener("blur", hideSuggestions);

positionSuggestions();

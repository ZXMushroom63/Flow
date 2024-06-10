const search = document.querySelector("#input");
var previousAddedNodeType = "";
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
  document.querySelector("#suggestions").removeAttribute("visible");
}
function enterSuggestions(e) {
  if (e.key === "ArrowUp") {
    search.value = previousAddedNodeType;
    return;
  }
  if (e.key !== "Enter") {
    return;
  }
  var value = search.value;
  var keys = Object.keys(window.library);
  if (keys.includes(value.toLowerCase())) {
    previousAddedNodeType = search.value;
    addNodeToCanvas(window.library[value.toLowerCase()]);
    search.value = "";
    hideSuggestions();
    return;
  }
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (window.library[key].alias.includes(value.toLowerCase())) {
      previousAddedNodeType = search.value;
      addNodeToCanvas(window.library[key]);
      search.value = "";
      hideSuggestions();
      break;
    }
  }
}
function updateSuggestions(e) {
  if (search.value !== "") {
    positionSuggestions();
    document.querySelector("#suggestions").setAttribute("visible", "true");
  }
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
      r.onmousedown = () => {
        e.target.value = key;
        previousAddedNodeType = key;
        addNodeToCanvas(window.library[key]);
      };
      document.querySelector("#suggestions").append(r);
    });
  }
  displayResults();
}
window.addEventListener("resize", positionSuggestions);

search.addEventListener("focus", showSuggestions);
search.addEventListener("keyup", updateSuggestions);
search.addEventListener("keydown", enterSuggestions);
search.addEventListener("blur", hideSuggestions);

positionSuggestions();

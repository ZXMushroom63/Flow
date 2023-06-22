window.modes = {};
window.currentMode = "number";
function addMode(id, title, selectors) {
  window.modes[id] = { title: title, selectors: selectors };
  var o = document.createElement("option");
  o.value = id;
  o.innerText = title;
  document.querySelector("#modeSelect").append(o);
}
function modeUpdate(mode) {
  window.currentMode = mode;
  var k = Object.keys(window.modes);
  k.forEach((key) => {
    window.modes[key].selectors.forEach((sel) => {
      document.querySelector(sel).classList.add("hidden");
    });
  });
  window.modes[mode].selectors.forEach((showSel) => {
    document.querySelector(showSel).classList.remove("hidden");
  });
}
addMode("number", "Number", ["#run", "td:has(#autoEval)"]);
addMode("rentex", "2D RenTex", ["#renderOutput", "#rdownload", "#render"]);
addMode("soundwave", "Soundwave", ["#playsp"]);
modeUpdate("number");

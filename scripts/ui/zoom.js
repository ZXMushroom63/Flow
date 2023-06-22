var zoomIndex = 1;
var scaleCss = document.createElement("style");
scaleCss.innerHTML = "";
document.head.append(scaleCss);
function updateLinks() {
  var n = document.querySelectorAll(".node");
  n.forEach((node) => {
    if (typeof node["dragListeners"] === "object") {
      node["dragListeners"].forEach((func) => {
        func();
      });
    }
  });
}
function updateZoom() {
  var scaleFactor = 1 / zoomIndex;
  scaleCss.innerHTML = `.node {transform: scale(${scaleFactor || 1})}`;
  updateLinks();
}
function zoomIn() {
  zoomIndex -= 0.25;
  zoomIndex = Math.max(zoomIndex, 0.75);
  zoomIndex = Math.min(zoomIndex, 2.5);
  updateZoom();
}
function zoomOut() {
  zoomIndex += 0.25;
  zoomIndex = Math.max(zoomIndex, 0.75);
  zoomIndex = Math.min(zoomIndex, 2.5);
  updateZoom();
}
window.addEventListener("keydown", (e) => {
  if (
    document.activeElement.tagName.toLowerCase() === "input" ||
    document.activeElement.getAttribute("contentEditable") == "true"
  ) {
    return;
  }
  if (e.key === "-") {
    zoomIndex += 0.25;
  }
  if (e.key === "=") {
    zoomIndex -= 0.25;
  }
  if (e.key === "+") {
    zoomIndex -= 0.25;
  }
  zoomIndex = Math.max(zoomIndex, 1.25);
  zoomIndex = Math.min(zoomIndex, 2.5);
  updateZoom();
});

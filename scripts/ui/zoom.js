var zoomIndex = 1;
var oldZoomIndex = 1;
var scaleCss = document.createElement("style");
scaleCss.innerHTML = "";
document.head.append(scaleCss);


function zoomIn() {
  oldZoomIndex = zoomIndex;
  zoomIndex -= 0.25;
  zoomIndex = Math.max(zoomIndex, 0.75);
  zoomIndex = Math.min(zoomIndex, 2.5);
  updateScroll();
}
function zoomOut() {
  oldZoomIndex = zoomIndex;
  zoomIndex += 0.25;
  zoomIndex = Math.max(zoomIndex, 0.75);
  zoomIndex = Math.min(zoomIndex, 2.5);
  updateScroll(true);
}
window.addEventListener("keydown", (e) => {
  if (
    document.activeElement.tagName.toLowerCase() === "input" ||
    document.activeElement.getAttribute("contentEditable") == "true"
  ) {
    return;
  }
  oldZoomIndex = zoomIndex;
  if (e.key === "-") {
    zoomIndex += 0.25;
  }
  if (e.key === "=") {
    zoomIndex -= 0.25;
  }
  if (e.key === "+") {
    zoomIndex -= 0.25;
  }
  zoomIndex = Math.max(zoomIndex, 0.75);
  zoomIndex = Math.min(zoomIndex, 2.5);
  updateScroll();
});

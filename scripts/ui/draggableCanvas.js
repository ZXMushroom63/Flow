var scrollingUI = {
  scrolling: false,
  x: 0,
  y: 0,
  oldX: 0,
  oldY: 0,
};
document.querySelector("html").addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
document.querySelector("html").addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    scrollingUI.scrolling = true;
    scrollingUI.oldX = e.x;
    scrollingUI.oldY = e.y;
  }
});

document.querySelector("html").addEventListener("mouseup", (e) => {
  scrollingUI.scrolling = false;
});

document.querySelector("html").addEventListener("mousemove", (e) => {
  if (scrollingUI.scrolling) {
    scrollingUI.x += e.x - scrollingUI.oldX;
    scrollingUI.y += e.y - scrollingUI.oldY;
    scrollingUI.oldX = e.x;
    scrollingUI.oldY = e.y;
    updateScroll();
  }
});
window.addEventListener("blur", function (e) {
  scrollingUI.scrolling = false;
});
function updateScroll() {
  document.querySelector(
    "#canvas"
  ).style = `transform: translate(${scrollingUI.x}px, ${scrollingUI.y}px);`;
  var n = document.querySelectorAll(".node");
  n.forEach((node) => {
    if (typeof node["dragListeners"] === "object") {
      node["dragListeners"].forEach((func) => {
        func();
      });
    }
  });
}
document.querySelector("#toolbar").addEventListener("mousedown", function (e) {
  if (e.button === 2) {
    e.stopPropagation;
    e.stopImmediatePropagation();
  }
});
document.querySelector("#zoomout").addEventListener("mousedown", function (e) {
  if (e.button === 2) {
    e.stopPropagation;
    e.stopImmediatePropagation();
  }
});
document.querySelector("#zoomin").addEventListener("mousedown", function (e) {
  if (e.button === 2) {
    e.stopPropagation;
    e.stopImmediatePropagation();
  }
});
document.querySelector("#trashbin").addEventListener("mousedown", function (e) {
  if (e.button === 2) {
    e.stopPropagation;
    e.stopImmediatePropagation();
  }
});
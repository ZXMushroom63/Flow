var scrollingUI = {
  scrolling: false,
  x: 0,
  y: 0,
  oldX: 0,
  oldY: 0,
};
document.querySelector("body").addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
document.querySelector("body").addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    scrollingUI.scrolling = true;
    scrollingUI.oldX = e.x;
    scrollingUI.oldY = e.y;
  }
});

document.querySelector("body").addEventListener("mouseup", (e) => {
  if (e.button === 2) {
    scrollingUI.scrolling = false;
  }
});

document.querySelector("body").addEventListener("mousemove", (e) => {
  if (scrollingUI.scrolling) {
    scrollingUI.x += e.x - scrollingUI.oldX;
    scrollingUI.y += e.y - scrollingUI.oldY;
    scrollingUI.oldX = e.x;
    scrollingUI.oldY = e.y;
    updateScroll();
  }
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

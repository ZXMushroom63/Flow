var scrollingUI = {
  scrolling: false,
  x: 0,
  y: 0,
  oldX: 0,
  oldY: 0
};
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
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
window.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    scrollingUI.scrolling = true;
    scrollingUI.oldX = e.x;
    scrollingUI.oldY = e.y;
  }
});
window.addEventListener("touchstart", function (e) {
  if (e.touches.length === 2) {
    e.preventDefault();
    scrollingUI.scrolling = true;
    scrollingUI.oldX = e.touches[0].clientX;
    scrollingUI.oldY = e.touches[0].clientY;
  }
});
window.addEventListener("touchend", function () {
  scrollingUI.scrolling = false;
});
window.addEventListener("touchcancel", function () {
  scrollingUI.scrolling = false;
});
window.addEventListener("touchmove", function (e) {
  if (scrollingUI.scrolling) {
    e.preventDefault();
    scrollingUI.x += e.touches[0].clientX - scrollingUI.oldX;
    scrollingUI.y += e.touches[0].clientY - scrollingUI.oldY;
    scrollingUI.oldX = e.touches[0].clientX;
    scrollingUI.oldY = e.touches[0].clientY;
    updateScroll();
  }
});
window.addEventListener("mouseup", () => {
  scrollingUI.scrolling = false;
});

window.addEventListener("mousemove", (e) => {
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
  ).style = `transform: translate(${scrollingUI.x}px, ${scrollingUI.y}px) scale(${1 / zoomIndex});`;
  updateLinks();
}
["#toolbar", "#zoomout", "#zoomin", "#trashbin"].forEach(selector => {
  var elem = document.querySelector(selector);
  elem.addEventListener("mousedown", function (e) {
    if (e.button === 2) {
      e.stopPropagation;
      e.stopImmediatePropagation();
    }
  });
  elem.addEventListener("touchstart", function (e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  });
})
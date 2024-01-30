function dragElem(elmnt) {
  var posX = 0,
    posY = 0,
    oldX = 0,
    oldY = 0,
    oldOffsetLeft = 0,
    oldOffsetTop = 0;
  if (elmnt.querySelector(".header")) {
    /*/ if present, the header is where you move the DIV from:/*/
    elmnt.querySelector(".header").onmousedown = dragMouseDown;
    elmnt.querySelector(".header").ontouchstart = dragMouseDown;
  } else {
    /*/otherwise, move the DIV from anywhere inside the DIV:/*/
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    /*/ get the mouse cursor position at startup:/*/
    oldOffsetLeft = elmnt.offsetLeft;
    oldOffsetTop = elmnt.offsetTop;
    oldX = typeof e.touches === "object" ? e.touches[0].clientX : e.clientX;
    oldY = typeof e.touches === "object" ? e.touches[0].clientY : e.clientY;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    document.ontouchcancel = closeDragElement;
    /*/ call a function whenever the cursor moves:/*/
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
    elmnt.setAttribute("grabbing", "true");
  }

  function elementDrag(e) {
    e = e || window.event;
    var dIndex = 1 / zoomIndex;
    /*/ calculate the new cursor position:/*/
    posX =
      (typeof e.touches === "object" ? e.touches[0].clientX : e.clientX);
    posY =
      (typeof e.touches === "object" ? e.touches[0].clientY : e.clientY);


    /*/ set the element's new position:/*/
    elmnt.style.top = (((posY - oldY) / dIndex) + oldOffsetTop) + "px";
    elmnt.style.left = (((posX - oldX) / dIndex) + oldOffsetLeft) + "px";
    elmnt.setAttribute("data-y", (((posY - oldY) / dIndex) + oldOffsetTop));
    elmnt.setAttribute("data-x", (((posX - oldX) / dIndex) + oldOffsetLeft));

    if (elmnt.dragListeners) {
      elmnt.dragListeners.forEach((func) => {
        func();
      });
    }
  }

  function closeDragElement() {
    /*/ stop moving when mouse button is released:/*/

    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchcancel = null;
    document.ontouchmove = null;
    elmnt.removeAttribute("grabbing");
    if (elmnt.className.includes("node")) {
      if (!document.querySelector("#trashbin")) {
        return;
      }
      var trashBounds = document
        .querySelector("#trashbin")
        .getBoundingClientRect();
      if (
        trashBounds.x < posX &&
        trashBounds.x + trashBounds.width > posX &&
        trashBounds.y < posY &&
        trashBounds.y + trashBounds.width > posY
      ) {

        if (elmnt["removeListeners"]) {
          elmnt["removeListeners"].forEach((func) => {
            func();
          });
          elmnt.remove();
          soundEffect("delete");
        }
      }
    }
  }
}

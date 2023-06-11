function dragElem(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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
    pos3 = typeof e.touches === "object" ? e.touches[0].clientX : e.clientX;
    pos4 = typeof e.touches === "object" ? e.touches[0].clientY : e.clientY;
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
    /*/ calculate the new cursor position:/*/
    pos1 =
      pos3 - (typeof e.touches === "object" ? e.touches[0].clientX : e.clientX);
    pos2 =
      pos4 - (typeof e.touches === "object" ? e.touches[0].clientY : e.clientY);
    pos3 = typeof e.touches === "object" ? e.touches[0].clientX : e.clientX;
    pos4 = typeof e.touches === "object" ? e.touches[0].clientY : e.clientY;
    /*/ set the element's new position:/*/
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    elmnt.setAttribute("data-y", elmnt.offsetTop - pos2);
    elmnt.setAttribute("data-x", elmnt.offsetLeft - pos1);

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
        trashBounds.x < pos3 &&
        trashBounds.x + trashBounds.width > pos3 &&
        trashBounds.y < pos4 &&
        trashBounds.y + trashBounds.width > pos4
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

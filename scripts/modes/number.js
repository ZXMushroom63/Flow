function getOutput(auto = false) {
  if (!document.querySelector(".node .header[data-flag-isOutput]")) {
    if (!auto) {
      alert(
        "Unable to get output due to lack of an output node. Insert an output node to continue."
      );
    }
    return 0;
  }
  var outputNodes = document.querySelectorAll(
    ".node .header[data-flag-isOutput]"
  );

  outputNodes.forEach(element => {
    element.parentElement.getValue();
  });
}
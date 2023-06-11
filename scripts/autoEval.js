setInterval(() => {
  if (
    document.querySelector("input#autoEval").checked &&
    !document.querySelector("input#autoEval").classList.contains("hidden")
  ) {
    dispOutput(true);
  }
}, 10);

setInterval(() => {
  if (
    document.querySelector("input#autoEval").checked &&
    !document.querySelector("input#autoEval").classList.contains("hidden")
  ) {
    getOutput(true);
  }
}, 10);

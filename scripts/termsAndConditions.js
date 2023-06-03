if (`${localStorage.getItem("termsAndConditionsAccepted")}` !== "true") {
  var tcsandcs = document.createElement("div");
  tcsandcs.classList.add("fullscreenPopup");
  tcsandcs.innerHTML = `
    <h1>Flow</h1>
    <h3>There aren't any terms and conditions, so accept nothing I guess.</h3>
    <div class="btn" onclick="localStorage.setItem('termsAndConditionsAccepted', true);this.parentElement.remove()">Accept</div>
    `;
  document.body.append(tcsandcs);
}

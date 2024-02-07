if (`${localStorage.getItem("termsAndConditionsAccepted")}` !== "true") {
  var tcsandcs = document.createElement("div");
  tcsandcs.classList.add("fullscreenPopup");
  tcsandcs.innerHTML = `
    <h1>Flow Engine</h1>
    <h3>Flow by ZXMushroom63.<br>By pressing 'Accept', you agree that you were not the original creator of this software. (skill issue)</h3>
    <div class="btn" onclick="localStorage.setItem('termsAndConditionsAccepted', true);this.parentElement.remove()">Accept</div>
    `;
  document.body.append(tcsandcs);
}

if (`${localStorage.getItem("termsAndConditionsAccepted")}` !== "true") {
  var tcsandcs = document.createElement("div");
  tcsandcs.classList.add("fullscreenPopup");
  tcsandcs.innerHTML = `
    <h1>Flow Engine</h1>
    <h3>The following software is based of the Flow engine by ZXMushroom63.<br>Please do not repurpose, steal or sell the software without including somewhere in your product that it uses this engine, and clarifies that it was made by me. Thx!</h3>
    <div class="btn" onclick="localStorage.setItem('termsAndConditionsAccepted', true);this.parentElement.remove()">Accept</div>
    `;
  document.body.append(tcsandcs);
}

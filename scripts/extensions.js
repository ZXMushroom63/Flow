var extensionMap = {
    "logic": ["extensions/logic.js"],
    "3D Viewer": ["libs/three.min.js", "extensions/3dviewer.js"],
}
window.extensionsLoaded = false;
window.extensionCounter = 0;
window.extensionTotal = 0;
function getTotal(extensions) {
    var total = 0;
    extensions.forEach((extension)=>{
        total += extensionMap[extension].length;
    });
    return total;
}
if (localStorage.getItem("extensions")) {
    var extensions = JSON.parse(localStorage.getItem("extensions"));
    window.extensionTotal = getTotal(extensions);
    extensions.forEach(extension => {
        extensionMap[extension].forEach((script)=>{
            var s = document.createElement("script");
            s.src = script;
            s.onload = ()=>{
                window.extensionCounter++;
                if (window.extensionCounter >= window.extensionTotal) {
                    window.extensionsLoaded = true;
                }
            }
            document.head.append(s);
        });
    });
    if (extensions.length === 0) {
        window.extensionsLoaded = true;
    }
} else {
    localStorage.setItem("extensions", JSON.stringify([]));
    window.extensionsLoaded = true;
}

var extensions = JSON.parse(localStorage.getItem("extensions"));
function addMod(url) {
    extensions.push(url);
    saveMods();
}
function clearMods() {
    extensions = [];
    saveMods();
    location.reload();
}
function removeMod(url) {
    extensions.splice(mods.indexOf(url), 1);
    saveMods();
}
function saveMods() {
    localStorage.setItem("extensions", JSON.stringify(extensions));
}
function openExtensionMenu() {
    var extWin = window.open();
    extWin.document.head.innerHTML = "<title>Flow Extensions</title>";
    function updatePage() {
        extWin.document.body.innerHTML = "";
        extWin.document.body.innerHTML += "<h2>Flow Extensions</h2>";
        extWin.document.body.innerHTML += "<h4>Reload main page to apply changes</h4>";
        extWin.document.body.innerHTML += "<h4>Click on an extension to toggle it.</h4>";
        
        var list = Object.keys(extensionMap);
        list.forEach(el => {
            var entry = document.createElement("h3");
            entry.innerText = el;
            entry.style.color = extensions.includes(el) ? "green" : "red";
            entry.onclick = ()=>{
                if(extensions.includes(el)) {
                    console.log(extensions);
                    extensions.splice(extensions.indexOf(el), 1);
                } else {
                    extensions.push(el);
                }
                saveMods();
                entry.style.color = extensions.includes(el) ? "green" : "red";
            };
            extWin.document.body.appendChild(entry);
        });
    }
    updatePage();
}
window.addEventListener("beforeunload", saveMods);
if (localStorage.getItem("usermods")) {
    var mods = JSON.parse(localStorage.getItem("usermods"));
    mods.forEach(mod => {
        var s = document.createElement("script");
        s.src = mod;
        document.head.append(s);
    });
} else {
    localStorage.setItem("usermods", JSON.stringify([]));
}
var mods = JSON.parse(localStorage.getItem("usermods"));
function addMod(url) {
    mods.push(url);
    saveMods();
}
function clearMods() {
    mods = [];
    saveMods();
    location.reload();
}
function removeMod(url) {
    mods.splice(mods.indexOf(url), 1);
    saveMods();
}
function saveMods() {
    localStorage.setItem("usermods", JSON.stringify(mods));
}
window.addEventListener("beforeunload", saveMods);
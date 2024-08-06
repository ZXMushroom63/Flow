window.fnMap = {};
window.callStack = {};

function functionMapUpdate() {
    window.fnMap = {};
    window.callStack = {};
    var functions = document.querySelectorAll(`div.node[data-type^="proc/f"]`);
    functions.forEach((fn)=>{
        var name = fn.querySelector("span.header").innerText;
        window.callStack[name] = [];
        window.fnMap[name] = compileGraph(fn);
    });
}
window.graphUpdateListeners.push(functionMapUpdate);
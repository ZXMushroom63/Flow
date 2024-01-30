function startHats(type) {
    var lib = window.library[type];
    if (lib.hat === true) {
        document.querySelectorAll(`.node[data-type="${type}"`).forEach(hat => {
            hat.exec();
        });
    }
}
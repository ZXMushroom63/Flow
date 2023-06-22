window.renderPreflight = false;

function renderTexture2D() {
    window.renderPreflight = true;
    window.rx = 0;
    window.ry = 0;
    try {
        getSize();
        getRed();
        getGreen();
        getBlue();
        getAlpha();
    } catch (error) {
        alert(error);
    }
    window.renderPreflight = false;
    var ctx = document.querySelector("#rentex").getContext("2d");
    var imageData = ctx.createImageData(rentex.width, rentex.height);
    var data = imageData.data;
    rentex.duration = performance.now();
    for (let i = 0; i < data.length; i += 4) {
        rentex.rx = (i / 4) % rentex.width;
        rentex.ry = Math.floor(i / 4 / rentex.width);
        data[i] = getRed(true);
        data[i + 1] = getGreen(true);
        data[i + 2] = getBlue(true);
        data[i + 3] = getAlpha(true);
    }
    rentex.duration = performance.now() - rentex.duration;

    ctx.putImageData(imageData, 0, 0);
    document.querySelector("#renderOutput").classList.remove("hidden");
    document.querySelector("#renderOutTitle").textContent = ` (${Math.trunc(rentex.duration)}ms)`;
    soundEffect("chime");
}

function downloadRenderTexture() {
    var link = document.createElement("a");
    link.download = "rentex.png";
    link.href = document.querySelector("#rentex").toDataURL();
    link.click();
}

function getSize() {
    if (!document.querySelector(".node .header[data-sizeoutput]")) {
        return;
    }
    var outputNode = document.querySelector(
        ".node .header[data-sizeoutput]"
    ).parentElement;
    outputNode.getValue();
}

function getGraph(type, def = 0) {
    let node = document.querySelector(`.node[data-type="${type}"]`);
    return node
        ? compileGraph(node)
        : { calculate: () => { return def } };
}

function getRed(auto = false) {
    if (!auto) {
        rentex.redNode = getGraph("redout");
        rentex.redNode.calculate(true);
    }
    if (!rentex.redNode) {
        if (!auto) {
            alert(
                "Unable to get red output due to lack of a redout node. Insert an redout node to continue."
            );
        }
        return 0;
    }
    return rentex.redNode.calculate();
}

function getGreen(auto = false) {
    if (!auto) {
        rentex.greenNode = getGraph("greenout");
        rentex.greenNode.calculate(true);
    }

    if (!rentex.greenNode) {
        if (!auto) {
            alert(
                "Unable to get green output due to lack of a greenout node. Insert an greenout node to continue."
            );
        }
        return 0;
    }
    return rentex.greenNode.calculate();
}

function getBlue(auto = false) {
    if (!auto) {
        rentex.blueNode = getGraph("blueout");
        rentex.blueNode.calculate(true);
    }
    if (!rentex.blueNode) {
        if (!auto) {
            alert(
                "Unable to get blue output due to lack of a blueout node. Insert an blueout node to continue."
            );
        }
        return 0;
    }
    return rentex.blueNode.calculate();
}

function getAlpha(auto = false) {
    if (!auto) {
        rentex.alphaNode = getGraph("alphaout", 255);
        rentex.alphaNode.calculate(true);
    }
    if (!rentex.alphaNode) {
        if (!auto) {
            alert(
                "Unable to get alpha output due to lack of a alphaout node. Insert an alphaout node to continue."
            );
        }
        return 255;
    }
    return rentex.alphaNode.calculate();
}
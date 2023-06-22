var rentex = {
    rx: 0,
    ry: 0,
    width: 300,
    height: 300,
    redNode: null,
    greenNode: null,
    blueNode: null,
    alphaNode: null,
    duration: 0,
};
window.mode = "number";
window.renderPreflight = false;
dragElem(document.querySelector("#renderOutput"));
addNode(
    "xpos",
    ["X Position", "xcoord", "X"],
    [],
    () => {
        return rentex.rx;
    },
    "grey",
    {},
    {
        dynamic: true,
        doc: `In 2D RenTex mode: The X position of the pixel, 0 being the very left most column.`,
    }
);

addNode(
    "size",
    ["Render Size", "render"],
    ["Width", "Height"],
    (width, height) => {
        rentex.width = width || 300;
        rentex.height = height || 300;
        document.querySelector("#rentex").setAttribute("width", rentex.width);
        document.querySelector("#rentex").setAttribute("height", rentex.height);
        return;
    },
    "grey",
    {
        "data-sizeoutput": "true",
    },
    {
        no_out: true,
        static: true,
        doc: `In 2D RenText mode, this node sets the width and height of the rendered image.`,
    }
);

addNode(
    "width",
    ["Render Width", "image width"],
    [],
    () => {
        return rentex.width;
    },
    "grey",
    {},
    {
        doc: `Returns the width of the render, 300 by default.`,
    }
);

addNode(
    "height",
    ["Render Height", "image height"],
    [],
    () => {
        return rentex.height;
    },
    "grey",
    {},
    {
        doc: `Returns the height of the render, 300 by default.`,
    }
);

addNode(
    "ypos",
    ["Y Position", "ycoord", "Y"],
    [],
    () => {
        return rentex.ry;
    },
    "grey",
    {},
    {
        dynamic: true,
        doc: `In 2D RenTex mode: The Y position of the pixel, 0 being the very top most row.`,
    }
);
addNode(
    "redout",
    ["Red (0-255)", "r", "red"],
    ["R"],
    (output) => {
        return output;
    },
    "darkred",
    {
        "data-redoutput": "true",
    },
    {
        no_out: true,
        doc: `Sets the red value of the pixel in 2D RenTex mode.`,
    }
);
addNode(
    "greenout",
    ["Green (0-255)", "g", "green"],
    ["G"],
    (output) => {
        return output;
    },
    "darkgreen",
    {
        "data-greenoutput": "true",
    },
    {
        no_out: true,
        doc: `Sets the green value of the pixel in 2D RenTex mode.`,
    }
);
addNode(
    "blueout",
    ["Blue (0-255)", "b", "blue"],
    ["B"],
    (output) => {
        return output;
    },
    "darkblue",
    {
        "data-blueoutput": "true",
    },
    {
        no_out: true,
        doc: `Sets the blue value of the pixel in 2D RenTex mode.`,
    }
);
addNode(
    "alphaout",
    ["Opacity (0-255)", "a", "alpha", "opacity"],
    ["A"],
    (output) => {
        return output;
    },
    "grey",
    {
        "data-alphaoutput": "true",
    },
    {
        no_out: true,
        doc: `Sets the alpha value of the pixel in 2D RenTex mode. 0 means transparent, 255 means fully opaque.`,
    }
);
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
    //alert(rentex.duration + "ms");
    ctx.putImageData(imageData, 0, 0);
    document.querySelector("#renderOutput").classList.remove("hidden");
    soundEffect("chime");
}
function downloadRenderTexture() {
    var link = document.createElement("a");
    link.download = "rentex.png";
    link.href = document.querySelector("#rentex").toDataURL();
    link.click();
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
function getSize() {
    if (!document.querySelector(".node .header[data-sizeoutput]")) {
        return;
    }
    var outputNode = document.querySelector(
        ".node .header[data-sizeoutput]"
    ).parentElement;
    outputNode.getValue();
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

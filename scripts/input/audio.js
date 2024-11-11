addNode("audiosample", {
    alias: ["Audio Sample", "sound", "audio", "audiofile", "soundfile", "noise"],
    inputs: ["Time (s)"],
    usespkg: ["(audiosample is not packageable)"],
    outputs: ["Prev Sample", "Current Sample", "Next Sample", "Sample Rate (sps)", "Duration (s)"],
    func: function (t) {
        var sampleIdx = Math.floor(t * this.sampleRate);
        return [
            this.audioData[sampleIdx - 1] || 0,
            this.audioData[sampleIdx] || 0,
            this.audioData[sampleIdx + 1] || 0,
            this.sampleRate,
            this.duration
        ];
    },
    init: function () {
        let self = this;
        self.audioData = [];
        self.duration = 0;
        self.sampleRate = 24000;

        var displayCanvas = document.createElement("audio");
        displayCanvas.style.width = "100%";
        displayCanvas.style.display = "block";
        displayCanvas.style.marginTop = "9rem";
        displayCanvas.style.marginBottom = "1rem";
        displayCanvas.setAttribute("controls", "");
        this.append(displayCanvas);

        var audioUrl = null;
        var ctx = new AudioContext();

        var imgInfo = document.createElement("span");
        imgInfo.style.display = "block";
        imgInfo.style.color = "white";
        imgInfo.innerText = "...";
        self.append(imgInfo);

        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "audio/*";
        fileInput.style.display = "block";
        fileInput.style.color = "white";
        fileInput.addEventListener("input", () => {
            if (fileInput.files[0]) {
                var reader = new FileReader();
                reader.onload = async () => {
                    fileInput.value = "";
                    const blob = new Blob([reader.result], { type: 'audio/*' });
                    if (audioUrl) {
                        URL.revokeObjectURL(audioUrl);
                    }
                    audioUrl = URL.createObjectURL(blob);
                    displayCanvas.src = audioUrl;
                    var audioBuffer = await ctx.decodeAudioData(reader.result);
                    self.sampleRate = audioBuffer.sampleRate;
                    self.duration = audioBuffer.duration;
                    var out = new Float32Array(audioBuffer.length).fill(0);
                    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
                        const channel = audioBuffer.getChannelData(i);
                        channel.forEach((x, i) => {
                            out[i] += x;
                        });
                    }
                    out.forEach((x, i) => {
                        out[i] = x / audioBuffer.numberOfChannels;
                    });
                    self.audioData = out;
                    imgInfo.innerText = `Samplerate: ${self.sampleRate}, Duration: ${Math.round(self.duration)}s, Channels: ${audioBuffer.numberOfChannels}`;
                    self.dragListeners.forEach((func) => {
                        func();
                    });
                };
                reader.readAsArrayBuffer(fileInput.files[0]);
                self.getValue();
            }
        });
        this.append(fileInput);
    },
    color: "darkcyan",
    doc: "Returns RGBA colors at the X and Y coordinates of a selected image. Also outputs with and height of the image.",
});
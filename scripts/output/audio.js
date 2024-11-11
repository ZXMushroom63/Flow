window.renaud = {
  duration: 0,
  sampleRate: 24000,
  bitRate: 128,
  currentTime: 0,
  currentSample: 0,
};
addNode("audio", {
  alias: ["Audio", "Audio File", "soundwave", "wav", "mp3", "m4a", "pcm", "pcm data", "raw audio", "waveform"],
  inputs: ["x", "Sample rate (sps)", "Bitrate (kbps)", "Duration (s)"],
  outputs: [],
  color: "darkviolet",
  renameable: true,
  func: function (x, sampleRate, bitRate, duration) {
    this.x = x;
    this.sampleRate = sampleRate;
    this.bitRate = bitRate;
    this.duration = duration;
    return [];
  },
  init: function () {
    function findClosestNumber(arr, target) {
      return arr.reduce((prev, curr) => {
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
      });
    }

    const validSampleRates = [8000, 11025, 12000, 16000, 22050, 24000, 32000, 44100, 48000];
    
    function float32ToInt16(buffer) {
      let l = buffer.length;
      let buf = new Int16Array(l);
      while (l--) {
        buf[l] = buffer[l] * 32767;
      }
      return buf;
    }

    // Function to convert Float32Array to MP3 Blob
    function convertToMp3Blob(float32Array, sampleRate, bRate) {
      let mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, bRate); // Mono, sample rate, kbps
      let samples = float32ToInt16(float32Array);
      let mp3Data = [];
      let sampleBlockSize = 1152;

      for (let i = 0; i < samples.length; i += sampleBlockSize) {
        let sampleChunk = samples.subarray(i, i + sampleBlockSize);
        let mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }

      let mp3buf = mp3Encoder.flush();
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }


      let blob = new Blob(mp3Data, { type: 'audio/mp3' });
      return blob;
    }

    let self = this;
    var audio = document.createElement("audio");
    audio.style.width = "16rem";
    audio.style.display = "block";
    audio.style.marginBottom = "1rem";
    audio.style.marginTop = "1rem";
    audio.setAttribute("controls", "");
    this.append(audio);
    var renderBtn = document.createElement("div");
    renderBtn.classList.add("btn");
    renderBtn.style.display = "block";
    renderBtn.style.float = "right";
    renderBtn.innerText = "Render";
    this.append(renderBtn);
    var downloadBtn = document.createElement("div");
    downloadBtn.classList.add("btn");
    downloadBtn.style.display = "block";
    downloadBtn.style.float = "right";
    downloadBtn.innerText = "Download";
    this.append(downloadBtn);
    downloadBtn.addEventListener("click", function () {
      var link = document.createElement("a");
      link.download = "audio.mp3";
      link.href = audio.src;
      link.click();
    });
    var prevOutput = null;
    renderBtn.addEventListener("click", function () {
      if (prevOutput) {
        URL.revokeObjectURL(prevOutput);
      }
      if (flags.benchmarking) {
        var start = performance.now();
      }

      var graph = compileGraph(self);
      graph.calculate(true);
      var recompiled = recompileGraph(graph);
      var sampleRate = findClosestNumber(validSampleRates, parseInt(self.sampleRate) || 0);
      var bitRate = parseFloat(self.bitRate) || 128;
      var duration = parseFloat(self.duration) || 0;
      var samples = parseInt(sampleRate * duration) || 0;
      var audioData = new Float32Array(samples);
      window.renaud.sampleRate = sampleRate;
      window.renaud.bitRate = bitRate;
      window.renaud.duration = duration;
      for (let i = 0; i < audioData.length; i += 1) {
        renaud.currentSample = i;
        renaud.currentTime = i / sampleRate;
        recompiled();
        audioData[i] = self.x;
      }
      var output = convertToMp3Blob(audioData, sampleRate, bitRate);
      audio.src = URL.createObjectURL(output);
      prevOutput = output;
      if (flags.benchmarking) {
        console.log("Rendered audio with graph in " + (performance.now() - start).toFixed(2) + "ms");
      }
      soundEffect("chime");
      self.dragListeners.forEach((func) => {
        func();
      });
    });
  },
  doc: `Used to make audio files. 
  <br>X represents the audio value. For example, to make a 256 Hz tone, plug sin( audio position  *  360 ) into X.
  <br>Duration and Sample Rate: Duration is the length of the target file in seconds, and sample rate is the sample rate of the audio. Try 24000 to start. (full audio quality is 48000)
  <br>How to use: press (Render) to draw the image, and (Download) to save it to your device.
  <br>Note: sample rates will be rouned to the closest valid sample rate, from: 8kHz, 11.025kHz, 12kHz, 16kHz, 22.05kHz, 24kHz, 32kHz, 44.1kHz and 48kHz
  <br>Default bit depth is 128.`,
});

addNode("audio/time", {
  alias: ["Audio Time Position (s)", "time", "audio position", "seconds", "audio position", "audio pos", "current audio time position"],
  func: () => {
    return [window?.renaud?.currentTime || 0];
  },
  color: "grey",
  doc: `Returns position in seconds of the current audio render.`,
});

addNode("audio/duration", {
  alias: ["Audio Duration (s)", "duration", "length"],
  func: () => {
    return [window?.renaud?.duration || 0];
  },
  color: "grey",
  doc: `Returns the duration of the current audio output.`,
});

addNode("audio/samplerate", {
  alias: ["Audio Samplerate (sps)", "audiorate", "samplerate", "samples"],
  func: () => {
    return [window?.renaud?.sampleRate || 0];
  },
  color: "grey",
  doc: `Returns the sample rate of the current audio render.`,
});

addNode("audio/bitrate", {
  alias: ["Audio Bitrate (kbps)", "bitdepth", "bitrate", "samples", "audio bit"],
  func: () => {
    return [window?.renaud?.bitRate || 0];
  },
  color: "grey",
  doc: `Returns the sample rate of the current audio render.`,
});


addNode("audio/sample", {
  alias: ["Audio Sample Position", "current sample", "audio pos", "audio position", "audio index"],
  func: () => {
    return [window?.renaud?.currentSample || 0];
  },
  color: "grey",
  doc: `Returns sample index of the current audio render.`,
});

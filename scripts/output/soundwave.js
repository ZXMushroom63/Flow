addNode("soundwave", {
  alias: [
    "Soundwave",
    "frequency",
    "hz",
    "freq",
    "gain",
    "volume",
    "wave",
    "waveform",
    "wavetype",
  ],
  color: "darkviolet",
  inputs: ["Frequency (Hz)", "Volume (0.0-1.0)", "Wave Type ∿:0|⎍:1|△:2|⊿:3"],
  outputs: [],
  doc: `The Soundwave Node is used for making audio. It has three inputs: 
  <br>Frequency: The pitch of the sound, in Hertz. Default is 256 Hz, middle C. 
  <br>Volume: The volume of the soundwave. 0 is mute, and 1 full volume. Default is 0.5.
  <br>Wave Type: The wavetype of the soundwave. 0 is a sine wave, 1 is a square wave, 2 is a trangle wave and 3 is a sawtooth wave.`,
  func: function (hz, vol, wave) {
    this.hz = hz;
    this.vol = vol;
    this.wave = wave;
    return [];
  },
  init: function () {
    let self = this;

    var playBtn = document.createElement("div");
    playBtn.classList.add("btn");
    playBtn.style.display = "inline-block";
    playBtn.style.float = "left";
    playBtn.innerText = "Play";
    self.append(playBtn);

    var ctx = new AudioContext();
    var player = new SoundPlayer(ctx);
    var SoundPlayerOn = false;
    var updateAudio = null;

    playBtn.addEventListener("click", function () {
      if (SoundPlayerOn) {
        playBtn.innerText = "Play";
        player.stop();
        SoundPlayerOn = false;
        if (updateAudio) {
          clearInterval(updateAudio);
          updateAudio = null;
        }
      } else {
        playBtn.innerText = "Stop";
        player.play(256, 0.5, "sine");
        SoundPlayerOn = true;
        if (updateAudio) {
          clearInterval(updateAudio);
          updateAudio = null;
        }

        updateAudio = setInterval(() => {
          self.getValue();
          var waven = self.wave || 0;
          waven = Math.min(Math.max(waven, 0), 3);
          waven = Math.floor(waven);
          switch (waven) {
            case 0:
              player.setWaveType("sine");
              break;
            case 1:
              player.setWaveType("square");
              break;
            case 2:
              player.setWaveType("triangle");
              break;
            case 3:
              player.setWaveType("sawtooth");
              break;
            default:
              player.setWaveType("sine");
              break;
          }
          player.setVolume(self.vol || 0.0);
          player.setFrequency(self.hz || 256);
        }, 50);
      }
    });
  },
});

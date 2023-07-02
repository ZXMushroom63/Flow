addNode("frequencyout", {
  alias: ["Frequency (Hz)", "freq", "hz", "frequency"],
  inputs: ["G"],
  func: (output) => {
    return output;
  },
  color: "darkviolet",
  headerAttrs: {
    "data-frequencyoutput": "true",
  },
  no_out: true,
  doc: `Sets the output frequency (Hz) in Soundwave mode. Default is 256 Hz.`,
});
addNode("volumeout", {
  alias: ["Volume (0.0-1.0)", "vol", "gain", "volume"],
  inputs: ["G"],
  func: (output) => {
    return output;
  },
  color: "darkviolet",
  headerAttrs: {
    "data-volumeoutput": "true",
  },
  no_out: true,
  doc: `Sets the output volume in Soundwave mode, 0.0 being mute and 1.0 being full volume. Default is 0.5.`,
});
addNode("waveformout", {
  alias: ["Wave Type ∿:0|⎍:1|△:2|⊿:3", "wave", "waveform", "wavetype"],
  inputs: ["G"],
  func: (output) => {
    return output;
  },
  color: "darkviolet",
  headerAttrs: {
    "data-waveformoutput": "true",
  },
  no_out: true,
  doc: `Sets the output sound wavetype in Soundwave mode. 0 is a sine wave, 1 is square, 2 is triangle and 3 is sawtooth.`,
});

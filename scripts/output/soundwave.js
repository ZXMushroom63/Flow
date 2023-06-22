addNode(
  "frequencyout",
  ["Frequency (Hz)", "freq", "hz", "frequency"],
  ["G"],
  (output) => {
    return output;
  },
  "darkviolet",
  {
    "data-frequencyoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the output frequency (Hz) in Soundwave mode. Default is 256 Hz.`,
  }
);
addNode(
  "volumeout",
  ["Volume (0.0-1.0)", "vol", "gain", "volume"],
  ["G"],
  (output) => {
    return output;
  },
  "darkviolet",
  {
    "data-volumeoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the output volume in Soundwave mode, 0.0 being mute and 1.0 being full volume. Default is 0.5.`,
  }
);
addNode(
  "waveformout",
  ["Wave Type ∿:0|⎍:1|△:2|⊿:3", "wave", "waveform", "wavetype"],
  ["G"],
  (output) => {
    return output;
  },
  "darkviolet",
  {
    "data-waveformoutput": "true",
  },
  {
    no_out: true,
    doc: `Sets the output sound wavetype in Soundwave mode. 0 is a sine wave, 1 is square, 2 is triangle and 3 is sawtooth.`,
  }
);

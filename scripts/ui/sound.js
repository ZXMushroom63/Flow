
var ctx = new AudioContext();
var player = new SoundPlayer(ctx);
var SoundPlayerOn = false;
var updateAudio = null;
function togglePlay(btn) {
  if (SoundPlayerOn) {
    btn.innerText = "Play";
    player.stop();
    SoundPlayerOn = false;
    if (updateAudio) {
      clearInterval(updateAudio);
      updateAudio = null;
    }
  } else {
    btn.innerText = "Stop";
    player.play(256, 0.5, "sine");
    SoundPlayerOn = true;
    if (updateAudio) {
      clearInterval(updateAudio);
      updateAudio = null;
    }
    getFrequency();
    getGain();
    getWaveForm();
    updateAudio = setInterval(() => {
      player.setWaveType(getWaveForm(true));
      player.setVolume(getGain(true));
      player.setFrequency(getFrequency(true));
    }, 50);
  }
}

function getFrequency(auto = false) {
  if (!document.querySelector(".node .header[data-frequencyoutput]")) {
    if (!auto) {
      alert(
        "Unable to get frequency output due to lack of a frequency node. Insert a frequency node to continue."
      );
    }
    return 256;
  }
  var outputNode = document.querySelector(
    ".node .header[data-frequencyoutput]"
  ).parentElement;
  return outputNode.getValue() || 256;
}

function getWaveForm(auto = false) {
  if (!document.querySelector(".node .header[data-waveformoutput]")) {
    if (!auto) {
      alert(
        "Unable to get waveform output due to lack of a waveform node. Insert a waveform node to continue."
      );
    }
    return "sine";
  }
  var outputNode = document.querySelector(
    ".node .header[data-waveformoutput]"
  ).parentElement;
  var waven = outputNode.getValue() || 0;
  waven = Math.min(Math.max(waven, 0), 3);
  waven = Math.floor(waven);
  switch (waven) {
    case 0:
      return "sine";
      break;
    case 1:
      return "square";
      break;
    case 2:
      return "triangle";
      break;
    case 3:
      return "sawtooth";
      break;

    default:
      return "sine";
      break;
  }
}

function getGain(auto = false) {
  if (!document.querySelector(".node .header[data-volumeoutput]")) {
    if (!auto) {
      alert(
        "Unable to get volume output due to lack of a volume node. Insert a volume node to continue."
      );
    }
    return 0.5;
  }
  var outputNode = document.querySelector(
    ".node .header[data-volumeoutput]"
  ).parentElement;
  return outputNode.getValue();
}

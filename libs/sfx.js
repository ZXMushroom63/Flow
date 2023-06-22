window["sfx"] = {
  click: new Audio("sfx/click.wav"),
  chime: new Audio("sfx/chime.wav"),
  delete: new Audio("sfx/delete.wav"),
  connect: new Audio("sfx/connect.wav"),
};
function soundEffect(key) {
  window["sfx"][key].currentTime = 0;
  window["sfx"][key].play();
}

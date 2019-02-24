"use strict";

// "let" kills javascript on iPhone 4S

function volRangeInput(value) {
  document.querySelector("#volNumber").value = value;
  if (gain) {
    gain.gain.setValueAtTime(value / 100.0, 0);
  }
}

function volNumberInput(value) {
  document.querySelector("#volRange").value = value;
  if (gain) {
    gain.gain.setValueAtTime(value / 100.0, 0);
  }
}

function bpmRangeInput(value) {
  document.querySelector("#bpmNumber").value = value;
  if (bipper) {
    clearInterval(bipper);
    bipper = setInterval(bip, 60000.0 / value);
  }
}

function bpmNumberInput(value) {
  document.querySelector("#bpmRange").value = value;
  if (bipper) {
    clearInterval(bipper);
    bipper = setInterval(bip, 60000.0 / value);
  }
}

var audioContext = undefined;
var gain = undefined;
var oscillator = undefined;
var bipper = undefined;
var beep = false;
var flash = true;

function bop() {
  // always reset it, since flash might change to false while the
  // button is colored
  document.querySelector("#startStop").style.backgroundColor = "#6c757d";
}

function dbg(msg) {
  try {
    document.querySelector("#dbg").innerText += " " + msg;
  }
  catch (err) {
  }
}

function bip() {
  if (beep) {
    var beepDuration = 0.10;
    oscillator = audioContext.createOscillator();
    oscillator.connect(gain);
    oscillator.type = 'sine';
    oscillator.start();
    oscillator.stop(audioContext.currentTime + beepDuration);
  }
  if (flash) {
    var flashDuration = 0.10;
    document.querySelector("#startStop").style.backgroundColor = "red";
    setTimeout(bop, flashDuration * 1000.0);
  }
}

function startStop() {
  if (! audioContext) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    gain = audioContext.createGain();
    gain.connect(audioContext.destination);
    gain.gain.setValueAtTime(0.5, audioContext.currentTime);
  }
  if (bipper) {
    // stop
    clearInterval(bipper);
    bipper = undefined;
    document.querySelector("#startStop").innerText = "Start";
    document.querySelector("#startStop").style.backgroundColor = "#6c757d";
  } else {
    // start
    var bpm = document.querySelector("#bpmRange").value;
    var interval_ms = 60000.0 / bpm;
    bipper = setInterval(bip, interval_ms);
    document.querySelector("#startStop").innerText = "Stop";
  }
}

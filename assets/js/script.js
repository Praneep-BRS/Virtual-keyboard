"use strict";

const keyboard = document.querySelector(".keyboard");
const textArea = document.getElementById("textarea");
const audioElement = document.getElementById(`audio`);
let isShifted = false;
let displayInput = "";
const markup = generateKeys();

//generate keys
function generateKeys() {
  const keys = [
    {
      id: "row-1",
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "+", "Delete"],
    },
    {
      id: "row-2",
      buttons: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]"],
    },
    {
      id: "row-3",
      buttons: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "|"],
    },
    {
      id: "row-4",
      buttons: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ":"],
    },
    { id: "row-5", buttons: ["z", "x", "c", "v", "b", "n", "m", "Shift"] },
    { id: "row-6 space", buttons: ["Space"] },
  ];
  return `${keys
    .map(
      (row) =>
        `<div class='row' id=${row.id}>${row.buttons
          .map((key) => `<button class='key'>${key}</button>`)
          .join("")}</div>`,
    )
    .join("")}`;
}

// Play audio function
const playAudio = (audioElement) => {
  if (audioElement) {
    audioElement.currentTime = 0; // Reset the audio to the beginning
    audioElement.play();
  }
};

const showInput = (input) => {
  textArea.value = input;
};

const handleShift = () => {
  isShifted = !isShifted;
  const buttons = document.querySelectorAll(".key:not(#space)");
  buttons.forEach((btn) => btn.classList.toggle("upper"));
};

const implementKeyBoard = () => {
  keyboard.innerHTML = markup;
  keyboard.addEventListener("click", (event) => {
    const target = event.target;
    const targetKeyValue = target.textContent;

    if (!target.classList.contains("key")) return;

    if (targetKeyValue === "Delete") {
      displayInput = "";
    } else if (targetKeyValue === "Shift") {
      handleShift();
    } else if (targetKeyValue === "Space") {
      displayInput += " ";
    } else {
      displayInput += isShifted ? targetKeyValue.toUpperCase() : targetKeyValue;
    }
    playAudio(audioElement);
    showInput(displayInput);
  });
};

function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("iss-theme", theme);
}

window.addEventListener("DOMContentLoaded", implementKeyBoard);

"use strict";

const keys = [
  { id: "row-1", buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "-", "+", "Delete"] },
  {
    id: "row-2",
    buttons: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]"],
  },
  {
    id: "row-3",
    buttons: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "|"],
  },
  { id: "row-4", buttons: ["a", "s", "d", "f", "g", "h", "j", "k", "l", ":"] },
  { id: "row-5", buttons: ["z", "x", "c", "v", "b", "n", "m", "Shift"] },
  { id: "row-6 space", buttons: ["Space"] },
];

const keyboard = document.querySelector(".keyboard");
const textArea = document.getElementById("textarea");

let isShifted = false;
let displayInput = "";

const markup = `${keys
  .map(
    (row) =>
      `<div class='row' id=${row.id}>${row.buttons
        .map((key) => `<button class='key'>${key}</button>`)
        .join("")}</div>`,
  )
  .join("")}`;

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

    showInput(displayInput);
  });
};

function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("iss-theme", theme);
}

window.addEventListener("DOMContentLoaded", implementKeyBoard);

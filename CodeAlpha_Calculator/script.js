const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

function calculateExpression(expression) {
  try {
    return Function('"use strict";return (' + expression + ')')();
  } catch {
    return "Error";
  }
}

function processInput(value) {
  if (value === "C") {
    currentInput = "";
    display.value = "";
    return;
  }

  if (value === "⌫") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    return;
  }

  if (value === "=") {
    const result = calculateExpression(currentInput);
    display.value = result;
    currentInput = result.toString();
    return;
  }

  if (value === "Log") {
    if (currentInput !== "") {
      const result = Math.log(parseFloat(currentInput));
      display.value = result;
      currentInput = result.toString();
    }
    return;
  }

  if (value === "√") {
    if (currentInput !== "") {
      const result = Math.sqrt(parseFloat(currentInput));
      display.value = result;
      currentInput = result.toString();
    }
    return;
  }

  currentInput += value;
  display.value = currentInput;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    processInput(button.textContent);
  });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/^[0-9]$/.test(key) || ["+", "-", "*", "/", "."].includes(key)) {
    processInput(key);
  }

  if (key === "Enter") processInput("=");
  if (key === "Backspace") processInput("⌫");
  if (key.toLowerCase() === "c") processInput("C");
  if (key.toLowerCase() === "l") processInput("Log");
  if (key.toLowerCase() === "s") processInput("√");
});
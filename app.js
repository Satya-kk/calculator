const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (value === "=") {
      try {
        // Evaluate safely
        let result = eval(currentInput);
        if (!isFinite(result)) throw "Math Error";
        display.value = result;
        currentInput = result.toString();
      } catch {
        display.value = "Error";
        currentInput = "";
      }
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Optional: keyboard input support
document.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", ".", "%"].includes(e.key)
  ) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === "Enter") {
    try {
      let result = eval(currentInput);
      display.value = result;
      currentInput = result.toString();
    } catch {
      display.value = "Error";
      currentInput = "";
    }
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key === "Escape") {
    currentInput = "";
    display.value = "";
  }
});

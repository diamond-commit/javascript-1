
const currentDisplay = document.querySelector(".current");
const previousDisplay = document.querySelector(".previous");
const buttons = document.querySelectorAll("button");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    currentDisplay.textContent = currentValue;
    previousDisplay.textContent = previousValue && operator
        ? `${previousValue} ${operator}`
        : "";
}

function appendNumber(number) {
    if (currentValue === "0" || shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentValue = "0";
        shouldResetDisplay = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetDisplay = true;

    updateDisplay();
}

function calculate() {
    if (!operator || previousValue === "") {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "−":
        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
        case "*":
            result = firstNumber * secondNumber;
            break;

        case "÷":
        case "/":
            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;
                shouldResetDisplay = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    currentValue = String(
        Number.isInteger(result)
            ? result
            : parseFloat(result.toFixed(10))
    );

    previousValue = "";
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}

function deleteNumber() {
    if (shouldResetDisplay || currentValue === "Error") {
        return;
    }

    if (currentValue.length === 1) {
        currentValue = "0";
    } else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}

function percentage() {
    currentValue = String(parseFloat(currentValue) / 100);
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        if (!isNaN(value)) {
            appendNumber(value);
            return;
        }

        switch (value) {
            case ".":
                appendDecimal();
                break;

            case "+":
            case "−":
            case "×":
            case "÷":
                chooseOperator(value);
                break;

            case "=":
                calculate();
                break;

            case "AC":
                clearCalculator();
                break;

            case "⌫":
                deleteNumber();
                break;

            case "%":
                percentage();
                break;
        }
    });
});

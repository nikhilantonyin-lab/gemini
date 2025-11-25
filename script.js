const display = document.querySelector('.result');
const historyDisplay = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');

let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetDisplay = false;

const updateDisplay = () => {
    display.textContent = currentInput;
};

const updateHistory = (text) => {
    historyDisplay.textContent = text;
}

const calculate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
    updateHistory('');
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('ac')) {
            currentInput = '0';
            operator = null;
            previousInput = null;
            updateHistory('');
        } else if (button.classList.contains('del')) {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
        } else if (button.classList.contains('operator')) {
            if (operator && !shouldResetDisplay) {
                calculate();
            }
            previousInput = currentInput;
            operator = value;
            shouldResetDisplay = true;
            updateHistory(`${previousInput} ${operator}`);
        } else if (button.classList.contains('equals')) {
            if (operator && previousInput) {
                calculate();
            }
        } else {
            if (shouldResetDisplay) {
                currentInput = '0';
                shouldResetDisplay = false;
            }
            if (value === '.' && currentInput.includes('.')) return;
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    });
});

updateDisplay();
const display = document.getElementById('display');
let currentInput = '0';

function updateDisplay() {
    display.textContent = currentInput;
}

function appendValue(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        if (value === '.' && currentInput.slice(-1) === '.') return;
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length === 1 || currentInput === '0') {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculatePercentage() {
    try {
        let result = eval(currentInput) / 100;
        currentInput = formatResult(result);
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

function calculateSquareRoot() {
    try {
        let result = Math.sqrt(eval(currentInput));
        currentInput = formatResult(result);
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

function calculatePower() {
    if (currentInput !== '0' && currentInput !== 'Error') {
        currentInput += '**';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '0' || currentInput === 'Error') return;
    try {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            currentInput = '-' + currentInput;
        }
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

function formatResult(result) {
    if (result === Infinity || result === -Infinity || isNaN(result)) {
        return 'Error';
    }
    return parseFloat(result.toFixed(10)).toString();
}

function calculate() {
    try {
        let result = eval(currentInput);
        currentInput = formatResult(result);
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) appendValue(key);
    else if (key === '.') appendValue('.');
    else if (key === '+') appendValue('+');
    else if (key === '-') appendValue('-');
    else if (key === '*') appendValue('*');
    else if (key === '/') { event.preventDefault(); appendValue('/'); }
    else if (key === '%') calculatePercentage();
    else if (key === 'Enter' || key === '=') { event.preventDefault(); calculate(); }
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape' || key === 'Delete') clearDisplay();
});

// Initialize
updateDisplay();
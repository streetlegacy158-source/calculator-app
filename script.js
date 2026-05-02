const display = document.getElementById('display');
let currentInput = '0';

function updateDisplay() {
    display.textContent = currentInput;
}

function appendValue(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        // Prevent multiple decimals in the same number segment
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

// --- NEW OPERATIONS ---

// Percentage: divides the current number by 100
function calculatePercentage() {
    try {
        let result = eval(currentInput) / 100;
        currentInput = formatResult(result);
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Square root: calculates √ of the current expression result
function calculateSquareRoot() {
    try {
        let result = Math.sqrt(eval(currentInput));
        currentInput = formatResult(result);
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Power: adds the exponentiation operator ** for xʸ
function calculatePower() {
    // Append ** which is JavaScript's exponentiation operator
    if (currentInput !== '0' && currentInput !== 'Error') {
        currentInput += '**';
    }
    updateDisplay();
}

// Toggle sign: makes positive negative and vice versa
function toggleSign() {
    if (currentInput === '0' || currentInput === 'Error') return;
    
    try {
        // If the current input starts with a minus, remove it
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.substring(1);
        } else {
            // Otherwise add a minus sign at the beginning
            currentInput = '-' + currentInput;
        }
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Helper function to format results nicely
function formatResult(result) {
    if (result === Infinity || result === -Infinity || isNaN(result)) {
        return 'Error';
    }
    // Limit to 10 decimal places and remove trailing zeros
    return parseFloat(result.toFixed(10)).toString();
}

// Main calculation function
function calculate() {
    try {
        let result = eval(currentInput);
        currentInput = formatResult(result);
    } catch (error) {
        currentInput = 'Error';
    }
    updateDisplay();
}

// --- KEYBOARD SUPPORT ---
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/[0-9]/.test(key)) {
        appendValue(key);
    } else if (key === '.') {
        appendValue('.');
    } else if (key === '+') {
        appendValue('+');
    } else if (key === '-') {
        appendValue('-');
    } else if (key === '*') {
        appendValue('*');
    } else if (key === '/') {
        event.preventDefault(); // Prevent Firefox quick-find
        appendValue('/');
    } else if (key === '%') {
        calculatePercentage();
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    } else if (key === '^') {
        // Use ^ key for power operator
        calculatePower();
    }
});

// Initialize display
updateDisplay();
// --- In-App Install Prompt ---
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  console.log('beforeinstallprompt fired! The app is installable.');
});

// Optional: If you add an install button to your HTML with id="installButton"
// const installButton = document.getElementById('installButton');
// installButton.addEventListener('click', async () => {
//   if (!deferredPrompt) {
//     return;
//   }
//   // Show the install prompt
//   deferredPrompt.prompt();
//   // Wait for the user to respond to the prompt
//   const { outcome } = await deferredPrompt.userChoice;
//   console.log(`User response to the install prompt: ${outcome}`);
//   // We've used the prompt, and can't use it again, throw it away
//   deferredPrompt = null;
// });

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentOperand = '';
    let previousOperand = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'clear') {
                currentOperand = '';
                previousOperand = '';
                operator = null;
                display.innerText = '0';
            } else if (button.id === 'equals') {
                if (currentOperand && previousOperand && operator) {
                    currentOperand = evaluate(previousOperand, currentOperand, operator);
                    display.innerText = currentOperand;
                    previousOperand = '';
                    operator = null;
                }
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(button.id)) {
                if (currentOperand) {
                    if (previousOperand) {
                        previousOperand = evaluate(previousOperand, currentOperand, operator);
                    } else {
                        previousOperand = currentOperand;
                    }
                    operator = button.id;
                    currentOperand = '';
                }
            } else if (button.id === 'percent') {
                if (currentOperand) {
                    currentOperand = (parseFloat(currentOperand) / 100).toString();
                    display.innerText = currentOperand;
                }
            } else {
                if (currentOperand === '0' && button.innerText === '0') return;
                if (button.innerText === '.' && currentOperand.includes('.')) return;
                currentOperand += button.innerText;
                display.innerText = currentOperand;
            }
        });
    });

    function evaluate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case 'add':
                return (a + b).toString();
            case 'subtract':
                return (a - b).toString();
            case 'multiply':
                return (a * b).toString();
            case 'divide':
                return (a / b).toString();
            default:
                return '';
        }
    }
});

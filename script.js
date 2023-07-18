const NUMBER_KEYS = document.querySelectorAll('.number');
const OPERATOR_KEYS = document.querySelectorAll('.operator');
const FUNC_KEYS = document.querySelectorAll('.func-button');
const DISPLAY = document.querySelector('#display');
const AC = document.querySelector('#AC');

let memory;
let operator;
let operatorClicked = false;

function operation (operator, a, b) {
  switch (operator) {
    case 'divide':
      if (b === 0) {
        clearEverything();
        return 'Error';
      }
      return a / b;
    case 'multiply':
      return a * b;
    case 'minus':
      return a - b;
    case 'plus':
      return a + b;
  }
}

function deactivateOperators() {
  OPERATOR_KEYS.forEach(button => button.classList.remove('active'));
}

function clearEverything() {
  DISPLAY.textContent = '0';
  DISPLAY.classList.add('result');
  memory = undefined;
  operator = undefined;
  operatorClicked = false;
  deactivateOperators();
}

OPERATOR_KEYS.forEach(button => {
  button.addEventListener('click', () => {
    deactivateOperators();

    if (button.id !== 'equals') button.classList.add('active');

    operatorClicked = true;
    let currentDisplay = parseInt(DISPLAY.textContent);

    if ((button.id === 'equals') && (memory === undefined)) {
      return;
    } else if ((memory === undefined) || (operator === undefined)) {
      memory = currentDisplay;
      operator = button.id;
      console.log(`memory: ${memory}, operator: ${operator}`)
    } else {
      let currentOperator = button.id;
      let operationResult = operation(operator, memory, currentDisplay);
      if (currentOperator === 'equals') {
        clearEverything;
      } else {
        operator = currentOperator;
        memory = operationResult;
      }
      DISPLAY.textContent = operationResult;
    }
  })
})

NUMBER_KEYS.forEach(button => {
  button.addEventListener('click', () => {
    if (DISPLAY.classList.contains('result')) {
      DISPLAY.classList.remove('result');
      DISPLAY.textContent = button.textContent;
    } else if (DISPLAY.textContent.length > 9) {
      return;
    } else if ((DISPLAY.textContent === '0') || (operatorClicked === true)) {
      //if (button.textContent === '0') return;
      DISPLAY.textContent = button.textContent;
      operatorClicked = false;
      deactivateOperators();
    } else {
      DISPLAY.textContent += button.textContent;
    }
  })
})

AC.addEventListener('click', () => clearEverything());
const NUMBER_KEYS = document.querySelectorAll('.number');
const OPERATOR_KEYS = document.querySelectorAll('.operator');
const FUNC_KEYS = document.querySelectorAll('.func-button');
const DISPLAY = document.querySelector('#display');
const AC = document.querySelector('#AC');
const SIGN_KEY = document.querySelector('#sign');
const PERCENT_KEY = document.querySelector('#percent');
const EQUALS_KEY = document.querySelector('#equals');

let memory;
let operator;
let operatorClicked = false;
let repeatedEquals = false;
let valueBeforeRepeatedEquals;

function operation (operator, a, b) {
  switch (operator) {
    case 'divide':
      if (b === 0) {
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

function otherOperatorActive(clickedOperator) {
  OPERATOR_KEYS.forEach(buttonChecked => {
    if (buttonChecked.classList.contains('active')
    && (buttonChecked.id !== clickedOperator.id)) {
      buttonChecked.classList.remove('active');
      clickedOperator.classList.add('active');
      return true;
    } else {
      return false;
    }
  })
}

function cropResult(displayContent) {
  if (displayContent === 'Error') return displayContent;
  let displayValue = Number(displayContent);
  let displayText = displayContent.toString();
  if (displayText.length > 9) {
    if (displayText.includes('e-')) return 0;
    if (displayValue >= 9999999999) {
      if (displayValue > 1e100) return 'Error';
      return displayValue.toExponential(2);
    }
    console.log('TOO LONG');
    return displayText.slice(0, 10);
  } else {
    return displayValue;
  }
}

OPERATOR_KEYS.forEach(button => {
  button.addEventListener('click', () => {
    if (otherOperatorActive(button) === true) return;

    deactivateOperators();

    operatorClicked = true;
    let currentDisplay = parseFloat(DISPLAY.textContent);
    let currentOperator = button.id;

    if ((button.id === 'equals') && (memory === undefined)) {
      return;
    } else if ((memory === undefined) || (operator === undefined)) {
      if (currentOperator === 'equals') return;
      button.classList.add('active');
      memory = currentDisplay;
      operator = button.id;
    } else {
      let operationResult = operation(operator, memory, currentDisplay);

      if (currentOperator === 'equals') {
        if ((!DISPLAY.classList.contains('result'))
        && (repeatedEquals === false)) {
          memory = currentDisplay;
          valueBeforeRepeatedEquals = currentDisplay;
        } else if (repeatedEquals === true) {
          operationResult = operation(operator, currentDisplay, valueBeforeRepeatedEquals);
        }
        DISPLAY.classList.add('result');
        DISPLAY.textContent = cropResult(operationResult);
        repeatedEquals = true;
      } else if (DISPLAY.classList.contains('result')) {
        button.classList.add('active');
        DISPLAY.classList.remove('result');
        operator = currentOperator;
        memory = currentDisplay;
        repeatedEquals = false;
      } else {
        button.classList.add('active');
        operator = currentOperator;
        memory = operationResult;
        DISPLAY.textContent = cropResult(operationResult);
        repeatedEquals = false;
      }
    }
  })
})

NUMBER_KEYS.forEach(button => {
  button.addEventListener('click', () => {
    repeatedEquals = false;
    if (button.id === 'decimal') {
      return;
    } else if (DISPLAY.classList.contains('result')) {
      clearEverything();
      DISPLAY.classList.remove('result');
      DISPLAY.textContent = button.textContent;
    } else if ((DISPLAY.textContent === '0') || (operatorClicked === true)) {
      DISPLAY.textContent = button.textContent;
      operatorClicked = false;
      deactivateOperators();
    } else {
      DISPLAY.textContent = cropResult(DISPLAY.textContent + button.textContent);
    }
  })
})

AC.addEventListener('click', () => clearEverything());

SIGN_KEY.addEventListener('click', () => DISPLAY.textContent = cropResult(parseFloat(DISPLAY.textContent) * -1));

PERCENT_KEY.addEventListener('click', () => DISPLAY.textContent = cropResult(parseFloat(DISPLAY.textContent) * 100));
const NUMBER_KEYS = document.querySelectorAll('.number');
const OPERATOR_KEYS = document.querySelectorAll('.operator');
const FUNC_KEYS = document.querySelectorAll('.func-button');
const DISPLAY = document.querySelector('#display');
const AC = document.querySelector('#AC');

let memory;
let operator;
let operatorClicked = false;

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
    if (button.id !== 'equals') button.classList.add('active');
    operatorClicked = true;
    let currentDisplay = parseInt(DISPLAY.textContent);

    deactivateOperators();
    
    if (memory === undefined) {
      memory = currentDisplay;
    } else if (operator === undefined) {
      operator = button.id;
    } else {

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
      if (button.textContent === '0') return;
      DISPLAY.textContent = button.textContent;
      operatorClicked = false;
      deactivateOperators();
    } else {
      DISPLAY.textContent += button.textContent;
    }
  })
})

AC.addEventListener('click', () => clearEverything());
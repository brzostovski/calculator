const NUMBER_KEYS = document.querySelectorAll('.number');
const OPERATOR_KEYS = document.querySelectorAll('.operator');
const FUNC_KEYS = document.querySelectorAll('.func-button');
const DISPLAY = document.querySelector('#display');
const AC = document.querySelector('#AC');

function buttonDeactivate(button) {
  button.classList.remove('active');
}

OPERATOR_KEYS.forEach(button => {
  button.addEventListener('click', () => {
    OPERATOR_KEYS.forEach(button => buttonDeactivate(button));
    if (button.id === 'equals') return;
    button.classList.add('active');
  })
})

NUMBER_KEYS.forEach(button => {
  button.addEventListener('click', () => {
    if (DISPLAY.classList.contains('result')) {
      DISPLAY.classList.remove('result');
      DISPLAY.textContent = button.textContent;
    } else if (DISPLAY.textContent.length > 9) {
      return;
    } else if (DISPLAY.textContent === '0') {
      if (button.textContent === '0') return;
      DISPLAY.textContent = button.textContent;
    } else {
      DISPLAY.textContent += button.textContent;
    }
  })
})

AC.addEventListener('click', () => {
  DISPLAY.textContent = '0';
  DISPLAY.classList.add('result');
  OPERATOR_KEYS.forEach(button => buttonDeactivate(button));
})
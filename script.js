const NUMBER_KEYS = document.querySelectorAll('.number');
const OPERATOR_KEYS = document.querySelectorAll('.operator');
const FUNC_KEYS = document.querySelectorAll('.func-button');
const DISPLAY = document.querySelector('#display');

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
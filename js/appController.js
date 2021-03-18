import { state } from './state.js';
import { domElements as $el } from './domElements.js';
import uiController from './uiController.js';

const markWrongNumbers = guess => {
  const btnList = document.querySelectorAll('.keyboard__button');
  if (guess > state.secretNumber) {
    const btns = [...btnList].filter(btn => +btn.textContent >= guess);
    uiController.changeBtns(btns);
  }
  if (guess < state.secretNumber) {
    const btns = [...btnList].filter(btn => +btn.textContent <= guess);
    uiController.changeBtns(btns);
  }
};

const handleGameOver = status => {
  let message = 'You won!!';

  if (status !== 'won') {
    message = `You lost :(`;
  }

  uiController.displayAgainBtn();
  uiController.displayMessage(message);
  uiController.displayNumber(state.secretNumber);
  uiController.changeUI(status);
};

const handleWrongNumber = guess => {
  state.attempts--;
  uiController.displayAttempts(state.attempts);

  uiController.displayMessage(
    guess > state.secretNumber ? 'Too high!' : 'To low!'
  );

  markWrongNumbers(guess);

  if (!state.attempts) handleGameOver('lost');
};

// Check number
const checkNumber = e => {
  const btn = e.target.closest('.keyboard__button');

  if (!btn) return;

  const guess = +btn.textContent;

  guess === state.secretNumber
    ? handleGameOver('won')
    : handleWrongNumber(guess);
};

// Create keyboard
const createKeyboard = () => {
  return Array(20)
    .fill(1)
    .map((_, i) => {
      const btn = `<button class="btn keyboard__button">${i + 1}</button>`;
      $el.keyboard.insertAdjacentHTML('beforeend', btn);
    });
};

// Event listener for create keyboard
window.addEventListener('load', createKeyboard);

// Event listener for click btn check
$el.keyboard.addEventListener('click', checkNumber);

// Event listener for btn again
$el.btnAgain.addEventListener('click', location.reload.bind(location));

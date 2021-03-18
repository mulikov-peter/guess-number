import { domElements as $el } from './domElements.js';

class UIController {
  displayMessage(message) {
    $el.message.textContent = message;
  }

  displayAttempts(attempts) {
    $el.attempts.textContent = attempts;
  }

  displayNumber(number) {
    $el.secretNumber.textContent = number;
  }

  displayAgainBtn() {
    $el.keyboard.classList.add('hidden');
    $el.btnAgain.classList.remove('hidden');
    $el.btnAgain.classList.add('active');
  }

  changeBtns(btns) {
    btns.forEach(btn => {
      btn.style.color = 'red';
      btn.disabled = true;
    });
  }

  changeUI(status) {
    console.log(status);
    $el.body.classList.add(status);
  }
}

export default new UIController();

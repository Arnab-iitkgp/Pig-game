'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const currentScore0El = document.querySelector('#current--0');

const switchPlayer = function () {
  document.getElementById(`current--${activeP}`).textContent = 0;
  currentScore = 0;
  activeP = activeP === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let currentScore, playing, activeP, score;
// playing a bool has been used to track the status of the working of the game!!
const init = function () {
  activeP = 0;
  playing = true;
  score = [0, 0];
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    // gen random dice roll value

    let diceValue = Math.trunc(Math.random() * 6 + 1);
    // change dice img as per the roll value of dice
    diceEl.src = `dice-${diceValue}.png`;

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activeP}`).textContent = currentScore;
      // currentScore0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activeP] += currentScore;

    document.querySelector(`#score--${activeP}`).textContent = score[activeP];

    if (score[activeP] >= 100) {
      // the activep has won!!
      document
        .querySelector(`.player--${activeP}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeP}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
// new game reset
btnNew.addEventListener('click', init);

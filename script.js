"use strict";

// Selecting DOM elements
// -> Player Sections
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// -> Scores
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
// -> Buttons
const rollDiceBtn = document.querySelector(".btn--roll");
const newGameBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
// -> Dice img
const diceImg = document.querySelector(".dice");

// Defining state variables
let scores, currentScore, activePlayer, playing;

// Utility Functions
const init = function () {
    // Setting Default States for elements
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    // -> Global State if game is ongoing or finished
    playing = true;
    // Remove Winner Effects if game was over
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    diceImg.classList.add("hidden");

    // Set Player1 as activeplayer
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
};

function switchPlayers() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

init();
// Handling Roll Dice Event
rollDiceBtn.addEventListener("click", function () {
    if (playing) {
        // 1.Generate Random Dice Role
        const diceRoll = Math.trunc(Math.random() * 6) + 1;
        console.log(diceRoll);

        // 2. Display Dice
        diceImg.classList.remove("hidden");
        diceImg.src = `dice-${diceRoll}.png`;

        // 3. Check if rolled 1:True-> Change player, False-> Update current score
        if (diceRoll !== 1) {
            // Didnt Roll 1 so add roll to currentScore
            currentScore += diceRoll;
            // current0El.textContent = currentScore;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Rolled a 1 so change player
            switchPlayers();
        }
    }
});

// Handling Hold Score Button Event
holdBtn.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score onto actual scores array for respective player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if score crossed 100(activePlayer wins) else switch activePlayer
        if (scores[activePlayer] >= 20) {
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--active");
            diceImg.classList.add("hidden");
            // Game is over
            playing = false;
        } else {
            switchPlayers();
        }
    }
});

// Resetting with NewGame Button
newGameBtn.addEventListener("click", init);

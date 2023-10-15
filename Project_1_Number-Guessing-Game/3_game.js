let randNum = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // validate the guess entered by user
  if (isNaN(guess)) {
    alert("Please enter a valid number ");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1 ");
  } else if (guess > 100) {
    alert("Please enter a number less than 100  ");
  } else {
    prevGuess.push(guess);

    if (numGuess === 11) {
      dispGuess(guess);
      dispMsg(`Game over ! Random Number was ${randNum}`);
      endGame();
    } else {
      dispGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // check the guess is it correct or not
  if (guess === randNum) {
    dispMsg("You guessed it right");
    endGame();
  } else if (guess < randNum) {
    dispMsg(`Number is TOO low`);
  } else if (guess > randNum) {
    dispMsg(`Number is TOO high`);
  }
}

function dispGuess(guess) {
  // cleaning up guess
  userInput.value = ""; // cleanup method
  guessSlot.innerHTML += `${guess} , `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function dispMsg(msg) {
  // msg to user
  lowOrHi.innerHTML = ` <h2> ${msg} </h2> `;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = ` <h2 id = "newGame" style = " border: 2px solid white; border-radius: 10px ; padding: 20px" >  "Start a new game" </h2> `;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameBtn = document.querySelector("#newGame");
  newGameBtn.addEventListener("click", function () {
    randNum = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);

    playGame = true;
  });
}

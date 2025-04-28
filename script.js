'use strict';

// Basic Initialize Document Objects for index.html file
let userNum = document.getElementById('userNumber');
let againBtn = document.getElementById('again');
let betweenNum = document.getElementById('betweenNumber');
let guessNum = document.getElementById('guessNumber');
let checkBtn = document.getElementById('check');
let guessHint = document.getElementById('guessHint');
let score = document.getElementById('score');
let highscore = document.getElementById('highscore');

// User maximum number and only between 1 and maxNum
let maxNum = 20;

// User can input value between 1 and maxNum
betweenNum.textContent = `<Between 1 and ${maxNum}>`;

// Random number from 1 to maxNum
let randomNum = Math.ceil(Math.random() * maxNum);

// For decrement score count
let scoreCount = maxNum;

// For highest score greater than previous score
let highestScore = 0;

// Click "Again!" button for re-start game
againBtn.addEventListener('click', function () {
  randomNum = Math.ceil(Math.random() * maxNum);
  document.body.style.backgroundColor = '#222';
  guessNum.disabled = false;
  checkBtn.disabled = false;
  userNum.textContent = '?';
  userNum.style.minWidth = 'auto';
  guessNum.value = '';
  guessHint.textContent = 'Start guessing...';
  scoreCount = maxNum;
  score.textContent = scoreCount;
  highscore.textContent = highestScore;
});

// Click "Check!" button for correct guess number
checkBtn.addEventListener('click', function () {
  // User input value except empty value
  if (!(guessNum.value === '')) {
    let userInputValue = Number(guessNum.value);

    // User entered input value is(0 or less than 0) or (maxNum or greater than maxNum)
    if (userInputValue <= 0 || userInputValue > maxNum) {
      alert(`Please enter between 1 to ${maxNum}!`);
    }

    // User entered input value and previous input value are same
    else if (Number(userNum.textContent) === userInputValue) {
      alert('Please change number!');
    }

    // User not trying increase input value
    else if (
      guessHint.textContent === '📉 Too low!' &&
      Number(userNum.textContent) > userInputValue
    ) {
      alert('Please increase number!');
      guessNum.value = Number(userNum.textContent);
    }

    // User not trying decrease input value
    else if (
      guessHint.textContent === '📈 Too high!' &&
      Number(userNum.textContent) < userInputValue
    ) {
      alert('Please decrease number!');
      guessNum.value = Number(userNum.textContent);
    }

    // User correct input value and guess number value are same
    else {
      userNum.textContent = userInputValue;
      guessHint.textContent =
        userInputValue > randomNum ? '📈 Too high!' : '📉 Too low!';
      userNum.style.minWidth = '20rem';
      if (userInputValue === randomNum) {
        document.body.style.backgroundColor = '#60b347';
        guessNum.disabled = true;
        checkBtn.disabled = true;
        guessHint.textContent = '🎉 Corrent Number!';
        if (highestScore < scoreCount) highestScore = scoreCount;
        scoreCount++;
        highscore.textContent = highestScore;
      }
      else if (userInputValue !== randomNum) {
        if (scoreCount == 1) {
          guessNum.value = '';
          guessNum.disabled = true;
          checkBtn.disabled = true;
          guessHint.textContent = '💥 You lost the game!';
          score.textContent = scoreCount;
        }
      }
      score.textContent = --scoreCount;
    }
  }

  // User input empty value
  else {
    userNum.textContent = '?';
    guessHint.textContent = '⛔ No number!';
  }
});

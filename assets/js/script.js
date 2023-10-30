
var highScoresEl = document.querySelector("#high-scores-link");
var timeValue = document.querySelector("#time-value");
var startQuizBtn = document.querySelector("#start-quiz-btn");
var timerSeconds = 0;
var timerInterval = 0;

startQuizBtn.addEventListener("click",start);

function start(){
    timerSeconds = 3;
    timeValue.innerText = timerSeconds;
    timerInterval = setInterval(myTimer, 1000);
    return
}

function myTimer() {
    timerSeconds--;
    timeValue.innerText = timerSeconds;
    if (timerSeconds <= 0) {
        clearInterval(timerInterval);
    }
  }

timeValue.innerText = timerSeconds;




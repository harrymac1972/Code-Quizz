
var questionObjsArr = [{
    "question":"What's the name of the game?",
    "answers":["Pool",
                "Bingo",
                "Tennis",
                "Hockey"
            ],
    "correct":"Hockey"
    },
    {
    "question":"People at Party?",
    "answers":["Bart",
                "Leanne",
                "Kat",
                "Mike"
            ],
    "correct":"Kat"
    }
];

var highScoresEl = document.querySelector("#high-scores-link");
var timeValue = document.querySelector("#time-value");
var startQuizBtn = document.querySelector("#start-quiz-btn");
var timerSeconds = 0;
var timerInterval = 0;
var mainTitle = document.querySelector("#main-title");
var rulesText = document.querySelector("#rules-text");
var questionIndex = 0;

startQuizBtn.addEventListener("click",interrogate);

function gameOver(){    
    clearInterval(timerInterval);
}

function getQuestionObj(){
    var questionObj = questionObjsArr[questionIndex];
    return questionObj;
}

function interrogate(){
    rulesText.remove();
    startQuizBtn.remove();
    renderQuestion();
    timerSeconds = 2;
    timeValue.innerText = timerSeconds;
    timerInterval = setInterval(startTimer, 1000);
    return
}

function renderQuestion(){
    var questionObj = getQuestionObj();
    mainTitle.innerText = questionObj["question"];

}

function startTimer() {
    timerSeconds--;
    timeValue.innerText = timerSeconds;
    if (timerSeconds <= 0) {
        gameOver();
    }
  }

timeValue.innerText = timerSeconds;

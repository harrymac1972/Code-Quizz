
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
var mainEl = document.querySelector("#main");
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
    mainTitle.remove();
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
    var mainDiv = document.createElement("Div");
    main.append(mainDiv);
    mainDiv.setAttribute("id","answersDiv");
    mainQuestion = document.createElement("h1");
    mainDiv.append(mainQuestion);
    mainQuestion.innerText = questionObj["question"];
    var answersList = document.createElement("ul");
    mainDiv.append(answersList);
    var answersArr = questionObj["answers"];
    for(var i=0;i<answersArr.length;i++){
        var btn = document.createElement("button");
        answer = questionObj["answers"][i];
        console.log(answer);
        btn.innerText = answer;
        answersList.appendChild(btn);
        btn.setAttribute("id","answerBtn");
    }
}

function startTimer() {
    timerSeconds--;
    timeValue.innerText = timerSeconds;
    if (timerSeconds <= 0) {
        gameOver();
    }
  }

timeValue.innerText = timerSeconds;

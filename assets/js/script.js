
var questionObjsArr = [{
    "question":"What's the name of the game?",
    "answers":["Pool",
                "Bingo",
                "Tennis",
                "Hockey"
            ],
    "correct":3
    },
    {
    "question":"People at Party?",
    "answers":["Bart",
                "Leanne",
                "Kat",
                "Mike"
            ],
    "correct":2
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
    timerSeconds = 75;
    timeValue.innerText = timerSeconds;
    timerInterval = setInterval(startTimer, 1000);
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
        btn.setAttribute("data-ix",i);
        fullAnswer = i + 1
        fullAnswer += ". " + answer;
        btn.innerText = fullAnswer;
        answersList.appendChild(btn);
        btn.setAttribute("class","answer");
    }
    answersDiv.addEventListener("click",function(event){
        var eventTarget = event.target;
        if (eventTarget.matches(".answer")){
            var answerIx = eventTarget.getAttribute("data-ix");
            console.log(answerIx);
            var correctAnswer = questionObj["correct"];
            if (answerIx == correctAnswer) {
                console.log("That's right!!");
            } else {
                console.log("WRONG!");
                timerSeconds -= 10;
            }
        }
    })
}

function startTimer() {
    timerSeconds--;
    timeValue.innerText = timerSeconds;
    if (timerSeconds <= 0) {
        gameOver();
    }
  }

timeValue.innerText = timerSeconds;

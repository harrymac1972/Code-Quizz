
var questionObjsArr = [{
    "question":"A variable is a ____?",
    "answers":["Condition",
                "Element",
                "Algorithm",
                "Container"
            ],
    "correct":3
    },
    {
    "question":"A variable declared in a function is considered?",
    "answers":["Numeric",
                "a String",
                "Local",
                "Global"
            ],
    "correct":2
    },
    {
    "question":"The skeleton of a web-site is the?",
    "answers":["CSS",
                "Javascript",
                "HTML",
                "W3"
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
var questionObj = {};
answersArr = [];

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
    questionObj = getQuestionObj();
    var mainDiv = document.createElement("Div");
    main.append(mainDiv);
    mainDiv.setAttribute("id","answersDiv");
    mainQuestion = document.createElement("h1");
    mainDiv.append(mainQuestion);
    mainQuestion.innerText = questionObj["question"];
    var answersList = document.createElement("ul");
    mainDiv.append(answersList);
    answersArr = questionObj["answers"];
    for(var i=0;i<answersArr.length;i++){
        var btn = document.createElement("button");
        answer = questionObj["answers"][i];
        btn.setAttribute("data-ix",i);
        fullAnswer = i + 1;
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
            questionIndex++;
            console.log(`questionIndex = ${questionIndex}`);
            if (questionIndex < questionObjsArr.length){
                refreshQuestion();
            } else {
                mainDiv.remove();
            }
        }
    })
}

function refreshQuestion(){
    questionObj = getQuestionObj();
    mainQuestion.innerText = questionObj["question"];
    answersArr = questionObj["answers"];
    for(var i=0;i<answersArr.length;i++){
        answer = questionObj["answers"][i];
        fullAnswer = i + 1;
        fullAnswer += ". " + answer;
        btnArr = document.querySelectorAll("button");
        console.log(btnArr[i].innerText);
        btnArr[i].innerText = answersArr[i];
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

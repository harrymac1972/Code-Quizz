
var questionObjsArr = [{
    "question":"What is a variable?",
    "answers":["a Condition",
                "an Element",
                "an Algorithm",
                "a Container"
            ],
    "correct":3
    },
    {
    "question":"A variable declared in a function is considered what type?",
    "answers":["Numeric",
                "a String",
                "Local",
                "Global"
            ],
    "correct":2
    },
    {
    "question":"What is the skeleton of a web-site?",
    "answers":["CSS",
                "Javascript",
                "HTML",
                "W3"
            ],
    "correct":2
    },
    {
    "question":"Where can the style of a font be changed?",
    "answers":["HTML",
                "CSS",
                "Javascript",
                "All of the above"
            ],
    "correct":3
    },
    {
    "question":"What can not be in objects?",
    "answers":["Comments",
                "Arrays",
                "Key Value Pairs",
                "Objects"
            ],
    "correct":0
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
var answersArr = [];
var feedbackEl = 0;
var feedbackString = "";
var feedbackDiv = 0;

startQuizBtn.addEventListener("click",interrogate);

function gameOver(){
    userScore = timerSeconds;
    clearInterval(timerInterval);
    var scoreDiv = document.createElement("div");
    main.append(scoreDiv);
    scoreDiv.setAttribute("id","score-div");
    mainTitle = document.createElement("h1");
    scoreDiv.append(mainTitle);
    mainTitle.innerText = "All done!";
    scoreTxt = document.createElement("h3");
    scoreDiv.append(scoreTxt);
    scoreString = "You're final score is: "
    scoreString += userScore + ".";
    scoreTxt.innerText = scoreString;
    
    var scoreForm = document.createElement("form");
    scoreForm.setAttribute("method", "post");

    var label = document.createElement("label");
    label.innerText = "Enter Initials: ";
    label.style.fontWeight = "bold";
    scoreForm.appendChild(label);

    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "initials");
    scoreForm.appendChild(initials);
    scoreDiv.append(scoreForm);

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    scoreForm.appendChild(submit);
    scoreDiv.append(scoreForm);
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
    feedbackDiv = document.createElement("div");
    feedbackEl = document.createElement("h2");
    feedbackDiv.append(feedbackEl);
    feedbackDiv.setAttribute("id","feedback-div");
    mainDiv.append(feedbackDiv);
    feedbackEl.innerText = "Initialize!";
    feedbackDiv.style.opacity = 0;
    answersDiv.addEventListener("click",function(event){
        var eventTarget = event.target;
        if (eventTarget.matches(".answer")){
            var answerIx = eventTarget.getAttribute("data-ix");
            var correctAnswer = questionObj["correct"];
            if (answerIx == correctAnswer) {
                feedbackString = "Correct!"
            } else {                
                feedbackString = "Wrong!"
                timerSeconds -= 10;
            }
            questionIndex++;
            feedback();
            if (questionIndex < questionObjsArr.length){
                refreshQuestion();
            } else {
                setTimeout(() => {
                    mainDiv.remove();
                    gameOver();
                }, 500);
            }
        }
    })
}

function feedback(){
    feedbackEl.innerText = feedbackString;
    feedbackDiv.style.opacity = 1;
    setTimeout(() => {
        feedbackDiv.style.opacity = 0;
    }, 500);
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


// #region GLOBALS

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
var startQuizBtnD = 0;
var timerSeconds = 0;
var timerInterval = 0;
var mainEl = document.querySelector("#main");
var mainTitle = document.querySelector("#main-title");
var rulesText = document.querySelector("#rules-div");
var questionIndex = 0;
var questionObj = {};
var answersArr = [];
var feedbackEl = 0;
var feedbackString = "";
var feedbackDiv = 0;
var scoreDiv = 0;
var initials = "";
var initialsValue = "";
var scoreSetArr = [];
var boardDiv = 0;
var highBtnDiv = 0;
var highListDiv = 0;
var mainTitleD = 0;
var rulesDivD = 0;
var rulesParD1 = 0;
var rulesParD2 = 0;

// #endregion

// #region INTRO


function homePage(){
    homePageCleanDivs();
    homePageResets();
    mainTitleD = document.createElement("h1");
    mainTitleD.innerText = "Coding Quiz Challenge";
    mainTitleD.setAttribute("id","main-title-d");
    rulesDivD = document.createElement("div");
    rulesDivD.setAttribute("id","rules-div");
    rulesParD1 = document.createElement("p");
    rulesParD2 = document.createElement("p");
    rulesParD1.innerText = "Try to answer the following code-related questions within the time limit."
    rulesParD2.innerText = "Keep in mind that incorrect answers well penalize you score/time by ten seconds!"
    mainEl.append(mainTitleD);
    mainEl.append(rulesDivD);
    rulesDivD.append(rulesParD1);
    rulesDivD.append(rulesParD2);
    startQuizBtnD = document.createElement("btn");
    startQuizBtnD.setAttribute("id","start-quiz-btn-d");
    startQuizBtnD.innerText = "Start Quiz";
    mainEl.append(startQuizBtnD);
    startQuizBtnD.addEventListener("click",preInterrogate);
}

function homePageCleanDivs(){
    highDiv.remove();
    highListDiv.remove();
    highBtnDiv.remove();
}

function homePageResets(){
    timerSeconds = 75;
    timeValue.innerText = timerSeconds;
    questionIndex = 0;
}

function preInterrogate(){
    mainTitleD.remove();
    rulesDivD.remove();
    startQuizBtnD.remove();
    interrogate();
}

function startTimer() {
    timerSeconds--;
    timeValue.innerText = timerSeconds;
    if (timerSeconds <= 0) {
        gameOver();
    }
  }

// #endregion

// #region QUIZZ

function feedback(){
    feedbackEl.innerText = feedbackString;
    feedbackDiv.style.opacity = 1;
    setTimeout(() => {
        feedbackDiv.style.opacity = 0;
    }, 500);
}

function getQuestionObj(){
    var questionObj = questionObjsArr[questionIndex];
    return questionObj;
}

function interrogate(){
    homePageResets();
    mainTitle.remove();
    rulesText.remove();
    startQuizBtn.remove();
    renderQuestion();
    timerInterval = setInterval(startTimer, 1000);
}

function refreshQuestion(){
    questionObj = getQuestionObj();
    mainQuestion.innerText = questionObj["question"];
    answersArr = questionObj["answers"];
    for(var i=0;i<answersArr.length;i++){
        answer = questionObj["answers"][i];
        fullAnswer = i + 1;
        fullAnswer += ".  " + answer;
        btnArr = document.querySelectorAll("btn");
        btnArr[i].innerText = fullAnswer;
    }
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
        var btn = document.createElement("btn");
        answer = questionObj["answers"][i];
        btn.setAttribute("data-ix",i);
        fullAnswer = i + 1;
        fullAnswer += ".  " + answer;
        btn.innerText = fullAnswer;
        answersList.appendChild(btn);
        btn.setAttribute("class","answer");
    }
    feedbackDiv = document.createElement("div");
    feedbackEl = document.createElement("h2");
    feedbackDiv.append(feedbackEl);
    feedbackDiv.setAttribute("id","feedback-div");
    mainDiv.append(feedbackDiv);
    // feedbackEl.innerText = "Initialize!";
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

// #endregion

// #region RESULTS


function gameOver(){
    userScore = timerSeconds;
    clearInterval(timerInterval);
    scoreDiv = document.createElement("div");
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

    initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "initials");
    scoreForm.appendChild(initials);
    scoreDiv.append(scoreForm);

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    scoreForm.appendChild(submit);
    scoreDiv.append(scoreForm);

    scoreForm.addEventListener("submit",handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();
    initialsValue = initials.value;
    var scoreSetObj = {"initialsK":initialsValue,"scoreK":userScore};
    scoreSetArr.push(scoreSetObj);
    var localStorageString = localStorage.getItem("scoresObj");
    if (localStorageString) {
        var localStorageJSON = JSON.parse(localStorageString);
        console.log(localStorageJSON);
        // append new entry
        var localArr = localStorageJSON["scoresArr"];
        console.log("localArr:");
        console.log(localArr);
        localArr.push(scoreSetObj);
        console.log("localArr:");
        console.log(localArr);
        localStorage.clear();
        localStorage.setItem("scoresObj", JSON.stringify(localStorageJSON));
    } else {
        console.log("Local Storage is Empty");
        var scoresObj = {"scoresArr":[scoreSetObj,]};
        console.log(scoresObj);
        localStorage.setItem("scoresObj", JSON.stringify(scoresObj));
    }
    scoreDiv.remove();
    showHighScores();
}

// #endregion

// #region SCORE BOARD

function showHighScores(){
    highDiv = document.createElement("div");
    main.append(highDiv);
    highDiv.setAttribute("id","high-div");
    mainTitle = document.createElement("h1");
    highDiv.append(mainTitle);
    mainTitle.innerText = "High Scores";

    highListDiv = document.createElement("div");
    main.append(highListDiv);
    highListDiv.setAttribute("id","high-list-div");
    var listing = document.createElement("h3");

    highListDiv.append(listing);
    
    localStorageString = localStorage.getItem("scoresObj");
    localStorageJSON = JSON.parse(localStorageString);
    localArr = localStorageJSON["scoresArr"];
    var uHighList = document.createElement("ul");
    highListDiv.append(uHighList);
    for (i=0;i<localArr.length;i++){
        var highListItem = document.createElement("li");
        var initialString = localArr[i]["initialsK"];
        var scoreString = localArr[i]["scoreK"];
        highListItem.innerText = initialString + " - " + scoreString;
        uHighList.append(highListItem);
    }
    highBtnDiv = document.createElement("div");
    main.append(highBtnDiv);
    highBtnDiv.setAttribute("id","high-btn-div");

    var goBackBtn = document.createElement("btn");
    goBackBtn.setAttribute("id","go-back-btn");
    goBackBtn.innerText = "Go back";
    highBtnDiv.append(goBackBtn);
    goBackBtn.addEventListener("click",homePage);
    
    var clearBtn = document.createElement("btn");
    clearBtn.setAttribute("id","clear-btn");
    clearBtn.innerText = "Clear high scores";
    highBtnDiv.append(clearBtn);
    clearBtn.addEventListener("click",clearScores);
}

function clearScores(){
    localStorage.clear();
    homePage();
}

// #endregion

// #region INIT

homePageResets();
startQuizBtn.addEventListener("click",interrogate);

// #endregion
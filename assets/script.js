


// -------------------------------------------------------------------
// Var Setup
var questions = [
    {
        question: "question 1",
        choices: ["this is choice 1", "this is choice 2", "*this is choice 3", "this is choice 4"],
        answer: "2"
    },
    {
        question: "question 2",
        choices: ["this is choice 1", "this is choice 2", "this is choice 3", "*this is choice 4"],
        answer: "3"
    },
    {
        question: "question 3",
        choices: ["this is choice 1", "*this is choice 2", "this is choice 3", "this is choice 4"],
        answer: "1"
    },
    {
        question: "question 4",
        choices: ["*this is choice 1", "this is choice 2", "this is choice 3", "this is choice 4"],
        answer: "0"
    }
];
var score = 0;
var bodyContainer = $("#bodyContainer");
var answered = false;
var timeLeft = 0;
var isCorrect = false;
var userSelection = -1;
var currentQuestion = 0;
var timeScore = -1;

// init
renderStartPage();

// -------------------------------------------------------------------
// helper functions

function td() {
    // For debugging/testing purposes
    alert("TOUCHDOWN! Take a break");
}

function runQuiz() {
    // set initial quiz state
    currentQuestion = 0;
    score = 0;
    answered = false;
    isCorrect = false;
    timeScore = -1;
    clearPage();
    renderQuestion(currentQuestion);
    // enable timer
    timeLeft = questions.length * 20;
    // timeLeft = 25;
    runTimer();
    nextQuestion(currentQuestion);
}



function runTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        console.log("time:" + timeLeft);
        $("#timerID").text(`Time Left: ${timeLeft}`);
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    if (timeScore <= 0) {
        timeScore = 0;
    }
    clearPage();
    renderScoreSubmissionPage();
}



function nextQuestion(currentQuestion) {
    answered = false;
    isCorrect = false;
    clearPage();
    renderQuestion(currentQuestion);
}

function renderQuestion(index) {
    // Remove or replace old question.
    // append questions[index].question text
    var questionText = questions[index].question;
    var newQuestion = $("<div>");
    newQuestion.addClass("bodytext");
    newQuestion.text(questionText);
    bodyContainer.append(newQuestion);
    renderChoices(index);
}

function renderChoices(index) {
    for (var i = 0; i < questions[index].choices.length; i++) {
        // append a button for each of the question's choices
        bodyContainer.append(createAButton(index, i));
    }
}


function createAButton(questionNumber, choicesIndex) {
    // returns a customized button based on the given question
    var buttonText = questions[questionNumber].choices[choicesIndex];
    var correctQ = false;
    // double == instead of triple for different typecasting.
    if (questions[questionNumber].answer == choicesIndex) {
        correctQ = true;
    }
    return newButton = `<button class="quizButton qbutton" selection="${choicesIndex}" id="${questionNumber},${choicesIndex}" isCorrect="${correctQ}">${buttonText}</button>`;
}

function renderStartPage() {
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">Nobody passes this quiz. Nobody!</div>`);
    bodyContainer.append(`<div class = "buttoncontainer flex jcsa" id = "buttonContainer"></div>`);
    bodyContainer.append(`<button class="startButton button--start"
    id="sButton"><span>S</span><span>t</span><span>a</span><span>r</span><span>t</span>
    </button>`);
}

function renderScoreSubmissionPage() {
    console.log("score: " + score);
    console.log("timescore: " + timeScore);
    console.log("timeleft: " + timeLeft);
    $("#timerID").text(`Time Left: ${timeScore}`);

    
}

function clearPage() {
    bodyContainer.empty();
}


// -------------------------------------------------------------------
// event functions
// click HS
        // find score object in local storage
        // parse object for screen
        // display parsed object in html

// click start quiz
$("#sButton").on("click", function() {
    event.stopPropagation();
    event.stopImmediatePropagation();
    // clear out the start page
    clearPage();
    // begin the quiz!
    runQuiz();
});

$("#bodyContainer").on("click", ".quizButton", function() {
    event.stopPropagation();
    event.stopImmediatePropagation();
    // mark that they've chosen an answer
    answered = true;
    // save the answer they've chosen
    userSelection = $(this).attr("selection");
    // check if answer is correct and mark as such
    if ($(this).attr("iscorrect") === "true") {
        isCorrect = true;
        score++;
    }
    else {
        isCorrect = false;
        timeLeft -= 15;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        nextQuestion(currentQuestion);
    }
    else {
        timeScore = timeLeft;
        timeLeft = 0;
    }
});



// enter initials and submit score, go to HS


// clear HS

// -------------------------------------------------------------------










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
var scoreChart = [];
var nameInput = "";

// init
renderStartPage();

// -------------------------------------------------------------------
// helper functions

function td() {
    // For debugging/testing purposes
    alert("TOUCHDOWN! -takeabreak-");
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
        if(timeLeft === "HS") {
            // special case for entering HighScore page during quiz.
            // end interval
            clearInterval(timerInterval);
            // reset timer
            timeLeft = 0;
            $("#timerID").text(`Time Left: ${timeLeft}`);
            // return without triggering endQuiz page.
            return;
        }
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
    // Set TIMEOUT to display if right or wrong. *************************************
    
    // clear page and move to next question.
    clearPage();
    renderQuestion(currentQuestion);
    // reset values
    answered = false;
    isCorrect = false;
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
    // double == instead of triple to account for typecasting.
    if (questions[questionNumber].answer == choicesIndex) {
        correctQ = true;
    }
    // return customized buttons
    return newButton = `<button class="quizButton qbutton button--quiz" selection="${choicesIndex}" id="${questionNumber},${choicesIndex}" isCorrect="${correctQ}">${buttonText}</button>`;
}

function renderStartPage() {
    // create a title
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">Nobody passes this quiz. Nobody!</div>`);
    // create a fancy button
    bodyContainer.append(`<div class = "buttoncontainer flex jcsa" id = "buttonContainer"></div>`);
    bodyContainer.append(`<button class="startButton button--start"
    id="sButton"><span>S</span><span>t</span><span>a</span><span>r</span><span>t</span>
    </button>`);
}

function renderScoreSubmissionPage() {
    // double check to avoid negative scoring.
    if (timeScore <= 0) {
        timeScore = 0;
    }
    // update timer to avoid negative on-screen.
    $("#timerID").text(`Time Left: ${timeScore}`);
    // update score to include remaining time
    score = score + timeScore;
    // display header
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">Quiz Over!</div>`);
    // display user's score
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">Your score: ${score}</div>`);
    // create a new form
    var newForm = $("<form>");
    newForm.attr("id", "newFormID");
    // create a div inside the form to house the user submission
    var newDiv = $("<div>");
    newDiv.addClass("submission");
    newDiv.attr("id", "submissionID");
    // add a label and input to the submission form
    newForm.append(`<label for="name">Enter your name: </label>`);
    newForm.append(`<input type="text" name="nameIn" id="nameInput">`);
    // append the form to the page
    bodyContainer.append(newForm);
    // append a fancy button
    bodyContainer.append(`<div class = "buttoncontainer flex jcsa" id = "buttonContainer"></div>`);
    bodyContainer.append(`<button class="saveButton button--start"id="saveButton"><span>S</span><span>a</span><span>v</span><span>e</span></button>`)
}

function renderHighSchorePage() {
    clearPage();
    // display title
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">High Scores!</div>`);

    // display high scores
    // get local storage
    var string = localStorage.getItem("highScores");
    var object = JSON.parse(string);
    // check if empty.
    if (string === null) {
        // if so, display: "no high scores yet"
    }
    else {
        // else, display local storage results.
    }

    // display retry button
    // display clear high scores button
    bodyContainer.append(`<div class = "buttoncontainer flex jcsa" id ="buttonContainer"></div>`);
    var buttonContainer = $("#buttonContainer");
    buttonContainer.append(`<button class="retryButton button--start"id="saveButton"><span>R</span><span>e</span><span>t</span><span>r</span><span>y</span><span>?</span></button>`)
    buttonContainer.append(`<button class="clearButton button--start"id="saveButton"><span>C</span><span>l</span><span>e</span><span>a</span><span>r</span></button>`)


}

function clearPage() {
    bodyContainer.empty();
}


// -------------------------------------------------------------------
// event functions
// click HS
$("#highScoreButton").on("click", function() {
    // goto High Score Page
    timeLeft = "HS";
    renderHighSchorePage();
});

// click start quiz
$("#sButton").on("click", function() {
    // prevent accidental clickage.
    event.stopPropagation();
    event.stopImmediatePropagation();
    // clear out the start page
    clearPage();
    // begin the quiz!
    runQuiz();
});

$("#bodyContainer").on("click", ".quizButton", function() {
    // prevent accidental clickage.
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
        if (timeLeft <= -15) {
            // Do nothing
            // Prevent multi-button presses
        }
        else {
            timeLeft -= 15;
        }
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


$("#bodyContainer").on("click", "#saveButton", function() {
    nameInput = $("#nameInput").val();
    if (nameInput === "") {
        alert("A name is required for submission.");
    }
    else {
        // store name and score to local storage.
        // get and parse local storage
        var string = localStorage.getItem("highScores");
        var object = JSON.parse(string);
        // check if empty.
        if (string === null) {
            // if so, create first entry
            scoreChart[0] = {
                name: nameInput,
                score: score
            }
            localStorage.setItem("highScores", JSON.stringify(scoreChart));
        }
        else {
            // else, push onto end of the array.
            scoreChart = object;
            scoreChart.push({
                name: nameInput,
                score: score
                }
            );
            localStorage.setItem("highScores", JSON.stringify(scoreChart));
        }
        // Goto High Score Page
        renderHighSchorePage();
    }
});






// clear HS

// -------------------------------------------------------------------







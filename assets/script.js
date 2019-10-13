


// -------------------------------------------------------------------
// Var Setup
var questions = [
    {
        question: "How many holes are in A Polo?",
        choices: ["Elephant", "Two", "Three", "Four"],
        answer: "3"
    },
    {
        question: ".sdrawkcab noitseuq siht rewsnA",
        choices: ["What?", "I don't Understand", "KO", "Elephant"],
        answer: "2"
    },
    {
        question: "Elephant.",
        choices: ["A,C", "1,4", "Elephant?", "This quiz is dumb."],
        answer: "1"
    },
    {
        question: "What was the answer to question 2?",
        choices: ["The last one", "^ That one", "^ That one", "^ That one"],
        answer: "3"
    },
    {
        question: "What question are we on?",
        choices: ["Seven", "Six", "Five", "Four"],
        answer: "2"
    },
    {
        question: "What can you put in a bucket to make it lighter?",
        choices: ["A Torch", "A sense of Humor", "A Hole", "An Elephant"],
        answer: "0"
    },
    {
        question: "What do you call a wingless fly?",
        choices: ["A poor turn of luck", "Elephant", "Ned", "A Walk"],
        answer: "3"
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

function setDefaultState() {
    // reset default state
    score = 0;
    bodyContainer = $("#bodyContainer");
    answered = false;
    timeLeft = 0;
    isCorrect = false;
    userSelection = -1;
    currentQuestion = 0;
    timeScore = -1;
    scoreChart = [];
    nameInput = "";
    $("#timerID").text(`Time Left: 0`);
}

function runQuiz() {
    // set initial quiz state
    setDefaultState();
    clearPage();
    renderQuestion(currentQuestion);
    // enable timer
    timeLeft = questions.length * 20;
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
    score = (10 * score) + timeScore;
    // display header
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">Quiz Over!</div>`);
    // display user's score
    bodyContainer.append(`<div id="bodyTextID" class="bodytext2">Your score: ${score}</div>`);
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
    $("#timerID").text(`Time Left: 0`);
    // display high scores
    // get local storage
    var string = localStorage.getItem("highScores");
    var object = JSON.parse(string);
    scoreChart = object;
    // check if empty.
    if (string === null) {
        // if so, display: "no high scores yet"
        bodyContainer.append(`<div id="scoreChartID" class="scoreChart">No scores yet :(</div>`);
    }
    else {
        // else, display local storage results.
        // UL to house scores
        bodyContainer.append(`<ol id="scoreChart" class="scoreChart"></ol>`);
        // for loop running through .length to generate and add LIs
        for(var i = 0; i < scoreChart.length; i++) {
            // create LI
            var newLi = $("<li>");
            newLi.attr("id", `score${i}`)
            newLi.addClass("scoreli")
            newLi.text(`${scoreChart[i].name}: ${scoreChart[i].score}`)
            // append LI
            $(`#scoreChart`).append(newLi);
        }

    }

    // display retry button
    // display clear high scores button
    bodyContainer.append(`<div class = "buttoncontainer flex jcsb" id ="buttonContainer"></div>`);
    var buttonContainer = $("#buttonContainer");
    buttonContainer.append(`<button class="retryButton button--start"id="retryButton"><span>R</span><span>e</span><span>t</span><span>r</span><span>y</span><span>?</span></button>`)
    buttonContainer.append(`<button class="clearButton button--start"id="clearButton"><span>C</span><span>l</span><span>e</span><span>a</span><span>r</span></button>`)


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

$("#bodyContainer").keypress(
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
  });

// click start quiz
$("#bodyContainer").on("click", "#sButton", function() {
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
            // Sorts an array of objects based on score key value
            function sorter(a, b){
                var aScore = a.score;
                var bScore = b.score;
                if (aScore < bScore) {
                    return -1;
                }
                else if (aScore > bScore) {
                    return 1;
                }
                else {
                    return 0;
                }
                // return ((aScore < bScore) ? -1 : ((aScore > bScore) ? 1 : 0));


              }
            // sort the scores into descending order
            scoreChart.sort(sorter).reverse();

            localStorage.setItem("highScores", JSON.stringify(scoreChart));
        }
        // Goto High Score Page
        renderHighSchorePage();
    }
});



$("#bodyContainer").on("click", "#retryButton", function() {
    clearPage();
    renderStartPage();
    setDefaultState();
});


$("#bodyContainer").on("click", "#clearButton", function() {
        // get and parse local storage
        var string = localStorage.getItem("highScores");
        // check if empty.
        if (string === null) {
            // if so, no need to do anything
        }
        else {
            // else, remove scores from local storage
            localStorage.removeItem("highScores");
        }
        // re-render HS page
        renderHighSchorePage();
});




// clear HS

// -------------------------------------------------------------------







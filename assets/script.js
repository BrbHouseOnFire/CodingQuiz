


// -------------------------------------------------------------------
// Var Setup
var questions = [
    {
        question: "this is the question's text",
        choices: ["this is choice 1", "this is choice 2", "*this is choice 3", "this is choice 4"],
        answer: "3"
    },
    {
        question: "this is the question's text",
        choices: ["this is choice 1", "this is choice 2", "this is choice 3", "*this is choice 4"],
        answer: "4"
    },
    {
        question: "this is the question's text",
        choices: ["this is choice 1", "*this is choice 2", "this is choice 3", "this is choice 4"],
        answer: "2"
    },
    {
        question: "this is the question's text",
        choices: ["*this is choice 1", "this is choice 2", "this is choice 3", "this is choice 4"],
        answer: "1"
    }
];
var score = 0;
var bodyContainer = $("#bodyContainer");
var answered = false;
var timeLeft = 0;
var isCorrect = false;
var userSelection = -1;
var currentQuestion = 0;

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
    // reset score
    score = 0;
    // enable timer
    timeLeft = questions.length * 20;
    var timerInterval = setInterval(function() {
        timeLeft--;
    }, 1000);
    
    answered = false;
    isCorrect = false;
    clearPage();
    renderQuestion(currentQuestion);

    
    if(timeLeft <= 0) {
        clearInterval(timerInterval);
        i = questions.length;
    }







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
    if (questions[questionNumber].answer === choicesIndex) {
        correctQ = true;
    }
    return newButton = `<button class="quizButton qbutton button--quiz" selection="${choicesIndex}" id="${questionNumber},${choicesIndex}" isCorrect="${correctQ}">${buttonText}</button>`;
}

function renderStartPage() {
    bodyContainer.append(`<div id="bodyTextID" class="bodytext">Nobody passes this quiz. Nobody!</div>`);
    bodyContainer.append(`<div class = "buttoncontainer flex jcsa" id = "buttonContainer"></div>`);
    bodyContainer.append(`<button class="startButton button--start"
    id="sButton"><span>S</span><span>t</span><span>a</span><span>r</span><span>t</span>
    </button>`);

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
    // clear out the start page
    clearPage();
    // begin the quiz!
    runQuiz();
});

$(".quizButton").on("click", function() {
    // mark that they've chosen an answer
    answered = true;
    // save the answer they've chosen
    userSelection = this.attr("selection");
    console.log(userSelection);
    td();
});

// choose answer


// enter initials and submit score, go to HS


// clear HS

// -------------------------------------------------------------------


// Random Useful data
    // $(document).ready(function() {
    //     $('#random-button').on('click', function() {
    //       var randstring = "";
    //       for (var i = 0; i < 9; i++) {
    //         randstring = randstring + Math.floor(Math.random() * 10);
    //       }
    //       $('#random-number').prepend(`<h1 class="text-center">${randstring}</h1>`);
    //     })
    //     // ...
    //   });





//All the buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-high-scores")

var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container")
var containerScoreEl = document.getElementById("score-banner")
var formInitials = document.getElementById("initials-form")
var containerHighScoresEl = document.getElementById("high-score-container")
var ViewHighScoreEl = document.getElementById("view-high-scores")
var listHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")


var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;


var HighScores = [];


var arrayShuffledQuestions
var QuestionIndex = 0



// All the questions 
var questions = [
    {
        q: "Which one of the following isn't a data type present in Javascript?",
        a: '4. None of the following',
        choices: [{ choice: '1. Undefined' }, { choice: '2. Booleans' }, { choice: '3. Numbers' }, { choice: '4. None of the following' }]
    },
    {
        q: "Which of the following is a looping structure in Javascript?",
        a: '4. All of the following',
        choices: [{ choice: '1. For' }, { choice: '2. While' }, { choice: '3. Do While' }, { choice: '4. All of the following' }]
    },
    {
        q: 'What is the correct JavaScript syntax to write "Hello World"?',
        a: '1. document.write("Hello World")',
        choices: [{ choice: '1. System.out.println("Hello World")' }, { choice: '2. println ("Hello World")' }, { choice: '3. document.write("Hello World")' }, { choice: '4. response.write("Hello World")' }]
    },
    {
        q: 'What is the correct syntax for referring to an external script called " abc.js"?',
        a: '1. <script src=" abc.js">',
        choices: [{ choice: '1. <script src=" abc.js">' }, { choice: '2. <script name=" abc.js">' }, { choice: '3. <script href=" abc.js">' }, { choice: '4. None of the following' }]
    },
    {
        q: 'JavaScript entities start with _______ and end with _________.',
        a: '4. Ampersand, semicolon',
        choices: [{ choice: '1. Semicolon, colon' }, { choice: '2. Semicolon, Ampersand' }, { choice: '3. Ampersand, colon' }, { choice: '4. Ampersand, semicolon' }]
    },
    {
        q: 'Using _______ statement is how you test for a specific condition.',
        a: '2.  If',
        choices: [{ choice: '1. Switch' }, { choice: '2. If' }, { choice: '3. Select' }, { choice: '4. For' }]
    },
    {
        q: 'Which best explains getSelection()?',
        a: '3. Returns the value of cursor-selected text',
        choices: [{ choice: '1. Returns the VALUE of a selected OPTION.' }, { choice: '2. Returns document.URL of the window in focus.' }, { choice: '3. Returns the value of cursor-selected text' }, { choice: '4. Returns the VALUE of a checked radio input.' }]
    },
];

//Go back button on HS
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

// Check if game-over + timer at 0, timer restart

var setTime = function () {
    timeleft = 30;

    var timercheck = setInterval(function () {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }

        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

    }, 1000)
}

var startGame = function () {
    //To display and hide the quiz screen
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    //Question shuffling and randomness
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}

//random question
var setQuestion = function () {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function () {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};

//display question information (including answer buttons)
var displayQuestion = function (index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};
//CORRECT SCREEN!
var answerCorrect = function () {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}
//WRONG SCREEN!
var answerWrong = function () {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
}

//checking to see if answer was correct  
var answerCheck = function (event) {
    var selectedanswer = event.target
    if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
        answerCorrect()
        score = score + 10
    }

    else {
        answerWrong()
        score = score - 5;
        timeleft = timeleft - 5;
    };

    //next question, see if there are any left to ask
    QuestionIndex++
    if (arrayShuffledQuestions.length > QuestionIndex + 1) {
        setQuestion()
    }
    else {
        gameover = "true";
        showScore();
    }
}

//final scores at the end
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}

//create scores
var createHighScore = function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your intials!");
        return;
    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
    }

    //getting the right scores in hierarchy
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    //clearing the list
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }

    saveHighScore();
    displayHighScores();

}
//save score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))

}

//load values/ called on page load
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);

    }
}

//display high score screen + initials
var displayHighScores = function () {

    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"

    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
    }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
    }

    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
    }

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }

}
//clears high scores
var clearScores = function () {
    HighScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    localStorage.clear(HighScores);

}

loadHighScore()

//on start click, start game
btnStartEl.addEventListener("click", startGame)
//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore)
//when view high-scores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores)
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage)
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores)

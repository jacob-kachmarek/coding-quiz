var startButton = document.getElementById('start');
var timerDisplay = document.getElementById('time');
var questionDisplay = document.getElementById('question');
var optionsDisplay = document.getElementById('options');
var endScreen = document.getElementById('end-screen');
var scoreDisplay = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var saveButton = document.getElementById('save');

var timer;
var time = 60;
var questionIndex = 0;
var score = 0;

var questions = [
    {
        question: 'What is the result of 2 + 2?',
        options: ['2', '3', '4', '5'],
        answer: '4',
    },
    {
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'let', 'const', 'variable'],
        answer: 'var',        
    },
    {
        question: 'What is the css property used when putting something in a flexbox?',
        options: ['display: flexbox', 'display: none', 'display: flex', 'display: inline'],
        answer: 'display: flex',
    },
    {
        question: 'Which data type is used to represent true/false values in JavaScript?',
        options: ['String', 'Boolean', 'Number', 'Array'],
        answer: 'Boolean',
    },
    {
        question: 'What is the CSS property used to change the text color of an element?',
        options: ['color', 'background-color', 'font-size', 'text-align'],
        answer: 'color', 
    }
];

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.disabled = true;
    timer = setInterval(countdownTimer, 1000);
    displayQuestions();
}

function countdownTimer() {
    time--;
    timerDisplay.textContent = time;

    if (time <= 0) {
        endGame();
    }
}

function displayQuestions() {
    var currentQuestion = questions[questionIndex]
    questionDisplay.textContent = currentQuestion.question
    optionsDisplay.innerHTML = '';
    currentQuestion.options.forEach(function(option) {
        var button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', checkIfRight);
        optionsDisplay.appendChild(button);

    });
}

function checkIfRight(event) {
    var selectedOption = event.target.textContent;
    var currentQuestion = questions[questionIndex];

    if (selectedOption === currentQuestion.answer) {
      score++;
    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
    }

    questionIndex++;

    if (questionIndex >= questions.length || time === 0) {
      endGame();
    } else {
      displayQuestions();
    }
}

function endGame() {
    clearInterval(timer);
    questionDisplay.textContent = '';
    optionsDisplay.innerHTML = '';
    endScreen.style.display = 'flex';
    scoreDisplay.textContent = score;
}
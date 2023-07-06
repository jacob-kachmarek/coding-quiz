//Grabbing all dom elements globally so they can be used and accessed in the functions
var startButton = document.getElementById('start');
var timerDisplay = document.getElementById('time');
var questionDisplay = document.getElementById('question');
var optionsDisplay = document.getElementById('options');
var endScreen = document.getElementById('end-screen');
var scoreDisplay = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var saveButton = document.getElementById('save');
//Variables being set within js
var timer;
var time = 60;
var questionIndex = 0;
var score = 0;
var highScores = [];

//Array of objects each object representing a question of the quiz
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
//Click events for the answer buttons and the 
startButton.addEventListener('click', startGame);
saveButton.addEventListener('click', saveGame);

function startGame() {
    timer = setInterval(countdownTimer, 1000);
    displayQuestions();
    startButton.style.display = 'none';
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
    optionsDisplay.textContent = '';
    currentQuestion.options.forEach(function(option) {
        var button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', checkIfRight);
        optionsDisplay.append(button);
    });
}

function displayHighScores() {
    var highScoresList = document.getElementById('high-scores');
  
    highScores.sort(function(low, high) {
      return high.score - low.score;
    });
  
    highScores.forEach(function(user) {
      var listItem = document.createElement('li');
      listItem.textContent = user.initials + ' - ' + user.score;
      highScoresList.appendChild(listItem);
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
    optionsDisplay.textContent = '';
    endScreen.style.display = 'flex';
    scoreDisplay.textContent = score;
}

function saveGame() {
    var initials = initialsInput.value.trim();

    if (initials !== '') {
      var user = {
        initials: initials,
        score: score
      };
  
      highScores.push(user);
      localStorage.setItem('highScores', JSON.stringify(highScores));
      initialsInput.value = '';
  
      displayHighScores();
    }
}

window.addEventListener('load', function () {
    var localHighScores = localStorage.getItem('highScores');
    if (localHighScores) {
        highScores = JSON.parse(localHighScores);
        displayHighScores();
}
})
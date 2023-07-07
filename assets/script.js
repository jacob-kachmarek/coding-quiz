//Grabbing all dom elements globally so they can be used and accessed in the functions
var startButton = document.getElementById('start');
var timerDisplay = document.getElementById('time');
var questionDisplay = document.getElementById('question');
var optionsDisplay = document.getElementById('options');
var endScreen = document.getElementById('end-screen');
var scoreDisplay = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var saveButton = document.getElementById('save');
//Variables being set globally within js
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
//Function for beginning the game
function startGame() {
  //sets the interval to 1000 ms and calls the countdown timer function
    timer = setInterval(countdownTimer, 1000);
    //when this functions runs it calls the displayQuestions() function which displays the question object to the dom
    displayQuestions();
    //when the start button is clicked its display is changed to none which hides it from the user
    startButton.style.display = 'none';
}
//Function for decrementing timer
function countdownTimer() {
  //decrements time (which is equal to 60) every 1000 ms which is determined by the interval above 
    time--;
    //Displays the actual seconds to the user dynamically ever second that passes a number decreases from the timer
    timerDisplay.textContent = time;
    //If statement saying if the timer reaches 0 (or less) it calls the endgame function
    if (time <= 0) {
        endGame();
    }
}
//Function to display questions of the quiz to the dom
function displayQuestions() {
  //Creating a variable that points the index of the questions array
    var currentQuestion = questions[questionIndex]
    //Changes the text content of the questionDisplay to the key called question inside of the current question
    questionDisplay.textContent = currentQuestion.question
    //This clears the text content to prepare the element to display new options when needed
    optionsDisplay.textContent = '';
    //Looping through the array of options in the questions array to dynamically generate elements (in this case buttons) for the different options
    currentQuestion.options.forEach(function(option) {
        var button = document.createElement('button');
        button.textContent = option;
        //Adds an event for the buttons when clicked they call the checkIfRight function
        button.addEventListener('click', checkIfRight);
        //appends the buttons elements to the dom
        optionsDisplay.append(button);
    });
}
//Function to display the high scores list
function displayHighScores() {
  //grabs high element with id="high scores"
    var highScoresList = document.getElementById('high-scores');
  //Sorts the high scores highest to lowest using the sort() method
    highScores.sort(function(low, high) {
      return high.score - low.score;
    });
  //Loops through the highScores array and creates a list item for each high score
    highScores.forEach(function(user) {
      var listItem = document.createElement('li');
      //This changes the text content of the newly created list item to whatever the user inputs as their initials and their score
      listItem.textContent = user.initials + ' - ' + user.score;
      //appends the new list item to the element with id="high scores" (which we declared with variable highScoresList)
      highScoresList.appendChild(listItem);
    });
  }
//Function to check if users selection was correct
function checkIfRight(event) {
  //Two variables one for the buttons and their text content within and one for the question being asked
    var selectedOption = event.target.textContent;
    var currentQuestion = questions[questionIndex];
  //This if statement increments the score if the option the user selected matches the answer specified in the questions array
    if (selectedOption === currentQuestion.answer) {
      score++;
      // If it does not then that means the user got the answer wrong therefore subtract 10 sec of time
    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
    }
    //This will increment the question index which refers to the position in the questions array
    questionIndex++;
    //This if statement specifies that if the last question has been answered OR the time has run out then we call the endGame function
    if (questionIndex >= questions.length || time === 0) {
      endGame();
      //If neither of those things has happened is will call the displayQuestions function 
    } else {
      displayQuestions();
    }
}
//Function for when the game is over
function endGame() {
  //this stops the timer using the clearInterval global function
    clearInterval(timer);
    //This clears the question asked text
    questionDisplay.textContent = '';
    //This clears the the buttons with answers 
    optionsDisplay.textContent = '';
    //This changes the display to flex from none therefore displaying the hardcoded html with id="end-screen"
    endScreen.style.display = 'flex';
    //This displays the users score 
    scoreDisplay.textContent = score;
}
//function to save game stats
function saveGame() {
  //Creates variable called initials and sets its value to the users input into the <input> element grabbed globally at the top as initialsInput
    var initials = initialsInput.value.trim();
  //creates user object with keys value pairs initials and score
    if (initials !== '') {
      var user = {
        initials: initials,
        score: score
      };
      //Pushes the object into the highScores array declared globally at the top of script.js
      highScores.push(user);
      //puts the object into local storage
      localStorage.setItem('highScores', JSON.stringify(highScores));
      //clears the input field 
      initialsInput.value = '';
      //calls the displayHighScores function
      displayHighScores();
    }
}
//Event for when the page loads
window.addEventListener('load', function () {
  //Gets the users initials and score stored in the local storage
    var localHighScores = localStorage.getItem('highScores');
    //this says that if they are any scores in local storage it will parse the high scores array so that js can read it and then display those high scores
    if (localHighScores) {
        highScores = JSON.parse(localHighScores);
        displayHighScores();
}
})
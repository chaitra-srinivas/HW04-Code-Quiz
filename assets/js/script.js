// Assignment code

// selectors for button elmenents
var startBtn = document.querySelector(".start-button");
var ansOne = document.querySelector("#ansOptionOne");
var ansTwo = document.querySelector("#ansOptionTwo");
var ansThree = document.querySelector("#ansOptionThree");
var ansFour = document.querySelector("#ansOptionFour");
var submitBtn = document.querySelector("#submit");
var backBtn = document.querySelector("#backBtn");
var clrScoresBtn = document.querySelector("#clrScores");

// Sections 
var quizSection = document.querySelector("#quiz-section");
var quizQuestion = document.querySelector("#question");
var quizIntroduction = document.querySelector("#quiz-introduction");
var quizQuestionsAndOptions = document.querySelector("#quiz-questions");
var quizResult = document.querySelector("#quiz-result");
var answerResult = document.querySelector("#answerResult");
var userQuizScore = document.querySelector("#your-score");
var displayStoredScoreEl = document.querySelector("#displayHighScore");
var userInitialsEl = document.querySelector("#initials");
var dynamicListEl = document.querySelector("#dynamic-list");

// timer section
var timerText = document.querySelector(".timer-text");
var timerElement = document.querySelector("#timer-count");

var selectedQuestion = null; // Global variable to save the current question state
var score = 0;
var currentQuestionIndex = -1;

// Global variables for the timer
var isFinish = false;
var timer;
var timerCount;

// An array of objects to store Questions and Answers

var codeQuiz = [
  {
    questionText: "Arrays in Javascript are used to store",
    answers: [
      { optionText: "Numbers and Strings", correct: false },
      { optionText: "Boolean", correct: false },
      { optionText: "Other arrays", correct: false },
      { optionText: "All of the above", correct: true },
    ],
  },

  {
    questionText: "Which one of these is a primitive data type in Javascript?",
    answers: [
      { optionText: "String", correct: false },
      { optionText: "Boolean", correct: false },
      { optionText: "Number", correct: false },
      { optionText: "All of the above", correct: true },
    ],
  },

  {
    questionText: "Strings in Javascript should be enclosed within _______",
    answers: [
      { optionText: "Quotes", correct: true },
      { optionText: "Question Marks", correct: false },
      { optionText: "Parenthesis", correct: false },
      { optionText: "Curly braces", correct: false },
    ],
  },

  {
    questionText: "The if...else condition is enclosed within _______",
    answers: [
      { optionText: "Quotes", correct: false },
      { optionText: "Question Marks", correct: false },
      { optionText: "Parenthesis", correct: true },
      { optionText: "Curly braces", correct: false },
    ],
  },

  {
    questionText: "A very useful tool used during development and debugging and for printing content to the debugger is: _______:",
    answers: [
      { optionText: "Javascript", correct: false },
      { optionText: "Terminal/bash", correct: false },
      { optionText: "console.log", correct: true },
      { optionText: "alerts", correct: false },
    ],
  },
];

// Quiz Introduction section

// Start button invokes the startQuiz function
startBtn.addEventListener("click", startQuiz);

// Function start game 
function startQuiz() {
  isFinish = false;
  timerCount = 10;
  startBtn.disabled = true;
  init();
  displayNextQuestion();
  startTimer();
}

// Initial function to be called
function init() {
  quizIntroduction.style.display = "none";
  quizQuestionsAndOptions.style.display = "block";
  quizResult.style.display = "none";
}


// Quiz questions and answers section

// Fucntion to render the question and answers

function displayNextQuestion() {
  currentQuestionIndex++; // Renders the first question in the array by incrementing the currentQuestionIndex to 0
  if (timerCount > 0) {
    if (currentQuestionIndex >= codeQuiz.length) {
      isFinish = true;
      displayResults();
    } else {
      selectedQuestion = codeQuiz[currentQuestionIndex];
      quizQuestion.textContent = selectedQuestion.questionText;
      ansOne.innerHTML = selectedQuestion.answers[0].optionText;
      ansTwo.innerHTML = selectedQuestion.answers[1].optionText;
      ansThree.innerHTML = selectedQuestion.answers[2].optionText;
      ansFour.innerHTML = selectedQuestion.answers[3].optionText;
    }
  } else if (timerCount === 0) {
    isFinish = true;
    displayResults();
  }
}

// Check if answer button is clicked

ansOne.addEventListener("click", function () {
  userChoice(0);
});

ansTwo.addEventListener("click", function () {
  userChoice(1);
});

ansThree.addEventListener("click", function () {
  userChoice(2);
});

ansFour.addEventListener("click", function () {
  userChoice(3);
});

// verifies the answer and displays next question
function userChoice(answerIndex) {
  if (selectedQuestion.answers[answerIndex].correct) {
    score += 10;
    answerResult.textContent = "Correct!";
    userQuizScore.innerHTML = score;
  } else {
    answerResult.textContent = "Wrong!";
    timerCount = timerCount - 2;
    userQuizScore.innerHTML = score;
  }
  displayNextQuestion();
}


// Renders the results section when user answers all the questions or the quiz times out

function displayResults() {
  // If no answers were chosen and the time ran out
  if(timerCount === 0 && score === 0){
    userQuizScore.innerHTML = score;
  }
  quizIntroduction.style.display = "none";
  quizQuestionsAndOptions.style.display = "none";
  quizResult.style.display = "block";
  startButton.disabled = false;
}


// On click of submit button call save score

submitBtn.addEventListener("click", saveScore);
// Fucntion to allow user to save the score

function saveScore() {
  var userInitials = userInitialsEl.value;
  var userScore = score;
  // Create object with user data
  var userData = [];
  var scoreList = localStorage.getItem("userData");
  if (scoreList) {
    userData = JSON.parse(scoreList);
  }
  // Only adds user data if initials is available
  if(userInitials){
    userData.push(userInitials + "-" + userScore);
    // setting values for local storage
    localStorage.setItem("userData", JSON.stringify(userData));
    renderStoredResults();
  }
  else {
    return;
  }
}

// Quiz results section 
// Function to display user initials and score in local storage

function renderStoredResults() {
  displayStoredScoreEl.style.display = "block";
  quizIntroduction.style.display = "none";
  quizQuestionsAndOptions.style.display = "none";
  quizResult.style.display = "none";

  // getting values from the local storage
  var listOfScores = JSON.parse(localStorage.getItem("userData"));

  if (listOfScores !== null) {    //  Creates a list of scores dynamically from localstorage
    var scoreList = document.createElement("ol");
    scoreList.id = dynamicListEl;
    for (var i = 0; i < listOfScores.length; i++) {
      var li = document.createElement("li");
      scoreList.appendChild(li);
      li.innerHTML = listOfScores[i];
      scoreList.appendChild(li);
    }
  }
  dynamicListEl.appendChild(scoreList);
}

//Function to clear scores and the dynamic list
function clearScores() { 
  var userScores = JSON.parse(localStorage.getItem("userData"));

  if (userScores !== null) {
    localStorage.clear();
    var dynamicList = dynamicListEl;
    dynamicList.parentNode.removeChild(dynamicList);
  }
}

// Function to restart the quiz
function refreshPage() {
  window.location.reload();
}


backBtn.addEventListener("click", refreshPage); // Takes the user back to the start page
clrScoresBtn.addEventListener("click", clearScores); // Clears scores

// Timer section

// The setTimer function starts and stops the timer
function startTimer() {
  timer = setInterval(function () { // Sets timer
    timerCount--;
    timerElement.textContent = timerCount;
      
      if(isFinish || timerCount === 0){   // Tests if finish condition is met
        clearInterval(timer);
        displayResults();
      }

  }, 1000);
}


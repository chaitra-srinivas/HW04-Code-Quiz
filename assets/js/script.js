// Assignment code

var startBtn = document.querySelector(".start-button");
var ansOne = document.querySelector("#ansOptionOne");
var ansTwo = document.querySelector("#ansOptionTwo");
var ansThree = document.querySelector("#ansOptionThree");
var ansFour = document.querySelector("#ansOptionFour");
var submitBtn = document.querySelector("#submit");
var backBtn = document.querySelector("#backBtn");
var clrScoresBtn = document.querySelector("#clrScores");

var quizSection = document.querySelector("#quiz-section");
var quizQuestion = document.querySelector("#question");
var quizIntroduction = document.querySelector("#quiz-introduction");
var quizQuestionsAndOptions = document.querySelector("#quiz-questions");
var quizResult = document.querySelector("#quiz-result");
var answerResult = document.querySelector("#answerResult");
var userQuizScore = document.querySelector("#your-score");
var displayStoredScore = document.querySelector("#displayHighScore");

var timerText = document.querySelector(".timer-text");
var timerElement = document.querySelector("#timer-count");

var selectedQuestion = null; // Global variable to save the current question state
var score = 0;
var currentQuestionIndex = -1;


var isFinish = false;
var timer;
var timerCount;

// An array of objects to store Questions and Answers

var codeQuiz = [
  {
    questionText: "Arrays in Javascript are used to store:",
    answers: [
      { optionText: "Numbers and Strings", correct: false },
      { optionText: "Boolean", correct: false },
      { optionText: "Other arrays", correct: false },
      { optionText: "All of the above", correct: true },
    ],
  },

  {
    questionText: "Which one of these is a primitive data type in Javascript?:",
    answers: [
      { optionText: "String", correct: false },
      { optionText: "Boolean", correct: false },
      { optionText: "Number", correct: false },
      { optionText: "All of the above", correct: true },
    ],
  },

  {
    questionText: "Strings in Javascript should be enclosed within _______:",
    answers: [
      { optionText: "Quotes", correct: true },
      { optionText: "Question Marks", correct: false },
      { optionText: "Parenthesis", correct: false },
      { optionText: "Curly braces", correct: false },
    ],
  },

  {
    questionText: "The if...else condition is enclosed within _______:",
    answers: [
      { optionText: "Quotes", correct: false },
      { optionText: "Question Marks", correct: false },
      { optionText: "Parenthesis", correct: true },
      { optionText: "Curly braces", correct: false },
    ],
  },
];

startBtn.addEventListener("click", startQuiz);

// Initial function to be called
function init() {
  quizIntroduction.style.display = "none";
  quizQuestionsAndOptions.style.display = "block";
  quizResult.style.display = "none";
}

// Function start game

function startQuiz() {
  isFinish = false;
  timerCount = 10;
  startBtn.disabled = true;
  init();
  displayNextQuestion();
  startTimer();
}

// Renders the results section when user answers all the questions or the quiz times out

function displayResults() {
  quizIntroduction.style.display = "none";
  quizQuestionsAndOptions.style.display = "none";
  quizResult.style.display = "block";
  startButton.disabled = false;
}

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

// Check if answer button clicked

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

function userChoice(answerIndex) {
  if (selectedQuestion.answers[answerIndex].correct) {
    score += 10;
    answerResult.textContent = "Correct!";
    userQuizScore.innerHTML = score;
  } else {
    answerResult.textContent = "Wrong!";
    timerCount = timerCount - 2;
  }
  displayNextQuestion();
}

// on click of submit button call save score

submitBtn.addEventListener("click", saveScore);
// Fucntion to allow user to save the score

function saveScore() {
  var userInitials = document.querySelector("#initials").value;
  var userScore = score;
  // Create object with user data
  var userData = [];
  var scoreList = localStorage.getItem("userData");
  if (scoreList) {
    userData = JSON.parse(scoreList);
  }

  userData.push(userInitials + "-" + userScore);

  // setting values for local storage
  localStorage.setItem("userData", JSON.stringify(userData));

  renderStoredResults();
}

// Function to display user initials and score in local storage

function renderStoredResults() {
  displayStoredScore.style.display = "block";
  quizIntroduction.style.display = "none";
  quizQuestionsAndOptions.style.display = "none";
  quizResult.style.display = "none";

  // getting values from the local storage
  var listOfScores = JSON.parse(localStorage.getItem("userData"));

  if (listOfScores !== null) {
    var scoreList = document.createElement("ol");
    scoreList.id = "#dynamic-list";
    for (var i = 0; i < listOfScores.length; i++) {
      var li = document.createElement("li");
      scoreList.appendChild(li);
      li.innerHTML = listOfScores[i];
      scoreList.appendChild(li);
    }
  }
  document.querySelector("#dynamic-list").appendChild(scoreList);
}

backBtn.addEventListener("click", refreshPage);

// Function to restart the quiz
function refreshPage() {
  window.location.reload();
}

clrScoresBtn.addEventListener("click", clearScores);

//Function to clear scores and the dynamic list

function clearScores() {
  var userScores = JSON.parse(localStorage.getItem("userData"));

  if (userScores !== null) {
    localStorage.clear();
    var dynamicList = document.getElementById("#dynamic-list");
    dynamicList.parentNode.removeChild(dynamicList);
  }
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if finish condition is met
      if (isFinish && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        displayResults();

      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      displayResults();

    }
  }, 1000);
}


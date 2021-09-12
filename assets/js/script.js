// Assignment code
var quizSection = document.querySelector("#quiz-section");
var startBtn = document.querySelector(".start-button");
var quizQuestion = document.querySelector("#question");
var ansOne = document.querySelector("#ansOptionOne");
var ansTwo = document.querySelector("#ansOptionTwo");
var ansThree = document.querySelector("#ansOptionThree");
var ansFour = document.querySelector("#ansOptionFour");
var submitBtn = document.querySelector("#submit");
var backBtn = document.querySelector("#backBtn");
var clrScoresBtn = document.querySelector("#clrScores");


var selectedQuestion = null; // Global variable to save the current question state
var score = 0;
var currentQuestionIndex = -1;


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
  document.querySelector("#quiz-introduction").style.display = "none";
  document.querySelector("#quiz-questions").style.display = "block";
  document.querySelector("#quiz-result").style.display = "none";
}

// Function start game

function startQuiz() {
  init();
  displayNextQuestion();
}

// Renders the results section when user answers all the questions or the quiz times out

function displayResults() {
  document.querySelector("#quiz-introduction").style.display = "none";
  document.querySelector("#quiz-questions").style.display = "none";
  document.querySelector("#quiz-result").style.display = "block";
}

// Fucntion to render the question and answers

function displayNextQuestion() {
  currentQuestionIndex++; // Renders the first question in the array by incrementing the currentQuestionIndex to 0
  if (currentQuestionIndex >= codeQuiz.length) {
    displayResults();
    /*  renderStoredResults(); */
  } else {
    selectedQuestion = codeQuiz[currentQuestionIndex];
    quizQuestion.textContent = selectedQuestion.questionText;
    ansOne.innerHTML = selectedQuestion.answers[0].optionText;
    ansTwo.innerHTML = selectedQuestion.answers[1].optionText;
    ansThree.innerHTML = selectedQuestion.answers[2].optionText;
    ansFour.innerHTML = selectedQuestion.answers[3].optionText;
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
    document.querySelector("#answerResult").textContent = "Correct!" + score;
    document.querySelector("#your-score").innerHTML = score;

  } else {
    document.querySelector("#answerResult").textContent = "Wrong!" + score;
  }
  displayNextQuestion();
}


// on click of submit button call save score

submitBtn.addEventListener("click", saveScore);
// Fucntion to allow user to save the score

function saveScore() {

  var userInitials = document.querySelector("#initials").value;

  // Create object with user data
  var userData = [];
  userData.push(userInitials + '-' + score);

  // setting values for local storage
  localStorage.setItem("userData", JSON.stringify(userData));
  
  renderStoredResults();

}

// Function to display user initials and score in local storage

function renderStoredResults() {
  // getting values from the local storage

  document.querySelector("#displayHighScore").style.display = "block";
  document.querySelector("#quiz-introduction").style.display = "none";
  document.querySelector("#quiz-questions").style.display = "none";
  document.querySelector("#quiz-result").style.display = "none";

  var listOfScores = []; 
   listOfScores.push(JSON.parse(localStorage.getItem("userData")));


  if (listOfScores !== null) {

    var scoreList = document.createElement("ul");
    scoreList.id = "#dynamic-list";
    for (var i = 0; i < listOfScores.length; i++) {
     /*  var initials = listOfScores[i].userIn;
      var scores = listOfScores[i].userScore; */
      var li = document.createElement("li"); 
      scoreList.appendChild(li);
      li.innerHTML = listOfScores;
      scoreList.appendChild(li);
    }
     

  }
  document.querySelector("#dynamic-list").appendChild(scoreList); 
}


// Function to restart the quiz

function refreshPage(){
  window.location.reload();
}

backBtn.addEventListener("click", refreshPage);


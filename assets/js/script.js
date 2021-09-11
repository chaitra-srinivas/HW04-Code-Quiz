// Assignment code
var quizSection = document.querySelector("#quiz-section");
var startBtn = document.querySelector(".start-button");
var quizQuestion = document.querySelector("#question");
var ansOne = document.querySelector("#ansOptionOne");
var ansTwo = document.querySelector("#ansOptionTwo");
var ansThree = document.querySelector("#ansOptionThree");
var ansFour = document.querySelector("#ansOptionFour");



// An array of objects to store Questions and Answers

// Function to build questions and answers

function generateQuestionsandAnswers(){
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
      { optionText: "Curly braces", correct: true },
    ],
  },
];
return codeQuiz;
}


function randomQuestionGenerator(codeQuiz){
    return codeQuiz[Math.floor(Math.random() * codeQuiz.length)];
  }

// Render a random question on click of start button

startBtn.addEventListener("click", renderCodeQuiz);


// Fucntion to render the question and answers

function renderCodeQuiz()
{
    var codeQuizArr = generateQuestionsandAnswers();
    var questionAns = randomQuestionGenerator(codeQuizArr);
    
    quizQuestion.textContent = questionAns.questionText;
    ansOne.innerHTML = questionAns.answers[0].optionText;
    ansTwo.innerHTML = questionAns.answers[1].optionText;
    ansThree.innerHTML = questionAns.answers[2].optionText;
    ansFour.innerHTML = questionAns.answers[3].optionText;
    
 
}

/* function myRand(arr) {
  //fix
  return arr[0];
}

var randQuestion = myRand(codeQuiz2);

randQuestion.questionText;
 */
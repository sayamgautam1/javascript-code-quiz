// get all the elements from the html page to manipulate using JS

let scoreCardEl = $("#scores");
let timerEl = $("#timer");
let quizContentEl = $("#quiz-content");
let questionEl = $("#question");
let answerOptionsEl = $("#options");
let resultEl = $("#result");
let playButtonEl = $("#play-button");
let count = 75;
let questionNumber = 0;

//create an array of objects , each element representing a question to show inside the html document
// q stands for question , o stands for option and a stands for answer
//create 2 objects at first to test the working and add other later
const questionChoices = [
  {
    q: "Inside the HTML document, where do you place your JavaScript code? ",
    o: [
      "Inside the <script> element",
      "Inside the <head> element",
      "Inside the <link> element",
      "In the <footer> element",
    ],
    a: "Inside the <script> element",
  },
  {
    q: "What operator is used to assign a value to a declared variable?",
    o: [
      "Question mark (?)",
      "Equal sign (=)",
      "Colon (:)",
      "Double-equal (==)",
    ],
    a: "Equal sign (=)",
  },
];

// create time interval of the game
function quizDuration() {
  var timeinterval = setInterval(function () {
    timerEl.text("time remaining : " + count);
    count--;
  }, 1000);
}
// main working station of the page ///

function startQuiz() {
  quizContentEl.children("h1").text("");
  quizContentEl.children("h2").text("");
  quizContentEl.children("button").remove();
  getQuestion(questionNumber);
}

//function to display question
function getQuestion(number) {
  questionEl.text("");
  answerOptionsEl.text("");

  questionEl.text(questionChoices[number].q);
  console.log(questionChoices[number]);
  // $.each(questionChoices[number].o, function () {
  //   let answers = $("<button>");
  //   answers.text(questionChoices[number].o);
  //   answerOptions.append(answers);
  // }); understood $ reperesents document
  questionChoices[number].o.forEach((option) => {
    let optionEl = $("<button>");
    optionEl.text(option);
    answerOptionsEl.append(optionEl);
    optionEl.on("click", () => checkAnswer(number, option));
  });
}

function checkAnswer(questionIndex, answerIndex) {
  let result = $("<p>");
  if (questionChoices[questionIndex].a === answerIndex) {
    result.text("correct");
  } else {
    result.text("incorrect");
    count - 10;
  }
  setTimeout(() => result.text(""), 1000);
  $("#result").append(result);

  let nextQuestionNumber = questionNumber + 1;
  if (nextQuestionNumber < questionChoices.length) {
    getQuestion(nextQuestionNumber);
  } else {
    count = 0;
  }
}

// timer to start when the play button is clicked
// quiz to begin when the play button is clicked

playButtonEl.on("click", function () {
  quizDuration();
  startQuiz();
});

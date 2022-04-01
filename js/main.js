// get all the elements from the html page to manipulate using JS

let scoreCard = $("#scores");
let timer = $("#timer");
let quizContent = $("#quiz-content");
let question = $("#question");
let answerOptions = $("#options");
let result = $("#result");
let playButton = $("#play-button");
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
    timer.text("time remaining : " + count);
    count--;
  }, 1000);
}
// main working station of the page ///

function startQuiz() {
  quizContent.children("h1").text("");
  quizContent.children("h2").text("");
  quizContent.children("button").remove();
  getQuestion(questionNumber);
}

//function to display question
function getQuestion(number) {
  question.text(questionChoices[number].q);
  console.log(questionChoices[number]);
  // $.each(questionChoices[number].o, function () {
  //   let answers = $("<button>");
  //   answers.text(questionChoices[number].o);
  //   answerOptions.append(answers);
  // }); understood $ reperesents document
  questionChoices[number].o.forEach((option) => {
    let optionEl = $("<button>");
    optionEl.text(option);
    answerOptions.append(optionEl);
    optionEl.on("click", () => checkAnswer(number, option));
  });
}

function checkAnswer(questionIndex, answerIndex) {
  if (questionChoices[questionIndex].a === answerIndex) {
    result.text("correct");
  } else result.text("incorrect");
}

// timer to start when the play button is clicked
// quiz to begin when the play button is clicked

playButton.on("click", function () {
  quizDuration();
  startQuiz();
});

// get all the elements from the html page to manipulate using JS

let scoreCardEl = $("#scores");
let timerEl = $("#timer");
let quizContentEl = $("#quiz-content");
let questionEl = $("#question");
let answerOptionsEl = $("#options");
let resultEl = $("#result");
let playButtonEl = $("#play-button");
let quizSectionEl = $("#questions-options");
let count = 75;
let questionNumber = 0;
let correctAnswer = 0;

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
  {
    q: "What are the six primitive data types in JavaScript? ",
    o: [
      "sentence, float, data, bigInt, symbol, undefined",
      "string, number, boolean, bigInt, symbol, undefined",
      "string, num, falsy, bigInt, symbol, undefined",
      "sentence, int, truthy, bigInt, symbol, undefined",
    ],
    a: "string, number, boolean, bigInt, symbol, undefined",
  },
  {
    q: "How do we declare a conditional statement in JavaScript?",
    o: ["for loop", "while loop", "if...else", "difference...between"],
    a: "if...else",
  },
  {
    q: "From the given array which index is the letter 'b' on? ['a', 'b', 'c', 'd'] ",
    o: ["1", "3", "2", "0"],
    a: "1",
  },
  {
    q: "What are the two types of scope JavaScript uses? ",
    o: [
      "Global and Local",
      "Abroad and Local",
      "Surrounding and Inner",
      "Outside and Inside",
    ],
    a: "Global and Local",
  },
  {
    q: "How do we access a value stored in an object? ",
    o: [
      "Equal notation, Abstract notation",
      "Dot notation, Bracket notation",
      "Dot notation, Curl bracket notation",
      "Period notation, Square bracket notation",
    ],
    a: "Dot notation, Bracket notation",
  },
  {
    q: "What is an object method? ",
    o: [
      "An array saved inside of an object",
      "A function associated with an object",
      "Keys in an object that have a number assigned to it",
      "A function that takes an object for an argument",
    ],
    a: "A function associated with an object",
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
  console.log(correctAnswer);
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

//fuction to check answer on each clicked option choice
function checkAnswer(questionIndex, answerIndex) {
  let result = $("<p>");
  if (questionChoices[questionIndex].a === answerIndex) {
    result.text("correct");
    correctAnswer++;
  } else {
    result.text("incorrect");
    count -= 10;
  }
  setTimeout(() => result.text(""), 1000);
  $("#result").append(result);

  // to disply the next quesiton increase the question index by 1 and call the fucntion again

  let nextQuestionNumber = questionIndex + 1;
  if (nextQuestionNumber >= questionChoices.length) {
    endquiz();
  } else {
    getQuestion(nextQuestionNumber);
  }
}
// fucntion to end quiz and display result

function endquiz() {
  quizContentEl.children("h1").text(`you scored ${correctAnswer}`);
  quizSectionEl.text("");
}
// timer to start when the play button is clicked
// quiz to begin when the play button is clicked

playButtonEl.on("click", function () {
  quizDuration();
  startQuiz();
});

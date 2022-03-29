// get all the elements from the html page to manipulate using JS

let scoreCard = document.getElementById("scores");
let timer = document.getElementById("timer");
let quizContent = document.getElementById("quiz-content");
let question = document.getElementById("questions");
let answerOptions = document.getElementById("options");
let result = document.getElementById("result");

//create an array of objects , each element representing a question to show inside the html document
// q stands for question , o stands for option and a stands for answer
//create 2 objects at first to test the working and add other later
let questionChoices = [
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

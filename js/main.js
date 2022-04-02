// get all the elements from the html page to manipulate using JS

let scoreCardEl = $("#leaderboard");
let scoreCardBtn = $("#scoreCard");
let timerEl = $("#timer");
let quizContentEl = $("#quiz-content");
let questionEl = $("#question");
let answerOptionsEl = $("#options");
let resultEl = $("#result");
let playButtonEl = $("#play-button");
let quizSectionEl = $("#questions-options");
let finalEl = $("#final");
let finalScoreEl = $("#finalscore");
let leaderboardEl = $("#highscores");
let highScoreEl = $("#scores");
let returnBtn = $("#back");
let clearBtn = $("#clear");
let submitScoreBtn = $("#submit-score");
let initalsEl = $("#initials");

let questionNumber = 0;
let correctAnswerCount = 0;

//create an array of objects , each element representing a question to show inside the html document
// -  q stands for question ,
// - o stands for option and
// - a stands for answer
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

// Handle countdown and penalty
function createTimer() {
  let timerInterval;
  let count = 75;

  function startTimer() {
    count = 75;
    timerInterval = setInterval(function () {
      timerEl.text("⏱️  " + count);
      console.log(timerEl);
      count--;

      if (count < 0) {
        alert("Time's up!!");
        stopTimer();
        endquiz();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    // timerEl.css("display", "none");
  }

  function applyPenalty() {
    count -= 10;
  }

  return {
    startTimer,
    stopTimer,
    applyPenalty,
  };
}
let timer = createTimer();

// main working station of the page ///

function startQuiz() {
  correctAnswerCount = 0;
  scoreCardEl.css("display", "none");
  quizContentEl.css("display", "none");
  quizSectionEl.css("display", "block");

  getQuestion(questionNumber);
}

// Get the next question and display on page
// args:
//   number -> index of the question to display
function getQuestion(number) {
  const nextQuestion = questionChoices[number];
  answerOptionsEl.text("");
  questionEl.text(nextQuestion.q);
  // $.each(questionChoices[number].o, function () {
  //   let answers = $("<button>");
  //   answers.text(questionChoices[number].o);
  //   answerOptions.append(answers);
  // }); understood $ reperesents document
  nextQuestion.o.forEach((option) => {
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
    result.text("Correct");
    correctAnswerCount++;
  } else {
    result.text(
      "Wrong! The correct answer is: " + questionChoices[questionIndex].a
    );
    timer.applyPenalty();
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

// end quiz and display result
function endquiz() {
  timerEl.text("⏱️");

  quizSectionEl.css("display", "none");
  finalEl.css("display", "block");
  finalScoreEl.text(`You scored :  ${correctAnswerCount}`);

  timer.stopTimer();
}

const quizUI = {
  hide: function () {
    scoreCardEl.css("display", "none");
    timerEl.css("display", "none");
    quizContentEl.css("display", "none");
    quizSectionEl.css("display", "none");
    finalEl.css("display", "none");
  },

  show: function () {
    correctAnswerCount = 0;
    scoreCardEl.css("display", "block");
    timerEl.css("display", "block");
    timerEl.text("⏱️");
    quizContentEl.css("display", "block");
    leaderboardEl.css("display", "none");
    console.log("hello");
  },
};

// show leader board, store scores and get scores
function createScores() {
  function addScore(initials, score) {
    let scoreList = [];

    const scoreListLS = localStorage.getItem("scorelist");
    if (scoreListLS !== null) {
      scoreList = JSON.parse(scoreListLS);
    }

    scoreList.push({ initials, score });
    localStorage.setItem("scorelist", JSON.stringify(scoreList));
  }
  function showScore() {
    quizUI.hide();
    leaderboardEl.css("display", "block");
    let highScores = JSON.parse(localStorage.getItem("scorelist"));

    highScoreEl.text("");
    highScores.forEach((hscore) => {
      let eachScore = $("<li>");
      eachScore.text(hscore.initials + " : " + hscore.score);
      highScoreEl.append(eachScore);
    });
  }

  function clearScores() {
    correctAnswerCount = 0;
    localStorage.clear();
    highScoreEl.text("");
  }
  return {
    addScore,
    showScore,
    clearScores,
  };
}
let scoreCard = createScores();
// event listener to show leaderboard when the button is clicked

scoreCardBtn.on("click", function () {
  scoreCard.showScore();
});

// event listen to go back main page when back button is clicked
returnBtn.on("click", function () {
  quizUI.show();
});

// event listener to get the initals input
submitScoreBtn.on("click", function () {
  let initials = initalsEl.val();
  scoreCard.addScore(initials, correctAnswerCount);
  scoreCard.showScore();
});
// clear local storage and score when clear button is clicked

clearBtn.on("click", function () {
  scoreCard.clearScores();
});
// timerInterval to start when the play button is clicked
// quiz to begin when the play button is clicked

playButtonEl.on("click", function () {
  timer.startTimer();
  startQuiz();
});

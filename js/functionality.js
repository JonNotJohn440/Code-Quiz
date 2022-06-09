// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("quiz");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


function startQuiz() {
  // hide start screen
  // var startScreenEl = document.getElementById("start-screen");
  // startScreenEl.setAttribute("class", "hide");

  // Reveal questions
  questionsEl.removeAttribute("class");

  // start the timer
  timerId = setInterval(clockTick, 1000);

  // show the starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get the current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title for current question
  var titleEl = document.getElementById("quiz-title");
  titleEl.textContent = currentQuestion.title;

  // clear out old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "options");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check for wrong answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // time docked, loser
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
    
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score, not bad!
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide the questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var scores =
      JSON.parse(window.localStorage.getItem("scores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    scores.push(newScore);
    window.localStorage.setItem("scores", JSON.stringify(scores));

    // redirect to next page
    window.location.href = "scores.html";
  }
}

function checkForEnter(event) {
  // "13" is the enter key
  if (event.key === "Enter") {
    saveScore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

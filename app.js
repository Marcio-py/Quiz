const questions = [
  {
    question: "How ____ you ?",
    answers: [
      { text: "are", correct: true },
      { text: "is", correct: false },
    ],
  },
  {
    question: "What is two + two ?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "How ___ are you ?",
    answers: [
      { text: "tall", correct: true },
      { text: "speed", correct: false },
    ],
  },
  {
    question: "Wich word defines that there is no one arround.\n I am ___",
    answers: [
      { text: "alone", correct: true },
      { text: "nobody", correct: false },
    ],
  },
];

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");

let shuffQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.classList.add("hide");
  shuffQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct; //Para simplificar a condição 1 line
    button.addEventListener("click", selectAnswer);
    answerButtonElement.append(button);
  });
}

function resetState() {
  clearStatusClass(document.body); //Lembrar de alterar a bgcolor caso a resposta esteja certa ou errada
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

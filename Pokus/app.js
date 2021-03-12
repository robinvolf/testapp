"use strict";

let questions = [
  {
    question: "Cupidatat id ea irure eu officia?",
    answers: [
      "Veniam deserunt ut laboris deserunt pariatur irure voluptate enim exercitation ad consequat.",
      "Excepteur fugiat commodo in ullamco minim.",
      "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
      "Anim adipisicing minim cillum aliquip officia esse cillum non sint commodo irure amet aliqua.",
    ],
  },
  {
    question: "Cillum irure et id laboris nulla aliquip esse sint ex nisi.?",
    answers: [
      "Veniam deserunt ut laboris deserunt pariatur irure voluptate enim exercitation ad consequat.",
      "Excepteur fugiat commodo in ullamco minim.",
      "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
      "Anim adipisicing minim cillum aliquip officia esse cillum non sint commodo irure amet aliqua.",
    ],
  },
  {
    question: "Vestibulum tincidunt faucibus placerat.?",
    answers: [
      "Veniam deserunt ut laboris deserunt pariatur irure voluptate enim exercitation ad consequat.",
      "Excepteur fugiat commodo in ullamco minim.",
      "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
      "Anim adipisicing minim cillum aliquip officia esse cillum non sint commodo irure amet aliqua.",
    ],
  },
  {
    question: "Proin dignissim vehicula vulputate.?",
    answers: [
      "Veniam deserunt ut laboris deserunt pariatur irure voluptate enim exercitation ad consequat.",
      "Excepteur fugiat commodo in ullamco minim.",
      "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
      "Anim adipisicing minim cillum aliquip officia esse cillum non sint commodo irure amet aliqua.",
    ],
  },
];

let globalQuestionIndex = 0;

function setCurrentQuestion(questionIndex) {
  let textParagraph = document.getElementById("paragraph-question");
  textParagraph.textContent = questions[questionIndex].question;
}

function setQuestionNumber(questionIndex) {
  document.getElementById("question-number").textContent =
    questionIndex + 1 + ")";
}

function renderQuestions(questionIndex) {
  let selectedAnswers = questions[questionIndex].answers;
  let answerHTML = "";

  for (let i = 0; i < selectedAnswers.length; i++) {
    answerHTML =
      answerHTML +
      `<div class="form-check mb-3">"
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
            <label class="form-check-label" for="flexCheckDefault1">${selectedAnswers[i]}</label>
        </div>`;
  }
  document.getElementById("block-answers").innerHTML = answerHTML;
}

function buttonDisableCheck(questionIndex, questionsLength) {
  let lessThanMinimum = questionIndex <= 0;
  let greatherThanMaximum = questionIndex >= questionsLength - 1;

  document.getElementById("button-previous").disabled = lessThanMinimum;
  document.getElementById("button-next").disabled = greatherThanMaximum;
}

function changeQuestion(questionIndex, questionsLength) {
  setCurrentQuestion(questionIndex);
  setQuestionNumber(questionIndex);
  buttonDisableCheck(questionIndex, questionsLength);
  renderQuestions(questionIndex);
}

function handlerClickNextButton() {
  changeQuestion(++globalQuestionIndex, questions.length);
}

function handlerClickPreviousButton() {
  changeQuestion(--globalQuestionIndex, questions.length);
}

document
  .getElementById("button-previous")
  .addEventListener("click", handlerClickPreviousButton);
document
  .getElementById("button-next")
  .addEventListener("click", handlerClickNextButton);

changeQuestion(globalQuestionIndex, questions.length);

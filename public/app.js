"use strict";

let questions = [
  {
    question: "Cupidatat id ea irure eu officia?",
    answers: [
      "Veniam deserunt ut laboris deserunt pariatur irure voluptate enim exercitation ad consequat.",
      "Et veniam dolor praesentium voluptates doloremque.",
      "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
      "Anim adipisicing minim cillum aliquip officia esse cillum non sint commodo irure amet aliqua.",
    ],
  },
  {
    question: "Cillum irure et id laboris nulla aliquip esse sint ex nisi.?",
    answers: [
      "Modi quidem tenetur blanditiis",
      "Excepteur fugiat commodo in ullamco minim.",
      "Reprehenderit accusamus qui sed illum quo.",
      "Consequatur ratione officia ea officiis.",
    ],
  },
  {
    question: "Vestibulum tincidunt faucibus placerat.?",
    answers: [
      "Debitis consequatur explicabo ut..",
      "Delectus reiciendis amet omnis sunt.",
      "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
      "Quos illum et est fugit veritatis ipsam.",
    ],
  },
  {
    question: "Proin dignissim vehicula vulputate.?",
    answers: [
      "Impedit perspiciatis deserunt cumque sapiente consequatur..",
      "Omnis et in asperiores quam tempora non.",
      "Laboriosam commodi maiores aut nihil est.",
      "Cumque et dicta neque quia. ",
    ],
  },
];

let answerMemory = [
  {
    flexCheckDefault1:false,
    flexCheckDefault2:false,
    flexCheckDefault3:false,
    flexCheckDefault4:false,
  },
  {
    flexCheckDefault1:false,
    flexCheckDefault2:false,
    flexCheckDefault3:false,
    flexCheckDefault4:false,
  },
  {
    flexCheckDefault1:false,
    flexCheckDefault2:false,
    flexCheckDefault3:false,
    flexCheckDefault4:false,
  },
  {
    flexCheckDefault1:false,
    flexCheckDefault2:false,
    flexCheckDefault3:false,
    flexCheckDefault4:false,
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
      `<div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault${i+1}">
            <label class="form-check-label" for="flexCheckDefault${i+1}">${selectedAnswers[i]}</label>
        </div>`;
  }
  document.getElementById("block-answers").innerHTML = answerHTML;
}

function loadSelectedQuestions(questionIndex) {
  for (let i = 0; i < questions[questionIndex].answers.length; i++)
  {
    if (answerMemory[questionIndex][`flexCheckDefault${i+1}`])
      document.getElementById(`flexCheckDefault${i+1}`).checked = true;
  }
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
  loadSelectedQuestions(questionIndex);
  
}

function handlerClickNextButton() {
  changeQuestion(++globalQuestionIndex, questions.length);
}

function handlerClickPreviousButton() {
  changeQuestion(--globalQuestionIndex, questions.length);
}

function handlerCheckboxMemory(checkboxEventObject) {
  if (checkboxEventObject.target.checked) {
    answerMemory[globalQuestionIndex][checkboxEventObject.target.id] = true;
  }
  else {
    answerMemory[globalQuestionIndex][checkboxEventObject.target.id] = false;
  }
}

document
  .getElementById("button-previous")
  .addEventListener("click", handlerClickPreviousButton);
document
  .getElementById("button-next")
  .addEventListener("click", handlerClickNextButton);
document
  .getElementById("block-answers")
  .addEventListener("change", handlerCheckboxMemory);

  
changeQuestion(globalQuestionIndex, questions.length);
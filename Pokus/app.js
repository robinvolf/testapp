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

let questionIndex = 0;

function setCurrentQuestion() {
  let textParagraph = document.getElementById("paragraph-question");
  textParagraph.textContent = questions[questionIndex].question;
}

function setQuestionNumber(index) {
  document.getElementById("question-number").textContent = index + 1 + ")";
}

function buttonDisableCheck(index, len) {
  let lessThanMinimum = index <= 0;
  let greatherThanMaximum = index >= len - 1;

  document.getElementById("button-previous").disabled = lessThanMinimum;
  document.getElementById("button-next").disabled = greatherThanMaximum;
}

function handlerClickNextButton() {
  setCurrentQuestion(++questionIndex);
  setQuestionNumber(questionIndex);
  buttonDisableCheck(questionIndex, questions.length);
}

function handlerClickPreviousButton() {
  setCurrentQuestion(--questionIndex);
  setQuestionNumber(questionIndex);
  buttonDisableCheck(questionIndex, questions.length);
}

document
  .getElementById("button-previous")
  .addEventListener("click", handlerClickPreviousButton);
document
  .getElementById("button-next")
  .addEventListener("click", handlerClickNextButton);

setCurrentQuestion(questionIndex);

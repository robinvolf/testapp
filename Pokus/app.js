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
];

let questionIndex = 0;

function setCurrentQuestion() {
  let textParagraph = document.getElementById("paragraph-question");
  textParagraph.textContent = questions[questionIndex].question;
}

function handlerClickNextButton() {
  setCurrentQuestion(++questionIndex);
}

function handlerClickPreviousButton() {
  setCurrentQuestion(--questionIndex);
}

document
  .getElementById("button-finish")
  .addEventListener("click", handlerClickNextButton);
document
  .getElementById("button-previous")
  .addEventListener("click", handlerClickPreviousButton);
document
  .getElementById("button-next")
  .addEventListener("click", handlerClickNextButton);

setCurrentQuestion(questionIndex);

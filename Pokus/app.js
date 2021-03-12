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

function setQuestionNumber() {
  document.getElementById("question-number").textContent = (questionIndex + 1)+")";
}

function buttonDisableCheck() {
  if (questionIndex == 0) {
    document.getElementById("button-previous").disabled = true;
    document.getElementById("button-next").disabled = false;
  }

  else if (questionIndex == questions.length - 1) {
    document.getElementById("button-next").disabled = true;
    document.getElementById("button-previous").disabled = false;
  }

  else {
    document.getElementById("button-previous").disabled = false;
    document.getElementById("button-next").disabled = false;
  }
}

function handlerClickNextButton() {
  setCurrentQuestion(++questionIndex);
  setQuestionNumber();
  buttonDisableCheck();
}

function handlerClickPreviousButton() {
  setCurrentQuestion(--questionIndex);
  setQuestionNumber();
  buttonDisableCheck();
}

document
  .getElementById("button-previous")
  .addEventListener("click", handlerClickPreviousButton);
document
  .getElementById("button-next")
  .addEventListener("click", handlerClickNextButton);

setCurrentQuestion(questionIndex);

"use strict";

let questions;
let answerMemory = [];
let testFinished = false;
let correctAnswers = [];

let globalQuestionIndex = 0;

////renders the question "questions" array
function setCurrentQuestion(questionIndex) {
  let textParagraph = document.getElementById("paragraph-question");
  textParagraph.textContent = questions[questionIndex].question;
}

//changes the question number at the upper left
function setQuestionNumber(questionIndex) {
  document.getElementById("question-number").textContent =
    questionIndex + 1 + ")";
}

//renders answers and their checkboxes from "questions" array
function renderQuestions(questionIndex) {
  let selectedAnswers = questions[questionIndex].answers;
  let answerHTML = "";
  let disabledOrDefault = "";

  //if the test is finished disables checkboxes
  if(testFinished == true){
    disabledOrDefault = "Disabled";
  }

  for (let i = 0; i < selectedAnswers.length; i++) {
    
    //if the test is finished highlights correct answers in green
    let correctOrNot = "";
    if (testFinished == true){
      if(correctAnswers[questionIndex][i] == true){
        correctOrNot = 'style="color:green;"';
      }
    }

    answerHTML =
      answerHTML +
      `<div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" data-index="${i}" value="" id="flexCheckDefault${i+1}" ${disabledOrDefault}>
            <label class="form-check-label" for="flexCheckDefault${i+1}" ${correctOrNot}>${selectedAnswers[i]}</label>
        </div>`;
  }
  document.getElementById("block-answers").innerHTML = answerHTML;
}

//displays already selected answers when revisiting a question
function loadSelectedQuestions(questionIndex) {
  for (let i = 0; i < questions[questionIndex].answers.length; i++) {
      document.getElementById(`flexCheckDefault${i+1}`).checked = 
        Boolean(answerMemory[questionIndex][i]);
  }
}

//checks if you can go to next/previous question (if you're at the end/start)
function buttonDisableCheck(questionIndex, questionsLength) {
  let lessThanMinimum = questionIndex <= 0;
  let greatherThanMaximum = questionIndex >= questionsLength - 1;

  document.getElementById("button-previous").disabled = lessThanMinimum;
  document.getElementById("button-next").disabled = greatherThanMaximum;
}

//changes question and calls other functions to help
function changeQuestion(questionIndex, questionsLength) {
  setCurrentQuestion(questionIndex);
  setQuestionNumber(questionIndex);
  buttonDisableCheck(questionIndex, questionsLength);
  renderQuestions(questionIndex);
  loadSelectedQuestions(questionIndex);

  if(questionIndex == questions.length - 1){
    summonFinishButton();
  }
  else{
    document.getElementById("button-finish").innerHTML ="";
  }  
}

//goes to next question
function handlerClickNextButton() {
  changeQuestion(++globalQuestionIndex, questions.length);
}

//goes to previous question
function handlerClickPreviousButton() {
  changeQuestion(--globalQuestionIndex, questions.length);
}

//on change writes selected answers into answer memory
function handlerCheckboxMemory(checkboxEventObject) {
  let answerIndex = Number(checkboxEventObject.target.dataset.index);
    answerMemory[globalQuestionIndex][answerIndex] = Boolean(checkboxEventObject.target.checked);
}

//generates memory for answers when questions are received
function generateAnswerMemory() {
  for (let i = 0; i < questions.length; i++) {
    answerMemory[i] = [];
    for (let j = 0; j < questions[i].answers.length; j++) {
      answerMemory[i][j] = null;
    }
  }
}

function summonFinishButton() {
  document.getElementById("button-finish").innerHTML = '<button type="button" id="button-finish" class="btn btn-danger btn-lg btn-block">UKONČIT TEST</button>';
  document  
    .getElementById("button-finish")
    .addEventListener("click", sendAnswers);
}

function goToTest() {
  document.getElementById("test-list").classList.add("hidden-block");
  document.getElementById("test").classList.remove("hidden-block");
  fetch('/data')  //requests the questions and answers from the server
		.then(response => response.json())
		.then(data => {
			questions = data;
      generateAnswerMemory();
			changeQuestion(globalQuestionIndex, questions.length);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

//sends answers and gets correct ones back
function sendAnswers() {
  fetch('/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(answerMemory),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  correctAnswers = data;
  testFinished = true;
  changeQuestion(globalQuestionIndex, questions.length);
})
.catch((error) => {
  console.error('Error:', error);
});
}

window.addEventListener("load", (event) => {
  document.getElementById("test").classList.add("hidden-block");
	document
	  .getElementById("button-previous")
	  .addEventListener("click", handlerClickPreviousButton);
	document
	  .getElementById("button-next")
	  .addEventListener("click", handlerClickNextButton);
	document
	  .getElementById("block-answers")
	  .addEventListener("change", handlerCheckboxMemory);
  document
    .getElementById("test1")
    .addEventListener("click", goToTest)
});
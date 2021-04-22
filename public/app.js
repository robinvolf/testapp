"use strict";

let questions;
let answerMemory = [];
let testFinished = false;
let correctAnswers = [];
let globalQuestionIndex = 0;
let questionnaireCurrentlyWorkedOn;
let questionnarieList = [];
let nameSurname;
let group = "4.A";


//renders the question "questions" array
function setCurrentQuestion(questionIndex) {
  let textParagraph = document.getElementById("paragraph-question");
  textParagraph.textContent = questions[questionIndex].question_content;
}

//renders name of test on the top
function renderQuestionnaireName(name) {
  document.getElementById("questionnaire-name").innerHTML = name;
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
      if(correctAnswers[selectedAnswers[i].answer_id] === true){
        correctOrNot = 'style="color:green;"';
      }
    }

    answerHTML =
      answerHTML +
      `<div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" data-index="${i}" data-answer-id="${selectedAnswers[i].answer_id}" value="" id="flexCheckDefault${i+1}" ${disabledOrDefault}>
            <label class="form-check-label" for="flexCheckDefault${i+1}" ${correctOrNot}>${selectedAnswers[i].content}</label>
        </div>`;
  }
  document.getElementById("block-answers").innerHTML = answerHTML;
}

//displays already selected answers when revisiting a question
function loadSelectedQuestions(questionIndex) {
	let checkbox;
  for (let i = 0; i < questions[questionIndex].answers.length; i++) {
	checkbox = document.getElementById(`flexCheckDefault${i+1}`);
      checkbox.checked = Boolean(answerMemory[checkbox.dataset.answerId]);
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

  //shows finish button at the end of test
  if(questionIndex == questions.length - 1){
    document.getElementById("button-finish").classList.remove("hidden-block");
  }
  else if(document.getElementById("button-finish").innerText == "ZPĚT NA SEZNAM TESTŮ") {
    document.getElementById("button-finish").classList.remove("hidden-block");
  }
  else{
    document.getElementById("button-finish").classList.add("hidden-block");
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
    answerMemory[checkboxEventObject.target.dataset.answerId] = Boolean(checkboxEventObject.target.checked);
}

//generates table of questionnaires
function generateTestList(testList){
  for (let i = 0; i < testList.length; i++){
    document.getElementById("test-list-table-body").innerHTML += 
    `<tr  class="questionnaire-row" data-questionnaire-id="${testList[i].questionnaire_id}">
      <th scope="">${testList[i].name}</th>
      <td>${testList[i].description}</td>
    </tr>`;
  }
}

//updates the global nameSurname
function updateNameSurname() {
  nameSurname = document.getElementById("name-surname").value;
}

//updates the global group
function updateGroup() {
  group = document.getElementById("group").value;
}

function returnToQuestionnaireList(){
  questions = [];
  testFinished = false;
  correctAnswers = [];
  globalQuestionIndex = 0;
  questionnaireCurrentlyWorkedOn = "";

  document.getElementById("test")
    .classList.add("hidden-block");
  document.getElementById("test-list")
    .classList.remove("hidden-block");
  document.getElementById("button-finish").innerText = "UKONČIT TEST";
}

//Selects test
function handlerClickToQuestionnaireRow(eventObject) {
  if (document.getElementById("name-surname").value == ""){
    document.getElementById("no-name-error-message").innerText = "Vyplň své jméno a třídu!";
  }
  else {
    let questionnaireId =  eventObject.target.parentElement.dataset.questionnaireId;
    questionnaireCurrentlyWorkedOn = questionnaireId;

    document.getElementById("test-list").classList.add("hidden-block");
    document.getElementById("test").classList.remove("hidden-block");
    document
    .getElementById("button-finish")
    .addEventListener("click", sendAnswers, {once:true});

    fetch(`/data?questionnaire_id=${questionnaireId}`)  //requests the questionnarie from the server
      .then(response => response.json())
      .then(data => {
        questions = data;
      let questionnaire = questionnarieList.find(questionnaire => questionnaire.questionnaire_id === parseInt(questionnaireId, 10));

        renderQuestionnaireName(questionnaire.name);
        answerMemory = {};
        changeQuestion(globalQuestionIndex, questions.length);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      document.getElementById("no-name-error-message").innerText = "";
  }
}

//sends answers and gets correct ones back
function sendAnswers() {
  let request = {};
  request.questionnaireWorkedOn = questionnaireCurrentlyWorkedOn;
  request.answers = answerMemory;
  request.nameSurname = nameSurname;
  request.group = group;
  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  .then(response => response.json())
  .then(data => {
    questionnaireCurrentlyWorkedOn = null;
    correctAnswers = data;
    testFinished = true;
    changeQuestion(globalQuestionIndex, questions.length);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  document.getElementById("button-finish").addEventListener("click", returnToQuestionnaireList, {once:true});
  document.getElementById("button-finish").innerText = "ZPĚT NA SEZNAM TESTŮ";
}

function resultButtonHandler(){
  document.getElementById("test-list").classList.add("hidden-block");
  document.getElementById("result-table").classList.remove("hidden-block");
  generateResultTable();
}

function backToTestListButtonHandler(){
  document.getElementById("test-list").classList.remove("hidden-block");
  document.getElementById("result-table").classList.add("hidden-block");
}

function generateResultTable(){
  fetch('/results')
		.then(response => response.json())
		.then(data => {
      //fill in the table
      document.getElementById("result-table-body").innerHTML = "";
      for (let i = 0; i < data.length; i++){

        let result = data[i].correct_answers - data[i].wrong_answers;
        let filledTime = data[i].filled_time;

        document.getElementById("result-table-body").innerHTML +=`
        <tr>
          <th scope="row">${data[i].student_group_name}</th>
          <td>${data[i].student_name}</td>
          <td>${data[i].questionnaire_name}</td>
          <td>${filledTime}</td>
          <td>${result}</td>

        </tr>
        `

        console.log(data[i].filled_time);
      }
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

window.addEventListener("load", (event) => {
  fetch('/tests')
		.then(response => response.json())
		.then(data => {
      questionnarieList = data;
      generateTestList(data);
      
		})
		.catch((error) => {
			console.error('Error:', error);
		});
  
  document.getElementById("test").classList.add("hidden-block");
  document.getElementById("button-finish").classList.add("hidden-block");
  document.getElementById("result-table").classList.add("hidden-block");
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
    .getElementById("test-list-table")
    .addEventListener("click", handlerClickToQuestionnaireRow)
  document
    .getElementById("name-surname")
    .addEventListener("input", updateNameSurname);
  document
    .getElementById("group")
    .addEventListener("input", updateGroup);
  document
    .getElementById("result-button")
    .addEventListener("click", resultButtonHandler);
  document
    .getElementById("back-to-test-list")
    .addEventListener("click", backToTestListButtonHandler);
});

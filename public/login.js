"use strict";
let questionId = 0; 

function validityCheck(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username == "" || password == ""){
        invalidData();
        return false; 
    }
    else{
        return true;
    }
}

function invalidData(){
    document.getElementById("name-label").innerText = "Vyplň správné jméno!";
    document.getElementById("password-label").innerText = "Vyplň správné heslo!";
}

function succesfulLogin(){
  document.getElementById("login-form").classList.add("hidden-block");
  document.getElementById("result-table").classList.remove("hidden-block");
}

function sendLoginInfo(){

    if (validityCheck()) {
        let request = {};
        request.username = document.getElementById("username").value;
        request.password = document.getElementById("password").value;

        fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data == "incorrect password"){
              invalidData();
            }
            else{
              succesfulLogin();
              generateResultTable(data);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        console.log("login request sent!");
    }
}

function generateResultTable(data){
      document.getElementById("result-table-body").innerHTML = "";
      for (let i = 0; i <= data.length - 1; i++){

        let result = data[i].correct_answers - data[i].wrong_answers;
        let filledTime = new Date(Date.parse(data[i].filled_time + "Z"));

        document.getElementById("result-table-body").innerHTML +=`
        <tr>
          <th scope="row">${data[i].student_group_name}</th>
          <td>${data[i].student_name}</td>
          <td>${data[i].questionnaire_name}</td>
          <td>${filledTime.toLocaleDateString() + " " + filledTime.toLocaleTimeString()}</td>
          <td>${result} bodů</td>

        </tr>
        `
      }
}

function homeRedirectButtonHandler(){
  window.location.href = "/index.html";
}

window.addEventListener("load", (event) => {
    document.getElementById("result-table")
    .classList.add("hidden-block");
    document.getElementById("login-button")
    .addEventListener("click", sendLoginInfo);
    document.getElementById("home-redirect-button")
    .addEventListener("click", homeRedirectButtonHandler);
});
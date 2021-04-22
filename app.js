const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const fs = require("fs")
const path = require("path");
const db = require("better-sqlite3")("db/TestDatabase.db");



app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static('public'))

app.get('/data',function(req,res){ //sends questionnaire data from databse to user
  let questionnaire_id = req.query.questionnaire_id;
  let questions = [];
  questions = db.prepare(`SELECT question_content, question_id FROM question WHERE questionnaire_id = ${questionnaire_id}`).all();
  let startingQuestionId = db.prepare(`SELECT question_id FROM question WHERE questionnaire_id = ${questionnaire_id} LIMIT 1`).get().question_id; 
  let questionsIndex = 0;
  for (i = startingQuestionId; i < questions.length + startingQuestionId; i++) { 
    questions[questionsIndex].answers = db.prepare(`SELECT answer_id, content FROM question INNER JOIN answer on answer.question_id = question.question_id WHERE questionnaire_id = ${questionnaire_id} AND	question.question_id = ${i}`).all();
    questionsIndex++;
  }
  res.json(questions);
});

app.get('/tests',function(req,res){ //sends questionnaire list to user
  let row = db.prepare('SELECT questionnaire_id, name, description FROM questionnaire').all();
  res.json(row);
});

app.get('/results',function(req,res){ //sends results to user
  let row = db.prepare(`select 
	sg.name as student_group_name, 
	s.name as student_name,  
	qe.name as questionnaire_name, 
	fq.filled_time,
	SUM(
		CASE
		     WHEN r.answer_id IS NOT NULL and a.correctness = 1 THEN 1
			ELSE 0
		END
	) as correct_answers,
	SUM(
		CASE
		     WHEN r.answer_id IS NOT NULL and a.correctness = 0 THEN 1
			ELSE 0
		END
	) as wrong_answers,
	count(*) as all_answers
	from filled_questionnaire fq
		inner join  questionnaire qe
			on fq.questionnaire_id = qe.questionnaire_id
		inner join  question q
			on fq.questionnaire_id = q.questionnaire_id
		inner join answer a
			on q.question_id = a.question_id
		inner join student s
			on fq.student_id = s.student_id
		inner join student_group sg
			on sg.student_group_id = s.student_group_id
		left join result r
			on fq.filled_questionnaire_id = r.filled_questionnaire_id
				and a.answer_id = r.answer_id
	GROUP BY 
		sg.name,
		s.name,
		qe.name,
		fq.filled_time;`).all();
  res.json(row);
});



app.post('/data', function(req,res)
  {
    let receivedAnswers = req.body.answers;
    let correctAnswers = [];
    let pointsIfRight = 2;
    let pointsIfWrong = 1;
    let recievedPoints = 0;
    let maxPoints = 0;
    let Result = 0;
    let questionsIndex = 0;
    let insertInfo;

    console.log(req.body);
       
    let studentGroupRow = db.prepare(`SELECT student_group_id FROM student_group WHERE name = ?`)
	  .get(req.body.group);
    insertInfo = db.prepare("INSERT INTO student (name, student_group_id) VALUES (?,?)")
	  .run(req.body.nameSurname, studentGroupRow.student_group_id);
    let studentRow = db.prepare(`SELECT * FROM student WHERE rowid = ?`)
	  .get(insertInfo.lastInsertRowid);
    insertInfo = db.prepare("INSERT INTO filled_questionnaire (student_id, questionnaire_id) VALUES (?,?)")
	  .run(studentRow.student_id, req.body.questionnaireWorkedOn);
    let filledQuestionnaireRow = db.prepare(`SELECT * FROM filled_questionnaire WHERE rowid = ?`)
	  .get(insertInfo.lastInsertRowid);

    let stmt = db.prepare("INSERT INTO result (filled_questionnaire_id, student_id, answer_id) VALUES (?,?,?)");

    Object.keys(req.body.answers).forEach(answer_id => {
	if ( req.body.answers[answer_id] ) {
		stmt.run(filledQuestionnaireRow.filled_questionnaire_id, studentRow.student_id, answer_id);
	}
    });

	correctAnswers = db.prepare(`SELECT a.answer_id, a.correctness
		FROM question q
			INNER JOIN answer a
				on q.question_id = a.question_id
		WHERE q.questionnaire_id = ?
	`).all(req.body.questionnaireWorkedOn).reduce((acc, row) => {
		acc[String(row.answer_id)] = Boolean(row.correctness);
		return acc;
	}, {});

    //geets correct answers from database
	  /*
    let startingQuestionId = db.prepare(`SELECT question_id FROM question WHERE questionnaire_id = ${req.body.questionnaireWorkedOn} LIMIT 1`).get().question_id;
    for (i = startingQuestionId; i < req.body.answers.length + startingQuestionId; i++){
      correctAnswers[questionsIndex++] = db.prepare(`SELECT correctness FROM question INNER JOIN answer on answer.question_id = question.question_id WHERE questionnaire_id = ${req.body.questionnaireWorkedOn} AND	question.question_id = ${i}`).all();
      questionsIndex;
    }

    //compares answers from user to correct answers
    for (i = 0; i < receivedAnswers.length; i++){
      for (j = 0; j < receivedAnswers[i].length; j++){
        if (correctAnswers[i][j].correctness == 1){
          maxPoints += pointsIfRight;
          if (Boolean(receivedAnswers[i][j])){
            recievedPoints += pointsIfRight;
          }
        }
        else if (Boolean(receivedAnswers[i][j]) == true) {
          recievedPoints -= pointsIfWrong;
        }
      }
    }

    if (recievedPoints >= 0){
      Result = recievedPoints/maxPoints;
    }
    else{
      Result = recievedPoints;
    }
    */

    res.json(correctAnswers);
  }
)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

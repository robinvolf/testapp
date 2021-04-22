DROP TABLE questionnaire;
DROP TABLE question;
DROP TABLE answer;
DROP TABLE student_group;
DROP TABLE student;
DROP TABLE result;
DROP TABLE filled_questionnaire;

CREATE TABLE questionnaire (
	questionnaire_id integer PRIMARY KEY AUTOINCREMENT,
	name text NOT NULL UNIQUE,
	description text
);

CREATE TABLE question (
	question_id integer PRIMARY KEY,
	questionnaire_id integer,
	question_content text NOT NULL,
	FOREIGN KEY(questionnaire_id) REFERENCES questionnaire(questionnaire_id)
);

CREATE TABLE answer (
	answer_id integer PRIMARY KEY,
	question_id integer,
	content text NOT NULL,
	correctness BOOLEAN NOT NULL,
	FOREIGN KEY(question_id) REFERENCES question(question_id)
);

CREATE TABLE student_group (
	student_group_id integer PRIMARY KEY,
	name text NOT NULL
);

CREATE TABLE student (
	student_id integer PRIMARY KEY,
  student_group_id integer NOT NULL,
	name text NOT NULL,	
  FOREIGN KEY(student_group_id) REFERENCES student_group(student_group_id)
);

CREATE TABLE filled_questionnaire (
	filled_questionnaire_id integer PRIMARY KEY,
	student_id integer,
	questionnaire_id integer NOT NULL,
	filled_time datetime DEFAULT current_timestamp,
	FOREIGN KEY(student_id) REFERENCES student(student_id),
	FOREIGN KEY(questionnaire_id) REFERENCES questionnaire(questionnaire_id)
);

CREATE TABLE result (
	filled_questionnaire_id  integer,
	student_id integer,
	answer_id integer NOT NULL,
	PRIMARY KEY(filled_questionnaire_id, student_id, answer_id),
	FOREIGN KEY(student_id) REFERENCES student(student_id),
	FOREIGN KEY(answer_id) REFERENCES answer(answer_id)
	FOREIGN KEY(filled_questionnaire_id) REFERENCES filled_questionnaire(filled_questionnaire_id)
);

INSERT INTO student_group (
  name
)
VALUES(
  '4.A'
);

INSERT INTO student_group (
  name
)
VALUES(
  '4.B'
);

INSERT INTO student_group (
  name
)
VALUES(
  '4.C'
);

INSERT INTO student_group (
  name
)
VALUES(
  '4.D'
);


INSERT INTO questionnaire (
	name,
	description
) VALUES(
	'Násobilka', 
	'Zvládne to každý průměrně vzdělaný gymplák!'
);

INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Kolik je 5x3?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '15',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '4',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '16',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '7',
  0
);



INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Co krát co je 20?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '5 x 4',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '6 x 4',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '4 x 5',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '20 x 1',
  1
);



INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Kolik je 20 x 5?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '140',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '210',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '100',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '69',
  0
);



INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Co krát co je 12?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '2 x 6',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '3 x 4',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '12 x 1',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  '(5 +1) x 2',
  1
);

/*
TEST 2
*/

INSERT INTO questionnaire (
	name,
	description
) VALUES(
	'Iure voluptas animi modi.', 
	'Minus voluptate nam eaque beatae et esse. Eos voluptas fuga sit accusantium consequatur dolores excepturi vel. Id consequuntur deserunt quo.'
);

INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Cum amet quod harum est et quos fugit enim?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Ut in non mollitia nostrum',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Optio et aspernatur ducimus',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Perspiciatis totam hic eos eos quod quia quibusdam voluptate.',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Aliquam ut ducimus suscipit pariatur in adipisci qui.',
  1
);



INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Harum quibusdam repudiandae praesentium consectetur?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Distinctio asperiores adipisci autem eaque error rem vero',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Optio et aspernatur ducimus',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Eum possimus velit laborum ut sequi',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Architecto autem qui repudiandae ducimus temporibus',
  0
);



INSERT INTO question (
	questionnaire_id,
	question_content
) VALUES(
	(select max(questionnaire_id) from questionnaire),
	'Ut itaque itaque deserunt non eum?'
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Qui quis eum sit enim dolorem id et.',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Magni esse laboriosam consequatur nulla nihil qui et et.',
  0
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Sit sed eum natus sed labore reprehenderit voluptatum ea',
  1
);

INSERT INTO answer (
	question_id,
	content,
  correctness
) VALUES(
	(select max(question_id) from question),
  'Totam facere tenetur et.',
  1
);

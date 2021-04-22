select 
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
	GRoUP BY 
		sg.name,
		s.name,
		qe.name,
		fq.filled_time;

var Question = require('../model_data/Question_data.js');

var question = {
	insert_question : function (req,res){
		var question = req.body.question;
		var username = req.body.username;

		if(question &&  question !== 'undefined' && username && username!=='undefined'){
			var question_save = new Question({
				username : username,
				question : question
			});

			question_save.save(function (err,callback){
				if(err) return console.error(err);

				res.send('question_inserted');

				
			});
		} else{
			res.send('no data question');
		}
	},

	show_question : function (req,res){
		Question.find({}, function(err,questions){
			if(err) return console.error(err);

			var question_map = {};
			questions.forEach(function (question){
				question_map[question.username] = question;
			});

			console.log(question_map);
			res.send(question_map);


		});
	}
}

module.exports = question;
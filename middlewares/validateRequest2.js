var jwt = require('jsonwebtoken');
var checkUser = require('../routes/login').validateUser;
var secret = require('../config/databaseConfig.js').secret
var User = require('../model_data/User.js');

module.exports = function (req,res,next){

	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	console.log("token "+token);
	var uidUser = (req.body && req.body.uidUser) || (req.query && req.query.uidUser) || req.headers['uidUser'];
	if(token){
		try{
			// verifies secret and checks exp
			jwt.verify(token, secret, function(err, decoded) {			
				if (err) {
					res.json({
						status : "not_ok",
						result : "token error"
					});
					return;
				} else {
					// if everything is good, save to request for use in other routes
					// req.decoded = decoded;
					if (decoded <= Date.now()) {
						res.status(400);
						res.json({
							status: 'not_ok',
							result: "Token Expired"
						});
						return;
					} else{
						//checcking user if exist
						User.findOne({email : uidUser}, function (err,user){
							if(err){
								res.json({
									status: 'not_ok',
									result: "Error query"
								});
								return;
							}else{
								console.log("user exist");
								next();
							}
						});	

					}

					


					// var user = checkUser(uidUser);
					// console.log(checkUser(uidUser));
					// console.log("email "+uidUser);
					// if(user){
					// 	next();
					// }else{
					// 	res.json({
					// 		status : "not_ok",
					// 		result : "invalid user"
					// 	});
					// 	return;
					// }

				}
			});

			// var decoded = jwt.verify(token, secret);
			// if (decoded <= Date.now()) {
			// 	res.status(400);
			// 	res.json({
			// 		status: 'not_ok',
			// 		result: "Token Expired"
			// 	});
			// 	return;
			// }

			// //here uidUser is email checking user from database
			// var user = checkUser(uidUser);
			// if(user){
			// 	next();
			// }else{
			// 	res.json({
			// 		status : "not_ok",
			// 		result : "invalid uesr"
			// 	});
			// 	return;
			// }

		}catch(err){
			res.json({
				status : "not_ok",
				result : "verify Error" + err
			});
			return;
		}
	}else{
		res.json({
			status : "not_ok",
			result : "empty token"
		});
		return;
	}
}
var User = require('../model_data/User.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var secret = require('../config/databaseConfig.js').secret

var login = {
	loginUser : function(req,res){
		var username = req.body.username;
    var password = req.body.passwordBrow;
    var email = req.body.email;

    	if(username && password && username !== 'undefined' && password !== 'undefined'){
    		User.findOne({email : email}, function (err,user){
    			if(err){
    				res.json({
    					status : "not_ok",
    					result : "Error Query"
    				});
    			}else{
    	// 			var token = jwt.sign(user, require('../config/secret.js'), {
					// 	// expiresInMinutes: 1440 // expires in 24 hours
					// 	expiresInMinutes: 1 // expires in 1 minute
					// });

            if(!user){
              //user not found
              res.json({
                status : "not_ok",
                result : "User Not Found"
              });

            }else{
              //check passsword in databass using bcrypt

              if(bcrypt.compareSync(password,user.password)){
                var token  = genToken();
                res.json({
                  status : "ok",
                  result : "success",
                  token  : token
                });
              } else{
                res.json({
                  status : "not_ok",
                  result : "Failed Generete token",
                  token  : "null"
                });
              }

            }
    			}
    		});

    	} else{
    		res.json({
    			status : "not_ok",
    			result : "empty_data"
    		});
    	}
	},

validateUser : function (email){

  var userResult;
		User.findOne({email : email},function (err,user){
			if(err){
				return false;
			}else{
        if(user){
          return true;
        }else{
          return false;  
        }
				
			}
		});

    return userResult;
	}
};

// private method
function genToken() {
  var expires = expiresIn(1); // 7 days
  // var token = jwt.encode({
  //   exp: expires
  // }, require('../config/secret')());
	// var token  = jwt.sign({exp : expires},require('../config/secret'));
  var token  = jwt.sign(expires,secret);
  return token;
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = login;


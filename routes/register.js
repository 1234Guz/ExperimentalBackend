// var userRegister = require('../model_data/UserRegister.js');
var User  = require('../model_data/User');
var bcrypt = require('bcrypt');


var register = {
	registerUser :  function (req,res){
		var username = req.body.username;
    	var password = req.body.passwordBrow;
        var email = req.body.email;

        console

    	if(username && password && email && username  !== 'undefined' && password !== 'undefined' && email!=='undefined'){
    		//encryp password
    		bcrypt.genSalt(10, function(err, salt) {
   				bcrypt.hash(password, salt, function(err, hash) {
        			// Store hash in your password DB.
        			if(err) return console.log("Error encrypt = "+err);
        			//init data
		    		var userSave = new User({
		    			username : username,
		    			email : email,
                        password : hash
                        
		    		});

                    User.findOne({email : email},function (err,user){
                        if(err){
                            console.error(err);
                            res.json({
                                status : "not_ok",
                                result : "Error query" 
                            });
                        }else{
                            if(!user){
                                //user not found saving to mongodb
                                userSave.save(function (err,callback){
                                    if (err){
                                        res.send('Failed to Register');
                                        console.error(err); 

                                    } else{
                                        res.send({
                                            result : 'data_user_inserted',
                                            status : "ok"
                                        });
                                        console.log("data_user_inserted");  
                                    } 
                            
                                });
                            }else{
                                res.json({
                                    status : "not_ok",
                                    result : "User already registered" 
                                });
                                console.log("User already registered"); 
                            }
                            
                        }
                    });

		    		
    			});
			});

    	}else{
    		res.send({
                status : "not_ok",
                result : "none"
            });
    		console.log('username and password are null');
    	}
	},

	registerFacebook : function(req,res){
		var firstName = req.body.firstName || '';
		var lastName = req.body.lastName || '';
		var gcmID = req.body.gmcID || '';
    	var password = req.body.password || '';
    	var userID = req.body.userID || '';
    	var provider = req.body.provider || '';

    	if(firstName=='' || lastName=='' || gcmID=='' || userID=='' ||provider==''){
    		res.json({
    			"result" : "no_result",
    			"status" : "invalid_data"
    		});
    	} else{

    		var user = new User({
		    			firstName : firstName,
		    			lastName : lastName,
		    			gcmID : gcmID,
		    			userID : userID,
		    			provider : provider
		    		});
    		user.save(function (err,callback){
    			if(err){
    				res.json({
    					"result" : "Failed Save User",
    					"status" : "not_ok"
    				});
    			}else{
    				res.json({
    					"result" : "Success Save User",
    					"status" : "ok",
    					"token" : "token here"
    				});
    			}

    		});
    	}


	}
};


module.exports = register;
var fs = require('fs');


var upload = {
	uploadFile : function (req, res){
		console.log(req.files.image.originalFilename);
		console.log(req.files.image.path);
		fs.readFile(req.files.image.path, function (err, data){
			var dirname = "./";
			var newPath = dirname + "/images/" + 	req.files.image.originalFilename;
			fs.writeFile(newPath, data, function (err) {
				if(err){
					res.json({'response':"Error"});
				}else {
					res.json({'response':"http://128.199.191.171:8080/api/v1/getImage/" + 	req.files.image.originalFilename});		  
				}
			});	
		});
	},


	getImage : function (req,res){
		file = req.params.file;
		var dirname = "./";

		var img = fs.readFile(dirname+"/images/"+file, function (err,dataImage){
			if(err){
				res.json({'response' : "Error"});
			} else{
				res.writeHead(200, {'Content-Type': 'image/jpg' });
				res.end(dataImage, 'binary');
			}
		});
	}
}

module.exports = upload;
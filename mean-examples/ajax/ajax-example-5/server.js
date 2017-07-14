var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
//need this to do async file uploads
var multer = require('multer');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//NOTE: This example is based off the multer documentation but I wanted to make
//it clear that you can also do 
//app.use(multer({ dest: 'uploads/' }).single('file'));
//Then yo do not have to add the function at the post route you could write
//app.post('/ajax5', function(req,res){...});

//Here I check to make sure the file extension is a .pdf before it is sent to the server
//this is a preliminary check but not perfectly secure
var upload = multer({
	dest: 'public/files',
  	fileFilter: function (req, file, cb) {
	    if (file.originalname.slice(-4) !== '.pdf') {
	      
	    //The return will terminate the function thus the other (cb(null, true)) will not be called
	      return cb(new Error('Only pdfs are allowed'+file.originalname.slice(-4)))
	    }

    cb(null, true)
  }
});




app.get('/', function(req, res){
	res.sendFile('ajax5.html',{root: './views'});
});

//Here we take some JSON, parse it, display the list of names and send it back
app.post('/ajax5', upload.single('file'), function(req,res){
	
	//Check the file mimtype to make sure it is a pdf file.  If it is then it renames the file and saves it
	//if not it removes it.
	if(req.file.mimetype === 'application/pdf'){
		var mainPath = '/web230/mean-examples/ajax/ajax-example-5/public/files/'
			//multer does not automatically assign the file extension which can cause problems.
			//when viewing pdf files.  To do that we have to rename the file.
			fs.rename(mainPath + req.file.filename, mainPath + req.file.filename + '.pdf', function (err) {
				  if (err) {
				  	console.log(err)
				  }
				  else{
				  	console.log(req.file.filename)
					console.log(req.body.data)
					var output  = '<p>The file is located at public/files/' + req.file.filename + '.pdf, and the file name is ' + req.body.data + '</p>';
					res.send(output);
				  }
			 });
	}
	else{
		fs.unlink(mainPath.req.file.filename, function(err){
			if(err){
				console.log(err)
			}
			else{
				res.send('<p>File must be a pdf file');
			}
		})
	}
	
	
});

app.listen(3000);

console.log("Running at Port 3000");

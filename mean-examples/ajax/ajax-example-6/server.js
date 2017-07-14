var express = require("express");
var request = require('request');
var bodyParser = require('body-parser');
//need this to do async file uploads
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/', function(req, res){
	res.sendFile('ajax6.html',{root:'./views'});
});

app.post('/rest',function(req, res){
	console.log(req.body.data)
	//using the request module to send a request for the EMU news data
	request(req.body.data, function (error, response, body) {
	  if (!error && response.statusCode === 200) {
	    res.send(body);
	  }
	});
});

app.listen(3000);

console.log("Running at Port 3000");

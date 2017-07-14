var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('ajax4.html',{root: './views'});
});

//Here we take some JSON, parse it, display the list of names and send it back
app.post('/ajax4',function(req,res){
	//parse the json string back into an object
	var data = JSON.parse(req.body.data)
	var len = data.employees.length;
	var output = '<ul>';
	var i = 0;
	while(i < len){
		//parse the information form the object and send it back.
		output += '<li>' + data.employees[i].firstName + ' ' + data.employees[i].lastName + '</li>';
		i++;
	}
	output += '</ul>';
	res.send(output);
});

app.listen(3000);

console.log("Running at Port 3000");

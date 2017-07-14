var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('ajax3.html',{root:'./views'});
});

//here we take the values sent to us and redisplay it.
app.post('/ajax3',function(req,res){
	var dataArr = req.body.data.split('^^');
	res.send(dataArr[0] + ' ' + dataArr[1]);
});

app.listen(3000);

console.log("Running at Port 3000");

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile('ajax2.html',{root: './views'});
});

//here we take the values sent to us and redisplay it.
app.post('/ajax2',function(req,res){
	res.send(req.body.data)
});

app.listen(3000);

console.log("Running at Port 3000");

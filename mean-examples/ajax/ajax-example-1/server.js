var express = require("express");
var app = express();
//My JavaScript files are in a public folder so I set the this to static so they can be sent.
//this is similar to setting an html file to root in the route except that it is global.  In 
//future lessons we will see better ways of setting this up.
app.use(express.static('public'));


app.get('/', function(req, res){
	res.sendFile('ajax1.html',{root: './views'});
});

//Because we are just doing a simple ajax call and not sending any data
//we use get instead of post.
app.get('/ajax1',function(req,res){
	res.send('<p>Hello, you just made a successful ajax call</p><p>This test was not sent over when the page was first requested. Instead the page was requested and sent. Once loaded it fired the AJAX call back to the server where it retrieved this data.')
});

app.listen(3000);

console.log("Running at Port 3000");

/* SET UP YOUR MAIN VARIABLES */
var express = require('express'),
	config = require('./server/configure'),
	app = express(),
	https = require('https'),
	http = require('http'),
	fs = require('fs'),
	options = {
		key: fs.readFileSync('key.pem'),
		cert: fs.readFileSync('cert.pem')
	};
	
/* CALL THE MODULE.EXPORTS CONSTRUCTOR FUNCTION OF THE CONFIGURE FILE THIS ADDS TO APP AND RETURNS APP
THIS IS DONE SO WE DO NOT HAVE TO WRITE A BUNCH OF CODE IN OUR INDEX FILE. */
app = config(app);

/* SET THE PORT */
app.set('port',process.env.PORT || 3000);

/* MAKE THE VIEWS DIRECTORY SO WE CAN SERVE UP THE FILES WITHIN THAT DIRECTORY */
app.set('views', __dirname + '/views');

/* THIS IS WHERE WE SET UP THE HTTPS*/
https.createServer(options, app).listen(app.get('port'),function(){
	console.log('cpbuild10.0 Server up...');
});
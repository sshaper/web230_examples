/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	exphbs = require('express-handlebars'),
	express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	
module.exports = function(app){
	/*SET UP BODYPARSER	*/
	app.use(bodyParser.urlencoded({'extended':false}));

	/*SET UP THE SESSION*/
	app.use(session({
	  secret: 'thisisasecret',
	  resave: false,
	  saveUninitialized: false
	}));
	
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

	/* MAKE THE PUBLIC FOLDER STATIC SO WE CAN GET AND USE OUR JS, CSS, ETC FILES */
	app.use('/public/', express.static(path.join(__dirname,'../public')));

	/* SET UP HANDLEBARS AS YOUR TEMPLATE ENGINE */
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialDir: app.get('views') + '/partials',
	}).engine);
	app.set('view engine','handlebars');

	/* RETURN APP */
	return app;
};
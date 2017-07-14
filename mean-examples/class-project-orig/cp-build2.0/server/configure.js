/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	exphbs = require('express-handlebars'),
	express = require('express')

module.exports = function(app){
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

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
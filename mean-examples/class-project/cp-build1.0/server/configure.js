/* PULL IN THE DEPENDENCIES */
var routes = require('./routes');

module.exports = function(app){
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

	/* RETURN APP */
	return app;
};
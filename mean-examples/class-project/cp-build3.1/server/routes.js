/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	home = require('../controllers/user/home');
	
module.exports = function(app){
	/* USER ROUTES */
	router.get('/', home.index);
	router.get('/user/testForm', home.getTestForm);
	router.post('/user/postTestForm', home.postTestForm);
	app.use(router);
}

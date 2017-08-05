var express = require('express'),
	router = express.Router(),
	home = require('../controllers/user/home');
	
module.exports = function(app){
	/* USER ROUTES */
	router.get('/', home.index);
	router.get('/getpage', home.getpage);
	router.get('/getexample', home.getexample);
	router.get('/getjsonpage', home.getjsonpage);
	router.get('/getjson', home.getjson);
	router.get('/getxmlpage', home.getxmlpage);
	router.get('/getxml', home.getxml);
	router.get('/postpage', home.postpage);

	router.post('/post',home.post);
	app.use(router);
}

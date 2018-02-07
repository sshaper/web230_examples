var express = require('express'),
	multer = require('multer'),
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
	router.get('/postfileform', home.postfileform);

	router.post('/post',home.post);
	router.post('/postfile', multer({dest:'./tmp'}).single('file'), home.postfile)
	

	app.use(router);
}

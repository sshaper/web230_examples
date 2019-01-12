"use strict";
/* PULL IN OUR DEPENDENCIES */
let express = require('express'),
	router = express.Router(),
	multer = require('multer'),
	fetch = require('../controllers/fetch.js'),
	pages = require('../controllers/pages.js')
		

module.exports = function(app){
	
	router.get('/', pages.homePage);
	router.get('/simpleGetObjectPage', pages.simpleGetObjectPage);
	router.get('/simpleGetTextPage', pages.simpleGetTextPage);
	router.get('/simpleGetJsonPage', pages.simpleGetJsonPage);
	router.get('/simplePostJsonPage', pages.simplePostJsonPage);
	router.get('/formDataObjectPage', pages.formDataObjectPage);
	router.get('/uploadFilePage', pages.uploadFilePage);

	/*I CAN CALL SIMPLEGETTEXT BECAUSE I WILL JUST RETURN THE OBJECT NO NEED FOR A SECOND METHOD.*/
	router.get('/simpleGetObject', fetch.simpleGetText);
	router.get('/simpleGetText', fetch.simpleGetText);
	router.get('/simpleGetJson', fetch.simpleGetJson);

	router.post('/simplePostJson', fetch.simplePostJson);
	router.post('/formDataObj', multer().none(), fetch.formDataObj);
	router.post('/uploadFile', multer({dest: './public/uploads/'}).single('selectedFile'), fetch.uploadFile);
	

	app.use(router);
}

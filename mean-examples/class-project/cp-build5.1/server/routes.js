/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	login = require('../controllers/user/login')
	admin = require('../controllers/admin/home');
	crud = require('../controllers/user/crud');

module.exports = function(app){
	/* USER ROUTES */
	router.get('/user/', home.index);
	router.get('/user/about', home.about);
	router.get('/user/login', login.index);
	router.post('/user/login', login.access);

	/* ADMIN ROUTES */
	router.get('/admin/', admin.index);
	router.get('/admin/about', admin.about);
	router.get('/admin/logout', login.logout);

	/* MONGOOSE CRUD ROUTES */
	router.get('/user/shownames',crud.shownames);
	router.get('/user/addnameform',crud.addnameform);
	router.get('/user/updatenames',crud.updatenameslist);
	router.get('/user/deletenames',crud.deletenameslist);
	router.post('/user/addname',crud.addname);
	router.post('/user/updatenames',crud.updatenames);
	router.post('/user/deletenames',crud.deletenames);


	app.use(router);
}

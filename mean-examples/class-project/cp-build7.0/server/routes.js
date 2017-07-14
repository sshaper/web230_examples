/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	login = require('../controllers/user/login');
	admin = require('../controllers/admin/home');
	adddoc = require('../controllers/admin/adddoc');
	multer = require('multer');

module.exports = function(app){
	/* USER ROUTES */
	router.get('/user/', home.index);
	router.get('/user/about', home.about);
	router.get('/user/login', login.index);
	router.post('/user/login', login.access);

	/* ADMIN ROUTES */
	router.get('/admin/', admin.index);
	router.get('/admin/about/', admin.about);
	router.get('/admin/logout/', login.logout);
	router.get('/admin/adddoc/', adddoc.index);
	
	router.post('/admin/', admin.postindex);
	router.post('/admin/about/', admin.postabout);
	/* ADDED MULTER TO THE FOLLOWING POST BECAUSE IT WILL BE DOING THE FILE UPLOADS*/
	router.post('/admin/adddoc/',multer({dest:'./public/docs'}).single('file'),adddoc.addDoc);

	app.use(router);
}

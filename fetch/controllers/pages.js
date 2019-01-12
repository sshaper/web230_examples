"use strict";

module.exports = {
	homePage(req, res){
		res.render('pages/home',{title: "home page", nav: true, heading: "Home Page"});
	},
	simpleGetObjectPage(req, res){
		res.render('pages/simpleGetObject',{title: "simple get object page", nav: true, heading: "Simple Get Object Page"});
	},
	simpleGetTextPage(req, res){
		res.render('pages/simpleGetText',{title: "simple get text page", nav: true, heading: "Simple Get Text Page"});
	},
	simpleGetJsonPage(req, res){
		res.render('pages/simpleGetJSON',{title: "simple get JSON page", nav: true, heading: "Simple Get JSON Page"});
	},
	simplePostJsonPage(req, res){
		res.render('pages/simplePostJSON',{title: "simple post JSON page", nav: true, heading: "Simple Post JSON Page"});
	},
	formDataObjectPage(req, res){
		res.render('pages/formDataObject',{title: "form data object page", nav: true, heading: "From Data Object Page"});
	},
	uploadFilePage(req, res){
		res.render('pages/uploadFile',{title: "upload file page", nav: true, heading: "Upload File Page"});
	}

}
"use strict";

module.exports = {
	simpleGetText(req, res){
		res.send('Hello Class');
	},
	simpleGetJson(req, res){
		let obj = {"name":"Scott Shaper","age": 21}
		res.send(JSON.stringify(obj));
	},
	simplePostJson(req, res){
		let data = req.body;
		res.send(JSON.stringify(data));
	},
	formDataObj(req, res){
		let data = req.body;
		res.send(JSON.stringify(data));
	},
	uploadFile(req, res){
		let obj = {text: req.body, file: req.file};
		res.send(JSON.stringify(obj));
	}

}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var namesSchema = new Schema({
	fname: String,
	lname: String,
	email: String},
	{collection: 'names'});

module.exports = mongoose.model('Names', namesSchema);
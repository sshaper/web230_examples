var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
	name: String,
	text: String},
	{collection: 'content'});

module.exports = mongoose.model('Content', contentSchema);
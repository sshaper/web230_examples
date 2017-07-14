var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
	fileName: String,
	filePath: String},
	{collection: 'document'});

module.exports = mongoose.model('Document', documentSchema);
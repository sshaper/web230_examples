var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	username: String,
	password: String},
	{collection: 'admin'});

module.exports = mongoose.model('Admin', adminSchema);
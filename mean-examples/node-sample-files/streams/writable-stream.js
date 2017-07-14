var stream = require('stream');
var util = require('util');
util.inherits(Writer, stream.Writable);

function Writer(opt){
	stream.Writable.call(this, opt);
	this.data = [];
};

Writer.prototype._write = function(data, encoding, callback){
	this.data.push(data.toString('utf-8'));
	console.log("Adding: " + data);
	callback();
};

var w = new Writer();
for(var i = 1; i <= 5; i++){
	w.write("Item" + i, 'utf-8');
}
w.end("ItemLast");
console.log(w.data);
//create custom Readable stream object
var stream = require('stream');
var util = require('util');

//inherit the util module
util.inherits(Answers, stream.Readable);

function Answers(opt){
	stream.Readable.call(this, opt);
	this.quotes = ["yes", "no", "maybe"];
	this.i = 0;
	this.len = this.quotes.length;
};

Answers.prototype._read = function(){
	if (this.i > this.len){
		this.push(null);
	}
	else{
		this.push(this.quotes[this.i]);
		this.i += 1;
	}
};

var r = new Answers();
console.log("Direct Read: " + r.read().toString());

// The Jquery on() method attaches one or more event handlers for the selected elements and child elements.
// Node.js uses Jquery lite that is how some Jquery gets mixed into Node.js

//The data event turns this into a flowing mode thus the data handler is called continuously until all data has been drained.
r.on('data', function(data){
	console.log("Callback read: " + data.toString());
});

r.on('end', function(data){
	console.log("No more answers.");
});
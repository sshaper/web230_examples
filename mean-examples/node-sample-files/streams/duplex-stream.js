var stream = require('stream');
var util = require('util');
util.inherits(Duplexer, stream.Duplex);

function Duplexer(opt){
	stream.Duplex.call(this, opt);
	this.data = []
};

Duplexer.prototype._read = function readItem(size){
	var chunk = this.data.shift();
	if(chunk == "stop"){
		this.push(null)
	}
	else{
		this.push(chunk);
	}
};

Duplexer.prototype._write = function (data, encoding, callback){
	this.data.push(data);
	callback();
};

var d = new Duplexer();

d.on('data', function(chunk){
	console.log('read: ' + chunk.toString());
});

d.on('end', function(){
	console.log('message complete');
});

d.write("I ");
d.write("think ");
d.write("Node.js ");
d.write("is ");
d.write("cool");
d.write("stop");
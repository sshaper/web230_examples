//create custom Readable stream object
var stream = require('stream');
var util = require('util');

//need to require the file system object we will look into this later
var fs = require('fs');
var ws = fs.createWriteStream("stream-out.txt");

//inherit the util module
util.inherits(someText, stream.Readable);

function someText(opt){
	stream.Readable.call(this, opt);
	this.txt = "This_is_a_chunk_of_data_the_underscores_are shown_to_indicate_the_spaces_instead_of_blanks.";
    this.i = 0;
	this.len = this.txt.length - 1;
};

someText.prototype._read = function(){
	if (this.i > this.len){
		this.push(null);
	}
	else{
		this.push(this.txt[this.i]);
		this.i += 1;
	}
};

var r = new someText();

// The Jquery on() method attaches one or more event handlers for the selected elements and child elements.
// Node.js uses Jquery lite that is how some Jquery gets mixed into Node.js

r.on('readable', function(){
	var chunk;
	//loops through the chunk of text 5 bytes at a time.
	while (null !== (chunk = r.read(5))) {
    	console.log('got %d bytes of data', chunk.length);
    	console.log(chunk.toString());
  	}
});

//add the pipe here
r.pipe(ws, { end: false });
r.on('end', function() {
  ws.end('\n...End Write File...\n');
  console.log('file written')
});
// I open the file and callback an error and a file. The fd variable
// is the file descriptor.  It does not have to be fd
var fs = require('fs');

function readFile(fd, txt){
	//reads in 100 bytes at a time.
	var buf = new Buffer(100);
	buf.fill();
	fs.read(fd, buf, 0, 100, null, function(err, bytes, data){
		if (err){
			console.log(err);
		}
		else if (bytes > 0){
			console.log("Read %d bytes", bytes);
			txt += data;
			//using a recursive function here
			readFile(fd, txt);
		}
		else{
			fs.close(fd);
			console.log(txt)
		}
	});
}

fs.open('sample.txt', 'r', function(err, fd){
	readFile(fd, '');
});
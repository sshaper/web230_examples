// I open the file and callback an error and a file. The fd variable
// is the file descriptor.  It does not have to be fd
var fs = require('fs');

//To clear a file just write an empty string to it.
fs.writeFile('sample.txt','',function(err){
	if (err){
		console.log("There was a problem writing to this file");
	}
	else{
		console.log('File Cleared');
	}
});
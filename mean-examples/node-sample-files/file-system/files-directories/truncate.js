var fs = require('fs');
fs.truncate('../read-write-files/sample.txt', 500, function(err){
	if (err){
		console.log(err);
	}
	else{
		console.log('File truncated')
	}
})
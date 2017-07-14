// In this example I create multiple directories.
// Notice how I need to create each nested directory in the callback
// off the parent directory.
var fs = require('fs');
//default is 0777 if no mode is given
fs.mkdir('test', function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('test directory created');
		fs.mkdir('test/subtest/', function(err){
			if (err){
				console.log(err);
			}
			else{
				console.log('test/subtest directory created');
				fs.mkdir('test/subtest/subsubtest', function(err){
					if(err){
						console.log(err);
					}
					else{
						console.log('test/subtest/subsubtest directory created');
					}
				});
			}
		});
	}
});
var fs = require('fs');
fs.mkdir('test', 0666, function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('Directory Made');
	}
});
var fs = require('fs');
//default is 0777 if no mode is given
fs.mkdir('test', function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('Directory Made');
	}
});

var fs = require('fs');
var util = require('util');
fs.stat('sample.txt', function(err, stats){
	if (err){
		console.log(err);
	}
	else{
		//this returns a list of stat object properties
		console.log('Stats ' + util.inspect(stats));
		//this is how we can call a property individuall
		console.log('\nStat Size: ' + stats.size);
		console.log(stats.isFile() ? "Is a File" : "Is not a File");
		console.log(stats.isDirectory() ? "Is a Directory" : "Is not a Directory");
		console.log(stats.isSocket() ? "Is a Socket" : "Is not a Socket");
	}
});
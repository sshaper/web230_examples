var fs = require('fs');
var options = {encoding: 'utf8', flag: 'r'};
var fileReadStream = fs.createReadStream('sample.txt', options);
fileReadStream.on('data',function(chunk){
	console.log('Data Chunk:\n %s \n',chunk)
	console.log('Read %d bytes of data.\n', chunk.length);
});

fileReadStream.on('close', function(){
	console.log('File Closed');
});

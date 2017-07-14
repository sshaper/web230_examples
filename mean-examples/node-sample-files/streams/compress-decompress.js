var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');

var infile = fs.createReadStream('bootstrap.css');
var outfile = fs.createWriteStream('bootstrap-zipped.gz');

infile.pipe(gzip).pipe(outfile);

console.log('File compressed');

console.log();

console.log('5 second time delay before decompression to allow data to be flushed to disk.\nPlease Wait....');

setTimeout(function(){
	var gunzip = zlib.createUnzip({flush: zlib.Z_FULL_FLUSH});
	var infile = fs.createReadStream('bootstrap-zipped.gz');
	var outfile = fs.createWriteStream('bootstrap-unzipped.css');
	infile.pipe(gunzip).pipe(outfile);
	console.log('file decompressed')

}, 5000);


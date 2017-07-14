// I open the file and callback an error and a file. The fd variable
// is the file descriptor.  It does not have to be fd
var fs = require('fs');


//This will open and create the sample.txt file
fs.open('sample.txt','w',function(err, fd){
	if(err){
		
		//The return is used so the function terminates
		return console.log(err);
	}
	
	//This is written in the callback because we want the file to be created
	//and opened before we write to it.
	fs.write(fd, '', function(err){
		if(err){
			return console.log(err);
		}
		fs.close(fd,function(err){
			if(err){
				return console.log(err);
			}
			
			console.log('File opened, cleared, and closed');
		});
	});
});
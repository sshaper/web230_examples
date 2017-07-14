var fs = require('fs');
var Path = require('path');
function walkDir(dirPath){
	//output directory
	console.log('Directory :' + dirPath + '\n');
	
	fs.readdir(dirPath, function(err, entries){
		var len = entries.length;
		var i = 0;
		while(i < len){
			//join the path with the entry
			var fullPath = Path.join(dirPath, entries[i]);
			
			//fullPath is executed this is a closure to insure that 
			//it picks up the correct value in the loop
			(function(fullPath){
				fs.stat(fullPath, function(err, stats){
					if(err){
						console.log(err)
					}
					else{
						//if a file print the file
						if(stats && stats.isFile()){
							console.log('\tFile: ' + fullPath);
						}
						else if(stats && stats.isDirectory()){
							walkDir(fullPath);
						}
					}
				});
			})(fullPath);
			i+=1;
		}
	});
}
//this is relative to where this file is located
walkDir('../../file-system');
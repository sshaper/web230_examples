/* GET THE EVENT */
var events = require('events'),
	util = require('util'),
	fs = require('fs'),
	watchDir = 'watch',
	processedDir = 'done';

/* THE USE OF THE INHERITS FUNCTION, WHICH IS PART OF NODE'S BUILT IN UTIL MODULE. THE INHERITS FUNCTION PROVIDES A CLEAN WAY TO INHERIT ANOTHER OBJECTS BEHAVIOR. THE INHERITS STATEMENT IN THE FOLLOWING CODE IS EQUIVILANT TO Watcher.prototype = new events.EventEmitter(). */
util.inherits(Watcher, events.EventEmitter);


function Watcher(watchDir, processedDir){
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

Watcher.prototype.watch = function(){
	var watcher = this;
	fs.readdir(this.watchDir, function(err, files){
		if(err){
			console.log(err);
		}
		for(var index in files){
			watcher.emit('process', files[index]);
		}
	})
}

Watcher.prototype.start = function(){
	console.log('Watching folder named watch');
	var watcher = this;
	fs.watchFile(watchDir, function(){
		watcher.watch();
	})
}

var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process(file){
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir + '/' + file.toLowerCase();

	fs.rename(watchFile, processedFile, function(err){
		if(err){
			console.log(err);
		}
	});
});

watcher.start();
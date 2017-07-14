// In this example I create multiple directories.
// Notice how I need to create each nested directory in the callback
// off the parent directory.
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
function Directory(){
	//events.EventEmitter.call(this);
	this.makeDir = function(dirname, arr, indx){
		fs.mkdir(dirname, function(err){
			if(err){
				console.log(err);
			}
			else {
				emitter.emit('checkdir',arr,indx);
			}
		});
	}
}

//Directory.prototype.__proto__ = events.EventEmitter.prototype;

var dir = new Directory();

emitter.on('done', function(){
	console.log('All directories completed')
});

emitter.on('checkdir', function(arr, indx){checkdir(arr, indx)})

function checkdir(arr, index){
	console.log('Directory '+arr[indx]+' created');
	indx++;
	if(indx < arr.length){
		dir.makeDir(arr[indx], arr, indx);
	}
	else {
		emitter.emit('done')
	}
}

/*emitter.on('checkdir',function(arr, indx){
	console.log('Directory'+arr[indx]+'Created');
	indx++;
	if(indx < arr.length){
		//dir.makeDir(arr[indx], arr, indx);
		console.log(arr[indx]);
	}
	else {
		emitter.emit('done')
	}
});*/

var directoryArr = ['test','test/subtest','test/subtest/subsubtest'];
var indx = 0;

dir.makeDir(directoryArr[indx], directoryArr, indx);



/*var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var fs = require('fs');

emitter.on('start_read',function(file_name){
      console.log("Started Reading file....nn");
      fs.readFile(file_name, 'utf8', function (err,data) {
        if (err) {
          emitter.emit('error','from_read');
        }
        else{
            console.log("Done Reading file....nn");
            emitter.emit('print_content',data);
          }
  });

});

emitter.on('print_content',function(data){
      console.log("Printing content of file....nn");
      console.log(data);
      emitter.emit('done');

});

emitter.on('error',function(type){

      console.log("Faced error while "+type);
      emitter.emit('done');

});

emitter.on('done',function(){

      console.log("Ok its done !");

});


emitter.emit('start_read','/etc/hosts');*/

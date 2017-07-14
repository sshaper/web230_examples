function logCar(message, callback){
	// The half second delay is to simulate an asynchronous call if I was not to do that
	// and just call callback(logMsg) directly both loops would work as expected.  The 
	// half second delay causes the first loop to complete and only show the last car, but the 
	// second loop uses a wrapper function that creates a closure thus the msg values is correct
	// on each iteration
	setTimeout(function(){callback(message)}, 500);
};

var cars = ['Ferrari', 'Porsche', 'Bugatti'];

var len = cars.length;
var i = 0;

//for in loop
while(i < len){
	var message = "Saw a " + cars[i];
	logCar(message, function(){
		console.log("Normal Callback " +  message);
	});
	i+=1;
}

//reset i
i = 0

while (i < len){
	var message = "Saw a " +  cars[i];
	//Wrapping the logCar function in this asynchronous function block allows it to remember what the 
	//original message was 
	(function(message){
		logCar(message, function(){
			console.log("Closure Callback: " + message)
		});
	})(message);
	i+=1;
}
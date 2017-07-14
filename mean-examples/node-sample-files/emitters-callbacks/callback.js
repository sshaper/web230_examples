var events = require('events');
function CarShow(){
	this.seeCar = function(make){
		this.emit('sawCar', make);
	}
}

CarShow.prototype.__proto__ = events.EventEmitter.prototype;
var show = new CarShow();

function logCar(make){
	console.log('Saw a ' + make);
}

function logColorCar(make, color){
	console.log("Saw a %s %s", color, make);
}

show.on("sawCar", logCar);

show.on("sawCar", function(make){
	var colors = ['red','blue','black'];
	var color = colors[Math.floor(Math.random()*3)];
	//call back function
	logColorCar(make, color);
});

show.seeCar("Ferrari");
show.seeCar("Porsche");
show.seeCar("Bugatti");
show.seeCar("Lamborghini");
show.seeCar("Aston Martin");

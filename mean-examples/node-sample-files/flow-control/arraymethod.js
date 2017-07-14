/*USING THIS TECHINIQUE I PUT ALL MY SETTIMEOUTS INTO FUNCTIONS AND PUT THE FUNCTION NAMES INTO AN ARRAY.  I THEN GO THROUGH THE ARRAY AND CALL THE SEPERATE FUNCTIONS RECURSIVELY.  THE ORDER OF EACH FUNCTION WILL HAPPEN BASED UPON THE ORDER I SET THEM IN THE ARRAY.  NOTICE I PUT THE NEXT FUNCTION CALL AT THE END OF EACH OF MY FUNCTIONS, THAT WAY IT WILL BE CALLED WHEN ALL OTHE PROCESSES ARE DONE.*/

/*THIS PROCESS REQUIRES YOU TO WRITE MORE CODE BUT GIVES YOU GREAT CONTROL OVER THE FLOW WITHOUT HAVING TO NEXT FUNCTIONS*/

function first(){
	setTimeout(function(){
		console.log('I execute first');
		next();
	}, 1000);
}

function second(){
	setTimeout(function(){
		console.log('I execute second');
		next();
	}, 500);
}

function third(){
	setTimeout(function(){
		console.log('I execute last');
		next();
	}, 300);
}

var tasks = [first, second, third];

function next(err, result){
	if(err){
		console.log(err);
	}
	else{
		var currentTask = tasks.shift();
		if(currentTask){
			currentTask(result);
		}
	}
}

next();  /*THIS IS DONE SO WE CAN FIRE OFF THE FIRST ONE WHEN THE SCRIPT IS CALLED.
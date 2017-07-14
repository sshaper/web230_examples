//adds a listener to itself for a message
self.addEventListener('message',function(e){

	//if the data sent is not a number inform user that Web worker is on
	if (isNaN(e.data)){
		//posts a message back to the parent script
		self.postMessage('Web Worker On');
	}
	else{
		//if the value passed is a number then use that number to run the fib function are return (post) the re
		self.postMessage(fib(e.data));
	}
	
},false);
 
        
function fib(num){
	if (num > 2){
		return fib(num - 2) + fib(num - 1);	
	}
	else{
		return num - 1;	
	}	
}

/*IN THIS EXAMPLE THE SETTIMEOUT FUNCTIONS WILL NOT GO IN ORDER BECAUSE THE NEXT ONE WILL NOT WAIT FOR THE PREVIOUS.  WHEN THIS CODE IS RUN THE ORDER WILL ACTUALLY BE IN REVERSE ALSO NOT THE LONGEST TIME TO WAIT IS NO THE FIRST ONE AND THE SHORTEST TIME TO WAIT IS ON THE LAST ONE.*/
setTimeout(function(){
	console.log('I execute first');
	}, 1000
);
setTimeout(function(){
	console.log('I execute second');
	}, 500
);
setTimeout(function(){
	console.log('I execute last');
	}, 300
);
/*THIS ONE WORKS FINE BECAUSE I NESTED ALL THE SETTIMEOUTS BUT THAT CAN GET MESSY WITH ALOT OF NESTED CALLBACKS*/

setTimeout(function(){
	console.log('I execute first');
		setTimeout(function(){
			console.log('I execute second');
			setTimeout(function(){
				console.log('I execute last');
			}, 300);
		}, 500);
	}, 1000);


"use strict"
function amIOldEnough(age){
	if (age < 12) {
		return secondFunction(age);
	} 
	else if (age < 18) {
		return secondFunction(age);
	} 
	else {
		return 'Yep, come on in!';
	}
}

function secondFunction(age){
	let years = 21 - age;
	return `come back in ${years} years`;
}

console.log(amIOldEnough(16));
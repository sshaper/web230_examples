"use strict"

var main = {}

main.util = function(){
	if(Util.getEl('#testformBtn')){
		Util.addLis(Util.getEl('#testformBtn')[0], 'click', main.processForm)
	}
}

main.processForm = function(){
	var obj = [
		{for: 'fname', regex: 'name', msg: "Not in name format"},
		{for: 'lname', regex: 'name', msg: "Not in name format"},
		{for: 'address', regex: 'address', msg: "Not in address format"},
		{for: 'phone', regex: 'phone', msg: "Not in phone format (just write the numbers)"},
		{for: 'email', regex: 'email', msg: "Not in email format"}
	]
	var i = 0, j = 0, inputs = Util.getEl('input[type="text"]');
	
	while(i < inputs.length){
		j = 0;
		while(j < obj.length){
			if(inputs[i].id == obj[j].for){
				obj[j].value = inputs[i].value;
				break;
			}
			j++;
		}
		i++;
	}
	var obj = JSON.stringify(obj);
	Util.sendRequest('/user/postTestForm', function(res){
		var ret = JSON.parse(res.responseText);
		console.log(ret)
		if(ret[0].status === 'success'){
			/* REDIRECT TO HOME PAGE ON SUCCESS */
			window.location = "http://45.55.242.213:3000/";

		}
		else{
			Util.formValidation('testformFrm', ret[1]);
		}
		

	}, obj);
}

main.util();


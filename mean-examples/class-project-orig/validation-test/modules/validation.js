module.exports = {
	error : false,
	validation: function(obj){
		var i = 0;
		var retArr = [];
		while(i < obj.length){
			switch(obj[i].regex){
				case "name" : this.name(obj[i]); break;
				case "address" : this.address(obj[i]); break;
				case "phone" : this.phone(obj[i]); break;
				case "email" : this.email(obj[i]); break;
			}
			
			i++;
		}

		if(this.error == false){
			return [{status: 'success'},obj];
		}
		else if(this.error == true) {
			return [{status: 'error'},obj];
		}
	},

	name: function(obj){
		if(!/^[a-z-\']{1,50}$/i.test(obj.value)){
			this.error = true;
			obj.status = 'error';
		}
		else{
			obj.status = 'passed';
		}
	},

	address: function(obj){
		if(!/^\d+\s[A-z]+\s[A-z]+/i.test(obj.value)){
			this.error = true;
			obj.status = 'error';
		}
		else{
			obj.status = 'passed';
		}
	},

	phone: function(obj){
		if(!/[0-9]{9}/.test(obj.value)){
			this.error = true;
			obj.status = 'error';
		}
		else{
			obj.status = 'passed';
		}
	},

	email: function(obj){
		if(!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(obj.value)){
			this.error = true;
			obj.status = 'error';
		}
		else{
			obj.status = 'passed';
		}
	}
}
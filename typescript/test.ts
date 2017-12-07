var num:number = 12;
console.log(num);

class testclass {
	name:string = "scott";
	getName():string{
		return this.name;
	}
}

var test = new testclass();

console.log(test.getName());

var obj:object = JSON.parse('{ "myString": "string", "myNumber": 4 }');

console.log(obj['myString']);

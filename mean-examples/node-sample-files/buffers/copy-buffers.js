var alphabet = new Buffer('abcdefghijklmnopqurstuvwxyz');
console.log(alphabet);
console.log();
var blank = new Buffer(26);
blank.fill();
console.log("blank " + blank.toString());
console.log();
alphabet.copy(blank);
console.log("blank " + blank.toString());
console.log();
var dashes = new Buffer(26);
dashes.fill("-");
console.log("dashes " + dashes.toString());
console.log();
alphabet.copy(dashes, 10, 10, 15);
console.log("dashes " + dashes.toString());
console.log();
var dots = new Buffer('----------------------------');
dots.fill('.')//changed to dots from dashes
console.log("dots " + dots.toString());
console.log();
for (var i = 0; i< dots.length; i++){
	//get every odd
	if (i%2){
		dots[i] = alphabet[i];
	}
}
console.log("dots " + dots.toString());



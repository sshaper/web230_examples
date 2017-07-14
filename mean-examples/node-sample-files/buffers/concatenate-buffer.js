var af = new Buffer("African Swallow?");
var eu = new Buffer("European Swallow?");
var question = new Buffer("Air speed velocity of an ");
console.log();
console.log(Buffer.concat([question, af]).toString());
console.log();
console.log(Buffer.concat([question, eu]).toString());
console.log();
var buff = new Buffer("Some UTF8 Text");
console.log();
console.log('below is a simple buff.toString()');
console.log(buff.toString());
console.log();
console.log("below is a simple buff.toString('utf8')");
console.log(buff.toString('utf8'));
console.log();
console.log('Using string decoder')
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
console.log(decoder.write(buff));
console.log("As you can see not much of a difference");

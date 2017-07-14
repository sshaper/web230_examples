//create a new buffer of 256 bits 32 bytes
var buff = new Buffer(256);

//write some text to the buffer
//notice the text is in front of the zeros
buff.write('I am 21 years old');
console.log();
console.log('The buffer with the sentence only shown below:');
console.log(buff);

//refill the buffer with zeros
buff.fill(0);
console.log();
console.log('The buffer filled with just zeros shown below:');
console.log(buff);

//write the text again but now start at the 10th bit
buff.write('I am 21 years old',10);

//notice the text starts on the 10th bit
console.log()
console.log('Sentence at the 10th bit shown below:');
console.log(buff);

//Adding the word hello to the beginning of the buffer
buff[0] = 72;
buff[1] = 101;
buff[2] = 108;
buff[3] = 108;
buff[4] = 111;
buff[5] = 32;

console.log();
console.log('Buffer with word hello added just the buffer shown below');
console.log(buff);
console.log()
console.log('Buffer with word hello added as string: '+buff.toString());
console.log();
console.log('Buffer of first index with to string (default to decimal): '+buff[0].toString());
console.log('Buffer of first index output as decimal: '+buff[0].toString('10'));
console.log('Buffer of first index output as binary: '+buff[0].toString('2'));
console.log('Buffer of first index output as octel: '+buff[0].toString('8'));
console.log('Buffer of first index output as hexadecimal: '+buff[0].toString('16'));

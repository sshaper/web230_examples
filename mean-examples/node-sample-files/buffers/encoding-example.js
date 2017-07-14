var buff = new Buffer('This is some example text');

console.log();
console.log('utf-8: '+buff.toString('utf8'));
console.log('hex: '+buff.toString('hex'));
console.log('utf16li: '+buff.toString('ucs2'));
console.log('ucs2: '+buff.toString('ucs2'));
console.log('base64: '+buff.toString('base64'));
console.log();
var str = "This is a string \u00b6";
console.log(str.length);
console.log()
console.log(Buffer.byteLength(str,'utf8'));

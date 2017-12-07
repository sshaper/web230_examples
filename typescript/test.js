var num = 12;
console.log(num);
var testclass = /** @class */ (function () {
    function testclass() {
        this.name = "scott";
    }
    testclass.prototype.getName = function () {
        return this.name;
    };
    return testclass;
}());
var test = new testclass();
console.log(test.getName());
var obj = JSON.parse('{ "myString": "string", "myNumber": 4 }');
console.log(obj['myString']);

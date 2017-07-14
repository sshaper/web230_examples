var div1 = document.getElementsByTagName('div')[0];
var a1 = document.getElementsByTagName('a')[0];

var div2 = document.getElementsByTagName('div')[1];
var a2 = document.getElementsByTagName('a')[1];


/*THE ORDER WILL BE ANCHOR FIRST THEN DIV BECAUSE THEY ARE BOTH ON THE BUBBLE PHASE*/
a1.addEventListener('click',function(e){
	alert('anchor element');
	e.preventDefault();
},false);

div1.addEventListener('click',function(){
	alert('div element');
},false);

/*THE ORDER WILL BE DIV FIRST THEN ANCHOR BECAUSE THEY WILL BE ON THE CAPTURE PHASE*/
a2.addEventListener('click',function(e){
	alert('anchor element');
	e.preventDefault();
},true );

div2.addEventListener('click',function(){
	alert('div element');
},true);
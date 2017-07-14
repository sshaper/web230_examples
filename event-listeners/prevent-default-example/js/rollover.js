var products = document.getElementsByTagName('a');
var len = products.length;

for(var i=0;i<len;i++){
	products[i].addEventListener("mouseover",displayOn,false);
	products[i].addEventListener("mouseout",displayOff,false);
	products[i].addEventListener("click",stopDefault,false);//if I click the link it will not work.
}

function displayOn(evt) {
    this.style.color = "#F00"; 
}

function displayOff(evt) {
	this.style.color = "#000";
}

function stopDefault(evt){
	evt.preventDefault();
}


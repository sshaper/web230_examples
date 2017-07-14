var products = document.getElementsByTagName('a');
var len = products.length;
for(var i=0;i<len;i++){
	products[i].addEventListener("mouseover",displayOn,false);
	products[i].addEventListener("mouseout",displayOff,false);
}

function displayOn() {
    this.style.color = "#F00";
    this.parentNode.className = 'circle';
}

function displayOff() {
	this.style.color = "#000";
    this.parentNode.className = '';
}
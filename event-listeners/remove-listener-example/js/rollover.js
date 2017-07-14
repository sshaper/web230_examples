var products = document.getElementsByTagName('a');
var len = products.length;
var toggle = 0;
var btn = document.getElementById('btn');

//initially set up the event listeners
for(var i=0;i<len;i++){
	products[i].addEventListener("mouseover",displayOn,false);
	products[i].addEventListener("mouseout",displayOff,false);
}
btn.style.color = "white";
btn.addEventListener("click",toggleListener,false);

//Set the collor to red on mouse over
function displayOn(evt) {
    this.style.color = "#F00"; 
}

//Set color to black on mouse out
function displayOff(evt) {
	this.style.color = "#000";
}

//based upon the button add or remove event listeners.
function toggleListener(){
	if (toggle === 0){
		for(var i=0;i<len;i++){
			products[i].removeEventListener("mouseover",displayOn,false);
			products[i].removeEventListener("mouseout",displayOff,false);
		}
		this.value = "Event Listener Off";
		this.style.color = "white";
		this.style.backgroundColor = "red";
		toggle = 1;	
	}
	else{
		for(var i=0;i<len;i++){
			products[i].addEventListener("mouseover",displayOn,false);
			products[i].addEventListener("mouseout",displayOff,false);
		}
		this.value = "Event Listener On";
		this.style.color = "white";
		this.style.backgroundColor = "green";
		toggle = 0;	
	}
}


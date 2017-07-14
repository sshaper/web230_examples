//get all ul's
var ul = document.getElementsByTagName('ul');

//get all a's and li's for each ul section and put node lists into variables
var products1 = ul[0].getElementsByTagName('a');
var products2 = ul[1].getElementsByTagName('a');

var lists1 = ul[0].getElementsByTagName('li');
var lists2 = ul[1].getElementsByTagName('li');

var len1 = products1.length;
var len2 = lists1.length;

//assign event listeners to li's and a's
for(var i=0;i<len1;i++){
	products1[i].addEventListener("mouseover",displayOn1,false);
	products1[i].addEventListener("mouseout",displayOff1,false);
	
	products2[i].addEventListener("mouseover",displayOn2,false);
	products2[i].addEventListener("mouseout",displayOff2,false);
}

for(i=0;i<len2;i++){
	lists1[i].addEventListener("mouseover",highlightOn,false);
	lists1[i].addEventListener("mouseout",highlightOff,false);
	
	lists2[i].addEventListener("mouseover",highlightOn,false);
	lists2[i].addEventListener("mouseout",highlightOff,false);
}


function displayOn1() {
    this.style.color = "#F00";
}

function displayOff1() {
	this.style.color = "#000";
}


//these two functions have the stop propagation added so when I roll over the
//a tag it does not propagate up to the li tag and fire the li rollover as well 
function displayOn2(evt) {
    this.style.color = "#F00";
	evt.stopPropagation();
}

function displayOff2(evt) {
	this.style.color = "#000";
    evt.stopPropagation()
}


function highlightOn() {
    this.className = "listBg";
}

function highlightOff() {
	this.className = "";
}
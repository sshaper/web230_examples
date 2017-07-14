//set global variables
var src, target, msg, members;
var senators = [];
var senId=0;
var len=0;



function init() {
    msg = document.getElementById("msg");
    democrat = document.getElementById("democrats");
    republican = document.getElementById("republicans");
    members = document.getElementById("members");
    
    //check if we have local storage if so load from local storage
    if (window.localStorage.getItem("senators")){
	    senators = JSON.parse(window.localStorage.getItem("senators"));
	    //the true is passed for local storage loading.
	    displaySenators(senators,true);
	    
		//display message of how many senators were loaded from local storage
		msg.innerHTML = "From Local Storage loaded "+len+" Senators";
    }
    else{
	    //if no local storage load from XML
	    ajaxLoader("partyList.xml");
	    //display message of how many senators were loaded from xml file 
		msg.innerHTML = "From AJAX loaded "+len+" Senators";
    }
 
    // Add event handlers for the source
	//could have used event delegation here
    members.ondragstart = dragStartHandler;
    members.ondragend = dragEndHandler;
    members.ondrag = dragHandler;

    democrat.ondragover = dragOverHandler;
    democrat.ondrop = dropHandler;

    republican.ondragover = dragOverHandler;
    republican.ondrop = dropHandler;


}

function dragStartHandler(e) {
    e.dataTransfer.setData("Text", e.target.id);
    sourceId = e.target.id;     // explicitly for some browsers
    e.target.classList.add("dragged");
}

function dragEndHandler(e) {
    msg.innerHTML = "Drop over the target";
    var elems = document.querySelectorAll(".dragged");
    for(var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dragged");
    }
}

function dragHandler(e) {
    msg.innerHTML = "Dragging " + e.target.id;
}

function dragOverHandler(e) {
    msg.innerHTML = "Drag Over " + e.target.id;
    var id = e.dataTransfer.getData("text") || sourceId;
    
    //loop through all senators looking for the one being dragged
    var len = senators.length;
    for (var i=0;i<len;i++){
	    if (senators[i]['name']===sourceId){
	    	break;
	    }
    }
    
    //check party and make sure they are over the correct drop zone
    //if so add to box and update vote from false to true
    if (senators[i]['party']==="Democrat"){
	    if(e.target.id ==="democrats"){
		    senators[i]['vote']=true;
		    window.localStorage.setItem("senators", JSON.stringify(senators));
		    //notice I had to use e.preventDefault();
			e.preventDefault();
	    }
    }
    else if(senators[i]['party']==="Republican"){
	    if(e.target.id ==="republicans"){
		    senators[i]['vote']=true;
		    window.localStorage.setItem("senators", JSON.stringify(senators));
		    e.preventDefault();
	    }
    }
    
}

function dropHandler(e) {
    var sourceId = e.dataTransfer.getData("Text");
    var sourceElement = document.getElementById(sourceId);
    var newElement = sourceElement.cloneNode(false);               
    e.target.innerHTML += '<li>'+sourceId+'</li>';
 	e.preventDefault();
}

//load XML file via AJAX
function ajaxLoader(xmlfile){
  if (window.XMLHttpRequest)
  {
  	xmlhttp=new XMLHttpRequest();
  }
else
  {
  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  	xmlhttp.open("GET",xmlfile,false);
  	xmlhttp.send();
  	xmlDoc=xmlhttp.responseXML;
  	//convert XML to JSON
  	xmlToJson(xmlDoc)
}
//converst XML to JSON
function xmlToJson(xml){
	
	var len = xml.getElementsByTagName('senator').length;
	for (var i=0;i<len;i++){
		var obj = {};
		obj.name = xml.getElementsByTagName("name")[i].childNodes[0].nodeValue;
		obj.party = xml.getElementsByTagName("party")[i].childNodes[0].nodeValue;
		obj.vote = false;
		senators.push(obj);
	}
	//once converted put into local storage
	window.localStorage.setItem("senators", JSON.stringify(senators));
	//diplay senators false is passed to show it is an initial AJAX load
	displaySenators(senators,false);
}

function displaySenators(senators,storageFlag){

	//list all senators and make them draggable.
	len = senators.length;
	var list = "";
	for (var i=0;i<len;i++){
		list+="<li draggable='true' id='"+senators[i]['name']+"'>"+senators[i]['name'];	
	}
	
	//display list
	members.innerHTML = list;
	
	
	//if the storageFlag is true then we will be loading from local storage
	//check to see what senators have voted and put them in their appropriate boxes
	if (storageFlag){
		for(i=0;i<len;i++){
			if (senators[i]['vote']===true){
				if(senators[i]['party']==="Democrat")
				{
					democrat.innerHTML += "<li>"+senators[i]['name']+"</li>";
				}
				else if(senators[i]['party']==="Republican"){
					republican.innerHTML += "<li>"+senators[i]['name']+"</li>";
				}
			}
		}
	}
}

init();


	

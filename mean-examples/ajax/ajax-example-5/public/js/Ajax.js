var Ajax = {}

Ajax.sendRequest = function(url, callback, postData, file) {
	
	//set file to false if it is not already set.  If it is set then
    //it is supposed to be true.  If it is set to true that indicates that a file is
    //being sent.
    if (file === undefined){
        file = false;
    }
    
    //creates the XML object
    var req = Ajax.createXMLHttpObject();
	
	//if returns false cancel operation 
	if (!req){return};
	
	//check to see if postData was passed if so set method to POST
	var method = (postData) ? "POST" : "GET";
	
	//call the open method, send the method "POST" or "GET" and pass true
	req.open(method,url,true);
	
	//if postData is sent and the file is zero meaning we are not sending a file then set request header for forms, otherwise JavaScript will decide the header type on the req.send method.
	if (postData && !file){
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    }
	//if everything returns ok send req value to "callback"
	req.onreadystatechange = function () {
		if (req.readyState !== 4) return;
		if (req.status !== 200 && req.status !== 304) {
			return;
		}
		callback(req);
	}
	// if we have already completed the request, stop the function so as not
  	// to send it again
	if (req.readyState === 4){return;}
	
	//if postdata was included send it to server side page. Information
	//can be received by using $_POST['data'] (this is via PHP)
	
    //sending a file and some text
    if (postData && file){
		req.send(postData);
	}
    //sending text only
    else if (postData && !file){
        req.send("data="+postData);
    }
	else{
		req.send(null);
	}
	
}

//depending on the browser return appropriate request.
Ajax.XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

//This method cycles through all requests in XMLHttpFactories until
//one is found.
Ajax.createXMLHttpObject = function() {
	var xmlhttp = false;
	for (var i=0;i<Ajax.XMLHttpFactories.length;i++) {
		try {
			xmlhttp = Ajax.XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}

var Ajax = {}

Ajax.sendRequest = function(url, callback, postData, file) {
	
	/*SET FILE TO FALSE IF IT IS NOT ALREADY SET.  IF IT IS SET THEN
    IT IS SUPPOSED TO BE TRUE.  IF IT IS SET TO TRUE THAT INDICATES THAT A FILE IS
    BEING SENT.*/
    if (file === undefined){
        file = false;
    }
    
    /*CREATES THE XML OBJECT*/
    var req = Ajax.createXMLHttpObject();
	
	/*IF RETURNS FALSE CANCEL OPERATION */
	if (!req){return};
	
	/*CHECK TO SEE IF POSTDATA WAS PASSED IF SO SET METHOD TO POST*/
	var method = (postData) ? "POST" : "GET";
	
	/*CALL THE OPEN METHOD, SEND THE METHOD "POST" OR "GET" AND PASS TRUE*/
	req.open(method,url,true);
	
	/*IF POSTDATA IS SENT AND THE FILE IS ZERO MEANING WE ARE NOT SENDING A FILE THEN SET REQUEST HEADER FOR FORMS, OTHERWISE JAVASCRIPT WILL DECIDE THE HEADER TYPE ON THE REQ.SEND METHOD.*/
	if (postData && !file){
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    }
	/*IF EVERYTHING RETURNS OK SEND REQ VALUE TO "CALLBACK"*/
	req.onreadystatechange = function () {
		if (req.readyState !== 4) return;
		if (req.status !== 200 && req.status !== 304) {
			return;
		}
		callback(req);
	}
	/*IF WE HAVE ALREADY COMPLETED THE REQUEST, STOP THE FUNCTION SO AS NOT
  	TO SEND IT AGAIN*/
	if (req.readyState === 4){return;}
	
	/*IF POSTDATA WAS INCLUDED SEND IT TO SERVER SIDE PAGE. INFORMATION
	CAN BE RECEIVED BY USING $_POST['DATA'] (THIS IS VIA PHP)*/
	
    /*SENDING A FILE AND SOME TEXT*/
    if (postData && file){
		req.send(postData);
	}
    /*SENDING TEXT ONLY*/
    else if (postData && !file){
        req.send("data="+postData);
    }
	else{
		req.send(null);
	}
	
}

/*DEPENDING ON THE BROWSER RETURN APPROPRIATE REQUEST.*/
Ajax.XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

/*THIS METHOD CYCLES THROUGH ALL REQUESTS IN XMLHTTPFACTORIES UNTIL
ONE IS FOUND.*/
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

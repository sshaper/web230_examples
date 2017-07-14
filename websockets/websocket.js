window.onload = init;
var url = "ws://localhost:8080/broadcast";
var socket;

// Randomly assign the user id
var userId = "User" + Math.floor(100*Math.random());


// register the event handlers for buttons
function init() {
    
    document.getElementById("user").value = userId;
    
    var connectButton = document.getElementById("connectButton");
    connectButton.addEventListener("click", connectToServer, false);

    var disconnectButton = document.getElementById("disconnectButton");
    disconnectButton.addEventListener("click", disconnectFromServer, false);

    var sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", sendToServer, false);
}

function connectToServer() {
    // create the WebSocket object
    socket = new WebSocket(url);
   
    //assign event handlers for the WebSocket
    socket.addEventListener('open',handleOpenConnection,false);
    socket.addEventListener('close',handleCloseConnection,false);
    socket.addEventListener('error',handleError,false);
    socket.message = ('message',handleMessage,false);
}

function disconnectFromServer() {
    // close the WebSocket
    socket.close();
    status("Socket Closed");
}

// sending a message to the WebSocket server
function sendToServer() {
    if (socket)
    {
        var usr = document.getElementById("user").value;
        var msg = document.getElementById("message").value;
        
        log("<dt><span class='sent'>Sent From: </span>"+usr+"</dt><dd><span>Message: </span>"+msg+"</dd>");
		
		//create a JSON string to send information to server
        var data = JSON.stringify({user: usr, message : msg});
        socket.send(data);
    }
    else
    {
        status("Not Connected");    
    }
}

// WebSocket event handlers
function handleOpenConnection(event) {
    status("Socket Open");
}

//close socket
function handleCloseConnection(event) {
    status("Socket Closed");
    socket = null;
}

//display received message
function handleMessage(event) {
    var data = JSON.parse(event.data);
    log("<dt><span>Received From: </span>"+data.user+"</dt><dd><span>Message: </span>"+data.message+"</dd>");
}

//display error
function handleError(event) {
    status("Error:" + event.data);
}

//log messages in the HTML document
function log(msg) {
    document.getElementsByTagName('dl')[0].innerHTML += msg;
}

//display status
function status(msg){
	console.log(msg);
	document.getElementById("status").lastChild.innerHTML = msg;
}










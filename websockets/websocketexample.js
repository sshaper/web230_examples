window.onload = init;
var url = "ws://localhost:8080/broadcast";
var socket;

// Randomly assign the user id
var userId = "User" + Math.floor(100*Math.random());


// register the event handlers for buttons

function init() {
    
    document.getElementById("user").value = userId;
    
    var connectButton = document.getElementById("connectButton");
    connectButton.onclick = connectToServer;

    var disconnectButton = document.getElementById("disconnectButton");
    disconnectButton.onclick = disconnectFromServer;

    var sendButton = document.getElementById("sendButton");
    sendButton.onclick = sendToServer;
}

function connectToServer() {
    // create the WebSocket object
    socket = new WebSocket(url);
   
    // event handlers for the WebSocket
    socket.onopen = handleOpenConnection;
    socket.onclose = handleCloseConnection;
    socket.onerror = handleError;
    socket.onmessage = handleMessage;
}

function disconnectFromServer() {
    // close the WebSocket
    socket.close();
}

// sending a message to the WebSocket server
function sendToServer() {
    if (socket)
    {
        var usr = document.getElementById("user").value;
        var msg = document.getElementById("message").value;
        log("Sending:" + msg + " from " + usr);
        var data = JSON.stringify({user: usr, message : msg});
        socket.send(data);
    }
    else
    {
        log("Not Connected");    
    }
}

// WebSocket event handlers
function handleOpenConnection(event) {
    log("Open");
}

function handleCloseConnection(event) {
    log("Close");
    socket = null;
}

function handleMessage(event) {
    var data = JSON.parse(event.data);
    log("Received:" + data.message + 
        " from " + data.user);
}

function handleError(event) {
    log("Error:" + event.data);
}

// log messages in the HTML document
function log(message) {
    var pre = document.createElement("p");
    pre.innerHTML = message;
    var status = document.getElementById("status");
    status.appendChild(pre);
}










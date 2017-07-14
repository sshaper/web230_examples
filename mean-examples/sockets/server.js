//Get the required framework files
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//This function send the index.html file
app.get('/', function(req, res){
  //res.sendFile('index.html');
  res.sendFile('index.html',{'root': __dirname+'/'});
  
});

//When the socket is on it runs the "chat message" function
io.on('connection',function(socket){
socket.on('chat message', function(msg){
   io.emit('chat message', msg);
  });
});

//Port 3000 in the port it listens to
http.listen(3000, function(){
  console.log('listening on port 3000');
});
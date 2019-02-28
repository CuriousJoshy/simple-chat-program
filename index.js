var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Chat = require("./src/chat");

app.use("/style", express.static(__dirname + "/style"));
app.use("/client", express.static(__dirname + "/client"));

app.get('/', function(req, res){	
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on("join room", function()
	{
		console.log("Hello World!")
	});
	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

// http.listen(3000, "192.168.1.10");

http.listen(3000, function(){
	console.log('listening on *:3000');	
});
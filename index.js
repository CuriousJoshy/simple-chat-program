var express = require('express');
var app = express();

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/client", express.static(__dirname + "/client"))

var http = require('http').Server(app);
var io = require('socket.io')(http);

var Chat = require("./src/chat");

var uniqid = require("uniqid");

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	// When the username is created
	socket.on("create user", function(msg)
	{		
		var status = Chat.addUser(msg, socket.id, socket);
		
		if(status == Chat.USER_ADDED)
		{
			console.log("User added: " + msg + " " + socket.id);
			
			io.to(socket.id).emit("user created", msg);
		}
		else
			io.to(socket.id).emit("user denied", msg);
	});
	
	socket.on("create room", function(msg)
	{
		var id = uniqid();
		
		var status = Chat.createRoom(msg, id, Chat.getUser(socket));
		
		if(status == Chat.ROOM_CREATED)
			io.emit("room created", JSON.stringify({name: msg, id: id}));
		else
			io.to(socket.id).emit("room denied", msg);
	});
	
	socket.on("join room", function(msg)
	{
		var status = Chat.joinRoom(msg, Chat.getUser(socket));
		
		if(status == Chat.ROOM_JOINED)
		{
			io.to(socket.id).emit("room joined", msg);
		}
	});
	
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect', function(){		
		console.log('user disconnected');

		console.log(Chat.numUsers() + " user(s) remaining");
	});
});

// http.listen(3000, "192.168.1.10");

http.listen(3000, function(){
	console.log('listening on *:3000');
});
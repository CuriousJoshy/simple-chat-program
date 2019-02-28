var Client = require("./client");
var ChatRoom = require("./chatroom");
var uniqid = require("uniqid");

var Chat = {
	clients: [],
	rooms: [],
	
	addClient: function(name)
	{
		this.clients.push(new Client(name));
	},
	
	removeClient: function(client)
	{
		var clients = this.clients, index = clients.indexOf(client);
		
		if(index > -1)
		{
			clients.splice(index, 1);
			
			return true;
		}
		
		return false;
	},
	
	createRoom: function(name)
	{
		this.rooms.push(new ChatRoom(name));
	},
	
	removeRoom: function(id)
	{
		if(id == undefined)
			return false;
		
		var rooms = this.rooms, index = rooms.findIndex(function(room)
		{
			return room.id == id;
		});
		
		if(index > -1)
		{
			rooms.splice(index, 1);
			
			return true;
		}
		
		return false;
	}
};

module.exports = Chat;
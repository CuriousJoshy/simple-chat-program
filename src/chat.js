var User = require("./user");
var ChatRoom = require("./chatroom");

var Chat = {
	INVALID_USER: 0,
	USER_ADDED: 1,
	NO_USER_FOUND: 2,
	USER_REMOVED: 3,
	
	INVALID_ROOM: 4,
	ROOM_CREATED: 5,
	ROOM_DESTROYED: 6,
	NO_ROOM_FOUND: 7,
	
	ROOM_JOINED: 8,
	ROOM_DENIED: 9,
	
	users: [],
	rooms: [],
	
	addUser: function(name, id, socket)
	{
		if(name == undefined || name.length === 0 || id == undefined || socket == undefined)
			return this.INVALID_USER;
		
		this.users.push(new User(name, id, socket));
		
		return this.USER_ADDED;
	},
	
	removeUser: function(socketOrId)
	{
		if(socketOrId == undefined)
			return this.NO_USER_FOUND;
		
		var users = this.users, index = users.findIndex(function(user)
		{
			console.log(user.socket == socketOrId);
			
			return user.id == socketOrId || user.socket == socketOrId;
		});
		
		if(index > -1)
		{
			users.splice(index, 1);
			
			return this.USER_REMOVED;
		}
		else
			return this.NO_USER_FOUND;
	},
	
	hasUser: function(socketOrId)
	{
		return this.users.findIndex(function(user)
		{
			return user.id == socketOrId || user.socket == socketOrId;
		}) > -1;
	},
	
	getUser: function(socketOrId)
	{
		return this.users.find(function(user)
		{
			return user.id == socketOrId || user.socket == socketOrId;
		});
	},
	
	numUsers: function()
	{
		return this.users.length;
	},
	
	createRoom: function(name, id, owner)
	{
		if(name == undefined || name.length === 0 || id == undefined || owner == undefined)
			return this.INVALID_ROOM;
		
		this.rooms.push(new ChatRoom(name, id, owner));
		
		return this.ROOM_CREATED;
	},
	
	destroyRoom: function(id)
	{
		if(id == undefined)
			return this.NO_ROOM_FOUND;
		
		var rooms = this.rooms;
		
		var index = rooms.findIndex(function(room)
		{
			return room.id == id;
		});
		
		if(index > -1)
		{
			rooms.splice(index, 1);
			
			return this.ROOM_DESTROYED;
		}
		else
			return this.NO_ROOM_FOUND;
		
	},
	
	getRoom: function(id)
	{
		if(!id)
			return this.NO_ROOM_FOUND;
		
		var room = this.rooms.find(function(room)
		{
			return room.id == id;
		});
		
		return room || this.NO_ROOM_FOUND;
	},
	
	joinRoom: function(id, user)
	{
		var room = this.getRoom(id);
		
		if(room == this.NO_ROOM_FOUND)
			return this.NO_ROOM_FOUND;
		
		room.addUser(user);
		
		return this.ROOM_JOINED;
	},
	
	leaveRoom: function()
	{
		
	},
	
	numRooms: function()
	{
		return this.rooms.length;
	},
	
	// Returns the name and id of each room as key-value pairs
	getRoomIdentifiers: function()
	{
		var result = {};
		
		this.rooms.forEach(function(room)
		{
			result[room.name] = room.id;
		});
		
		return result;
	}
};

module.exports = Chat;
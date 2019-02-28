var uniqid = require("uniqid");

var ChatRoom = function(name)
{	
	this.name = name;
	this.id = uniqid();

	this.clients = [];
	
	this.history = [];
};

ChatRoom.prototype = {
	join: function(client)
	{
		if(this.clients.includes(client))
			return false;
		
		this.clients.push(client);
		
		client.socket.join(this.id);
		
		return true;
	},
	
	leave: function(client)
	{
		var index = this.clients.indexOf(client);
		
		if(index == -1)
			return false;
		
		this.clients.splice(index, 1);
		
		client.socket.leave(this.id);
		
		return true;
	},
	
	empty: function()
	{
		var self = this;
		
		this.clients.forEach(function(client)
		{
			self.leave(client);
		});
	}
};

module.exports = ChatRoom;
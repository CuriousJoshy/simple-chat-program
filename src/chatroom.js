var ChatRoom = function(name, id, owner)
{
	this.USER_ADDED = 0;
	this.USER_REMOVED = 1;
	
	this.name = name;
	this.id = id;
	this.owner = owner;
	
	this.users = [];
	
	this.history = [];
};

ChatRoom.prototype = {
	addUser: function(user)
	{
		
	}
};

module.exports = ChatRoom;
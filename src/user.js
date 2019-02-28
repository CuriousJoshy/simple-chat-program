var User = function(name, id, socket)
{
	this.name = name;
	this.id = id;
	this.socket = socket;
	
	this.roomId = null;
};

module.exports = User;
var uniqid = require("uniqid");

var Client = function(name,socket)
{
	this.name = name;
	this.id = uniqid();
	
	this.socket = socket;
};

Client.prototype = {
	
};

module.exports = Client;
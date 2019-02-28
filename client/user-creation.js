var user = {
	name: "",
	id: socket.id
};

user_creation.addEventListener("submit", function(e)
{	
	let name = user_creation.chat_name.value.trim();
	
	socket.emit("create user", name);
	
	e.preventDefault();
});

socket.on("user created", function(msg)
{
	user.name = msg;
	
	user_creation.reset();
	
	showPage("room-selection");
});
var active_rooms = room_selection.active_rooms, room_name = room_creation.room_name;

active_rooms.addEventListener("mousewheel", function(){}, {passive: true});

socket.on("refresh rooms", function(msg){
	let rooms = JSON.parse(msg), children = active_rooms.children;
	
	let option, id;
	
	while(children.length > 0)
	{
		active_rooms.lastChild.remove();
	}
	
	for(var name in rooms)
	{
		id = rooms[i];
		
		option = document.createElement("option");
		option.innerText = i;
		option.id = id;
		option.value = id;
		
		active_rooms.appendChild(option);
	}
});

socket.on("room created", function(msg)
{	
	room_creation.reset();
	
	let room = JSON.parse(msg);
	
	let option = document.createElement("option");
	option.innerText = room.name;
	option.id = room.id;
	option.value = room.id;
	
	active_rooms.appendChild(option);
	
	alert("Room successfully created");
});

socket.on("room destroyed", function(msg)
{
	let room = document.getElementById(msg);
	
	if(room)
		room.remove();
});

socket.on("room joined", function(id)
{
	console.log("Successfully joined room!");
});

room_selection.addEventListener("submit", function(e)
{	
	socket.emit("join room", room_name.value);
	
	e.preventDefault();
});

room_creation.addEventListener("submit", function(e)
{
	socket.emit("create room", room_name.value);
	
	e.preventDefault();
});
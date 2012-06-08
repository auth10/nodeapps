$(document).ready(function() {
	var socket = io.connect('.');
	var status = $("#status");
	var chatcontent = $("#chatcontent");
	var chatinput = $('#chatinput');
	
	socket.on('connect', function ()
	{
		status.text('status: online');
		chatinput.removeAttr('disabled');
		document.getElementById("chatinput").focus();
	});
	
	chatinput.keydown(function(e) {
		if (e.keyCode === 13) {
			sendMessage();
		}
	});
	
	function sendMessage()	{
		var msg = chatinput.val();
		if (!msg) {
			return;
		}
		if(msg == 'cls' | msg == 'clear') {
			chatcontent.text('');
			chatinput.val('');
			return;
		}
		
		socket.emit('message', { text: msg });
		chatinput.val('');
	}
	
	socket.on('message', function(msg) {
		chatcontent.append('<p><span style="color:' + msg.color + '">' + msg.nick + '</span>: ' + msg.text + '</p>');
		
		chatScrollDown();
	});
	
	socket.on('userJoined', function (user)	{
		chatcontent.append('<p>&raquo; <span style="color:' + user.color + '">' + user.nick + '</span> joined.</p>');
		
		chatScrollDown();
	});
	
	socket.on('userLeft', function (user)	{
		chatcontent.append('<p>&raquo; <span style="color:' + user.color + '">' + user.nick + '</span> left.</p>');
		
		chatScrollDown();
	});
	
	function chatScrollDown() {
		var objchatcontent = document.getElementById("chatcontent");
		objchatcontent.scrollTop = objchatcontent.scrollHeight;
	};
});
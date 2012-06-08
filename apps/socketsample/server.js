var app = require('express').createServer();
var port = process.env.PORT || 7000;
app.listen(port);
console.log('server listening on ' + port);

var version = process.version;
console.log('current node.js version: ' + version);

var fs = require('fs');

app.get('*', function(req, res){
	var reqFile = req.url;
	reqFile = reqFile.substring(13) // removing "/socketsample" from req.url
	
	if (reqFile == "/" || reqFile == "") {
		reqFile = "/index.html";
	}
	
	fs.readFile(__dirname + "/client" + reqFile,
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading requested file ' + reqFile);
			}
			
			res.writeHead(200);
			res.end(data);
		}
	);
});

var socketio = require('socket.io');
var io = socketio.listen(app, { log: true });
console.log('socket.io started');

io.sockets.on('connection', function (socket) {
	var myColor = rndColor();
	io.sockets.emit('userJoined', { nick: socket.id, color: myColor });
	
	socket.on('message', function (msg) {
		if(!msg || msg.length>256) {
			return;
		}
		
		io.sockets.emit('message', { text: msg.text, color: myColor, nick: socket.id });
	});
	
	socket.on('disconnect', function () {
		io.sockets.emit('userLeft', { nick: socket.id, color: myColor });
	});
	
	function rndColor() {
		var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		return color;
	};
});
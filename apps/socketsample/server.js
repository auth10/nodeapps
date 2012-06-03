var app = require('http').createServer(handler);
var port = process.env.PORT || 7000;
app.listen(port);
console.log('server listening on ' + port);

var socketio = require('socket.io');
var io = socketio.listen(app, { log: true });
console.log('socket.io started');

var fs = require('fs');

function handler (req, res) {
	fs.readFile(__dirname + '/client' + req.url,
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading requested file ' + req.url);
		}
		
		res.writeHead(200);
		res.end(data);
	});
}

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
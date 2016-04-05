var net = require('net');

var HOST = '127.0.0.1';
var PORT = 1234;

net.createServer(function(sock) {
	console.log('Connect: ' + sock.remoteAddress +':'+sock.remotePort);

	sock.on('data', function(data) {
		console.log(data.toString());
		sock.write(data);
	});

	sock.on('close', function(data) {
		console.log('Close: '+sock.remoteAddress + ' '+sock.remotePort);
	});

}).listen(PORT, HOST);

console.log('Server on ' + HOST + ':' + PORT);
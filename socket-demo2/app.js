
var http = require('http');
var fs = require('fs');
var count = 0;

var server = http.createServer(function(res, res) {
  fs.readFile('./index.html', function(err, data){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data, 'utf-8');
  })
}).listen(3000, '127.0.0.1');

console.log('server running at http://127.0.0.1:3000');

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  count++;
  console.log("user connected" + count + 'users');
  socket.emit('users', {number: count});
  socket.broadcast.emit('users', {number: count});
  
  socket.on('disconnect', function() {
    count--;
    console.log('user disconnected' + count + 'users');
    socket.broadcast.emit('users', {number: count});
  });
});
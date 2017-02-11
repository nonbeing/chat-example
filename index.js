const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('msg: ' + msg.content + 'from: ' + msg.nick);
    io.emit('chat message', msg);
  });
  socket.on('path', function(msg) {
    console.log(msg);
    socket.broadcast.emit('path', msg);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

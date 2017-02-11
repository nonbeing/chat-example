const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

var path_history = {}
// var nicks = []

io.on('connection', function(socket){
  console.log("New connection, sending path_history: " + path_history)
  socket.emit('path', path_history)


  socket.on('chat message', function(msg){
    // if (nicks.indexOf(msg.nick) == -1) {
    //   nicks.push(msg.nick)

    //   console.log(msg.nick + " just connected for the first time, sending path_history: " + path_history)
    //   socket.emit('chat message', path_history)
    // }
    console.log('msg: "' + msg.content + '", from: ' + msg.nick);
    io.emit('chat message', msg);
  });

  socket.on('path', function(data) {
    // if (nicks.indexOf(data.nick) == -1) {
    //   nicks.push(data.nick)

    //   console.log(data.nick + " just connected for the first time, sending path_history: " + path_history)
    //   socket.emit('path', path_history)
    // }

    console.log("data.name:"+ data.name + " data.point:" + data.point);

    if(!path_history[data.name]) {
      path_history[data.name] = {"points":[], "color":data.color}
    }
    path_history[data.name].points.push(data.point)

    socket.broadcast.emit('path', data);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

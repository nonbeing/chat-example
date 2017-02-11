const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

var path_history = {}
var chat_history = []

io.on('connection', function(socket){
  // console.log("New connection, sending path_history: " + JSON.stringify(path_history))

  for(var key in path_history) {
    var path = {name: key, points: path_history[key].points, color: path_history[key].color}
    // console.log("emitting event: " + JSON.stringify(path));
    socket.emit('path', path);
  }

  var val;
  for (val of chat_history) {
    socket.emit('chat message', val)
  }

  socket.on('chat message', function(msg){
    console.log('msg: "' + msg.content + '", from: ' + msg.nick);
    chat_history.push(msg)
    io.emit('chat message', msg);
  });

  socket.on('clear', function(data) {
    console.log("ClearCanvas");
    io.emit('clear', data);
  });

  socket.on('path', function(data) {
    console.log("socket data: "+ JSON.stringify(data));

    if(!path_history[data.name]) {
      path_history[data.name] = {"points":data.points, "color":data.color}
      // console.log("new event, path_history:" + JSON.stringify(path_history))
    }
    else {
      path_history[data.name].points.push(data.points[0]);
      // console.log("more points added, path_history: " + JSON.stringify(path_history))
    }

    socket.broadcast.emit('path', data);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

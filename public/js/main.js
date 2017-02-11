var socket = io();
$('form').submit(function() {
  msg = {}
  msg.nick = name //$('#nick').val()
  msg.content = $('#m').val()
  socket.emit('chat message', msg);
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg) {
  line = "<" + msg.nick + "> " + msg.content
  $('#messages').append($('<li>').text(line));
});

$("document").ready(function() {
  name = window.prompt("Enter your nick:", "");
});

paper.install(window);

$(window).on('load', function() {
  // Get a reference to the canvas object
  var canvas = document.getElementById('myCanvas');
  // Create an empty project and a view for the canvas:
  paper.setup(canvas);
  // Create a Paper.js Path to draw a line into it:
  var tool = new Tool();
  var paths = {};

  // Define a mousedown and mousedrag handler
  tool.onMouseDown = function(event) {
    pathname = String(Math.floor(Math.random() * 10000000 + 1));
    paths[pathname] = new Path();
    path.strokeColor = 'black';
    path.add(event.point);
    socket.emit('path', { name: pathname, point: event.point, color: 'red' });
  }

  tool.onMouseDrag = function(event) {
    path.add(event.point);
    socket.emit('path', { name: pathname, point: event.point, color: 'red' });
  }

  socket.on('path', function(data) {
    if (!paths[data.pathname]){
      paths[pathname] = new Path();
      paths[pathname].strokeColor = data.color;
    } 
    paths[pathname].add(data.point)
  })
});

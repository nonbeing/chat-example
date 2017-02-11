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

$('#color-input').ColorPicker({
  flat: true,
  onChange: function (color) {
    window.paperjsPathColor = { hue: color.h, saturation: color.s / 100, brightness: color.b / 100 };
  }
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
  var pathname;

  // Define a mousedown and mousedrag handler
  tool.onMouseDown = function(event) {
    pathname = String(Math.floor(Math.random() * 10000000 + 1));
    paths[pathname] = new Path();
    paths[pathname].strokeColor = window.paperjsPathColor || 'black';
    paths[pathname].add(event.point);
    socket.emit('path', { name: pathname, points: [{ x: event.point.x, y: event.point.y }], color: window.paperjsPathColor || 'black' });
  }

  tool.onMouseDrag = function(event) {
    paths[pathname].add(event.point);
    socket.emit('path', { name: pathname, points: [{ x: event.point.x, y: event.point.y }] });
  }

  socket.on('path', function(data) {
    var name = data.name;
    var color = data.color;
    var points = data.points;

    if (!paths[name]){
      paths[name] = new Path();
      paths[name].strokeColor = color;
    }
    for ( i = 0; i < points.length; i++ )
      points[i] = new Point(points[i].x, points[i].y);
    paths[name].add(points);
  })
});

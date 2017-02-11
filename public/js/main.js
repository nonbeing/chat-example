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
  var path = new paper.Path();
  // Give the stroke a color
  path.strokeColor = 'black';
  var start = new paper.Point(100, 100);
  // Move to start and draw a line from there
  path.moveTo(start);
  // Note that the plus operator on Point objects does not work
  // in JavaScript. Instead, we need to call the add() function:
  path.lineTo(start.add([200, -50]));
  // Draw the view now:
  paper.view.draw();
  var myPath;

  function onMouseDown(event) {
    myPath = new Path();
    myPath.strokeColor = 'black';
  }

  function onMouseDrag(event) {
    myPath.add(event.point);
  }

  function onMouseUp(event) {
    var myCircle = new Path.Circle({
      center: event.point,
      radius: 10
    });
    myCircle.strokeColor = 'black';
    myCircle.fillColor = 'white';
  }
});
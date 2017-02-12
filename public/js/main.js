var socket = io();
$('form').submit(function(e) {
  msg = {}
  msg.nick = username //$('#nick').val()
  msg.content = $('#m').val()
  socket.emit('chat message', msg);
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg) {
  line = "<" + msg.nick + "> " + msg.content
  $('#messageList').append($('<li>').text(line));
});

$("document").ready(function() {
  username = window.prompt("Enter your nick:", "");
});

$('#color-input').ColorPicker({
  onSubmit: function(hsb, hex, rgb, el) {
    $(el).val('#'+hex);
    $(el).ColorPickerHide();
  },
  onBeforeShow: function () {
    $(this).ColorPickerSetColor(this.value);
  }
})
.bind('keyup', function(){
  $(this).ColorPickerSetColor(this.value);
});

paper.install(window);

$("#clearAll").click(function() {
  project.clear();
  $('#messageList').empty();
  socket.emit('clear', {});
});



// Fixed layout of chat inputs and moved to a hidden color picker
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
    paths[pathname].strokeColor = $('#color-input').val()
    paths[pathname].add(event.point);
    socket.emit('path', { name: pathname, points: [{ x: event.point.x, y: event.point.y }], color: $('#color-input').val() });
  }

  tool.onMouseDrag = function(event) {
    paths[pathname].add(event.point);
    socket.emit('path', { name: pathname, points: [{ x: event.point.x, y: event.point.y }] });
  }

  socket.on('clear', function(data) {
    console.log("Clearing All...");
    project.clear();
    $('#messageList').empty();
  });


  socket.on('path', function(data) {
    console.log("got data:" + JSON.stringify(data))

    var name = data.name;
    var color = data.color;
    var points = data.points;

    if (!paths[name]){
      paths[name] = new Path();
      paths[name].strokeColor = color;
    }
    for ( i = 0; i < points.length; i++ )
      points[i] = new Point(points[i].x, points[i].y);

    paths[name].addSegments(points);
  });
});

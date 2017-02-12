# real-time whiteboard and chat in javascript

![result](http://i.imgur.com/ugpyKYA.png)

## demo
head over to [http://whiteboard.nonbeing.tech](http://whiteboard.nonbeing.tech)

## overview
Here's the source code for a very simple, real-time, full-stack-JS whiteboard and chat application.

We used :
- [paperjs](http://paperjs.org/) for the actual whiteboard
- [socket.io](http://socket.io) for client-server communication ala websockets
- [node.js](http://nodejs.org/en) and [express](http://expressjs.com/) at the server side.

We started with the "hello-world" socket.io application:
[socket.io Getting Started Guide](http://socket.io/get-started/chat/) as the skeleton on which to build the other pieces.

All in all, it's pretty amazing that we could complete almost all of the requirements of the problem statement in less than 150 LOC!

JS FTW!

## running
Install npm deps: `npm install` in the directory containing `package.json`

Start the server: `npm start` in the directory containing `package.json`

You should see something like:

```shell
[nodemon] starting `node server.js`
listening on *:3000
```

Point your browser to `http://localhost:3000` or `http://<your_ip_here>:3000`

Draw! Chat!

## hackathon: problem statement
Create a collaborative and real-time whiteboard

UI software should support all major platform (Ubuntu, MacOS X and Windows)
e.g. Browser, Java Swing etc.

**Within a network (LAN / Wifi LAN)**
(if possible do it without need of hosting server)

1. Participants should be able to collaborate the idea through whiteboard through UI canvas. Any participant should be able to draw random sketch on canvas using mouse pointer using different colours
1. Participants should be able to chat globally and scroll through history of chat

**Across Networks (Internet)**

1. Participants should be able to work Across Networks (Internet)
1. Participants should be able transfer a file to each other

File-transfer is not (yet) implemented. 

To have the app work across the Internet, we just needed to host it publicly and access the app at the public IP. There's a [live demo](http://whiteboard.nonbeing.tech) hosted on EC2, for example that works fine.


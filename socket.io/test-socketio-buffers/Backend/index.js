// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// const cors = require("cors")

// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   socket.on('message', (message) => {
//     console.log('Received message:', message);
//     io.emit('message', message);
//   });
//   socket.on('stream', (stream) => {
//     io.emit('stream', stream)
//   });
// });

// app.use(cors())

// server.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });

////////////////////////////////////////////////////////////////////////////////
// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('stream', (data) => {
//     console.log(data)
//     io.emit('stream', data);
//   });
// });

// server.listen(5000, () => {
//   console.log("server listening on port 5000")
// })
////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require("cors")
const fs = require("fs")

app.use(cors())

io.on('connection', (socket) => {
  socket.on('video-data', (data) => {
    console.log(data)
    console.log(data.buffer)
    socket.broadcast.emit('video-data', data);
  });
});

server.listen(5000, () => console.log("server listening on port 5000"));
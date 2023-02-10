// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   socket.on('message', (message) => {
//     console.log('Received message:', message);
//     io.emit('message', message);
//   });
// });

// server.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require("cors")
const { v4: uuidV4 } = require('uuid')

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  console.log("je connecte")
  socket.on('join-room', (roomId, userId) => {
    console.log("je join la room")
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      console.log("je déconnecte")
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(5001, () => console.log("server listening on port 5001"))
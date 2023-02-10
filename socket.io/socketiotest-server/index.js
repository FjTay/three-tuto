const express = require("express")
const app = express()
const http = require('http').createServer(app);
const cors = require("cors")
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*",
        // origin: ["http://localhost:3006", "http://localhost:3007",
        //     // "http://192.168.43.138:3006"
        //     "http://192.168.1.17:3006", "http://localhost:3000", "https://idyllic-bavarois-d90244.netlify.app"
        // ],
        methods: ["GET", "POST"]
    }
    // , transport: ["websockets"], upgrade: true
});

app.use(cors())

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send({ message: "Running !" })
});

let users = []

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)
    socket.on("message", data => {
        socketIO.emit("messageResponse", data)
    })

    socket.on('peerId', (id) => {
        console.log(`Received peerId: ${id}`);
        socket.broadcast.emit('newPeerId', id);
    });

    socket.on("typing", data => (
        socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
        users.push(data)
        socketIO.emit("newUserResponse", users)
    })

    socket.on("leavingEvent", data => {
        socket.disconnect()
    })

    socket.on("join-room", (eventID, userID) => {
        console.log(userID)
        console.log("joining room")
        socket.join(eventID)
        socket.to(eventID).emit("startingStream", userID)
    })

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter(user => user.socketID !== socket.id)
        socketIO.emit("newUserResponse", users)
        socket.disconnect()
    });

    socket.on("streamingEvent", data => {
        socketIO.emit("gettingstream", data)
    })
});


http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
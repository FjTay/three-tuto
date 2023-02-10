import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import { useEffect } from 'react';
import Peer from "peerjs"
import io from "socket.io-client"

const socket = io('https://origdigit.herokuapp.com/');

function App() {

  const peer = new Peer();
  peer.on('open', (id) => {
    // socket.emit("streamingEvent", "stream de l'admin")
    socket.emit('peerId', id);
    socket.emit('newUser', id);
  });

  socket.on('newPeerId', (id) => {
    const conn = peer.connect(id);
    conn.on('open', function () {
      conn.send('hi!');
      const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, function (stream) {
        const call = peer.call(conn.peer, stream);
        // call.on('stream', function (remoteStream) {
        //   // Show stream in some video/canvas element.
        // });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });
    });
    console.log(id)
  });

  socket.on("newUserResponse", users => {
    socket.emit("streamingEvent", "stream de l'admin")
  })

  return (
    <BrowserRouter>
      <div>
        <div>App ADMIN ORIGIN DIGITAL Frontend</div>
        <div id="video-container"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;


// const premiumCustomer = new Peer(undefined, {
//   host: "/",
//   port: '3001',
// })

// useEffect(() => {
//   // startVideoStream()
//   console.log("-- Component has mounted --");
//   const socket = socketIO.connect("http://localhost:4000")
//   socket.emit("join-room", "eventID", "userID")
//   socket.on("startingStream", (userID) => {
//     console.log(userID)
//   })
//   const conn = premiumCustomer.connect("adminID")
//   conn.on("open", () => {
//     conn.send("hello la room !!")
//   })
//   return () => {
//     socket.emit("leavingEvent", "je quitte l'event")
//     console.log("-- Component has unmounted --")
//   };
// }, []);

// function startVideoStream() {
//   const adminVideo = document.createElement('video')
//   adminVideo.muted = true
//   navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
//   }).then(stream => {
//     addVideoStream(adminVideo, stream)
//     premiumCustomer.on('call', (call) => {
//       console.log(" je call")
//       call.answer()
//       call.on("stream", stream => console.log(stream))
//     })
//   })
// }

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })
//   const videoContainer = document.getElementById("video-container")
//   videoContainer.append(video)
// }
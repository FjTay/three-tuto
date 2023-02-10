import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketIO from 'socket.io-client';
import { useEffect } from 'react';
import Peer from "peerjs"
import io from "socket.io-client"

// const socket = io("http://localhost:4000");
// const socket = io("192.168.43.138:4000");
const socket = io("https://origdigit.herokuapp.com/");

function App() {

  const peer = new Peer();
  peer.on('open', (id) => {
    socket.emit('peerId', id);
    socket.emit('newUser', id);
  });

  peer.on('connection', function (conn) {
    conn.on('data', function (data) {
      console.log(data);
    });
    peer.on('call', function (call) {
      call.answer()
      call.on('stream', function (remoteStream) {
        const video = document.getElementById("video")
        video.srcObject = remoteStream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      });
    });
  });

  socket.on("newUserResponse", users => {

  })

  return (
    <BrowserRouter>
      <div>
        <div>App Admin Frontend</div>
        <div id="video-container"></div>
        <video id="video" controls muted></video>
      </div>
    </BrowserRouter>
  );
}

export default App;


// const premiumCustomer = new Peer(undefined, {
//     host: "/",
//     port: '3001',
//   })

//   useEffect(() => {
//     startVideoStream()
//     console.log("-- Component has mounted --");
//     const socket = socketIO.connect("http://localhost:4000")
//     socket.emit("join-room", "eventID", "adminID")
//     socket.on("startingStream", (userID) => {
//       console.log(userID)
//     })
//     premiumCustomer.on('connection', function (conn) {
//       conn.on('data', function (data) {
//         console.log(data);
//       });
//     });
//     return () => {
//       socket.emit("leavingEvent", "je quitte l'event")
//       console.log("-- Component has unmounted --")
//     };
//   }, []);

//   function startVideoStream() {
//     const adminVideo = document.createElement('video')
//     adminVideo.muted = true
//     navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       addVideoStream(adminVideo, stream)
//       premiumCustomer.on('call', (call) => {
//         console.log(" je call")
//         call.answer(stream)
//       })
//     })
//   }

//   function addVideoStream(video, stream) {
//     video.srcObject = stream
//     video.addEventListener('loadedmetadata', () => {
//       video.play()
//     })
//     const videoContainer = document.getElementById("video-container")
//     videoContainer.append(video)
//   }
// import './App.css';

// function App() {
//   const socket = require('socket.io-client')('http://localhost:5000/', { transports: ['websocket'], upgrade: false });

//   socket.on('connect', () => {
//     console.log('Connected to server');

//     socket.on('message', (message) => {
//       console.log('Received message:', message);
//     });

//     socket.emit('message', 'Hello, server, I\'m working for you');
//   });

//   socket.on('disconnect', () => {
//     console.log('Disconnected from server');
//   });

//   navigator.mediaDevices.getUserMedia({
//     audio: true,
//     video: {
//       width: 320,
//       height: 240,
//       frameRate: {
//         ideal: 60,
//         min: 10
//       }
//     }
//   })
//     .then(function (stream) {
//       let options = { mimeType: 'video/webm; codecs=vp9' };
//       let mediaRecorder = new MediaRecorder(stream, options);
//       mediaRecorder.start(10000);
//       mediaRecorder.ondataavailable = (event) => {
//         socket.emit('arrayBuffer', event.data);
//       };
//     }).catch(function (err) {
//       console.log(err)
//     });

//   return (
//     <div className="App">
//       APP FILMANT
//     </div>
//   );
// }

// export default App;


import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
/////test { transports: ['websocket'], upgrade: false }
const socket = io('http://localhost:5000', { transports: ['websocket'], upgrade: false });

function VideoCapture() {
  const webcamRef = useRef(null);
  let mediaRecorder
  // const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleStart = () => {
    console.log("je démarre la camera")
    setTimeout(() => {
      const stream = webcamRef.current.stream;
      const options = { mimeType: 'video/webm;codecs=vp9' };
      mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.start(5000);
      // setMediaRecorder(mediaRecorder)
      mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
      // mediaRecorder.addEventListener('stop', handleStop);
    }, 1000)
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      // setRecordedChunks((prev) => [...prev, e.data]);
      socket.emit("video-data", e.data)
    }
    // handleStop()
  };

  const handleStop = () => {
    // const recordedBlob = new Blob(recordedChunks, {
    //   type: 'video/webm'
    // });
    //// test => envoyer le blob tel quel au server,
    // const url = URL.createObjectURL(recordedBlob);
    // socket.emit('video-data', recordedBlob);
    // setRecordedChunks([]);
    socket.emit("video-data", "end")
  };

  // const handleClear = () => {
  //   setRecordedChunks([]);
  // };

  // useEffect(() => {
  //   handleStart()
  // }, [])

  return (
    <div>
      <Webcam
        ref={webcamRef}
        width={320}
        height={240}
      />
      <button onClick={handleStart}>Start Recording</button>
      <button onClick={handleStop}>Stop Recording</button>
      {/* <button onClick={handleClear}>Clear</button> */}
    </div>
  );
}

export default VideoCapture;
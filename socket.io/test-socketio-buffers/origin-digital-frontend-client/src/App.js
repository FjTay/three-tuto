// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000', { transports: ['websocket'], upgrade: false });

// function VideoPlayer() {
//   // const [videoData, setVideoData] = useState(null);
//   const videoData = useRef()

//   useEffect(() => {
//     const video = document.getElementById("video")
//     console.log("j'update")
//     socket.on('video-data', (data) => {
//       const url = URL.createObjectURL(new Blob([data]));
//       videoData.current.src = url
//       video.play()
//       // setVideoData(url);
//     });
//   }, [videoData]);

//   return (
//     <div>
//       {console.log("je charge le component")}
//       {(
//         <video
//           id="video"
//           ref={videoData}
//           // src={videoData.current && videoData.current.src}
//           preload="none"
//           autoplay
//           muted
//           controls />
//       )
//       }APP PLAYING
//     </div>
//   );
// }

// export default VideoPlayer;



// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const VideoPlayer = () => {
//   const [buffer, setBuffer] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Connect to the backend server
//     const socket = io('http://localhost:5000', { transports: ['websocket'], upgrade: false });
//     setSocket(socket);

//     // Listen for incoming buffers
//     socket.on('video-data', (buf) => {
//       setBuffer(buf);
//     }, []);

//     // Clean up the connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       {buffer && (
//         <video controls preload='auto' muted autoplay>
//           <source src={URL.createObjectURL(new Blob([buffer]))} type="video/mp4" />
//         </video>
//       )
//       }
//     </div>
//   );
// };

// export default VideoPlayer;





import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const VideoPlayer = () => {
  const [buffer, setBuffer] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [previousBuffer, setPreviousBuffer] = useState(null);
  const socket = io('http://localhost:5000', { transports: ['websocket'], upgrade: false });

  useEffect(() => {
    socket.on('video-data', (buf) => {
      setBuffer(buf);
    }, []);
  }, []);

  useEffect(() => {
    if (buffer) {
      // Revoke the previous object URL
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      // Create a new object URL
      const newObjectUrl = URL.createObjectURL(new Blob([buffer]));
      setObjectUrl(newObjectUrl);
    }
  }, [buffer]);

  return (
    <div>
      {objectUrl && (
        <video controls preload='auto' muted autoplay key={buffer}>
          <source src={objectUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
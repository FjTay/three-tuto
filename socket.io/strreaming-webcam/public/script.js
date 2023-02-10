const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
  host: "/",
  port: '3001',
})

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  console.log("promesse")
  addVideoStream(myVideo, stream)
  console.log("je stream")
  myPeer.on('call', (call) => {
    console.log(" je call")
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      console.log("je recois la video")
      addVideoStream(video, userVideoStream)
    })
  })
  socket.on('user-connected', userId => {
    console.log("nouvelle connection utilisateur: " + userId)
    const random = () => connectToNewUser(userId, stream)
    setTimeout(random, 1000)
  })
}).catch((err) =>
  console.log(err)
)

socket.on('user-disconnected', userId => {
  console.log("je disconnect")
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  ("je join une room")
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  console.log("je connect new user")
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    console.log(peers)
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    console.log("je remove-close")
    video.remove()
  })
  peers[userId] = call
}

function addVideoStream(video, stream) {
  console.log("addvideoStream")
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}
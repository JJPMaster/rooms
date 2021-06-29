/*    
@licstart  The following is the entire license notice for the 
JavaScript code in this page.

Copyright (C) 2021 Onach Labs

The JavaScript code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.   


@licend  The above is the entire license notice
for the JavaScript code in this page.
*/
var ROOM_ID: string
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
// @ts-ignore
const myPeer = new Peer(undefined, {
  host: 'rooms-peerjs.herokuapp.com',
  secure: true,
  port: 443
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const method = urlParams.get('method')
if(method == "screen") {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia().then((stream: MediaStream) => {
    addVideoStream(myVideo, stream)
  
    myPeer.on('call', (call: any) => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })
    socket.on('user-connected', (userId: string) => {
        connectToNewUser(userId, stream)
    })
    $("#start-screenshare").hide()
})
}
else if (method == "audio") {
   window.location.href = "https://onach-rooms-audio.herokuapp.com" + window.location.pathname 
}
else {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then((stream: MediaStream) => {
      addVideoStream(myVideo, stream)
    
      myPeer.on('call', (call: any) => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })
      socket.on('user-connected', (userId: string) => {
        connectToNewUser(userId, stream)
    })
})
}

socket.on('user-disconnected', (userId: string) => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId: string, stream: MediaStream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}
$("#start-screenshare").on('click', function() {
  if(window.confirm("This feature is still currently being developed, and may not be fully functional. Are you sure you want to proceed? \n\nKnown bug: The screenshare does not automatically appear for the other members of the call, and they must refresh their pages before they will be able to see it. \n\nNote: You must allow pop-ups with your browser for this to work.")) {
    window.open("../call/" + ROOM_ID + "?method=screen")
    $("#start-screenshare").hide()
  }
})
function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}


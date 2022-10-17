
// let UserVideoStream;
let VideoGride = document.getElementById('each-video');
let MyVideo = document.createElement('video');
MyVideo.muted = true;

// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true,

// }).then( streamVideo =>{
//     UserVideoStream = streamVideo;
//     addVideoStream(MyVideo,streamVideo);
// });


// navigator.mediaDevices.getUserMedia =  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
//   }).then( stream =>{
//     UserVideoStream = stream;
//     addVideoStream(MyVideo,stream);
//     socket.on('user-connected',(UserId) => {

//       ConnectNewUser(UserId,stream);
//     });

// });


const constraints = {
  video: true,
  audio: true
}
// navigator.mediaDevices.getUserMedia(constraints)
//   .then(stream => {
//     addVideoStream(MyVideo,stream);
//   })
//   .catch(err => {
//     console.log(err); /* handle the error */
//     if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
//         //required track is missing 
//     } else if (err.name == "NotReadableError" || err.name == "TrackStartError") {
//         //webcam or mic are already in use 
//     } else if (err.name == "OverconstrainedError" || err.name == "ConstraintNotSatisfiedError") {
//         //constraints can not be satisfied by avb. devices 
//     } else if (err.name == "NotAllowedError" || err.name == "PermissionDeniedError") {
//         //permission denied in browser 
//     } else if (err.name == "TypeError" || err.name == "TypeError") {
//         //empty constraints object 
//     } else {
//         //other errors 
//     }
//   });

  const addVideoStream = (video,stream) => {

    video.srcObject = stream;
    video.addEventListener('loadedmetadata' ,()=> {
    video.play();
    });

    VideoGride.append(video);

    EachVideos.append(video);

}
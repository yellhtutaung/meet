
const socket = io('/');
// let VideoGrideRow = $('.video-gride-row');
// let MyVideo = document.createElement('video');
// MyVideo.muted = true;
// var UserVideoStream;
//
//
// var peer = new Peer({
//     path: '/peerjs',
//     // host: 'http://192.168.100.19',
//     host: '/',
//     port: '5500'
//   });
//
// const PeerUser = {};
//
//
//
// peer.on('open',id => {
//     socket.emit('join-room',RoomId,id);
//     console.log(id);
// });

// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
//   }).then(stream =>{
//     UserVideoStream = stream;   
//     addVideoStream(MyVideo,UserVideoStream);  // My video stream ( important )          


//     peer.on('call', call => {
//         call.answer(stream)
//         let UserVideo = document.createElement('video');
//         call.on('stream',UserVideoStream => {
//             addVideoStream(UserVideo,UserVideoStream); // The person who is join the room video stram
//         }); 
//     }); 

//     socket.on('user-connected',(UserId) => {
//       ConnectNewUser(UserId,stream);
//     });

// });

// User leave the room 

socket.emit('join-room',RoomId);
let UserQuantity = 0;

let RoomInfo = Object;

socket.on('user-connected',(RoomId,UserId) => {
    UserQuantity +=1;
    console.log(RoomId,UserId);
    console.log(`Room Id --> ${RoomId} in User Connected --> ${UserId}`);
    console.log(`User quantity --> ${UserQuantity}`);
});


socket.on('user-disconnected' , (UserId )=> {
    console.log('User '+ UserId + ' is disconnected ... ');
    console.log(`  ${UserQuantity >=1 ? UserQuantity-1:0}`);
    // if (PeerUser[UserId]) PeerUser[UserId].close(); // Close user videos and peer
});

// User leave the room 

// const ConnectNewUser = (UserId,stream) =>{

//     console.log('User ' +UserId+' is connected');
//     const call = peer.call(UserId,stream);
//     let UserVideo = document.createElement('video');

//     call.on('stream', UserVideoStream => {
//         addVideoStream(UserVideo,UserVideoStream);
//     });

//     call.on('close', ( )=> {
//         UserVideo.remove();
//     });

//     PeerUser[UserId] = call;
    
// }

// const addVideoStream = (video,stream) => {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata' ,()=> {
//     video.play();
//     });

//     VideoGrideRow.append(video);
//     $('video').addClass("each-video video col-md-6 col-sm-12");

// }

function CheckingSms(Sms)
{
    if(Sms.length >= 1)
    {
        socket.emit('user-sms',Sms,RoomId); //Sms emit to server
        $('.chat-list').append(`<div class="container-fluid">
                                    <div class="row">
                                        <div class="col-12">
                                            <li class="user-sms-txt animate__animated animate__fadeIn" >${Sms}
                                            </li>                                    
                                        </div>
                                    </div>
                                </div>`);
        scrollToBottom();
        smsSentSound();
        TypingSms.val('');
        TypingSms.focus();
    }
}


// Keyup Socket

TypingSms.keyup(function(){    
    socket.emit('typing-input-keyup',RoomId,$(this).val());    
});    
socket.on('server-keyup-emiting',(RoomId,KeyupVal) => {
    $('.typing-control').removeClass('d-none');
    $('.typing-sms').html(KeyupVal);
    // console.log(KeyupVal);
});

// Keyup Socket


// Sms Socket

socket.on('user-sms-val',(data) => {

    console.log(data.Sms);    

    $('.chat-list').append(`
        <div class="container-fluid">
            <div class="row">
                <div class="col-1">
                    <img class="partner-img-control " src="../img/user/u1.png" alt="user_name">
                </div><div >&nbsp;</div>
                <div class="col-10 ">
                    <li class="partner-sms-txt animate__animated animate__fadeIn">
                        ${data.Sms}
                    </li>
                </div>     
            </div>                                                  
        </div>`);
        scrollToBottom();    
        $('.typing-sms').html('');
        smsRecieveSound();
});

// Sms Socket

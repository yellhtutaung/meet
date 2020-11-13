const express = require('express');
const app = express();
// let socket = require('socket.io');
const { v4: uuidv4 } = require('uuid');
let server = require('http').Server(app);

const io = require('socket.io')(server);
const {ExpressPeerServer} = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug:true,
});


    app.use(express.static("public")); // Default path to public

    app.set('view engine','ejs');

    app.use('/peerjs',peerServer);


    app.get('/', (req, res) => {

        res.redirect(`room/${uuidv4()}`);
        // res.status(200).send(`${uuidv4()}`);
    });

    app.get(`/room/:roomId`,(req,res)=>{
        // res.status(200).send(`Min Ga La Par`,req.params.roomId);
        res.render('room',{roomId:req.params.roomId});

    });



    io.on('connection', socket => {

        // This is specific room
        
        socket.on('join-room', (RoomId,UserId) => {
            
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('user-connected',UserId);
            console.log(UserId);
            
            socket.on('disconnect' , () => {
                socket.to(RoomId).broadcast.emit('user-disconnected',UserId);
            });  
            
        });
        
        // This is specific room

        // Keyup Socket

        socket.on('typing-input-keyup' , (RoomId) => {
            console.log('This '+RoomId+ ' users is keyup');
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('server-keyup-emiting',RoomId);
        });
        
        // Keyup Socket


        // Sms Socket

        socket.on('user-sms' , (Sms,RoomId) => {
            console.log(Sms);
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('user-sms-val',{'Sms':Sms,'RoomId':RoomId});
        });

        // Sms Socket

    });


    // const LocalIp = '192.168.100.19';
    server.listen(5500, function () {
        console.log(" *** Port 5500 is listening ***");
    });







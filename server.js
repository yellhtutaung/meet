// const connectDb = require('./database/db');
const UserDb = require('./public/js/users.js');
const dotenv = require('dotenv');
const CheckAuth = require('./controller/authCheck.js');
// console.log( UserInfo);
const bodyparsar = require('body-parser');
//load config
dotenv.config({path:'./config/config.env'});
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const express = require('express');
const app = express();
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

app.use(bodyparsar.urlencoded({ extended: true})); // These code must me upper of the controller include
app.use(bodyparsar.json()); // These code must me upper of the controller include

// let socket = require('socket.io');
const { v4: uuidv4 } = require('uuid');
let server = require('http').Server(app);

const io = require('socket.io')(server);
const {ExpressPeerServer} = require('peer');
const { response, json } = require('express');
const peerServer = ExpressPeerServer(server,{
    debug:true,
});

    // For api 
    
    // adding Helmet to enhance your Rest API's security
    // app.use(helmet());

    // enabling CORS for all requests
    // app.use(cors());

    // adding morgan to log HTTP requests
    // app.use(morgan('combined'));


    
    // function generateAccessToken(username) {
    //     console.log(jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' })); 
    //   }
      

    // app.post('/api/createNewUser', (req, res) => {
    // // ...
    
    // const token = generateAccessToken({ username: 'yellhtutaung' });
    // res.json(token);
    
    // });

      
    // function authenticateToken(req, res, next) {
    //     const authHeader = req.headers['authorization']
    //     const token = authHeader && authHeader.split(' ')[1]
      
    //     if (token == null) return res.sendStatus(401)
      
    //     jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    //       console.log(err)
      
    //       if (err) return res.sendStatus(403)
      
    //         req.user = user
      
    //         next()
    //     })
    //   }


    //   app.get('/api/userOrders', authenticateToken, (req, res) => {
    //     // executes after authenticateToken
    //     // ...
    //     res.json('hello');
    //     console.log('authorize ok .....')
    //   })


    app.use(express.static("public")); // Default path to public

    app.set('view engine','ejs');

    app.use('/peerjs',peerServer);


    app.get('/', (req, res) => {

        res.redirect(`room/${uuidv4()}`);
        // res.render(`index`);
    });


    app.get(`/room/:roomId`,(req,res)=>{
        // res.status(200).send(`Min Ga La Par`,req.params.roomId);
        res.render('room',{roomId:req.params.roomId});

    });

    app.get('/login',(req,res) => {
        res.render(`auth/login`);
    });


    // app.post('/login',(req,res) => {
    //     res.json('login is starting ...');
    // });

    app.use('/',CheckAuth);

    io.on('connection', socket => {

        // This is specific room
        
        socket.on('join-room', (RoomId,UserId) => {
            
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('user-connected',RoomId,UserId);
            console.log(UserId);
            
            socket.on('disconnect' , () => {
                socket.to(RoomId).broadcast.emit('user-disconnected',UserId);
            });  
            
        });
        
        // This is specific room

        // Keyup Socket

        socket.on('typing-input-keyup' , (RoomId,KeyupVal) => {
            console.log('This '+RoomId+ ' users is keyup');
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('server-keyup-emiting',RoomId,KeyupVal);
        });
        
        // Keyup Socket


        // Sms Socket

        socket.on('user-sms' , (Sms,RoomId) => {
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('user-sms-val',{'Sms':Sms,'RoomId':RoomId});
        });

        // Sms Socket

    });


    const Port = process.env.PORT || 3300;
    // const LocalIp = '192.168.1.4';
    const Host = process.env.HOST ||  'localhost';

    server.listen(Port,Host, function () {
        console.log(`*** Port ${Host+':'+Port} is listening ***`);
        console.log(' -------------------------');
    });

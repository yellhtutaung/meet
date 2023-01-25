const connectDb = require('./database/db');
const authRoutes = require('./route/authRoutes');
const testRoutes = require('./route/testRoute');
const bodyparsar = require('body-parser');
const dotenv = require('dotenv');
//load config
dotenv.config({path:'./config/config.env'});
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const express = require('express');
const app = express();
// const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

app.use(bodyparsar.urlencoded({ extended: true})); // These code must me upper of the controllers include
app.use(bodyparsar.json()); // These code must be upper of the controllers include

const CheckAuth = require('./controllers/authCheckController.js');

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
    });

    app.get(`/room/:roomId`,(req,res)=>{
        res.render('room',{roomId:req.params.roomId});
    });

    app.use('/',authRoutes);
    app.use('/test',testRoutes);

    // app.use('/',CheckAuth);

    io.on('connection', socket =>
    {

        // This is specific room
        socket.on('join-room', (RoomId,UserId) =>
        {
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit('user-connected',RoomId,UserId);
            console.log(UserId);
            
            socket.on('disconnect' , () => {
                socket.to(RoomId).broadcast.emit('user-disconnected',UserId);
            });  
        });
        // This is specific room

        // Keyup Socket
        socket.on('typing-input-keyup' , (RoomId,KeyupVal) =>
        {
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
    });

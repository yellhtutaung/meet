const express = require('express');
let app = express();
const UserDb = require('../public/js/users.js');
let router = express.Router();
const mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

    router.post('/login',(req,res) => {
        
       let ClientEmail = req.body.email;
       let ClientPassword = req.body.password;
       console.log(ClientEmail,ClientPassword);

      // let ResponseText = '';
      //
      // UserInfo.map((User , Index)=> {
      //
      // // console.log(User);
      //    if(User.email == ClientEmail)
      //    {
      //       if(User.password == ClientPassword)
      //       {
      //          res.redirect('/');
      //       }
      //    }

      });

      //  window.location.href="/login";

      passport.use(new LocalStrategy(function verify(username, password, cb) {
         db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
           if (err) { return cb(err); }
           if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }
       
           crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
             if (err) { return cb(err); }
             if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
               return cb(null, false, { message: 'Incorrect username or password.' });
             }
             return cb(null, row);
           });
         });
       }));

    });
    
module.exports = router;
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/users.model');
const userTB = mongoose.model('users');


const createRegisterUser = (req,res)=>{

    console.log(req.body);

    let userDb = new userTB();
    userDb.id = 1;
    userDb.name = 'yell htut';
    userDb.userName = 'yellhtut007';
    userDb.email = req.body.email;
    // userDb.phone = req.body.name;
    userDb.password = req.body.password;
    userDb.date_of_birth = req.body.name;
    userDb.gender = req.body.name;
    userDb.profile = req.body.name;
    // userDb.role = req.body.name;
    userDb.hide_show = 1;
    // userDb.status = 1;
    // userDb.is_ban = 0;
    userDb.token = 'fskdjfl78sfd7fs98df7sd7f98fsd';

    userDb.save((err,doc) =>
    {
        if(!err){
            res.redirect('/');
            console.log('Congratulation user successfully add to the database');
        }else{
            console.log('Error Inserting in MongoDB >>> '+ err);
        }
    });
}

module.exports = {createRegisterUser};
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const {User} = require('../../models/users.model');
const userTB = mongoose.model('users');
const {getLastRecortOfModel} = require('../helpers/generalHelpers');

const createRegisterUser = (req,res)=>
{
    userTB.findOne({email: req.body.email}, (error, result) => {
        if (result) {
            res.redirect('/register');
            console.log({error: "Email already used "+error })
        } else {

            console.log(getLastRecortOfModel());
            res.redirect('/register');

            // let userDb = new userTB();
            // userDb.id = getLastRecortOfModel();
            // userDb.name = 'yell htut';
            // userDb.userName = 'yellhtut007';
            // userDb.email = req.body.email;
            // userDb.password = req.body.password;
            // userDb.date_of_birth = req.body.name;
            // userDb.gender = 'Male';
            // userDb.profile = req.body.name;
            // userDb.token = 'fskdjfl78sfd7fs98df7sd7f98fsd';
            // userDb.save((err,doc) =>
            // {
            //     if(!err){
            //         res.redirect('/');
            //         console.log('Congratulation user successfully add to the database');
            //     }else{
            //         console.log('Error Inserting in MongoDB >>> '+ err);
            //     }
            // });
        }
    });
    console.log('---------------------------------------------');
}

module.exports = {createRegisterUser};
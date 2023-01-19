const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('../../models/users.model');
const userTB = mongoose.model('users');

const getLastRecortOfModel = () =>
{
    userTB.find((error, result) => {
        console.log(result.length);
        console.log(typeof result.length);
        let insertNo = result.length == 0 ? 1 : 54545 ;
        console.log(insertNo);
        return insertNo;
    }).limit(1);
}

module.exports = {getLastRecortOfModel}
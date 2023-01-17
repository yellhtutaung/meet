const mongoose = require('mongoose');

var ebuzzySchema = new mongoose.Schema({
    id:{
        type: Number,
        required: "Id fiels is required"
    },
    name:{
        type: String,
        required: 'Name field is required'
    },
    userName:{
        type: String,
        default: null,
    },
    email:{
        type: String,
        required: 'Email is required'
    },
    phone:{
        type: String,
        default: null,
    },
    password:{
        type: String,
        required: 'Password is required'
    },
    date_of_birth:{
        type: String,
        default: null,
    },
    gender:{
        type: String,
        default: null,
    },
    profile:{
        type: String,
        default: null,
    },
    role:{
        type: String,
        default: 'user',
    },
    hide_show:{
        type: Number,
        default: 1,
    },
    status:{
        type: Number,
        default: 1,
    },
    is_ban:{
        type: Number,
        default: 0,
    },
    token:{
        type: String,
        required: 'Token is required'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users',ebuzzySchema);
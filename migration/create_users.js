const mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({

    id:{
        type: Number,
        required: "Id fiels is required"
    },
    PosterName:{
        type: String,
        required: 'This field is required'
    },
    PostText:{
        type: String
    },
    Status:{
        type: Number,
        required: 'Staus is required'
    }

});

var dd=mongoose.model('buzzy_posts',usersSchema);

module.exports = dd;

// Meet Database Structure ( MongoDb )
// ___________________________________
//
//
// Table Name ( users )
//
//
// 1  id
// 2  name_id
// 3   balance
// 4  name
// 5  gender
// 6  date_of_birth
// 7  role ( admin , vip , user ) // vip is purchase user
// 8  email
// 9  password
// 10 phone
// 11 profile
// 12 ban
// 13 status
// 14 token
// 15 created_at
// 16 updated_at
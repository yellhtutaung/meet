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
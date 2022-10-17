

const mongoose = require('mongoose');
const connectDb = async () =>
{
    try{
        const conn = await mongoose.connect('mongodb+srv://chatapp:0>1(yh)69hackAll@chatapp.mlt9a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
            console.log(`MongoDb is connected : ${conn.connection.host}`);
    }catch (err) {
            console.log(`${err}`);
    }
}

module.exports = connectDb();
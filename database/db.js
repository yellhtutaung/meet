const dotenv = require('dotenv');
//load config
dotenv.config({path:'./config/config.env'});
const mongoose = require('mongoose');
const connectDb = async () =>
{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL+'/'+process.env.DATABASE);
            console.log(`MongoDb is connected : ${conn.connection.host}`);
            console.log('****************************************');
    }catch (err) {
            console.log(`${err}`);
    }
}
module.exports = connectDb();
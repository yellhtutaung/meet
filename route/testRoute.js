const express = require("express");
const app = express();
const router = express.Router();
const testController = require('../controllers/testController');
const {json} = require("express");

router.get('/',(req,res)=>
{
    // let resByOpenAI = testController.generateImage('nature');
    res.render(`test`,{resByOpenAI:'resByOpenAI'});
});

router.post('/', async (req,res)=>
{
    // console.log(req.body.inputVal);
    return await testController.generateImage(req.body.inputVal);
    // .then(response => {
    //         console.log(response);
            // return res.json({code:200,resByOpenAI:response});
    // });

    // res.render(`test`,{resByOpenAI:resByOpenAI});
});

module.exports = router;
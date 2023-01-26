const express = require("express");
const app = express();
const router = express.Router();
const testController = require('../controllers/testController');
const {json, response} = require("express");

router.get('/',(req,res)=>
{
    // let resByOpenAI = testController.generateImage('nature');
    res.render(`test`,{resByOpenAI:'resByOpenAI'});
});

router.post('/', async (req,res)=>
{
    // console.log(req.body.inputVal);
    let generateUrl = await testController.generateImage(req.body.inputVal)
        .then(response =>{
            console.log(response);
            if (response != '404')
            {
                res.json({code:200,generateUrl:response});
            }else {
                res.json({code:404,message:`Can't generate picture`});
            }
            // return response;
        });

    // res.render(`test`,{resByOpenAI:resByOpenAI});
});

module.exports = router;
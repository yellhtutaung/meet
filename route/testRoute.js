const express = require("express");
const app = express();
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/',(req,res)=>
{
    res.render(`test`,{outData:testController.generateImage()});
});

module.exports = router;
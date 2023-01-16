const express = require("express");
const router = express.Router();

router.get('/login',(req,res) =>
{
    res.render(`auth/login`);
});

router.get('/forget-password',(req,res)=>
{
    res.render(`auth/forget-password`);
});

module.exports = router;
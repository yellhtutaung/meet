const express = require("express");
const app = express();
const router = express.Router();
const registerController = require('../controllers/auth/registerController');


router.get('/login',(req,res) =>
{
    res.render(`auth/login`);
});

router.post('/login',(req,res) =>
{
    // app.use('/',registerController);
});

router.get('/register',(req,res) =>
{
    res.render(`auth/register`);
});

router.post('/register',registerController.createRegisterUser);

router.get('/forget-password',(req,res)=>
{
    res.render(`auth/forget-password`);
});

module.exports = router;
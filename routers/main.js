const express = require('express');
const session = require('express-session')
const ctr_token = require('../libs/ctr_token');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('../views/index');
});

router.get('/editor',(req,res,next)=>{
    res.render('../views/article_editor');
});

router.get('/upfile',(req,res,next)=>{
    res.render('../views/upfile');
})

router.get('/account',(req,res,next)=>{
    res.render('../views/account');
})

router.get('/signout',(req,res,next)=>{
    res.location('../views/login');
});

router.get('/register',(req,res,next)=>{
    res.render('../views/register');
});

router.get('/login', (req, res, next) => {
    res.render('../views/login');
});

module.exports = router;
const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('../views/index',{
        token:req.token,
        uid:req.uid
    });
});

router.get('/editor',(req,res,next)=>{
    if(req.token && req.uid){
        res.render('../views/article_editor',{
            token:req.token,
            uid:req.uid
        });
    }else{
        res.redirect(302,'/login');
    }

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
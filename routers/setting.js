const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/basic',(req,res,nex)=>{
    if(req.token && req.userInfo.uid){
        res.render('../views/setting/basic',{
            token:req.token,
            userInfo:req.userInfo
        });
    }else{
        res.redirect(302,'/login');
    }
});

router.get('/profile',(req,res,nex)=>{
    if(req.token && req.userInfo.uid){
        res.render('../views/setting/profile',{
            token:req.token,
            userInfo:req.userInfo
        });
    }else{
        res.redirect(302,'/login');
    }
});

router.get('/blogs',(req,res,nex)=>{
    if(req.token && req.userInfo.uid){
        res.render('../views/setting/blogs',{
            token:req.token,
            userInfo:req.userInfo
        });
    }else{
        res.redirect(302,'/login');
    }
});

router.get('/reward',(req,res,nex)=>{
    if(req.token && req.userInfo.uid){
        res.render('../views/setting/reward',{
            token:req.token,
            userInfo:req.userInfo
        });
    }else{
        res.redirect(302,'/login');
    }
});

router.get('/misc',(req,res,nex)=>{
    if(req.token && req.userInfo.uid){
        res.render('../views/setting/misc',{
            token:req.token,
            userInfo:req.userInfo
        });
    }else{
        res.redirect(302,'/login');
    }
});


module.exports = router;
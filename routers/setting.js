const express = require('express');
const session = require('express-session')
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/basic',(req,res,nex)=>{
    res.render('../views/setting/basic');
})

router.get('/profile',(req,res,nex)=>{
    res.render('../views/setting/profile');
})

router.get('/reward',(req,res,nex)=>{
    res.render('../views/setting/reward');
})

router.get('/misc',(req,res,nex)=>{
    res.render('../views/setting/misc');
})


module.exports = router;
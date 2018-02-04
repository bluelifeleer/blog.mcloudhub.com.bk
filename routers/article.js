const express = require('express');
const session = require('express-session')
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/lists',(req,res,nex)=>{
    res.render('../views/articles/lists');
})

router.get('/details',(req,res,nex)=>{
    res.render('../views/articles/details');
})


module.exports = router;
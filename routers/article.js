const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/lists',(req,res,nex)=>{
    res.render('../views/articles/lists',{
        token:req.token,
        uid:req.uid
    });
})

router.get('/details',(req,res,nex)=>{
    res.render('../views/articles/details',{
        token:req.token,
        uid:req.uid
    });
})


module.exports = router;
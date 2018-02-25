const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('../views/photos/lists',{
        token:req.token,
        uid:req.uid,
        page_type: 'photos',
        title:'我的相册'
    });
})

module.exports = router;
const express = require('express');
const session = require('express-session')
const ctr_token = require('../libs/ctr_token');
const router = express.Router();
router.get('/', (req, res, next) => {
    // let data = {};
    // let token = ctr_token();
    // data.token = token;
    // console.log(data);
    // res.session.token = token;
    res.render('../views/index');
});

router.get('/editor',(req,res,next)=>{
    res.render('../views/article_editor');
});
module.exports = router;
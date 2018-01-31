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

router.get('/articles',(req, res, next)=>{
    // res.send('articles');
    res.render('../views/articles.html');
});


router.get('/login', (req, res, next) => {
    res.render('../views/login');
});

router.get('/register', (req, res, next) => {
    res.render('../views/register');
});
module.exports = router;
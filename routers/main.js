const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('../views/index');
});

router.get('/articles',(req, res, next)=>{
    // res.send('articles');
    res.render('../views/articles.html');
});

router.get('/article',(req, res, next)=>{
    res.render('../views/article_content.html');
})

router.get('/imgpgs',(req, res, next)=>{
    res.render('../views/imgpgs.html');
});

router.get('/articlefullwidth',(req,res,next)=>{
    res.render('../views/articlefullwidth.html');
})

router.get('/timeline',(req, res, next)=>{
    res.render('../views/timeline.html');
});

router.get('/login', (req, res, next) => {
    res.render('../views/login');
});

router.get('/register', (req, res, next) => {
    res.render('../views/register');
});
module.exports = router;
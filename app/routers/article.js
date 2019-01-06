const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/lists', (req, res, nex) => {
    res.render('../views/articles/lists', {
        token: req.token,
        uid: req.session.uid && req.cookies.uid,
        page_type: 'article_list',
        title: '文章列表'
    });
});

router.get('/details', (req, res, nex) => {
    res.render('../views/articles/details', {
        token: req.token,
        uid: req.session.uid && req.cookies.uid,
        page_type: 'article_details',
        title: '文章详情'
    });
});

router.get('/m/details', (req, res, nex) => {
    res.render('../views/articles/mobile/details', {
        token: req.token,
        uid: req.session.uid && req.cookies.uid,
        page_type: 'article_mobile_details',
        title: '文章详情'
    });
});

module.exports = router;
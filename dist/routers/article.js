'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();

router.get('/lists', function (req, res, nex) {
    res.render('../views/articles/lists', {
        token: req.token,
        uid: req.session.uid && req.cookies.uid,
        page_type: 'article_list',
        title: '文章列表'
    });
});

router.get('/details', function (req, res, nex) {
    res.render('../views/articles/details', {
        token: req.token,
        uid: req.session.uid && req.cookies.uid,
        page_type: 'article_details',
        title: '文章详情'
    });
});

module.exports = router;
//# sourceMappingURL=article.js.map
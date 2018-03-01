'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('../views/index', {
        token: req.token,
        uid: req.uid,
        page_type: 'index',
        title: '博客'
    });
});

router.get('/editor', function (req, res, next) {
    if (req.token && req.uid) {
        res.render('../views/article_editor', {
            token: req.token,
            uid: req.uid,
            page_type: 'editor'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/upfile', function (req, res, next) {
    if (req.token && req.uid) {
        res.render('../views/upfile', {
            token: req.token,
            uid: req.uid,
            page_type: 'upfile'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/account', function (req, res, next) {
    if (req.token && req.uid) {
        res.render('../views/account/account', {
            token: req.token,
            uid: req.uid,
            page_type: 'account',
            title: '我的主页'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/account/collections/lists', function (req, res, next) {
    res.render('../views/account/collections/lists', {
        token: req.token,
        page_type: 'collections_list',
        uid: req.uid,
        title: '专题列表'
    });
});

router.get('/account/collections/new', function (req, res, next) {
    if (req.token && req.uid) {
        res.render('../views/account/collections/new', {
            token: req.token,
            page_type: 'collections_new',
            uid: req.uid,
            title: '专题列表'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/account/collections/detailes', function (req, res, next) {
    res.render('../views/account/collections/detailes', {
        token: req.token,
        page_type: 'collections_detailes',
        uid: req.uid,
        coll_id: req.query.id,
        title: '专题详情'
    });
});

router.get('/account/dcs', function (req, res, next) {
    res.render('../views/account/document/detailes', {
        token: req.token,
        page_type: 'document_detailes',
        uid: req.uid,
        coll_id: req.query.id,
        title: '文集详情'
    });
});

router.get('/register', function (req, res, next) {
    res.render('../views/register');
});

router.get('/login', function (req, res, next) {
    res.render('../views/login');
});

module.exports = router;
//# sourceMappingURL=main.js.map
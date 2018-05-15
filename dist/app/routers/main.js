'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('../views/index', {
        platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
        uid: req.session.uid && req.cookies.uid,
        page_type: 'index',
        title: '鸿笺书信'
    });
});

router.get('/editor', function (req, res, next) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/article_editor', {
            platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
            uid: req.session.uid && req.cookies.uid,
            page_type: 'editor'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/upfile', function (req, res, next) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/upfile', {
            platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
            uid: req.session.uid && req.cookies.uid,
            page_type: 'upfile'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/account', function (req, res, next) {
    res.render('../views/account/account', {
        platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
        uid: req.session.uid && req.cookies.uid,
        quid: req.query.uid ? req.query.uid : req.session.uid || req.cookies.uid,
        page_type: 'account',
        title: '我的主页'
    });
});

router.get('/account/collections/lists', function (req, res, next) {
    res.render('../views/account/collections/lists', {
        platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
        page_type: 'collections_list',
        uid: req.session.uid && req.cookies.uid,
        title: '专题列表'
    });
});

router.get('/account/collections/new', function (req, res, next) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/account/collections/new', {
            page_type: 'collections_new',
            platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
            uid: req.session.uid && req.cookies.uid,
            title: '新增专题'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/account/collections/edit', function (req, res, next) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    var coll_id = req.query.id ? req.query.id : '';
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/account/collections/new', {
            page_type: 'collections_edit',
            platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
            uid: req.session.uid && req.cookies.uid,
            title: '修改专题',
            coll_id: coll_id
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/account/collections/detailes', function (req, res, next) {
    res.render('../views/account/collections/detailes', {
        platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
        page_type: 'collections_detailes',
        uid: req.session.uid && req.cookies.uid,
        coll_id: req.query.id,
        title: '专题详情'
    });
});

router.get('/account/dcs', function (req, res, next) {
    res.render('../views/account/document/detailes', {
        page_type: 'document_detailes',
        platform: req.platform ? req.platform : req.cookies.get('platform') ? req.cookies.get('platform') : '',
        uid: req.session.uid && req.cookies.uid,
        coll_id: req.query.id,
        title: '文集详情'
    });
});

router.get('/register', function (req, res, next) {
    res.render('../views/register', {
        page_type: 'register',
        title: '注册帐号'
    });
});

router.get('/login', function (req, res, next) {
    res.render('../views/login', {
        page_type: 'login',
        title: '用户登录'
    });
});

router.get('/mail', function (req, res, next) {
    res.render('../views/mail/mail', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/mail/new', function (req, res, next) {
    res.render('../views/mail/index', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/mail/draft', function (req, res, next) {
    res.render('../views/mail/draft', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/mail/setting', function (req, res, next) {
    res.render('../views/mail/setting', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/qrcode', function (req, res, next) {
    res.render('../views/qrcode', {
        page_type: 'qrcode',
        title: '二维码生成'
    });
});

module.exports = router;
//# sourceMappingURL=main.js.map
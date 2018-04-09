'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();

router.get('/basic', function (req, res, nex) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/basic', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_basic',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/profile', function (req, res, nex) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/profile', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_profile',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/blogs', function (req, res, nex) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/blogs', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_blogs',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/reward', function (req, res, nex) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/reward', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_reward',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/misc', function (req, res, nex) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/misc', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_misc',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/applactions', function (req, res, next) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/applactions', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_applactions',
            title: '我的应用'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/applactions/new', function (req, res, next) {
    var redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/app_new', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_applactions',
            title: '我的应用'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

module.exports = router;
//# sourceMappingURL=setting.js.map
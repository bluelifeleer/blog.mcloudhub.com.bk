'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();

router.get('/basic', function (req, res, nex) {
    if (req.token && req.uid) {
        res.render('../views/setting/basic', {
            token: req.token,
            uid: req.uid,
            page_type: 'setting_basic',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/profile', function (req, res, nex) {
    if (req.token && req.uid) {
        res.render('../views/setting/profile', {
            token: req.token,
            uid: req.uid,
            page_type: 'setting_profile',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/blogs', function (req, res, nex) {
    if (req.token && req.uid) {
        res.render('../views/setting/blogs', {
            token: req.token,
            uid: req.uid,
            page_type: 'setting_blogs',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/reward', function (req, res, nex) {
    if (req.token && req.uid) {
        res.render('../views/setting/reward', {
            token: req.token,
            uid: req.uid,
            page_type: 'setting_reward',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/misc', function (req, res, nex) {
    if (req.token && req.uid) {
        res.render('../views/setting/misc', {
            token: req.token,
            uid: req.uid,
            page_type: 'setting_misc',
            title: '用户设置'
        });
    } else {
        res.redirect(302, '/login');
    }
});

module.exports = router;
//# sourceMappingURL=setting.js.map
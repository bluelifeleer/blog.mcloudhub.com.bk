'use strict';

var express = require('express');
var ctr_token = require('../libs/ctr_token');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('../views/index', {
        token: req.token,
        uid: req.uid
    });
});

router.get('/editor', function (req, res, next) {
    if (req.token && req.uid) {
        res.render('../views/article_editor', {
            token: req.token,
            uid: req.uid
        });
    } else {
        res.redirect(302, '/login');
    }
});

router.get('/upfile', function (req, res, next) {
    res.render('../views/upfile');
});

router.get('/account', function (req, res, next) {
    res.render('../views/account');
});

router.get('/signout', function (req, res, next) {
    res.location('../views/login');
});

router.get('/register', function (req, res, next) {
    res.render('../views/register');
});

router.get('/login', function (req, res, next) {
    res.render('../views/login');
});

module.exports = router;
//# sourceMappingURL=main.js.map
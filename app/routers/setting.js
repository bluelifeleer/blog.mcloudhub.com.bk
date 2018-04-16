const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();

router.get('/basic', (req, res, nex) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
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

router.get('/profile', (req, res, nex) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
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

router.get('/blogs', (req, res, nex) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
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

router.get('/reward', (req, res, nex) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
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

router.get('/misc', (req, res, nex) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
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

router.get('/applactions', (req, res, next)=>{
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
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

router.get('/applactions/new', (req, res, next)=>{
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/app_new', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_applactions_new',
            title: '我的应用'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/applactions/edit', (req, res, next)=>{
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/setting/app_new', {
            uid: req.session.uid && req.cookies.uid,
            page_type: 'setting_applactions_edit',
            app_id : req.query.id,
            title: '我的应用'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});


module.exports = router;

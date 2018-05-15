const express = require('express');
const ctr_token = require('../libs/ctr_token');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.render('../views/index', {
        platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
        uid: req.session.uid && req.cookies.uid,
        page_type: 'index',
        title: '鸿笺书信'
    });
});

router.get('/editor', (req, res, next) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/article_editor', {
            platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
            uid: req.session.uid && req.cookies.uid,
            page_type: 'editor',
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/upfile', (req, res, next) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/upfile', {
            platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
            uid: req.session.uid && req.cookies.uid,
            page_type: 'upfile',
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
})

router.get('/account', (req, res, next) => {
    res.render('../views/account/account', {
        platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
        uid: req.session.uid && req.cookies.uid,
        quid: req.query.uid ? req.query.uid : (req.session.uid || req.cookies.uid),
        page_type: 'account',
        title: '我的主页'
    });
})

router.get('/account/collections/lists', (req, res, next) => {
    res.render('../views/account/collections/lists', {
        platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
        page_type: 'collections_list',
        uid: req.session.uid && req.cookies.uid,
        title: '专题列表'
    });
});

router.get('/account/collections/new', (req, res, next) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/account/collections/new', {
            page_type: 'collections_new',
            platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
            uid: req.session.uid && req.cookies.uid,
            title: '新增专题'
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/account/collections/edit', (req, res, next) => {
    let redirect_uri = req.protocol + '://' + req.get('host') + req.originalUrl;
    let coll_id = req.query.id ? req.query.id : '';
    if (req.session.uid && req.cookies.uid) {
        res.render('../views/account/collections/new', {
            page_type: 'collections_edit',
            platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
            uid: req.session.uid && req.cookies.uid,
            title: '修改专题',
            coll_id: coll_id
        });
    } else {
        res.redirect(302, '/login?redirect_uri=' + redirect_uri);
    }
});

router.get('/account/collections/detailes', (req, res, next) => {
    res.render('../views/account/collections/detailes', {
        platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
        page_type: 'collections_detailes',
        uid: req.session.uid && req.cookies.uid,
        coll_id: req.query.id,
        title: '专题详情'
    });
});

router.get('/account/dcs', (req, res, next) => {
    res.render('../views/account/document/detailes', {
        page_type: 'document_detailes',
        platform: req.platform ? req.platform : (req.cookies.get('platform') ? req.cookies.get('platform') : ''),
        uid: req.session.uid && req.cookies.uid,
        coll_id: req.query.id,
        title: '文集详情'
    });
});

router.get('/register', (req, res, next) => {
    res.render('../views/register', {
        page_type: 'register',
        title: '注册帐号'
    });
});

router.get('/login', (req, res, next) => {
    res.render('../views/login', {
        page_type: 'login',
        title: '用户登录'
    });
});

router.get('/mail', (req, res, next) => {
    res.render('../views/mail/mail', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/mail/new', (req, res, next) => {
    res.render('../views/mail/index', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/mail/draft', (req, res, next) => {
    res.render('../views/mail/draft', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/mail/setting', (req, res, next) => {
    res.render('../views/mail/setting', {
        page_type: 'mail',
        title: '邮件'
    });
});

router.get('/qrcode', (req, res, next)=>{
    res.render('../views/qrcode', {
        page_type: 'qrcode',
        title: '二维码生成'
    });
});


router.get('/vuetest', (req, res, next)=>{
    res.render('../views/vuetest', {
        title: 'Vue测试'
    });
});

module.exports = router;
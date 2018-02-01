const express = require('express');
// const cookies = require('cookies');
const cookie = require('cookie');
const session = require('express-session');
const md5 = require('md5');
const salt = require('../libs/salt');
const crt_token = require('../libs/ctr_token');
const router = express.Router();
const Users = require('../models/Users_model');
const Tags = require('../models/Tags_model');
const Slide = require('../models/Slide_model');

let responseData = {};

router.use(function(req, res, next) {
    responseData = {
        code: 0,
        msg: '',
        ok:false,
        data: null
    };
    next();
});

/**
 * 获取TOKEN
 */
router.get('/gettoken',(req, res, next)=>{
    responseData.code = 1;
    responseData.msg = 'success';
    responseData.ok = true;
    responseData.data = {
        token:crt_token()
    };
    res.json(responseData);
    return;
})

/**
 * 获取所有标签
 */
router.get('/tags',(req, res, next)=>{
    // console.log(Tags);
    // res.send();
    Tags.find().then(tags=>{
        if(tags){
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = tags;
            res.json(responseData);
            return;
        }else{
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
            return;
        }
    });
});

/**
 * 获取幻灯片
 */
router.get('/slides',(req, res, next)=>{
    Slide.find().then(slides=>{
        if(slides){
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = slides;
            res.json(responseData);
            return;
        }else{
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
            return;
        }
    });
})

router.post('/signin', (req, res, next) => {
    let username = req.body.name;
    let userpwd = req.body.password;
    if (username == '') {
        responseData.code = 0;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (userpwd == '') {
        responseData.code = 0;
        responseData.msg = "密码不能为空";
        res.json(responseData);
        return;
    }

    Users.findOne({
        name: username
    }).then(function(userInfo) {
        if (userInfo) {
            console.log(cookie);
            console.log(res.cookie);
            res.cookie('uid',userInfo._id,{
                // signed: true,
                secure:true,
                httpOnly: false,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });
            // cookies.set('uid', userInfo._id, { signed: true });
            // res.cookie.set('uid',userInfo._id);
            // res.setHeader('Set-Cookie', cookie.serialize('uid', userInfo._id, {
            //     secure:true,
            //     httpOnly: false,
            //     maxAge: 60 * 60 * 24 * 7 // 1 week
            // }));
            responseData.code = 1;
            responseData.msg = "success";
            responseData.ok = true;
            responseData.data = userInfo;
            res.json(responseData);
            return;
        } else {
            responseData.code = 0;
            responseData.msg = "您还没有帐号，请注册帐号";
            responseData.data = '';
            res.json(responseData);
        }
    });
});

router.post('/signup',(req, res, next)=>{
    let username = req.body.name;
    let userpwd = req.body.password;
    if (username == '') {
        responseData.code = 0;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (userpwd == '') {
        responseData.code = 0;
        responseData.msg = "密码不能为空";
        res.json(responseData);
        return;
    }

    Users.findOne({
        name: username
    }).then(function(userInfo) {
        if (userInfo) {
            // cookies.set('uid', userInfo._id, { signed: true });
            // res.cookies.set('uid',userInfo._id);
            responseData.code = -4;
            responseData.msg = "用户已注册";
            res.json(responseData);
            return;
        } else {
            let t_salt = salt();
            let newUsers = new Users({
                name: username,
                password: md5(userpwd+t_salt),
                salt:t_salt
            });
            // console.log(newUsers);
            return newUsers.save();
            // console.log(newUsers);
        }
    }).then(newuser => {
        // cookies.set('uid', newuser._id, { signed: true });
        // res.cookies.set('uid',newuser._id);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = newuser._id;
        res.json(responseData);
    });
})

router.get('/login', (req, res, next) => {
    res.send('api');
});

module.exports = router;
const express = require('express');
// const cookies = require('cookies');
const cookie = require('cookie');
const session = require('express-session');
const md5 = require('md5');
const salt = require('../libs/salt');
const router = express.Router();
const Users = require('../models/Users_model');

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
            responseData.msg = "error";
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
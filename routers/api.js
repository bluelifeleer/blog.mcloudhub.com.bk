var express = require('express');
var cookies = require('cookies');
var router = express.Router();
var Users = require('../models/Users_model');

let responseData = {};

router.use(function(req, res, next) {
    responseData = {
        code: 0,
        msg: '',
        data: null
    };
    next();
});

router.post('/sigin', (req, res, next) => {
    let username = req.body.username;
    let userpwd = req.body.userpwd;
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
            var newUsers = new Users({
                name: username,
                password: userpwd
            });
            return newUsers.save();
            // console.log(newUsers);
        }
    }).then(newuser => {
        // cookies.set('uid', newuser._id, { signed: true });
        // res.cookies.set('uid',newuser._id);
        responseData.code = 1;
        responseData.msg = newuser._id;
        res.json(responseData);
    });
});

router.get('/login', (req, res, next) => {
    res.send('api');
});

module.exports = router;
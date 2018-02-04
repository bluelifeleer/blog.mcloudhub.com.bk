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
const Geetest = require('gt3-sdk');
const emailRegexp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
const phoneRegexp = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;

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

router.get('/gettest',(req,res,next)=>{
    let captcha = new Geetest({
        geetest_id: 'e46e906d776dbd41c4e72f72499ca39f',
        geetest_key: '30b094aad22445378f7fdc01b83215bb'
    }).register(null,(err,data)=>{
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
        // console.log(data);

        // if (!data.success) {
        //     // 进入 fallback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
        //     // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址
        //     // 为以防万一，你可以选择以下两种方式之一：
        //     // 1. 继续使用极验提供的failback备用方案
        //     req.session.fallback = true;
        //     res.send(data);
        //     // 2. 使用自己提供的备用方案
        //     // todo
        // } else {
        //     // 正常模式
        //     req.session.fallback = false;
        //     res.send(data);
        // }
    });
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
    let name = req.body.name;
    let password = req.body.password;
    let token = req.body.token;
    let form = req.body.form;
    let validateCode = form == 'login' ? req.body.validateCode : '';
    let remember = req.body.remember;
    if (name == '') {
        responseData.code = 0;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (password == '') {
        responseData.code = 0;
        responseData.msg = "密码不能为空";
        res.json(responseData);
        return;
    }
    if(token == ''){
        responseData.code = 0;
        responseData.msg = "非法请求";
        res.json(responseData);
        return;
    }
    if(form == 'login'){
        if(validateCode == ''){
            responseData.code = 0;
            responseData.msg = "请先通过验证";
            res.json(responseData);
            return;
        }
    }
    let user = {};
    if(emailRegexp.test(name)){
        user.email = name;
    }else if(phoneRegexp.test(name)){
        user.phone = name;
    }else{
        user.name = name;
    }
    Users.findOne(user).then(function(userInfo) {
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
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;
    let token = req.body.token;
    if(token == ''){
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    if (name == '') {
        responseData.code = 0;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (password == '') {
        responseData.code = 0;
        responseData.msg = "密码不能为空";
        res.json(responseData);
        return;
    }

    if(password != passwordConfirm){
        responseData.code = 0;
        responseData.msg = "两次输入密码不同";
        res.json(responseData);
        return;
    }

    let t_salt = salt();
    let user = {};
    if(emailRegexp.test(name)){
        user.email = name;
    }else if(phoneRegexp.test(name)){
        user.phone = name;
    }else{
        user.name = name;
    }
    user.phone = phone;
    user.password = md5(password+t_salt);
    user.salt = t_salt;

    let newUsers = new Users(user);
    newUsers.save().then(inser => {
        // cookies.set('uid', newuser._id, { signed: true });
        // res.cookies.set('uid',newuser._id);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '注册成功';
        responseData.data = {id:inser._id};
        res.json(responseData);
    });
})


module.exports = router;
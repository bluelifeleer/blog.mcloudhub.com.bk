const express = require('express');
const md5 = require('md5');
const sillyDateTime = require('silly-datetime');
const salt = require('../libs/salt');
const crt_token = require('../libs/ctr_token');
const router = express.Router();
const Users = require('../models/Users_model');
const Docs = require('../models/Document_model');
const Articles = require('../models/Articles_model');
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
    if(req.cookies.get('token') && req.cookies.get('token') != ''){
        responseData.data = {
            token:req.cookies.get('token')
        };
    }else{
        let token = crt_token();
        responseData.data = {
            token:crt_token
        };
    }
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

router.get('/getUsers',(req, res, next)=>{
    let uid = req.query.uid;
    Users.findOne({_id:uid}).then(usersInfo=>{
        if(usersInfo){
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = usersInfo;
            res.json(responseData);
        }else{
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/getDocLists',(req, res, next)=>{
    let uid = req.query.uid;
    Docs.find({uid:uid}).then(docs=>{
        if(docs){
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = docs;
            res.json(responseData);
        }else{
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/getArticleLists',(req, res, next)=>{
    let doc_id = req.query.doc_id;
    console.log(doc_id);
    Articles.find({
        doc_id:doc_id,
    }).then(articles=>{
        // console.log(articles);
        if(articles){
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = articles;
            res.json(responseData);
        }else{
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/getArticle',(req, res, next)=>{
    let id = req.query.id;
    Articles.findOne({_id:id}).then(article=>{
        if(article){
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = article;
            res.json(responseData);
        }else{
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
})

router.post('/signin', (req, res, next) => {
    let name = req.body.name;
    let password = req.body.password;
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
            if(userInfo.password == md5(password+userInfo.salt)){
                responseData.code = 1;
                responseData.msg = "success";
                responseData.ok = true;
                responseData.data = userInfo;
                let cookiesData = {};
                cookiesData.uid = userInfo._id;
                cookiesData.type = userInfo.type;
                if(userInfo.type == 3){
                    cookiesData.email = userInfo.email;
                }else if(userInfo.type == 2){
                    cookiesData.phone = userInfo.phone;
                }else{
                    cookiesData.username = userInfo.name;
                }

                req.cookies.set('user_info',JSON.stringify(cookiesData));
                req.cookies.set('token',crt_token());
                res.json(responseData);
                return;
            }else{
                responseData.code = 2;
                responseData.msg = "登录失败，密码不正确";
                responseData.ok = false;
                responseData.data = null;
                res.json(responseData);
            }
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

    let findData = {};
    if(emailRegexp.test(name)){
        findData.email = name;
    }else if(phoneRegexp.test(name)){
        findData.phone = name;
    }else{
        findData.name = name;
    }
    Users.findOne(findData).then(userInfo=>{
        if(userInfo){
            responseData.code = 0;
            responseData.ok = false;
            responseData.msg = '帐号已存在，请注册新帐号';
            responseData.data = null;
            res.json(responseData);
        }else{
            let t_salt = salt();
            let user = {
                name:'',
                phone : '',
                email : '',
                password:'',
                salt : '',
                sex: 3,
                nick: '',
                wechat: '',
                qq: '',
                avatar: '',
                signature:'',
                website: '',
                introduce : '',
                editors : 2,
                add_date : sillyDateTime.format(new Date(),'YYYY-MMM-DD HH:mm:ss'),
                isDel : 0,
            };
            if(emailRegexp.test(name)){
                user.email = name;
                user.type = 3;
            }else if(phoneRegexp.test(name)){
                user.phone = name;
                user.type = 2;
            }else{
                user.name = name;
                user.type = 1;
            }
            user.name = name;
            user.salt = t_salt;
            user.password = md5(password+t_salt);
            let newUsers = new Users(user);
            return newUsers.save();
        }
    }).then(inser => {
        if(inser){
            responseData.code = 1;
            responseData.ok = true;
            responseData.msg = '注册成功';
            responseData.data = {id:inser._id};
            res.json(responseData);
        }else{
            responseData.code = 2;
            responseData.ok = true;
            responseData.msg = '注册失败';
            responseData.data = null;
            res.json(responseData);
        }
    });
});

router.get('/signout',(req,res,next)=>{
    req.cookies.set('token','');
    req.cookies.set('user_info','');
    req.token = '';
    req.userInfo = null;
    res.redirect(302,'/login');
});

router.post('/updateUserBasic',(req,res,next)=>{
    let token = req.body.token;
    let uid = req.body.uid;
    let updateUserBasic = {
        nick: req.body.nick,
        phone: req.body.phone,
        email: req.body.email,
        editors: req.body.editors,
        avatar: req.body.avatar,
        qq:req.body.qq,
        wechat:req.body.wechat
    };
    if(token == ''){
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Users.update({_id:uid},updateUserBasic,{multi:false},(err,docs)=>{
        if(err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '用户基础信息修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/changeProfile',(req,res,next)=>{
    let token = req.body.token;
    let uid = req.body.uid;
    let updateProfile = {
        sex:req.body.sex,
        introduce:req.body.introduce,
        website:req.body.website
    };
    if(token == ''){
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Users.update({_id:uid},updateProfile,{multi:false},(err,docs)=>{
        if(err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '用户个人资料修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/changeReward',(req,res,next)=>{
    let token = req.body.token;
    let uid = req.body.uid;
    let updateReward = {
        rewardStatus:req.body.rewardStatus,
        rewardDesc:req.body.rewardDesc
    };
    if(token == ''){
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Users.update({_id:uid},updateReward,{multi:false},(err,docs)=>{
        if(err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '赞赏修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/saveArticle',(req,res,next)=>{
    let token = req.body.token;
    let id = req.body.id;
    let contents = req.body.contents;
    let title = req.body.title;
    if(token == ''){
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Articles.update({_id:id},{contents:contents,title:title},{multi:false},(err,docs)=>{
        if(err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.get('/downloadAllArticles',(req,res,next)=>{
    responseData.code = 1;
    responseData.ok = true;
    responseData.msg = '所有文章打包下载完成';
    responseData.data = {};
    res.json(responseData);
})

router.post('/newDocument',(req,res,next)=>{
    let uid = req.body.uid;
    let name = req.body.name;
    let docs = new Docs({
        uid:uid,
        name: name,
        photos: '',
        describe: '',
        add_date: sillyDateTime.format(new Date(),'YYYY-MMM-DD HH:mm:ss'),
        isDel: 0,
    });
    docs.save().then(insert=>{
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文集创建成功';
        responseData.data = {id:insert._id};
        res.json(responseData);
    });
});

router.post('/newArticle',(req,res,next)=>{
    let uid = req.body.uid;
    let doc_id = req.body.doc_id;
    let token = req.body.token;
    if(token == ''){
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    let article = new Articles({
        uid: uid,
        doc_id:doc_id,  // 文章所属文档id
        title: sillyDateTime.format(new Date(),'YYYY-MMM-DD'), // 文章标题
        describe: '', // 文章描述
        photos: '', // 文章图片
        contents: '', // 文章内容
        watch: 0,
        start: 0,
        fork: 0,
        add_date: sillyDateTime.format(new Date(),'YYYY-MMM-DD HH:mm:ss'),
        isDel: 0,
    });
    article.save().then(insert =>{
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章创建成功';
        responseData.data = {id:insert._id};
        res.json(responseData);
    });
});

module.exports = router;
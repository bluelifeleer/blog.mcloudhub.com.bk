'use strict';

var fs = require('fs');
var express = require('express');
var md5 = require('md5');
var sillyDateTime = require('silly-datetime');
var multer = require('multer');
var Geetest = require('gt3-sdk');
var salt = require('../libs/salt');
var crt_token = require('../libs/ctr_token');
var router = express.Router();
var Users = require('../models/Users_model');
var Docs = require('../models/Document_model');
var Articles = require('../models/Articles_model');
var Discuss = require('../models/Discuss_model');
var Tags = require('../models/Tags_model');
var Slide = require('../models/Slide_model');
var Photos = require('../models/Photos_model');
var Collections = require('../models/Collections_model');
var emailRegexp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
var phoneRegexp = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
var uoloader = multer(); //{dest: 'uploads/'}设置dest表示上传文件的目录，如果不设置上传的文件永远在内存之中不会保存到磁盘上。在此处为了在内存中取出文件并重命名所以不设置文件上传路径
var NowDate = new Date();

var responseData = {};

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: '',
        ok: false,
        data: null
    };
    next();
});

router.get('/gettest', function (req, res, next) {
    var captcha = new Geetest({
        geetest_id: 'e46e906d776dbd41c4e72f72499ca39f',
        geetest_key: '30b094aad22445378f7fdc01b83215bb'
    }).register(null, function (err, data) {
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
router.get('/gettoken', function (req, res, next) {
    responseData.code = 1;
    responseData.msg = 'success';
    responseData.ok = true;
    if (req.cookies.get('token') && req.cookies.get('token') != '') {
        responseData.data = {
            token: req.cookies.get('token')
        };
    } else {
        var token = crt_token();
        responseData.data = {
            token: crt_token
        };
    }
    res.json(responseData);
    return;
});

/**
 * 获取所有标签
 */
router.get('/tags', function (req, res, next) {
    // console.log(Tags);
    // res.send();
    Tags.find().then(function (tags) {
        if (tags) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = tags;
            res.json(responseData);
            return;
        } else {
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
router.get('/slides', function (req, res, next) {
    Slide.find().then(function (slides) {
        if (slides) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = slides;
            res.json(responseData);
            return;
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
            return;
        }
    });
});

router.get('/getUsers', function (req, res, next) {
    var uid = req.query.uid;
    Users.findOne({ _id: uid, isDel: 0 }).then(function (usersInfo) {
        if (usersInfo) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = usersInfo;
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/allUsers', function (req, res, next) {
    var keyWord = req.query.keyword;
    var reg = new RegExp(keyWord, 'si'); //不区分大小写
    Users.find({
        // name:{$regex : /keyWord/,$options: 'si'}
        $or: [//多条件，数组
        { name: { $regex: reg } }]
    }).then(function (users) {
        if (users) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = users;
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/getDocLists', function (req, res, next) {
    var uid = req.query.uid;
    Docs.find({ uid: uid, isDel: 0 }).then(function (docs) {
        if (docs) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = docs;
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/allArticles', function (req, res, next) {
    var uid = '';
    var all = false;
    var offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var num = req.query.num ? parseInt(req.query.num) : 10;
    if (req.cookies.get('token') && req.cookies.get('uid')) {
        uid = req.cookies.get('uid');
    } else {
        all = true;
    }
    var where = all ? { isDel: 0 } : { uid: uid, isDel: 0 };
    Articles.find(where).skip(offset == 0 ? offset : offset - 1).limit(num).then(function (alls) {
        if (alls) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = alls;
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/getArticleLists', function (req, res, next) {
    var doc_id = req.query.doc_id;
    Articles.find({
        doc_id: doc_id,
        isDel: 0
    }).then(function (articles) {
        // console.log(articles);
        if (articles) {
            responseData.code = 1;
            responseData.msg = 'success';
            responseData.ok = true;
            responseData.data = articles;
            res.json(responseData);
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.get('/getArticle', function (req, res, next) {
    var id = req.query.id;
    Articles.findOne({ _id: id }).then(function (article) {
        if (article) {
            if (!req.cookies.get(id)) {
                //增加阅读数
                article.watch++;
                article.save();
                req.cookies.set(id, 'on', { maxAge: 1000 * 3600 * 10, expires: 1000 * 3600 * 10 });
            }

            Discuss.find({ article_id: article._id }).then(function (discuss) {
                responseData.code = 1;
                responseData.msg = 'success';
                responseData.ok = true;
                responseData.data = {
                    'article': article,
                    'discuss': discuss
                };
                res.json(responseData);
            });
        } else {
            responseData.code = 0;
            responseData.msg = 'error';
            responseData.ok = false;
            responseData.data = {};
            res.json(responseData);
        }
    });
});

router.post('/signin', function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var form = req.body.form;
    var validateCode = form == 'login' ? req.body.validateCode : '';
    var remember = req.body.remember;
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
    if (form == 'login') {
        if (validateCode == '') {
            responseData.code = 0;
            responseData.msg = "请先通过验证";
            res.json(responseData);
            return;
        }
    }
    var user = {};
    if (emailRegexp.test(name)) {
        user.email = name;
    } else if (phoneRegexp.test(name)) {
        user.phone = name;
    } else {
        user.name = name;
    }
    Users.findOne(user).then(function (userInfo) {
        if (userInfo) {
            if (userInfo.password == md5(password + userInfo.salt)) {
                responseData.code = 1;
                responseData.msg = "success";
                responseData.ok = true;
                responseData.data = userInfo;
                req.cookies.set('uid', userInfo._id, { maxAge: 1000 * 3600 * 10, expires: 1000 * 3600 * 10 });
                req.cookies.set('token', crt_token(), { maxAge: 1000 * 3600 * 10, expires: 1000 * 3600 * 10 });
                res.json(responseData);
                return;
            } else {
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

router.post('/signup', function (req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    var token = req.body.token;
    if (token == '') {
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

    if (password != passwordConfirm) {
        responseData.code = 0;
        responseData.msg = "两次输入密码不同";
        res.json(responseData);
        return;
    }

    var findData = {};
    if (emailRegexp.test(name)) {
        findData.email = name;
    } else if (phoneRegexp.test(name)) {
        findData.phone = name;
    } else {
        findData.name = name;
    }
    Users.findOne(findData).then(function (userInfo) {
        if (userInfo) {
            responseData.code = 0;
            responseData.ok = false;
            responseData.msg = '帐号已存在，请注册新帐号';
            responseData.data = null;
            res.json(responseData);
        } else {
            var t_salt = salt();
            var user = {
                name: '',
                phone: '',
                email: '',
                password: '',
                salt: '',
                sex: 3,
                nick: '',
                wechat: '',
                qq: '',
                avatar: '',
                signature: '',
                website: '',
                introduce: '',
                editors: 2,
                add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss'),
                isDel: 0
            };
            if (emailRegexp.test(name)) {
                user.email = name;
                user.type = 3;
            } else if (phoneRegexp.test(name)) {
                user.phone = name;
                user.type = 2;
            } else {
                user.name = name;
                user.type = 1;
            }
            user.name = name;
            user.salt = t_salt;
            user.password = md5(password + t_salt);
            var newUsers = new Users(user);
            return newUsers.save();
        }
    }).then(function (inser) {
        new Docs({
            uid: inser._id,
            name: '随笔',
            photos: '',
            describe: '',
            add_date: new Date(),
            isDel: 0
        }).save();
        if (inser) {
            responseData.code = 1;
            responseData.ok = true;
            responseData.msg = '注册成功';
            responseData.data = { id: inser._id };
            res.json(responseData);
        } else {
            responseData.code = 2;
            responseData.ok = true;
            responseData.msg = '注册失败';
            responseData.data = null;
            res.json(responseData);
        }
    });
});

router.get('/signout', function (req, res, next) {
    req.cookies.set('token', '');
    req.cookies.set('uid', '');
    req.token = '';
    req.userInfo = null;
    res.redirect(302, '/login');
});

router.post('/updateUserBasic', function (req, res, next) {
    var token = req.body.token;
    var uid = req.body.uid;
    var updateUserBasic = {
        nick: req.body.nick,
        phone: req.body.phone,
        email: req.body.email,
        editors: req.body.editors,
        avatar: req.body.avatar,
        qq: req.body.qq,
        wechat: req.body.wechat
    };
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Users.update({ _id: uid }, updateUserBasic, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '用户基础信息修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/changeProfile', function (req, res, next) {
    var token = req.body.token;
    var uid = req.body.uid;
    var updateProfile = {
        sex: req.body.sex,
        introduce: req.body.introduce,
        website: req.body.website
    };
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Users.update({ _id: uid }, updateProfile, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '用户个人资料修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/changeReward', function (req, res, next) {
    var token = req.body.token;
    var uid = req.body.uid;
    var updateReward = {
        rewardStatus: req.body.rewardStatus,
        rewardDesc: req.body.rewardDesc
    };
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Users.update({ _id: uid }, updateReward, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '赞赏修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/saveArticle', function (req, res, next) {
    var token = req.body.token;
    var id = req.body.id;
    var contents = req.body.contents;
    var markDownText = req.body.markdownText ? req.body.markdownText : null;
    var title = req.body.title;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    var article_date = {
        contents: contents,
        title: title
    };
    if (markDownText) {
        article_date.markDownText = markDownText;
    }
    Articles.update({ _id: id }, article_date, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.get('/downloadAllArticles', function (req, res, next) {
    responseData.code = 1;
    responseData.ok = true;
    responseData.msg = '所有文章打包下载完成';
    responseData.data = {};
    res.json(responseData);
});

router.post('/newDocument', function (req, res, next) {
    var uid = req.body.uid;
    var name = req.body.name;
    var docs = new Docs({
        uid: uid,
        name: name,
        photos: '',
        describe: '',
        add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss'),
        isDel: 0
    });
    docs.save().then(function (insert) {
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文集创建成功';
        responseData.data = { id: insert._id };
        res.json(responseData);
    });
});

router.post('/updateDocumentName', function (req, res, next) {
    var uid = req.body.uid;
    var id = req.body.id;
    var token = req.body.token;
    var name = req.body.name;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Docs.update({ _id: id, uid: uid }, { name: name }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文集名称修改成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/newArticle', function (req, res, next) {
    var uid = req.body.uid;
    var doc_id = req.body.doc_id;
    var doc_name = req.body.doc_name;
    var user_name = req.body.user_name;
    var token = req.body.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    var article = new Articles({
        uid: uid,
        doc_id: doc_id, // 文章所属文档id
        doc_name: doc_name, // 文集名称
        author: user_name, //文章作者
        title: sillyDateTime.format(new Date(), 'YYYY-MMM-DD'), // 文章标题
        describe: '', // 文章描述
        photos: '', // 文章图片
        contents: '', // 文章内容
        watch: 0,
        start: 0,
        fork: 0,
        add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss'),
        isRelease: 0,
        isDel: 0
    });
    article.save().then(function (insert) {
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章创建成功';
        responseData.data = { id: insert._id };
        res.json(responseData);
    });
});

router.get('/deleteDoc', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    var token = req.query.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Docs.update({ _id: id, uid: uid }, { isDel: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文集删除成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.get('/releaseArticle', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    var token = req.query.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Articles.update({ _id: id, uid: uid }, { isRelease: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章已发布';
        responseData.data = {};
        res.json(responseData);
    });
});

router.get('/deleteArticle', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    var token = req.query.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Articles.update({ _id: id, uid: uid }, { isDel: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章删除成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/changeAticleTitle', function (req, res, next) {
    var uid = req.body.uid;
    var token = req.body.token;
    var id = req.body.id;
    var title = req.body.title;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Articles.update({ _id: id, uid: uid }, { title: title }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '文章删除成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.post('/postDiscuss', function (req, res, next) {
    var id = req.body.id;
    var contents = req.body.contents;
    var uid = req.body.uid;
    var token = req.body.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    if (req.cookies.get('uid') == '' && req.cookies.get('token') == '') {
        responseData.code = 0;
        responseData.msg = '您尚未登录';
        res.json(responseData);
        return;
    }
    Articles.findOne({ _id: id }).then(function (article) {
        var data = {
            uid: uid, //评论的用户id
            article_id: article._id, //评论的文章id
            article_uid: article.uid, //评论的文章的用户id
            contents: contents, //评论的内容
            add_date: new Date(), //评论时间
            isDel: 0
        };
        new Discuss(data).save();
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '评论成功';
        responseData.data = {};
        res.json(responseData);
    });
});

router.get('/getDiscuss', function (req, res, next) {
    var id = req.query.id;
    var token = req.query.token;
    Discuss.find({ article_id: id }).then(function (discuss) {
        if (!discuss) throw console.log(discuss);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = 'SUCCESS';
        responseData.data = discuss;
        res.json(responseData);
    });
});

router.post('/uploader', uoloader.single('editormd-image-file'), function (req, res, next) {
    // console.log(req.file);
    var ext = req.file.mimetype.split('/')[1];
    var filename = sillyDateTime.format(new Date(), 'YYYYMMMDDHHmmss') + '_' + crt_token() + '.' + ext;
    var now_timer = sillyDateTime.format(new Date(), 'YYYYMMMDD');
    var dirname = '/Users/bluelife/www/node/blog/public/images/uploads/' + now_timer + '/';

    fs.exists(dirname, function (exists) {
        //如果目录不存在创建目录
        if (!exists) {
            fs.mkdir(dirname, function (err) {
                if (!err) throw console.log(err);
            });
        }
        fs.writeFile(dirname + filename, req.file.buffer, function (err) {
            if (!err) {
                new Photos({
                    originalname: req.file.originalname,
                    filename: filename,
                    path: dirname,
                    fullpath: dirname + filename,
                    encoding: req.file.encoding,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    add_date: new Date(),
                    isDel: 0
                }).save().then(function (insert) {
                    if (!insert) throw console.log(insert);
                    res.json({
                        message: '图片上传成功',
                        url: 'https://blog.mcloudhub.com/public/images/uploads/' + now_timer + '/' + filename,
                        success: 1
                    });
                });
            }
        });
    });
});

router.post('/collection/new', function (req, res, next) {
    var uid = req.body.uid;
    var token = req.body.token;
    var icon = req.body.icon;
    var name = req.body.name;
    var describe = req.body.describe;
    var push = req.body.push;
    var admins = req.body.admins;
    var verify = req.body.verify;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    var collections = new Collections({
        uid: uid,
        name: name, // 集合名称
        type: 1, // 集合类型
        icon: icon, // 集合图标
        describe: describe, // 集合描述
        add_date: new Date(), // 集合添加时间,
        admins: admins, // 其他管理员
        push: push, // 是否允许投稿
        follow: 0, //关注数
        subscribe: [],
        include: 0, //收录文章数
        article_ids: [],
        verify: verify, // 是否需要审核
        isDel: 0
    });
    collections.save().then(function (coll) {
        if (!coll) {
            responseData.code = 0;
            responseData.ok = false;
            responseData.msg = '文集添加失败';
            responseData.data = {};
            res.json(responseData);
        } else {
            responseData.code = 1;
            responseData.ok = true;
            responseData.msg = '文集添加成功';
            responseData.data = coll;
            res.json(responseData);
        }
    });
});

router.get('/get_collections', function (req, res, next) {
    var uid = req.query.uid;
    var token = req.query.token;
    var offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var num = req.query.num ? parseInt(req.query.num) : 10;
    var where = uid === void 0 ? { isDel: 0, uid: uid } : { isDel: 0 };
    Collections.find(where).skip((offset == 0 ? offset : offset - 1) * num).limit(num).then(function (colls) {
        if (!colls) throw console.log(colls);
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = 'SUCCESS';
        responseData.data = colls;
        res.json(responseData);
    });
});

router.get('/getCollectionById', function (req, res, next) {
    var id = req.query.id;
    var token = req.query.token;
    Collections.findOne({ _id: id }).then(function (coll) {
        if (!coll) throw console.log(coll);
        var result = {};
        var articlesArr = [];
        if (coll.article_ids.length > 0) {
            coll.article_ids.forEach(function (ids) {
                Articles.findOne({ _id: ids.id }).then(function (article) {
                    articlesArr.push(article);
                });
            });
        }
        result.articles = articlesArr;
        result.icon = coll.icon;
        result.follow = coll.follow;
        result.describe = coll.describe;
        result.include = coll.include;
        result.name = coll.name;
        result.push = coll.push;
        result.subscribe = coll.subscribe;
        result.admins = coll.admins;
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = 'SUCCESS';
        responseData.data = result;
        res.json(responseData);
    });
});

router.get('/collectionFollow', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    var token = req.query.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Collections.findOne({ _id: id }).then(function (coll) {
        coll.follow++;
        coll.subscribe.push({ uid: uid });
        coll.save();
        responseData.code = 1;
        responseData.ok = true;
        responseData.msg = '关注成功';
        res.json(responseData);
    });
});

router.get('/articlePush', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    var article_id = req.query.article_id;
    var token = req.query.token;
    if (token == '') {
        responseData.code = 0;
        responseData.msg = '非法请求';
        res.json(responseData);
        return;
    }
    Collections.findOne({ _id: id }).then(function (coll) {
        coll.include++;
        if (coll.article_ids.length > 0) {
            coll.article_ids.forEach(function (ids) {
                if (ids.id == article_id) {
                    responseData.code = 0;
                    responseData.ok = false;
                    responseData.msg = '此文章已投稿，请另选一篇文章再投。';
                    res.json(responseData);
                } else {
                    coll.article_ids.push({ id: article_id });
                    coll.save();
                    responseData.code = 1;
                    responseData.ok = true;
                    responseData.msg = '投稿成功';
                    res.json(responseData);
                }
                return;
            });
        } else {
            coll.article_ids.push({ id: article_id });
            coll.save();
            responseData.code = 1;
            responseData.ok = true;
            responseData.msg = '投稿成功';
            res.json(responseData);
            return;
        }
    });
});

router.get('/zhi', function (req, res, next) {
    res.json(req.query);
});

module.exports = router;
//# sourceMappingURL=api.js.map
//# sourceMappingURL=api.js.map
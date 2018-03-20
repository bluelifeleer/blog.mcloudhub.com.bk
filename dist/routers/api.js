'use strict';

var _require = require('child_process'),
    exec = _require.exec;

var fs = require('fs');
var express = require('express');
var request = require('request');
var requestPromise = require('request-promise');
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
var downloadBasecDir = '/Users/bluelife/www/node/blog/download/';

router.use(function (req, res, next) {
    output = {
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
 * 获取所有标签
 */
router.get('/docs', function (req, res, next) {
    // console.log(Tags);
    // res.send();
    Docs.find({ isDel: 0 }).then(function (docs) {
        if (docs) {
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = docs;
            res.json(output);
            return;
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
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
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = slides;
            res.json(output);
            return;
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
            return;
        }
    });
});

router.get('/getUsers', function (req, res, next) {
    var uid = req.query.uid;
    Users.findOne({ _id: uid, isDel: 0 }).then(function (usersInfo) {
        if (usersInfo) {
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = usersInfo;
            res.json(output);
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
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
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = users;
            res.json(output);
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
        }
    });
});

router.get('/getDocLists', function (req, res, next) {
    var uid = req.query.uid ? req.query.uid : req.cookies.uid || req.session.uid;
    var offset = req.query.offset ? parseInt(req.query.offset) : 1;
    var num = req.query.num ? parseInt(req.query.num) : 20;
    var where = uid ? { uid: uid, isDel: 0 } : { isDel: 0 };
    Docs.find(where).skip(offset == 0 ? offset : offset - 1).limit(num).then(function (docs) {
        if (docs) {
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = docs;
            res.json(output);
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
        }
    });
});

router.get('/allArticles', function (req, res, next) {
    var uid = req.query.uid ? req.query.uid : req.cookies.token && req.cookies.uid;
    var all = false;
    var offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var num = req.query.num ? parseInt(req.query.num) : 10;
    if (!uid) {
        all = true;
    }
    var where = all ? { isDel: 0 } : { uid: uid, isDel: 0 };
    Articles.find(where).skip(offset == 0 ? offset : offset - 1).limit(num).then(function (alls) {
        if (alls) {
            alls.forEach(function (item) {
                item.add_date = sillyDateTime.format(item.add_date, 'YYYY-MM-DD HH:mm:ss');
            });
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = alls;
            res.json(output);
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
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
            output.code = 1;
            output.msg = 'success';
            output.ok = true;
            output.data = articles;
            res.json(output);
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
        }
    });
});

router.get('/getArticle', function (req, res, next) {
    var id = req.query.id;
    Articles.findOne({ _id: id }).then(function (article) {
        if (article) {
            article.add_date = sillyDateTime.format(article.add_date, 'YYYY-MM-DD HH:mm:ss');
            if (!req.cookies.id) {
                //增加阅读数
                article.watch++;
                article.save();
                res.cookie(id, 'on', { maxAge: 1000 * 3600 * 10, expires: 1000 * 3600 * 10 });
            }

            Discuss.find({ article_id: article._id }).then(function (discuss) {
                output.code = 1;
                output.msg = 'success';
                output.ok = true;
                output.data = {
                    'article': article,
                    'discuss': discuss
                };
                res.json(output);
            });
        } else {
            output.code = 0;
            output.msg = 'error';
            output.ok = false;
            output.data = {};
            res.json(output);
        }
    });
});

router.post('/signin', function (req, res, next) {
    // let redirect = req.body.redirect ? req.body.redirect : '';
    var name = req.body.name;
    var password = req.body.password;
    var form = req.body.form;
    var validateCode = form == 'login' ? req.body.validateCode : '';
    var remember = req.body.remember;
    if (name == '') {
        output.code = 0;
        output.msg = '用户名不能为空';
        res.json(output);
        return;
    }
    if (password == '') {
        output.code = 0;
        output.msg = "密码不能为空";
        res.json(output);
        return;
    }
    if (form == 'login') {
        if (validateCode == '') {
            output.code = 0;
            output.msg = "请先通过验证";
            res.json(output);
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
    Users.findOne(user).then(function (user) {
        if (user) {
            if (user.password == md5(password + user.salt)) {
                res.cookie('uid', user._id);
                req.session.uid = user._id;
                if (remember) {
                    res.cookie('name', name, { maxAge: 3600000 * 24 * 7 });
                    res.cookie('password', password, { maxAge: 3600000 * 24 * 7 });
                }
                output.code = 1;
                output.msg = "success";
                output.ok = true;
                output.data = user;
                res.json(output);
                return;
            } else {
                output.code = 0;
                output.msg = "登录失败，密码不正确";
                output.ok = false;
                output.data = null;
                res.json(output);
            }
        } else {
            output.code = 2;
            output.msg = "您还没有帐号，请注册帐号";
            output.data = '';
            res.json(output);
        }
    });
});

router.post('/signup', function (req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (name == '') {
        output.code = 0;
        output.msg = '用户名不能为空';
        res.json(output);
        return;
    }
    if (password == '') {
        output.code = 0;
        output.msg = "密码不能为空";
        res.json(output);
        return;
    }

    if (password != passwordConfirm) {
        output.code = 0;
        output.msg = "两次输入密码不同";
        res.json(output);
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
            output.code = 0;
            output.ok = false;
            output.msg = '帐号已存在，请注册新帐号';
            output.data = null;
            res.json(output);
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
                follow: 0,
                github_id: '',
                github: {
                    html_url: ''
                },
                add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
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
            add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            isDel: 0
        }).save();
        if (inser) {
            output.code = 1;
            output.ok = true;
            output.msg = '注册成功';
            output.data = { id: inser._id };
            res.json(output);
        } else {
            output.code = 2;
            output.ok = true;
            output.msg = '注册失败';
            output.data = null;
            res.json(output);
        }
    });
});

router.get('/signout', function (req, res, next) {
    res.clearCookie('uid'); // 清除cookie中的uid
    req.session.destroy(function () {
        // 销毁session中的uid
        res.redirect(302, '/login');
    });
    // console.log(store);
    // req.session.store.clear(()=>{
    //     res.redirect(302,'/login');
    // })
});

router.post('/updateUserBasic', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var updateUserBasic = {
        nick: req.body.nick,
        phone: req.body.phone,
        email: req.body.email,
        editors: req.body.editors,
        avatar: req.body.avatar,
        qq: req.body.qq,
        wechat: req.body.wechat,
        github: req.body.github
    };
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '未登陆';
        res.json(output);
        return;
    }
    Users.update({ _id: uid }, updateUserBasic, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '用户基础信息修改成功';
        output.data = {};
        res.json(output);
    });
});

router.post('/changeProfile', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var updateProfile = {
        sex: req.body.sex,
        introduce: req.body.introduce,
        website: req.body.website
    };
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '未登陆';
        res.json(output);
        return;
    }
    Users.update({ _id: uid }, updateProfile, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '用户个人资料修改成功';
        output.data = {};
        res.json(output);
    });
});

router.post('/changeReward', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var updateReward = {
        rewardStatus: req.body.rewardStatus,
        rewardDesc: req.body.rewardDesc
    };
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '未登陆';
        res.json(output);
        return;
    }
    Users.update({ _id: uid }, updateReward, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '赞赏修改成功';
        output.data = {};
        res.json(output);
    });
});

router.post('/saveArticle', function (req, res, next) {
    var id = req.body.id;
    var contents = req.body.contents;
    var markDownText = req.body.markdownText ? req.body.markdownText : null;
    var title = req.body.title;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
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
        output.code = 1;
        output.ok = true;
        output.msg = '文章修改成功';
        output.data = {};
        res.json(output);
    });
});

router.get('/downloadAllArticles', function (req, res, next) {
    var uid = req.query.uid ? req.query.uid : req.cookies.uid;
    if (req.session.uid == '') {
        output.code = 0;
        output.ok = false;
        output.msg = '未登陆';
        output.data = {};
        res.json(output);
        return;
    }
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    var allArticles = Articles.find({ uid: uid }).then(function (articles) {
        return articles;
    });
    var dirname = downloadBasecDir + '/' + uid;
    fs.existsSync(dirname) || fs.mkdirSync(dirname); // 下载目录不存在创建目录
    allArticles.then(function (all) {
        all.forEach(function (article) {
            fs.writeFile('/Users/bluelife/www/node/blog/download/' + uid + '/' + article.title + '.md', article.markDownText, 'utf8', function (err) {
                if (err) throw err;
            });
        });
        exec('tar -czf ' + dirname + '.tar.gz' + ' ' + dirname, { encoding: 'utf8', maxBuffer: parseInt(200 * 1024) }, function (error, stdout, stderr) {
            if (error) throw error;
            output.code = 1;
            output.ok = true;
            output.msg = '所有文章打包下载完成';
            output.data = { tar_path: 'http://blog.mcloudhub.com/download/' + uid + '.tar.gz' };
            res.json(output);
        });
    });
});

router.post('/newDocument', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
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
        output.code = 1;
        output.ok = true;
        output.msg = '文集创建成功';
        output.data = { id: insert._id };
        res.json(output);
    });
});

router.post('/updateDocumentName', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var id = req.body.id;
    var name = req.body.name;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Docs.update({ _id: id, uid: uid }, { name: name }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '文集名称修改成功';
        output.data = {};
        res.json(output);
    });
});

router.post('/newArticle', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var doc_id = req.body.doc_id;
    var doc_name = req.body.doc_name;
    var user_name = req.body.user_name;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
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
        add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        isRelease: 0,
        isDel: 0
    });
    article.save().then(function (insert) {
        output.code = 1;
        output.ok = true;
        output.msg = '文章创建成功';
        output.data = { id: insert._id };
        res.json(output);
    });
});

router.get('/deleteDoc', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Docs.update({ _id: id, uid: uid }, { isDel: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '文集删除成功';
        output.data = {};
        res.json(output);
    });
});

router.get('/releaseArticle', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Articles.update({ _id: id, uid: uid }, { isRelease: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '文章已发布';
        output.data = {};
        res.json(output);
    });
});

router.get('/deleteArticle', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Articles.update({ _id: id, uid: uid }, { isDel: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '文章删除成功';
        output.data = {};
        res.json(output);
    });
});

router.post('/changeAticleTitle', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var id = req.body.id;
    var title = req.body.title;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Articles.update({ _id: id, uid: uid }, { title: title }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '文章删除成功';
        output.data = {};
        res.json(output);
    });
});

router.post('/postDiscuss', function (req, res, next) {
    var id = req.body.id;
    var contents = req.body.contents;
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '您尚未登录';
        res.json(output);
        return;
    }
    Articles.findOne({ _id: id }).then(function (article) {
        var data = {
            uid: uid, //评论的用户id
            article_id: article._id, //评论的文章id
            article_uid: article.uid, //评论的文章的用户id
            contents: contents, //评论的内容
            add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'), //评论时间
            isDel: 0
        };
        new Discuss(data).save();
        output.code = 1;
        output.ok = true;
        output.msg = '评论成功';
        output.data = {};
        res.json(output);
    });
});

router.get('/getDiscuss', function (req, res, next) {
    var id = req.query.id;
    Discuss.find({ article_id: id }).then(function (discuss) {
        if (!discuss) throw console.log(discuss);
        output.code = 1;
        output.ok = true;
        output.msg = 'SUCCESS';
        output.data = discuss;
        res.json(output);
    });
});

router.post('/uploader', uoloader.single('editormd-image-file'), function (req, res, next) {
    // console.log(req.file);
    var ext = req.file.mimetype.split('/')[1];
    var filename = sillyDateTime.format(new Date(), 'YYYYMMMDDHHmmss') + '_' + crt_token() + '.' + ext;
    var now_timer = sillyDateTime.format(new Date(), 'YYYYMMMDD');
    var dirname = '/Users/bluelife/www/node/blog/public/images/uploads/' + now_timer + '/';
    fs.existsSync(dirname) || fs.mkdirSync(dirname); // 目录不存在创建目录
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
                add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
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

router.post('/collection/new', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var icon = req.body.icon;
    var name = req.body.name;
    var describe = req.body.describe;
    var push = req.body.push;
    var admins = req.body.admins;
    var verify = req.body.verify;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '您尚未登录';
        res.json(output);
        return;
    }
    var collections = new Collections({
        uid: uid,
        name: name, // 集合名称
        type: 1, // 集合类型
        icon: icon, // 集合图标
        describe: describe, // 集合描述
        add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 集合添加时间,
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
            output.code = 0;
            output.ok = false;
            output.msg = '文集添加失败';
            output.data = {};
            res.json(output);
        } else {
            output.code = 1;
            output.ok = true;
            output.msg = '文集添加成功';
            output.data = coll;
            res.json(output);
        }
    });
});

router.post('/collection/update', function (req, res, next) {
    var id = req.body.id;
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var icon = req.body.icon;
    var name = req.body.name;
    var describe = req.body.describe;
    var push = req.body.push;
    var admins = req.body.admins;
    var verify = req.body.verify;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '您尚未登录';
        res.json(output);
        return;
    }
    Collections.update({ _id: id, uid: uid }, {
        icon: icon,
        name: name,
        describe: describe,
        push: push,
        verify: verify,
        admins: admins
    }, { multi: false }, function (err, doc) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '专题已修改';
        output.data = {};
        res.json(output);
    });
});

router.get('/get_collections', function (req, res, next) {
    var offset = req.query.offset ? parseInt(req.query.offset) : 0;
    var num = req.query.num ? parseInt(req.query.num) : 10;
    var where = { isDel: 0 };
    Collections.find(where).skip((offset == 0 ? offset : offset - 1) * num).limit(num).then(function (colls) {
        if (!colls) throw console.log(colls);
        output.code = 1;
        output.ok = true;
        output.msg = 'SUCCESS';
        output.data = colls;
        res.json(output);
    });
});

router.get('/getCollectionById', function (req, res, next) {
    var id = req.query.id;
    var articleArr = [];
    Collections.findOne({ _id: id }).then(function (coll) {
        if (!coll) throw console.log(coll);
        output.code = 1;
        output.ok = true;
        output.msg = 'SUCCESS';
        output.data = coll;
        res.json(output);
    });
});

router.get('/collectionFollow', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Collections.findOne({ _id: id }).then(function (coll) {
        coll.follow++;
        coll.subscribe.push({ uid: uid });
        coll.save();
        output.code = 1;
        output.ok = true;
        output.msg = '关注成功';
        res.json(output);
    });
});

router.get('/articlePush', function (req, res, next) {
    var uid = req.query.uid;
    var id = req.query.id;
    var article_id = req.query.article_id;
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Collections.findOne({ _id: id }).then(function (coll) {
        coll.include++;
        if (coll.article_ids.length > 0) {
            coll.article_ids.forEach(function (ids) {
                if (ids.id == article_id) {
                    output.code = 0;
                    output.ok = false;
                    output.msg = '此文章已投稿，请另选一篇文章再投。';
                    res.json(output);
                } else {
                    coll.article_ids.push({ id: article_id });
                    coll.save();
                    output.code = 1;
                    output.ok = true;
                    output.msg = '投稿成功';
                    res.json(output);
                }
                return;
            });
        } else {
            coll.article_ids.push({ id: article_id });
            coll.save();
            output.code = 1;
            output.ok = true;
            output.msg = '投稿成功';
            res.json(output);
            return;
        }
    });
});

router.post('/updateIntroduce', function (req, res, next) {
    var uid = req.body.uid ? req.body.uid : req.session.uid;
    var introduce = req.body.introduce;
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '未登陆';
        res.json(output);
        return;
    }
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Users.update({ _id: uid }, { introduce: introduce }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '用户个人介绍修改成功';
        output.data = {};
        res.json(output);
    });
});

router.get('/documents/get', function (req, res, next) {
    var uid = req.query.uid ? req.query.uid : '';
    var id = req.query.id ? req.query.id : '';
    var where = uid ? { _id: id, uid: uid, isDel: 0 } : { _id: id, isDel: 0 };
    Docs.findOne(where).then(function (doc) {
        if (!doc) throw console.log(doc);
        output.code = 1;
        output.ok = true;
        output.msg = 'SUCCESS';
        output.data = doc;
        res.json(output);
    });
});

router.get('/collections/delete', function (req, res, next) {
    var uid = req.query.uid ? req.query.uid : '';
    var id = req.query.id ? req.query.id : '';
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '未登陆';
        res.json(output);
        return;
    }
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    Collections.update({ _id: uid, uid: uid }, { isDel: 1 }, { multi: false }, function (err, docs) {
        if (err) throw console.log(err);
        output.code = 1;
        output.ok = true;
        output.msg = '专题已删除';
        output.data = {};
        res.json(output);
    });
});

router.get('/users/follow', function (req, res, next) {
    var uid = req.query.uid ? req.query.uid : '';
    var follow_id = req.query.follow_id ? req.query.follow_id : '';
    if (req.session.uid == '') {
        output.code = 0;
        output.msg = '未登陆';
        res.json(output);
        return;
    }
    if (req.cookies._scrf == '') {
        output.code = 0;
        output.msg = '非法请求';
        res.json(output);
        return;
    }
    if (follow_id) {
        Users.findOne({ _id: follow_id }).then(function (user) {
            user.follow++;
            user.uids.push({ id: uid });
            user.save();
            output.code = 1;
            output.ok = true;
            output.msg = '关注成功';
            res.json(output);
            return;
        });
    } else {
        output.code = 0;
        output.ok = false;
        output.msg = '关注失败';
        res.json(output);
        return;
    }
});

router.get('/github', function (req, res, next) {
    var code = req.query.code;
    var state = NowDate.getTime();
    var getTokenOptations = {
        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: '5fe59ee126edbea8f3df',
            client_secret: 'eaf2f8a2d1b0e21ebdf4ca75628a1dd6c9fdbeff',
            code: code,
            redirect_uri: 'https://blog.mcloudhub.com/api/github',
            state: state
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    requestPromise(getTokenOptations).then(function (token) {
        var getGithubUsersOptaions = {
            uri: 'https://api.github.com/user',
            headers: {
                'User-Agent': 'Request-Promise',
                'Authorization': 'token ' + token.access_token
            },
            json: true
        };
        requestPromise(getGithubUsersOptaions).then(function (github) {
            console.log(github);
            if (github) {
                Users.findOne({ github_id: github.id }).then(function (user) {
                    if (!user) {
                        var user_data = {
                            name: github.name,
                            phone: '',
                            email: github.email,
                            password: '',
                            salt: '',
                            sex: 3,
                            nick: github.name,
                            wechat: '',
                            qq: '',
                            avatar: github.avatar_url,
                            signature: '',
                            website: '',
                            introduce: '',
                            editors: 2,
                            follow: 0,
                            github_id: github.id,
                            github: github,
                            add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                            isDel: 0
                        };
                        new Users(user_data).save().then(function (add) {
                            try {
                                res.cookie('uid', add._id);
                                req.session.uid = add._id;
                                res.redirect(302, '/');
                            } catch (e) {
                                console.log(e);
                                res.redirect(302, '/');
                            }
                        });
                    } else {
                        res.cookie('uid', user._id);
                        req.session.uid = user._id;
                        res.redirect(302, '/');
                    }
                });
            }
        }).catch(function (err) {
            console.log(err);
            res.redirect(302, '/');
        });
        // https://api.github.com/user?access_token=...
        // Authorization: token OAUTH-TOKEN
    }).catch(function (err) {
        console.log(err);
        res.redirect(302, '/');
    });
    // console.log(code);
    // res.json({code:code});
});

module.exports = router;
//# sourceMappingURL=api.js.map
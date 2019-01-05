'use strict';

const {
	exec
} = require('child_process');
const fs = require('fs');
const express = require('express');
const request = require('request');
const requestPromise = require('request-promise');
const md5 = require('md5');
const sillyDateTime = require('silly-datetime');
const multer = require('multer');
const imageSize = require('image-size');
const Geetest = require('gt3-sdk');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const salt = require('../libs/salt');
const crt_token = require('../libs/ctr_token');
const tools = require('../libs/tools');
const router = express.Router();
const Users = require('../models/Users_model');
const Docs = require('../models/Document_model');
const Articles = require('../models/Articles_model');
const Discuss = require('../models/Discuss_model');
const Tags = require('../models/Tags_model');
const Slide = require('../models/Slide_model');
const Photos = require('../models/Photos_model');
const Collections = require('../models/Collections_model');
const OneByDay = require('../models/onebyday_model');
const Apps = require('../models/Apps');
const MailGroup = require('../models/mailGroup');
const MailUser = require('../models/mailUser');
const emailRegexp = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
const phoneRegexp = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
const uoloader = multer(); //{dest: 'uploads/'}设置dest表示上传文件的目录，如果不设置上传的文件永远在内存之中不会保存到磁盘上。在此处为了在内存中取出文件并重命名所以不设置文件上传路径
const NowDate = new Date();
const downloadBasecDir = '/Users/bluelife/www/node/blog/app/download/';
let output = {};

router.use(function(req, res, next) {
	output = {
		code: 0,
		msg: '',
		ok: false,
		data: null
	};
	next();
});

router.get('/gettest', (req, res, next) => {
	new Geetest({
		geetest_id: 'e46e906d776dbd41c4e72f72499ca39f',
		geetest_key: '30b094aad22445378f7fdc01b83215bb'
	}).register(null, (err, data) => {
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
router.get('/docs', (req, res, next) => {
	// console.log(Tags);
	// res.send();
	Docs.find({
		isDel: 0
	}).then(docs => {
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
router.get('/slides', (req, res, next) => {
	let uid = req.query.uid;
	Slide.find({
		uid: uid
	}).then(slides => {
		if (slides.length) {
			output.code = 1;
			output.msg = 'success';
			output.ok = true;
			output.data = {
				adv: slides[0].adv
			};
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
})

router.get('/getUsers', (req, res, next) => {
	let uid = req.query.uid;
	Users.findOne({
		_id: uid,
		isDel: 0
	}).then(usersInfo => {
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

router.get('/allUsers', (req, res, next) => {
	let keyWord = req.query.keyword;
	const reg = new RegExp(keyWord, 'si') //不区分大小写
	Users.find({
		// name:{$regex : /keyWord/,$options: 'si'}
		$or: [ //多条件，数组
			{
				name: {
					$regex: reg
				}
			}
		]
	}).then(users => {
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
})

router.get('/getDocLists', (req, res, next) => {
	let uid = req.query.uid ? req.query.uid : (req.cookies.uid || req.session.uid);
	let offset = req.query.offset ? parseInt(req.query.offset) : 1;
	let num = req.query.num ? parseInt(req.query.num) : 20;
	let where = uid ? {
		user_id: uid,
		isDel: 0
	} : {
		isDel: 0
	};
	Docs.find(where).populate({
		path: 'author',
		select: 'name nick avatar'
	}).exec().then(docs => {
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

router.get('/allArticles', (req, res, next) => {
	let uid = req.query.uid ? req.query.uid : (req.cookies.token && req.cookies.uid);
	let all = false;
	let offset = req.query.offset ? parseInt(req.query.offset) : 0;
	let num = req.query.num ? parseInt(req.query.num) : 10;
	if (!uid) {
		all = true;
	}
	let where = all ? {
		isDel: 0,
		permissions: 1
	} : {
		user_id: uid,
		isDel: 0
	};
	Articles.countDocuments(where, (err, count) => {
		Articles.find(where).skip((offset ? (parseInt(offset - 1) * num) : offset)).limit(num)
			.populate([{
				path: 'document',
				select: 'name'
			}, {
				path: 'author',
				select: 'name nick avatar'
			}])
			.exec()
			.then(articles => {
				if (articles) {
					articles.forEach(item => {
						item.add_date = sillyDateTime.format(item.add_date, 'YYYY-MM-DD HH:mm:ss');
					});
					output.code = 1;
					output.msg = 'success';
					output.ok = true;
					output.data = {
						articles: articles,
						count: count,
						offset: offset,
						num: num
					};
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
})

router.get('/getArticleLists', (req, res, next) => {
	let doc_id = req.query.doc_id;
	let offset = req.query.offset ? req.query.offset : 0;
	let num = req.query.num ? req.query.num : 20;
	Articles.find({
		doc_id: doc_id,
		isDel: 0,
		permissions: 1
	}).skip((offset ? (parseInt(offset - 1) * num) : offset)).limit(num).populate([{
		path: 'author',
		select: 'name'
	}]).exec().then(articles => {
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

router.get('/getArticle', (req, res, next) => {
	let id = req.query.id;
	Articles.findById(id).populate([{
		path: 'document',
		select: 'name'
	}, {
		path: 'author',
		select: 'name nick avatar rewardStatus rewardDesc'
	}, {
		path: 'issue_contents',
		select: 'contents add_date permissions',
		populate: {
			path: 'author',
			select: 'name nick avatar'
		}
	}]).exec().then(article => {
		if (article) {
			article.add_date = sillyDateTime.format(article.add_date, 'YYYY-MM-DD HH:mm:ss');
			if (!req.cookies[id]) {
				//增加阅读数
				article.watch++;
				article.save();
				res.cookie(id, 'on', {
					maxAge: 1000 * 3600 * 10,
					expires: 1000 * 3600 * 10
				});
			}
			output.code = 1;
			output.msg = 'success';
			output.ok = true;
			output.data = {
				'article': article
			};
			res.json(output);
			return;
		} else {
			output.code = 0;
			output.msg = 'error';
			output.ok = false;
			output.data = {};
			res.json(output);
		}
	});
});

router.get('/article/get', (req, res, next) => {
	let id = req.query.id ? req.query.id : '';
	let page = req.query.page ? req.query.page : 'next';
	let where = {};
	let sort = {};
	if (page == 'next') {
		where = {
			'_id': {
				"$gt": id
			}
		};
		sort = {
			_id: 1
		};
	} else {
		where = {
			'_id': {
				"$lt": id
			}
		};
		sort = {
			_id: -1
		};
	}
	Articles.findOne(where).limit(1).sort(sort).populate([{
		path: 'document',
		select: 'name'
	}, {
		path: 'author',
		select: 'name nick avatar rewardStatus rewardDesc'
	}, {
		path: 'issue_contents',
		select: 'contents add_date permissions',
		populate: {
			path: 'author',
			select: 'name nick avatar'
		}
	}]).exec().then(article => {
		if (article) {
			article.add_date = sillyDateTime.format(article.add_date, 'YYYY-MM-DD HH:mm:ss');
			if (!req.cookies[id]) {
				//增加阅读数
				article.watch++;
				article.save();
				res.cookie(id, 'on', {
					maxAge: 1000 * 3600 * 10,
					expires: 1000 * 3600 * 10
				});
			}
			output.code = 1;
			output.msg = 'success';
			output.ok = true;
			output.data = {
				'article': article
			};
			res.json(output);

		} else {
			output.code = 0;
			output.msg = 'error';
			output.ok = false;
			output.data = {};
			res.json(output);
		}
	}).catch(err => {
		console.log(err);
	});
});

router.get('/article/start', (req, res, next) => {
	if (req.session.uid && req.cookies.uid) {
		let user_id = req.session.uid || req.cookies.uid;
		let id = req.query.id;
		Users.findById(user_id).then(user => {
			let article = Articles.findById(id);
			return Promise.all([user, article]);
		}).spread((u, a) => {
			a.start++;
			a.start_users.push(u);
			a.save().then(status => {
				if (status) {
					output.code = 1;
					output.msg = 'success';
					output.ok = true;
					output.data = {
						start: a.start
					};
					res.json(output);
				}
			}).catch(err => {
				console.log(err);
			});
		}).catch(err => {
			console.log(err);
		});
	} else {
		output.code = 3;
		output.msg = 'success';
		output.ok = true;
		output.data = {};
		res.json(output);
	}
})

router.post('/signin', (req, res, next) => {
	// let redirect = req.body.redirect ? req.body.redirect : '';
	let name = req.body.name;
	let password = req.body.password;
	let form = req.body.form;
	let validateCode = form == 'login' ? req.body.validateCode : '';
	let remember = req.body.remember;
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
	let user = {};
	if (emailRegexp.test(name)) {
		user.email = name;
	} else if (phoneRegexp.test(name)) {
		user.phone = name;
	} else {
		user.name = name;
	}
	Users.findOne(user).then(function(user) {
		if (user) {
			if (user.password == md5(password + user.salt)) {
				res.cookie('uid', user._id, {
					maxAge: 1800000
				});
				req.session.uid = user._id;
				if (remember) {
					res.cookie('name', name, {
						maxAge: 3600000 * 24 * 7
					});
					res.cookie('password', password, {
						maxAge: 3600000 * 24 * 7
					});
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

router.post('/signup', (req, res, next) => {
	let name = req.body.name;
	let phone = req.body.phone;
	let password = req.body.password;
	let passwordConfirm = req.body.passwordConfirm;
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

	let findData = {};
	if (emailRegexp.test(name)) {
		findData.email = name;
	} else if (phoneRegexp.test(name)) {
		findData.phone = name;
	} else {
		findData.name = name;
	}
	Users.findOne(findData).then(userInfo => {
		if (userInfo) {
			output.code = 0;
			output.ok = false;
			output.msg = '帐号已存在，请注册新帐号';
			output.data = null;
			res.json(output);
		} else {
			let t_salt = salt();
			let user = {
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
				follows: 0,
				follow_users: [],
				email_verify: false,
				github_id: '',
				github: {
					html_url: ''
				},
				add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
				isDel: 0,
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
			let newUsers = new Users(user);
			return newUsers.save();
		}
	}).then(userAdd => {
		new Docs({
			user_id: userAdd._id,
			name: '随笔',
			photos: '',
			describe: '',
			add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
			author: userAdd,
			article: [],
			permissions: 1,
			isDel: 0,
		}).save();
		if (userAdd) {
			output.code = 1;
			output.ok = true;
			output.msg = '注册成功';
			output.data = {
				id: userAdd._id
			};
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

router.get('/signout', (req, res, next) => {
	res.clearCookie('uid'); // 清除cookie中的uid
	req.session.destroy(() => { // 销毁session中的uid
		res.redirect(302, '/login');
	});
	// console.log(store);
	// req.session.store.clear(()=>{
	//     res.redirect(302,'/login');
	// })
});

router.post('/updateUserBasic', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let updateUserBasic = {
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
	Users.findByIdAndUpdate(uid, updateUserBasic, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '用户基础信息修改成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		if (err) throw err;
	});
});

router.post('/changeProfile', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let updateProfile = {
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
	Users.findByIdAndUpdate(uid, updateProfile, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '用户个人资料修改成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		if (err) throw err;
	});
});

router.post('/changeReward', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let updateReward = {
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
	Users.findByIdAndUpdate(uid, updateReward, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '赞赏修改成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		if (err) throw err;
	});
});

router.post('/saveArticle', (req, res, next) => {
	let id = req.body.id;
	let contents = req.body.contents;
	let markDownText = req.body.markdownText ? req.body.markdownText : null;
	let title = req.body.title;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	let article_date = {
		contents: contents,
		title: title
	};
	if (markDownText) {
		article_date.markDownText = markDownText;
	}

	Articles.findByIdAndUpdate(id, {
		title: title,
		contents: contents,
		markDownText: markDownText,
		last_update_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
	}, {
		runValidators: true
	}).then(status => {
		if (!status) throw console.log(status);
		output.code = 1;
		output.ok = true;
		output.msg = '文章保存成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		console.log(err);
	});
});

router.get('/article/set_permissions', (req, res, next) => {
	let id = req.query.id;
	let type = req.query.type;
	Articles.findByIdAndUpdate(id, {
		permissions: type
	}, {
		runValidators: true
	}).then(status => {
		if (!status) throw console.log(status);
		output.code = 1;
		output.ok = true;
		output.msg = '文章权限设置成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		console.log(err);
		output.code = 0;
		output.ok = false;
		output.msg = '文章权限设置失败';
		output.data = {};
		res.json(output);
	});
});

router.get('/downloadAllArticles', (req, res, next) => {
	let uid = req.query.uid ? req.query.uid : req.cookies.uid;
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
	let allArticles = Articles.find({
		uid: uid
	}).then(articles => {
		return articles;
	});
	let dirname = downloadBasecDir + '/' + uid;
	fs.existsSync(dirname) || fs.mkdirSync(dirname); // 下载目录不存在创建目录
	allArticles.then(all => {
		all.forEach(article => {
			fs.writeFile('/Users/bluelife/www/node/blog/app/download/' + uid + '/' + article.title + '.md', article.markDownText, 'utf8', err => {
				if (err) throw err;
			});
		});
		exec('tar -czf ' + dirname + '.tar.gz' + ' ' + dirname, {
			encoding: 'utf8',
			maxBuffer: parseInt(200 * 1024)
		}, (error, stdout, stderr) => {
			if (error) throw error;
			output.code = 1;
			output.ok = true;
			output.msg = '所有文章打包下载完成';
			output.data = {
				tar_path: 'http://blog.mcloudhub.com/download/' + uid + '.tar.gz'
			};
			res.json(output);
		});
	});
})

router.post('/newDocument', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let name = req.body.name;
	Users.findById(uid).then(user => {
		new Docs({
			user_id: user._id,
			name: name,
			photos: '',
			describe: '',
			add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss'),
			author: user,
			article: [],
			permissions: 1,
			isDel: 0,
		}).save().then(insert => {
			output.code = 1;
			output.ok = true;
			output.msg = '文集创建成功';
			output.data = {
				id: insert._id
			};
			res.json(output);
		});
	});
});

router.post('/updateDocumentName', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let id = req.body.id;
	let name = req.body.name;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Docs.findByIdAndUpdate(id, {
		name: name
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '文集名称修改成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '文集名称修改失败';
		output.data = {};
		res.json(output);
	});
});

router.post('/newArticle', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let doc_id = req.body.doc_id;
	let doc_name = req.body.doc_name;
	let user_name = req.body.user_name;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Docs.findById(doc_id).then(docs => {
		let users = Users.findById(uid);
		return Promise.all([users, docs]);
	}).spread((u, d) => {
		new Articles({
			user_id: u._id,
			doc_id: d._id,
			author: u, // 文章所属用户
			document: d, // 文章所属文集
			title: sillyDateTime.format(new Date(), 'YYYY-MMM-DD'), // 文章标题
			describe: '', // 文章描述
			photos: '', // 文章图片
			contents: '', // 文章内容
			markDownText: '',
			watch: 0,
			watch_users: [],
			start: 0,
			start_users: [],
			fork: 0,
			fork_users: [],
			issue: 0,
			issue_contents: [],
			follows: 0,
			follow_users: [],
			permissions: 1,
			add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
			isRelease: 0,
			isDel: 0,
		}).save().then(insert => {
			d.article_id.push({
				id: insert._id
			});
			d.article.push(insert);
			d.save();
			u.article.push(insert);
			u.save();
			output.code = 1;
			output.ok = true;
			output.msg = '文章创建成功';
			output.data = insert;
			res.json(output);
		}).catch(err => {
			console.log(err);
			output.code = 0;
			output.ok = false;
			output.msg = '文章创建失败';
			output.data = {};
			res.json(output);
		});
	})
});

router.get('/deleteDoc', (req, res, next) => {
	let uid = req.query.uid;
	let id = req.query.id;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Docs.findByIdAndUpdate(id, {
		isDel: 1
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '文集删除成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '文集删除失败';
		output.data = {};
		res.json(output);
	});
});

router.get('/releaseArticle', (req, res, next) => {
	let uid = req.query.uid;
	let id = req.query.id;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Articles.findByIdAndUpdate(id, {
		isRelease: 1
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '文章已发布';
		output.data = {};
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '文章已失败';
		output.data = {};
		res.json(output);
	})
});

router.get('/deleteArticle', (req, res, next) => {
	let uid = req.query.uid;
	let id = req.query.id;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Articles.findByIdAndUpdate(id, {
		isDel: 1
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '文章删除成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '文章删除失败';
		output.data = {};
		res.json(output);
	});
});

router.post('/changeAticleTitle', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let id = req.body.id;
	let title = req.body.title;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Articles.findByIdAndUpdate(id, {
		title: title
	}, {
		runValidators: true
	}).then(status => {
		if (!status) throw console.log(status);
		output.code = 1;
		output.ok = true;
		output.msg = '文章修改成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '文章修改失败';
		output.data = {};
		res.json(output);
	});
});

router.post('/postDiscuss', (req, res, next) => {
	let id = req.body.id;
	let contents = req.body.contents;
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let permissions = req.body.permissions ? parseInt(req.body.permissions) : 1;
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
	Articles.findById(id).then(article => {
		let users = Users.findById(uid);
		return Promise.all([users, article]);
	}).spread((u, a) => {
		new Discuss({
			uid: u._id,
			article_id: a._id,
			author: u,
			article: a,
			contents: contents,
			permissions: permissions,
			add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
			isDel: 0
		}).save().then(status => {
			a.issue++;
			a.issue_contents.push(status);
			a.save();
			output.code = 1;
			output.ok = true;
			output.msg = '评论成功';
			output.data = {};
			res.json(output);
		});
	});
});

router.get('/getDiscuss', (req, res, next) => {
	let id = req.query.id;
	Discuss.find({
		article_id: id
	}).then(discuss => {
        if (!discuss) throw console.log(discuss);
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = discuss;
		res.json(output);
	});
});

router.post('/uploader', uoloader.single('editormd-image-file'), (req, res, next) => {
	let uid = req.session.uid && req.cookies.uid;
	let ext = req.file.mimetype.split('/')[1];
	let filename = sillyDateTime.format(new Date(), 'YYYYMMMDDHHmmss') + '_' + crt_token() + '.' + ext;
	let now_timer = sillyDateTime.format(new Date(), 'YYYYMMMDD');
	let dirname = '/home/wwwroot/node/blog.mcloudhub.com/app/public/images/uploads/' + now_timer + '/';
	fs.existsSync(dirname) || fs.mkdirSync(dirname); // 目录不存在创建目录
	fs.writeFile(dirname + filename, req.file.buffer, err => {
		if (!err) {
			// util
			// 计算上传的图片宽度和高度
			let dimensions = imageSize(dirname + filename); // 使用绝对路径，也可以使用url，使用url要转换成buffer
			let width = dimensions.width;
			let height = dimensions.height;
			Users.findById(uid).then(user => {
				new Photos({
					user_id: user._id,
					author: user,
					originalname: req.file.originalname,
					filename: filename,
					path: dirname,
					fullpath: dirname + filename,
					encoding: req.file.encoding,
					mimetype: req.file.mimetype,
					size: req.file.size,
					width: width,
					height: height,
					add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
					isDel: 0
				}).save().then(insert => {
					if (!insert) throw console.log(insert);
					res.json({
						message: '图片上传成功',
						url: 'https://blog.mcloudhub.com/public/images/uploads/' + now_timer + '/' + filename,
						success: 1
					});
				});
			});
		}
	});
});

router.post('/collection/new', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let icon = req.body.icon;
	let name = req.body.name;
	let describe = req.body.describe;
	let push = req.body.push;
	let admins = req.body.admins;
	let verify = req.body.verify;
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
	Users.findById(uid).then(user => {
		new Collections({
			user_id: user._id,
			author: user,
			article: [],
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
			verify: verify, // 是否需要审核
			isDel: 0
		}).save().then(coll => {
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
});

router.post('/collection/update', (req, res, next) => {
	let id = req.body.id;
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let icon = req.body.icon;
	let name = req.body.name;
	let describe = req.body.describe;
	let push = req.body.push;
	let admins = req.body.admins;
	let verify = req.body.verify;
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
	Collections.findByIdAndUpdate(id, {
		icon: icon,
		name: name,
		describe: describe,
		push: push,
		verify: verify,
		admins: admins
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '专题已修改';
		output.data = status;
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '专题修改失败';
		output.data = {};
		res.json(output);
	});
});

router.get('/get_collections', (req, res, next) => {
	let offset = req.query.offset ? parseInt(req.query.offset) : 0;
	let num = req.query.num ? parseInt(req.query.num) : 10;
	let where = {
		isDel: 0
	};
	Collections.find(where).skip((offset ? (parseInt(offset - 1) * num) : offset)).limit(num).populate([{
		path: 'author',
		select: 'name avatar nick',
	}, {
		path: 'admins',
		select: 'name avatar nick',
	}, {
		path: 'subscribe',
		select: 'name avatar nick',
	}, {
		path: 'article',
		select: 'title contents markDownText watch start fork issue follows',
		populate: [{
			path: 'author',
			select: 'name nick avatar'
		}, {
			path: 'document',
			select: 'name'
		}]
	}]).exec().then(colls => {
		if (!colls) throw console.log(colls);
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = colls;
		res.json(output);
	});
});

router.get('/getCollectionById', (req, res, next) => {
	let id = req.query.id;
	let articleArr = [];
	Collections.findOne({
		_id: id,
		isDel: 0
	}).populate([{
		path: 'author',
		select: 'name avatar nick',
	}, {
		path: 'admins',
		select: 'name avatar nick',
	}, {
		path: 'subscribe',
		select: 'name avatar nick',
	}, {
		path: 'article',
		select: 'title contents markDownText watch start fork issue follows',
		populate: [{
			path: 'author',
			select: 'name nick avatar'
		}, {
			path: 'document',
			select: 'name'
		}]
	}]).exec().then(coll => {
		if (!coll) throw console.log(coll);
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = coll;
		res.json(output);
	}).catch(err => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = [];
		res.json(output);
	});
});

router.get('/collectionFollow', (req, res, next) => {
	let uid = req.query.uid;
	let id = req.query.id;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}

	Collections.findById(id).then(coll => {
		let user = Users.findById(uid);
		return Promise.all([user, coll]);
	}).spread((u, c) => {
		c.follow++;
		c.subscribe = u;
		return c.save();
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '关注成功';
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '关注失败';
		res.json(output);
	});
});

router.get('/articlePush', (req, res, next) => {
	let uid = req.query.uid;
	let id = req.query.id;
	let article_id = req.query.article_id;
	if (req.cookies._scrf == '') {
		output.code = 0;
		output.msg = '非法请求';
		res.json(output);
		return;
	}
	Collections.findById(id).then(coll => {
		let user = Users.findById(uid);
		let article = Articles.findById(article_id);
		return Promise.all([user, article, coll]);
	}).spread((u, a, c) => {
		let bf = tools.in_array(a._id, c.article_id);
		if (bf) {
			return new Promise((resolve, reject) => {
				resolve('exists');
				reject(null);
			})
		} else {
			c.article_id.push({
				id: article_id
			});
			c.include++;
			c.article.push(a);
			return c.save();
		}
	}).then(status => {
		if (status == 'exists') {
			output.code = 2;
			output.ok = true;
			output.msg = '此文章已投稿，请另选一篇文章再投。';
			res.json(output);
		} else {
			output.code = 1;
			output.ok = true;
			output.msg = '投稿成功';
			res.json(output);
		}
	}).catch(err => {
		console.log(err);
		output.code = 0;
		output.ok = false;
		output.msg = '投稿失败';
		res.json(output);
	});
});

router.post('/updateIntroduce', (req, res, next) => {
	let uid = req.body.uid ? req.body.uid : req.session.uid;
	let introduce = req.body.introduce;
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
	Users.findByIdAndUpdate(uid, {
		introduce: introduce
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '用户个人介绍修改成功';
		output.data = {};
		res.json(output);
	}).catch(err => {
		if (err) throw err;
	});
});

router.get('/documents/get', (req, res, next) => {
	let uid = req.query.uid ? req.query.uid : '';
	let id = req.query.id ? req.query.id : '';
	let where = uid ? {
		_id: id,
		user_id: uid,
		isDel: 0
	} : {
		_id: id,
		isDel: 0
	};
	Docs.findOne(where).populate([{
		path: 'author',
		select: 'name nick avatar'
	}, {
		path: 'article',
		select: 'title contents markDownText watch start fork issue follows',
		populate: [{
			path: 'author',
			select: 'name nick avatar'
		}, {
			path: 'document',
			select: 'name'
		}]
	}]).exec().then(doc => {
		if (!doc) throw console.log(doc);
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = doc;
		res.json(output);
	}).catch(err => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = {};
		res.json(output);
	});
})

router.get('/collections/delete', (req, res, next) => {
	let uid = req.query.uid ? req.query.uid : '';
	let id = req.query.id ? req.query.id : '';
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
	Collections.findByIdAndUpdate(id, {
		isDel: 1
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = '专题已删除';
		output.data = {};
		res.json(output);
	}).catch(err => {
		output.code = 0;
		output.ok = false;
		output.msg = '专题删除失败，请稍后再试';
		output.data = {};
		res.json(output);
	});
});

router.get('/users/follow', (req, res, next) => {
	let uid = req.query.uid ? req.query.uid : '';
	let follow_id = req.query.follow_id ? req.query.follow_id : '';
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
		Users.findOne({
			_id: follow_id
		}).then(user => {
			user.follow++;
			user.uids.push({
				id: uid
			});
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

router.get('/github', (req, res, next) => {
	let code = req.query.code;
	let state = NowDate.getTime();
	let getTokenOptations = {
		uri: 'https://github.com/login/oauth/access_token',
		qs: {
			client_id: '5fe59ee126edbea8f3df',
			client_secret: 'eaf2f8a2d1b0e21ebdf4ca75628a1dd6c9fdbeff',
			code: code,
			redirect_uri: 'https://blog.mcloudhub.com/api/github',
			state: state,
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true // Automatically parses the JSON string in the response
	}

	requestPromise(getTokenOptations).then(token => {
		let getGithubUsersOptaions = {
			uri: 'https://api.github.com/user',
			headers: {
				'User-Agent': 'Request-Promise',
				'Authorization': 'token ' + token.access_token,
			},
			json: true
		}
		requestPromise(getGithubUsersOptaions).then(github => {
			// console.log(github);
			if (github) {
				Users.findOne({
					github_id: github.id
				}).then(user => {
					if (!user) {
						let user_data = {
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
							isDel: 0,
						};
						new Users(user_data).save().then(add => {
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
		}).catch(err => {
			console.log(err);
			res.redirect(302, '/');
		});
		// https://api.github.com/user?access_token=...
		// Authorization: token OAUTH-TOKEN
	}).catch(err => {
		console.log(err);
		res.redirect(302, '/');
	});
	// console.log(code);
	// res.json({code:code});
});

router.get('/check_signin', (req, res, next) => {
	if (req.session.uid && req.cookies.uid) {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = {
			isSignin: true
		}
		res.json(output);
	} else {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = {
			isSignin: false
		}
		res.json(output);
	}
});


router.get('/send_maile', (req, res, next) => {
	let uid = req.query.uid || req.session.uid;
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// nodemailer.createTestAccount((err, account) => {
	// console.log(account);
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.163.com',
		port: 465, // defaults to 587 is secure is false or 465 if true
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'thebulelife@163.com', // generated ethereal user
			pass: 'xx19890907' // generated ethereal password
		}
	});

	// verify connection configuration
	transporter.verify((error, success) => {
		if (error) {
			console.log(error);
		}
	});

	// var htmlstream = fs.createReadStream('');
	let verify_code = md5(NowDate.getTime());
	req.session.verify_code = verify_code;
	let verify_data = sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss');
	let href = encodeURI('https://blog.mcloudhub.com/api/verify_email?u=' + req.session.uid + '&code=' + verify_code + '&data=' + verify_data);
	let html_str = '<a href="' + href + '" style="font-size:16px;font-weight:700;padding:15px 40px;color:#fff;background-color:#2595ff;border-color:#0b89ff;text-decoration:none;display:inline-block;margin-bottom: 0;text-align: center;vertical-align: middle;touch-action: manipulation;cursor: pointer;background-image: none;border: 1px solid transparent;white-space: nowrap;line-height: 1.428571429;border-radius: 4px;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;">请验证您的邮箱地址</a>';
	// setup email data with unicode symbols
	let mailOptions = {
		from: 'thebulelife@163.com', // sender address
		to: '703294267@qq.com', // list of receivers
		subject: '邮箱验证', // Subject line
		text: '您好：', // plain text body
		html: html_str // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = null;
		res.json(output);
		// console.log(info);
		// console.log('Message sent: %s', info.messageId);
		// // Preview only available when sending through an Ethereal account
		// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	});

	transporter.close();
	// });

});

router.get('/verify_email', (req, res, next) => {
	let uid = req.query.u;
	let verify_code = req.query.code;
	if (req.session.verify_code == verify_code) {
		Users.findById(uid).then(user => {
			user.email_verify = true;
			return user.save();
		}).then(status => {
			res.redirect(302, '/setting/basic');
		});
	}
});

router.get('/one_by_day', (req, res, next) => {
	let date = sillyDateTime.format(new Date(), 'YYYY-MMM-DD');
	OneByDay.findOne({
		date: date
	}).then(data => {
		if (!data) {
			let options = {
				uri: 'https://open.iciba.com/dsapi/',
				qs: {
					file: 'json',
					date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD'),
					type: ''
				},
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true // Automatically parses the JSON string in the response
			};
			requestPromise(options).then(response => {
				response.add_date = sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss');
				response.date = sillyDateTime.format(new Date(), 'YYYY-MMM-DD');
				response.isDel = 0;
				new OneByDay(response).save().then(status => {
					res.json(status);
				}).catch(err => {
					console.log(err);
				});
			}).catch(err => {
				console.log(err);
			});
		} else {
			res.json(data);
		}
	});

});

router.post('/applaction/new', (req, res, next) => {
	let app = req.body.app;
	let user_id = req.session.uid && req.cookies.uid;
	let app_id = NowDate.getTime();
	let secret_key = md5(NowDate.getTime());
	app.type = app.type == 'PC应用' ? 1 : 2; // 将APP应用类型由数字转换成数字
	Users.findById(user_id).then(user => {
		return Promise.all([user]);
	}).spread((user) => {
		new Apps({
			user_id: user._id,
			name: app.name,
			redirect_uri: app.redirect_uri,
			desc: app.desc,
			avatar: app.avatar,
			owner: user,
			type: app.type, // 应用类型，1：pc，2：app
			app_id: app_id,
			secret_key: secret_key,
			status: 1, // 应用状态，1：开启，2：暂停
			effective: true, // 应用是否有效
			is_del: false,
			add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss')
		}).save().then(status => {
			output.code = 1;
			output.ok = true;
			output.msg = 'SUCCESS';
			output.data = status;
			res.json(output);
		}).catch(err => {
			console.log(err);
		});
	});
});

router.post('/applaction/update', (req, res, next) => {
	let app = req.body.app;
	let id = req.body.id;
	app.type = app.type == 'PC应用' ? 1 : 2; // 将APP应用类型由数字转换成数字
	// console.log(app);
	Apps.findByIdAndUpdate(id, {
		name: app.name,
		redirect_uri: app.redirect_uri,
		type: parseInt(app.type),
		desc: app.desc,
		avatar: app.avatar
	}, {
		new: true,
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = status;
		res.json(output);
	}).catch(err => {
		console.log(err);
	});
});

router.get('/apps/list', (req, res, next) => {
	let offset = parseInt(req.query.offset) || 1;
	let num = parseInt(req.query.num) || 10;
	let user_id = req.query.user_id;
	Apps.countDocuments({
		user_id: user_id
	}, (err, count) => {
		Apps.find({
			user_id: user_id
		}).skip((offset ? parseInt((offset - 1) * num) : parseInt(offset * num))).limit(num).then(apps => {
			output.code = 1;
			output.ok = true;
			output.msg = 'SUCCESS';
			output.data = {
				count: count,
				list: apps
			};
			res.json(output);
		}).catch(err => {
			console.log(err);
		});
	});
});

router.get('/apps/get', (req, res, next) => {
	let id = req.query.id;
	Apps.findById(id).then(app => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = app;
		res.json(output);
	}).catch(err => {
		console.log(err);
	});
});

router.get('/mail/group/list', (req, res, next) => {
	MailGroup.find().then(mail_group => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = mail_group;
		res.json(output);
	}).catch(err => {
		console.log(err);
	});
});

router.get('/mail/group/get', (req, res, next) => {
	let id = req.query.id;
	MailGroup.findById(id).then(mail_group => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = mail_group;
		res.json(output);
	}).catch(err => {
		console.log(err);
	});
});

router.post('/mail/group/add', (req, res, next) => {
	let name = req.body.name;
	MailGroup.findOne({
		name: name
	}).then(status => {
		if (!status) {
			new MailGroup({
				name: name,
				add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss'),
				isDel: false
			}).save().then(insert => {
				output.code = 1;
				output.ok = true;
				output.msg = 'SUCCESS';
				output.data = insert;
				res.json(output);
			});
		} else {
			output.code = 2;
			output.ok = true;
			output.msg = 'SUCCESS';
			output.data = insert;
			res.json(output);
		}
	}).catch(err => {
		console.log(err);
	});
});

router.get('/mail/user/list', (req, res, next) => {
	let offset = req.query.offset ? parseInt(req.query.offset) : 1;
	let num = req.query.num ? parseInt(req.query.num) : 20;
	MailUser.countDocuments({
		isDel: false
	}, (err, count) => {
		if (err) {
			console.log(err);
		} else {
			MailUser.find({
				isDel: false
			}).skip(offset ? parseInt((offset - 1) * num) : offset).limit(num).populate({
				path: 'group',
				select: 'name'
			}).exec().then(mail_users => {
				output.code = 1;
				output.ok = true;
				output.msg = 'SUCCESS';
				output.data = {
					count: count,
					list: mail_users
				};
				res.json(output);
			}).catch(err => {
				console.log(err);
			});
		}
	});
});

router.post('/mail/user/add', (req, res, next) => {
	let mail_user = req.body.mail_user;
	MailGroup.findById(mail_user.group).then(group => {
		new MailUser({
			name: mail_user.name,
			email: mail_user.email,
			phone: mail_user.phone,
			group: group,
			mark: mail_user.mark,
			add_date: sillyDateTime.format(new Date(), 'YYYY-MMM-DD HH:mm:ss'),
			isDel: false
		}).save().then(insert => {
			output.code = 1;
			output.ok = true;
			output.msg = 'SUCCESS';
			output.data = insert;
			res.json(output);
		}).catch(err => {
			console.log(err);
		});
	});
});

router.get('/mail/move_user_to_group', (req, res, next) => {
	let user_id = req.query.user_id;
	let id = req.query.id;
	MailUser.findById(user_id).then(mailUser => {
		MailGroup.findById(id).then(group => {
			mailUser.group = group;
			mailUser.save();
			output.code = 1;
			output.ok = true;
			output.msg = 'SUCCESS';
			output.data = null;
			res.json(output);
		}).catch(err => {
			console.log(err);
		});
	}).catch(err => {
		console.log(err);
	});
});

router.get('/mail/user/delete', (req, res, next) => {
	let user_id = req.query.user_id;
	MailUser.findByIdAndUpdate(user_id, {
		isDel: true
	}, {
		runValidators: true
	}).then(status => {
		output.code = 1;
		output.ok = true;
		output.msg = 'SUCCESS';
		output.data = null;
		res.json(output);
	}).catch(err => {
		console.log(err);
	});
});

router.post('/qrcode', (req, res, next) => {
	let options = {
		errorCorrectionLevel: 'H',
		version: 2,
		modes: 'auto'
	};
	QRCode.toDataURL('I am a pony!', options, function(err, url) {
		console.log(url)
	})
});

router.post('/adv/picture/upload', (req, res, next) => {
	// console.log(req.body)
	let uid = req.body.uid;
	let name = req.body.name;
	let type = req.body.type;
	let size = req.body.size;
	let base_data = req.body.base_data;
	let ext = type.split('/')[1];
	let data = base_data.replace(/^data:image\/\w+;base64,/, '');
	let dataBuffer = Buffer.from(data, 'base64');
	// Linux
	let path = '/Users/bluelifeleer/www/node/blog.mcloudhub.com/app/public/images/adv';
	// Window
	// let path = 'C:/web/www/node/blog.mcloudhub.com/app/public/images/adv';
	Users.findById(uid).then(user => {
		// console.log(user)
		let dirname = path + '/' + user._id;
		fs.existsSync(dirname) || fs.mkdirSync(dirname); // 下载目录不存在创建目录
		let filename = md5(new Date().getTime()) + '.' + ext;
		fs.writeFile(dirname + '/' + filename, dataBuffer, function(err) {
			if (err) {
				console.log(err)
			} else {
				// 计算上传的图片宽度和高度
				let dimensions = imageSize(dirname + '/' + filename); // 使用绝对路径，也可以使用url，使用url要转换成buffer
				let width = dimensions.width;
				let height = dimensions.height;
				new Photos({
					user_id: user._id,
					author: user,
					originalname: name,
					filename: filename,
					path: dirname,
					fullpath: dirname + '/' + filename,
					encoding: '',
					mimetype: type,
					size: size,
					width: width,
					height: height,
					add_date: sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
					isDel: 0
				}).save().then(insert => {
					if (!insert) throw console.log(insert);
					res.json({
						code: 1,
						message: '图片上传成功',
						ok: true,
						data: {
							url: 'https://blog.mcloudhub.com/public/images/adv/' + user._id + '/' + filename,
							width: width,
							height: height,
							size: width + 'x' + height
						}
					});
				});
			}
		});
	}).catch(err => {
		console.log(err)
	})
});

router.post('/adv/silde/add', (req, res, next) => {
	let uid = req.body.uid;
	let slides = req.body.slides;
	Users.findById(uid).then(user => {
		if (user) {
			Slide.findOne({
				uid: uid
			}).then(slide => {
				if (slide) {
					slide.adv.slides = slides;
					slide.save().then(status => {
						if (status) {
							output.code = 1;
							output.ok = true;
							output.msg = 'SUCCESS';
							output.data = null;
							res.json(output);
							return;
						}
					}).catch(err => {
						console.log(err)
					})
				} else {
					new Slide({
						uid: user._id,
						own: user,
						adv: {
							slides: slides
						}
					}).save().then(insert => {
						if (insert) {
							output.code = 1;
							output.ok = true;
							output.msg = 'SUCCESS';
							output.data = null;
							res.json(output);
							return;
						}
					}).catch(err => {
						console.log(err)
					})
				}
			}).catch(err => {
				console.log(err)
			})
		}
	}).catch(err => {
		console.log(err)
	})
});

module.exports = router;

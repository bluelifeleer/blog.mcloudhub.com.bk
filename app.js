/*
 * 项目入口
 */
const os = require('os');
const path = require('path');
const assert = require('assert');
const express = require('express');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
// const vhost = require('vhost');
const http = require('http');
// const https = require('https');
//引入http2模块
const http2 = require('spdy');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const swig = require('swig');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const sillyDateTime = require('silly-datetime');
const serveIndex = require('serve-index');
const uuidv4 = require('uuid/v4');
const expressRequestId = require('express-request-id')();
const app = express();
//是否启动记录访问日志
const start_log = true;
let options = {
    key: fs.readFileSync(path.join(__dirname + '/ssl/214483626110776.key')),
    cert: fs.readFileSync(path.join(__dirname + '/ssl/214483626110776.pem'))
}

//设置模板引擎
app.engine('swg', swig.renderFile);
//  设置模板路径
app.set('views', path.join(__dirname, '/app/views'));
// 注册模板
app.set('view engine', 'swg');
// 将模板缓存设置false
swig.setDefaults({ cache: false });
// 设置request id
app.use(expressRequestId);
// extends设置true表示接收的数据是数组，false表示是字符串
app.use(bodyParser.urlencoded({ extended: true }));
// 将提交的数据转成json,并且设置请求实体大小
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser('session_id', { maxAge: 1800000, secure: true }));

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'blog',
    collection: 'sessions'
}, err => {
    if (err) throw err;
});

store.on('error', error => {
    assert.ifError(error);
    assert.ok(false);
});

app.use(session({
    genid: function(req) {
        return uuidv4() // use UUIDs for session IDs
    },
    secret: 'session_id', // 与cookieParser中的一致
    resave: true,
    store: store, // 将session保存到mongodb中
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1800000,
    },
    rolling: true
}));
// 服务器启动时默认配置/动作
app.use(function(req, res, next) {
    // //将登录后的用户信息附加到request头信息中
    if (req.cookies.uid && req.cookies.uid != '') {
        try {
            req.session.uid = req.cookies.uid;
        } catch (e) {
            console.log(e);
        }
    }
    // 将系统类型添加到cookies和请求头中;
    // os.platform return now node runing systems : darwin=>MAC win32=>windows
    res.cookie('platform', os.platform);
    req.platform = os.platform;
    next();
});

app.use(csurf({ cookie: true, ignoreMethods: ['GET', 'POST'] }));
app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
        // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
})

// 记录访问日志
if (start_log) {
    const logDirectory = path.join(__dirname, 'logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // 日志目录不存在创建目录
    const logerFile = 'access_' + sillyDateTime.format(new Date(), 'YYYY_MMM_DD') + '.log';
    const accessLogStream = rfs(logerFile, {
        interval: '1d', // 日志切割间隔为1天，以s,m,h,d为单位
        path: logDirectory, // 日志保存路径，
        size: '1M', // 单个日志文件的大小，以B,K,M,G为单位
        compress: true // 压缩日志
    });
    app.use(morgan('combined', { stream: accessLogStream }));
}

// 添加一个虚拟机
// app.use(vhost('images.mcloudhub.com',(req,res,next)=>{
//     options = {
//         key: fs.readFileSync(__dirname+'/ssl/214517687450776.key'),
//         cert: fs.readFileSync(__dirname+'/ssl/214517687450776.pem')
//     };
//     app.use('/public', express.static(__dirname + '/public'));
//     next();
// }));

// 设置ftp路由
app.use('/ftp', express.static(path.join(__dirname, '/app/ftp')), serveIndex(path.join(__dirname, '/app/ftp'), { 'icons': true }));

// Listen
app.listen(3000)
    //设置响应头
    // app.setHeader('content-type', 'text-css');
    //设置静态文件托管
app.use('/public', express.static(path.join(__dirname, '/app/public')));
app.use('/download', express.static(path.join(__dirname, '/app/download')));
//  app.use();
// app.get('/', (req, res, next) => {
//     //  res.send('Hello Word')
//     res.render('index', );
// });
// app.use('/admin', require('./routers/admin'));

// 定义路由
app.use('/api', require(path.join(__dirname, '/app/routers/api')));
app.use('/', require(path.join(__dirname, '/app/routers/main')));
app.use('/article', require(path.join(__dirname, '/app/routers/article')));
app.use('/setting', require(path.join(__dirname, '/app/routers/setting')));
app.use('/photos', require(path.join(__dirname, '/app/routers/photos')));
app.use('/resume', require(path.join(__dirname, '/app/routers/resume')));

//设置响应头
//  app.setHeader('content-type','text-css');
//  app.set('*/css',(req,res,next)=>{
//      res.render('bbody{background:#FFF;}');
//  });

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        // 数据库连接成功后监听80/443端口
        // app.listen(80);
        http.createServer(app).listen(80);
        // https.createServer(options, app).listen(443);
        http2.createServer(options, app).listen(443);
    }
});
// app.listen(8080);

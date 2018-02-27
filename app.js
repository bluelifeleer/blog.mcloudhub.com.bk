/*
 * 项目入口
 */
const express = require('express');
const vhost = require('vhost');
const http = require('http');
const https = require('https');
//引入http2模块
const http2 = require('spdy');
const fs = require('fs');
const Cookies = require('cookies');
// const Session = require('express-session');
const crt_token = require(__dirname+'/libs/ctr_token');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//是否启动记录访问日志
const start_log = false;
let options = {
    key: fs.readFileSync(__dirname+'/ssl/214483626110776.key'),
    cert: fs.readFileSync(__dirname+'/ssl/214483626110776.pem')
}

//设置模板引擎
app.engine('html', swig.renderFile);
//  设置模板路径
app.set('views', './views');
// 注册模板
app.set('view engine', 'html');
// 将模板缓存设置false
swig.setDefaults({ cache: false });
// extends设置true表示接收的数据是数组，false表示是字符串
app.use(bodyParser.urlencoded({ extended: true }));
// 将提交的数据转成json,并且设置请求实体大小
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// 服务器启动时默认配置/动作
app.use(function(req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    //将登录后的用户信息附加到request头信息中
    if(req.cookies.get('uid') && req.cookies.get('uid') != ''){
        try{
            req.token = req.cookies.get('token') ? req.cookies.get('token') :'';
            req.uid = req.cookies.get('uid');
        }catch (e) {
            console.log(e);
        }
    }
    if(start_log){
        let arr = [],i='';
        arr.push('url='+req.url);
        arr.push('path='+req.path);
        arr.push('statusCode='+req.statusCode);
        arr.push('statusMessage='+req.statusMessage);
        arr.push('httpVersion='+req.httpVersion);
        let headers = req.headers;
        for(i in headers){
            arr.push(i+'='+headers[i]);
        }
        //将访问日志写入日志文件中
        fs.appendFile(__dirname+'/logs/server.log',arr.join(' ')+'\n','utf8',(err)=>{
            if (err) throw err;
        });
    }
    next();
});

app.use(vhost('images.mcloudhub.com',(req,res,next)=>{
    // options = {
    //     key: fs.readFileSync(__dirname+'/ssl/214517687450776.key'),
    //     cert: fs.readFileSync(__dirname+'/ssl/214517687450776.pem')
    // }
    app.use('/public', express.static(__dirname + '/public'));
    next();
}));

//设置响应头
// app.setHeader('content-type', 'text-css');
//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));
app.use('/download', express.static(__dirname + '/download'))
//  app.use();
// app.get('/', (req, res, next) => {
//     //  res.send('Hello Word')
//     res.render('index', );
// });
// app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));
app.use('/article',require('./routers/article'));
app.use('/setting',require('./routers/setting'));
app.use('/photos',require('./routers/photos'));
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
        console.log('mongodb connect is OK !!');
        // 数据库连接成功后监听80/443端口
        // app.listen(80);
        http.createServer(app).listen(80);
        // https.createServer(options, app).listen(443);
        http2.createServer(options, app).listen(443);
    }
});
// app.listen(8080);
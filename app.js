/*
 * 项目入口
 */
const express = require('express');
const http = require('http');
const https = require('https');
//引入http2模块
const http2 = require('spdy');
const fs = require('fs');
// const cookies = require('cookies');
// const cookie = require('cookie');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const crt_token = require(__dirname+'/libs/ctr_token');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//是否启动记录访问日志
const start_log = false;
const options = {
    key: fs.readFileSync(__dirname+'/ssl/214483626110776.key'),
    cert: fs.readFileSync(__dirname+'/ssl/214483626110776.pem')
}
//设置模板引擎
app.engine('html', swig.renderFile);
//  设置模板路径
app.set('views', './views');
// 注册模板
app.set('view engine', 'html');
swig.setDefaults({ cache: false });
// extends设置true表示接收的数据是数组，false表示是字符串
app.use(bodyParser.urlencoded({ extended: true }));
// 将提交的数据转成json
app.use(bodyParser.json());
// 服务器启动时默认配置/动作
app.use(function(req, res, next) {
    cookieParser();
    cookieSession({
        name:'blog',
        keys:['a','b'],
        secret:true,
        maxAge: 60*60
    });
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
    //设置cookies
    // req.cookies = new cookies(req, res);
    //设置session

    // console.log(req.cookies.get('uid'));
    console.log(req.headers);
    console.log(req.cookies);
    next();
});

// app.use(cookieParser());

// app.use(cookieSession({
//     name:'blog',
//     keys:['a','b'],
//     secret:true
// }));
// app.use(session({
//     secret: crt_token(),
//     resave: false,
//     saveUninitialized: true,
//     cookie: {maxAge: 60 * 1000 * 30}
// }));

//设置响应头
// app.setHeader('content-type', 'text-css');
//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));
//  app.use();
// app.get('/', (req, res, next) => {
//     //  res.send('Hello Word')
//     res.render('index', );
// });
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));
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
        // 数据库连接成功后监听8080商品
        // app.listen(80);
        http.createServer(app).listen(80);
        // https.createServer(options, app).listen(443);
        http2.createServer(options, app).listen(443);
    }

});
// app.listen(8080);
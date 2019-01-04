blog-node
=========

### express(框架)

### swig(模板)

### mongodb(数据库)

### node(服务器)

### Vue(js库)

#### 注：在写schema的过程中出现不能保存数据的情况(总是提示数据验证失败)，经多方调试发现是没有把schema导入到node环境中，使用module.exports将自定义的schema导入到node模块中。

#### exports跟module.exports的区别

> 每一个node.js执行文件，都自动创建一个module对象，同时，module对象会创建一个叫exports的属性，初始化的值是 {} module.exports 导出模块，require()返回的是module.exports而不是exports exports = module.exports; 是对module.exports的引用，并不是相等

#### 代码：

```
let a = {name:1};
let b=a;
console.log(a); //{name:1}
console.log(b); //{name:1}
b.name = 2;
console.log(a); //{name:2}
console.log(b); //{name:2}
b = {name:3};
console.log(a); //{name:2}
console.log(a); //{name:3}
```

-	module.exports 初始值为一个空对象 {}
-	exports 是指向的 module.exports 的引用
-	require() 返回的是 module.exports 而不是 exports

[参考连接：https://nodejs.org/api/modules.html#modules_module_exports]('https://nodejs.org/api/modules.html#modules_module_exports'\)

#### 应用在类unix系统下启动报错

> 错误：Error: listen EACCES 0.0.0.0:80 原因是在类unix系统下监听小于1024的端口要sudo权限

#### http2：

> 在node+express中使用http2需要用spdy模块，node官网提供的http2现在只是用于测试阶段。 npm install spdy

#### FileReader对象：

> FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。 其中File对象可以是来自用户在一个<input>元素上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。

#### 使用

```
const fileReader = new FileReader();
```

#### 属性

```
FileReader.error // 只读 一个DOMException，表示在读取文件时发生的错误 。
FileReader.readyState // 只读 表示FileReader状态的数字。取值如下：
    常量名     值   描述
    EMPTY   0   还没有加载任何数据.
    LOADING     1   数据正在被加载.
    DONE    2   已完成全部的读取请求.
FileReader.result // 只读 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
```

#### 事件

```
FileReader.onabort // 处理abort事件。该事件在读取操作被中断时触发。
FileReader.onerror // 处理error事件。该事件在读取操作发生错误时触发。
FileReader.onload // 处理load事件。该事件在读取操作完成时触发。
FileReader.onloadstart
    处理loadstart事件。该事件在读取操作开始时触发。
FileReader.onloadend // 处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。
FileReader.onprogress // 处理progress事件。该事件在读取Blob时触发。
```

###### 因为 FileReader 继承自EventTarget，所以所有这些事件也可以通过addEventListener方法使用。

#### 方法

```
FileReader.abort() // 中止读取操作。在返回时，readyState属性为DONE。
FileReader.readAsArrayBuffer() // Starts reading the contents of the specified Blob, once finished, the result attribute contains an ArrayBuffer representing the file's data.
FileReader.readAsBinaryString() // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
FileReader.readAsDataURL() // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
FileReader.readAsText() // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
```

[参考资料：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader]('https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader'\)

#### 2018-02-5

```
添加登录注册对用户名\手机\邮箱的支持，添加请求api接口对token验证的支持，以及登录时对骓插件骓的支持
```

#### 使用body-parser模块提交表单如果请求实体过大时会报 413 PayloadTooLargeError: request entity too large错误

```
解决办法：设置请求实体大小


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
```

#### 文件上传功能：

```
文件上传要使用express的中间件multer
multer简介：
    Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。它是写在 busboy 之上非常高效。Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。

    npm install --save multer



    注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据。
    如果不指定dest or storage上传的文件将存储在buffer中
```

#### 处理文章打包下载

1：先查询用户所有文章 2：将文章保存成.md的文件，在以用户id为全名的文件夹中[如果文件夹不存在就创建一个]（由于在数据库中分别保存了一份.md格式和.html格式的数据，所以处理这一步很简单） 3：将保存的.md的文件整个文件夹打包（用到了系统处事的tar命令，用node的子进程[child_process]执行打包操作） 4：将打包后的文件提供下载的http连接 5：由于浏览器默认对除html等广西形式的文件都是执行下载操作，所以使用js执行重新打开一个窗口（window.open()）操作达到下载目的，但是由于浏览器对于非用户手动打开的窗口有默认阻止行为，所以使用到创建一个a标签，添加到dom树中，当返回下载路径时设置a标签的href属性，并触发click动作，模拟用户点击a连接的操作，最后删除a标签。

#### morgan

> 在最新版的express 4.* 中loger变成了morgan 安装：

```
npm install morgan --save
```

参考连接：[https://www.npmjs.com/package/morgan](https://www.npmjs.com/package/morgan)

#### 使用motgan必须依赖rotating-file-stream中间件，用来通过指定的参数生成一个文件流

> 安装：

```
npm install rotating-file-stream --save
```

参考连接：[https://www.npmjs.com/package/rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream)

#### 使用express csurf出现问题：invalid csrf token经过查看原代码是因为默认没有POST方法

> 源代码片段

```
var ignoreMethods = opts.ignoreMethods === undefined
    ? ['GET', 'HEAD', 'OPTIONS']
    : opts.ignoreMethods
  if (!Array.isArray(ignoreMethods)) {
    throw new TypeError('option ignoreMethods must be an array')
  }
```

> 经过修改后：

```
var ignoreMethods = opts.ignoreMethods === undefined
    ? ['GET', 'HEAD', 'OPTIONS','POST']
    : opts.ignoreMethods
  if (!Array.isArray(ignoreMethods)) {
    throw new TypeError('option ignoreMethods must be an array')
  }
```

> 以上都是通过修改npm包的代码实现，可以应用加载的时候配置：

```
app.use(csurf({ cookie: true, ignoreMethods: ['GET', 'POST'] }));
```

#### 修改项目目录结构更适合一般框架结构

#### 修改api接口使用每个接口支持多个文档关联查询，主要使用到mongoose的populate方法

```
  object.findById(id).populate([
    {
      path:'',
      select:''
    },{
      path:'',
      select:''
      // populate:[
      //   {
      //     path:'',
      //     select:''
      //   },{
      //     path:'',
      //     select:''
      //   }
      // ]
    }
  ]).exec().then(res=>{
    console.log(res)
  });
```
#### Mongoose分页查询
```
object.find().skip().limit()...
```
> skip()    跳过的条数
> limit()   查询的条数

#### express-ws
> 使用express-ws开发即使信息获取功能
```
  npm install --save express-ws
```

#### nodemailer
> 使用nodemailer实现发送邮件
```
  npm install nodemailer
```

#### node-crontab
> node下的定时任务
```
  npm install node-crontab

  using:
  const crontab = require('node-crontab');
  const crontabId = crontab.scheduleJob(date,callback);
  // Arguments
  var crontab = require('node-crontab');
  var jobId = crontab.scheduleJob("* * * * *", function(a){
      console.log("Hello " + a + "! It's been a minute!");
  }, ["World"]);
  // Context
  var crontab = require('node-crontab');
  var obj = {a: "World"};
  var jobId = crontab.scheduleJob("* * * * *", function(){
      console.log("Hello " + this.a + "! It's been a minute!");
  }, null, obj);
  // Killing a job
  crontab.cancelJob(crontabId);
  // Suicidal jobs
  var crontab = require('node-crontab');
  var jobId = crontab.scheduleJob("* * * * *", function(){
      console.log("It's been a minute, but this is the last time I run.");
      crontab.cancelJob(jobId); // Jobs can cancel themselves, too!
  });
```

#### Express404，和错误处理

### 如何处理 404 ？
###### 在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：

```
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
```
### 如何设置一个错误处理器？
###### 错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)：

```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

[http://www.expressjs.com.cn/starter/faq.html](http://www.expressjs.com.cn/starter/faq.html "http://www.expressjs.com.cn/starter/faq.html")

#### 获取上传图片大小

> 获取上传图片大小，使用包：image-size

使用：

```
    const imageSize = require('image-size');
    let dimensions = imageSize('path'); // 也可以使用url,使用url要转换成buffer
    let width = dimensions.width;
    let height = dimensions.height;

```

#### Buffer

> node最新版中new Buffer()已废弃，使用Buffer不需要使用new Buffer()可以直接使用Buffer.form(),BUffer.alloc(),Buffer.compare()


#### 在node中将base64的数据转换成图片。

> 在计算机中任何数据最终都是以进进制形式存在的，图片也是二进制数据，在node中提供了直接操作二进制数据的方法Buffer,所以将base64的数据转换成图片可以使用Buffer进行转换，然后调用fs文件操作接口将图片保存到指定位置，详细操作如下：

```
let ext = type.split('/')[1];
let data = base_data.replace(/^data:image\/\w+;base64,/, '');
let dataBuffer = Buffer.from(data, 'base64');
let path = 'C:/web/www/node/blog.mcloudhub.com/app/public/images/adv';
let dirname = path + '/' + user._id;
fs.existsSync(dirname) || fs.mkdirSync(dirname); // 下载目录不存在创建目录
let filename = md5(new Date().getTime()) + '.' + ext;
fs.writeFile(dirname + '/' + filename, dataBuffer, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('file save successed !!')
  }
});
```

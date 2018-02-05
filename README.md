# blog-node

### express(框架)
### swig(模板)
### mongodb(数据库)
### node(服务器)
### Vue(js库)

#### 注：在写schema的过程中出现不能保存数据的情况(总是提示数据验证失败)，经多方调试发现是没有把schema导入到node环境中，使用module.exports将自定义的schema导入到node模块中。


#### exports跟module.exports的区别
> 每一个node.js执行文件，都自动创建一个module对象，同时，module对象会创建一个叫exports的属性，初始化的值是 {}
> module.exports 导出模块，require()返回的是module.exports而不是exports
> exports = module.exports; 是对module.exports的引用，并不是相等
	
#### 代码：
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

* module.exports 初始值为一个空对象 {}
* exports 是指向的 module.exports 的引用
* require() 返回的是 module.exports 而不是 exports

[参考连接：https://nodejs.org/api/modules.html#modules_module_exports]('https://nodejs.org/api/modules.html#modules_module_exports')


#### 应用在类unix系统下启动报错
> 错误：Error: listen EACCES 0.0.0.0:80
> 原因是在类unix系统下监听小于1024的端口要sudo权限

#### http2：
> 在node+express中使用http2需要用spdy模块，node官网提供的http2现在只是用于测试阶段。
    npm install spdy


#### FileReader对象：
> FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
> 其中File对象可以是来自用户在一个<input>元素上选择文件后返回的FileList对象,也可以来自拖放操作生成的 DataTransfer对象,还可以是来自在一个HTMLCanvasElement上执行mozGetAsFile()方法后返回结果。

#### 使用
    const fileReader = new FileReader();

#### 属性
    FileReader.error // 只读 一个DOMException，表示在读取文件时发生的错误 。
    FileReader.readyState // 只读 表示FileReader状态的数字。取值如下：
        常量名 	值 	描述
        EMPTY 	0 	还没有加载任何数据.
        LOADING 	1 	数据正在被加载.
        DONE 	2 	已完成全部的读取请求.
    FileReader.result // 只读 文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
#### 事件
    FileReader.onabort // 处理abort事件。该事件在读取操作被中断时触发。
    FileReader.onerror // 处理error事件。该事件在读取操作发生错误时触发。
    FileReader.onload // 处理load事件。该事件在读取操作完成时触发。
    FileReader.onloadstart
        处理loadstart事件。该事件在读取操作开始时触发。
    FileReader.onloadend // 处理loadend事件。该事件在读取操作结束时（要么成功，要么失败）触发。
    FileReader.onprogress // 处理progress事件。该事件在读取Blob时触发。
###### 因为 FileReader 继承自EventTarget，所以所有这些事件也可以通过addEventListener方法使用。

#### 方法
    FileReader.abort() // 中止读取操作。在返回时，readyState属性为DONE。
    FileReader.readAsArrayBuffer() // Starts reading the contents of the specified Blob, once finished, the result attribute contains an ArrayBuffer representing the file's data.
    FileReader.readAsBinaryString() // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
    FileReader.readAsDataURL() // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    FileReader.readAsText() // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
    
 [参考资料：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader]('https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader')

#### 2018-02-5
    添加登录注册对用户名\手机\邮箱的支持，添加请求api接口对token验证的支持，以及登录时对骓插件骓的支持


#### 使用body-parser模块提交表单如果请求实体过大时会报 413 PayloadTooLargeError: request entity too large错误
    解决办法：设置请求实体大小


    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

# blog-node

# express(框架)
# swig(模板)
# mongodb(数据库)
# node(服务器)
# Vue(js库)

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


### 开发node的npm包

> 先去npm注册帐号

连接：[https://www.npmjs.com](https://www.npmjs.com "https://www.npmjs.com")

> 在本地创建一个包目录

	mkdir npm_package_dir

> 执行初始命令生成package.json

	cd npm_package_dir
	npm init
###### 根据提示输入package描述信息，完成后可以看到生成的目录结构如下
[![](https://blog.mcloudhub.com/public/images/uploads/20180315/20180315001942_cfa84fcb90e899fb3337f065ee8f1f36.png)](https://blog.mcloudhub.com/public/images/uploads/20180315/20180315001942_cfa84fcb90e899fb3337f065ee8f1f36.png)

> 打开index.js文件输入

	module.exports = require('./lib');

> npm目录介绍

	bin/		// 包可执行命令目录
	lib/		// 包工作代码目录
	test/		// 包测试文件目录
	index.js	// 包入口
	package.json	// 包依赖描述文件
	README.md		// 包描述及使用文档

>登录npm帐号

	npm login	// 输入帐号密码

> 提交npm包

	npm publish
	
	
	
	
	
	
	
	
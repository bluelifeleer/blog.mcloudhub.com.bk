#### Egg简介：
#### Egg.js 为企业级框架和应用而生，我们希望由 Egg.js 孕育出更多上层框架，帮助开发团队和开发人员降低开发和维护成本。
> 注：Egg.js 缩写为 Egg

[![](https://blog.mcloudhub.com/public/images/uploads/20180228/20180228004528_02782c228048cde03e68e0f7f12cf0e4.jpeg)](https://blog.mcloudhub.com/public/images/uploads/20180228/20180228004528_02782c228048cde03e68e0f7f12cf0e4.jpeg)

官方文档：[https://eggjs.org/](https://eggjs.org/ "https://eggjs.org/")

#### 安装：
* 1：全局安装
		npm i egg-init -g
* 2：项目内安装
		npm i egg --save
		npm i egg-bin --save-dev

#### 搭建项目：
* 1:初始化项目及安装
		mkdir project
		cd project
		npm init						//会在项目中创建package.json
		npm i egg --save
		npm i egg-bin --save
###### 将npm script添加到package.json中
		{
			"name": "egg-example",
			"scripts": {
			"dev": "egg-bin dev"
			}
		}
* 2：编写Controller
		// {$app_root}/app/controller/home.js
		const Controller = require('egg').Controller;
		class HomeController extends Controller {
			index(){
				this.ctx.body = "Hello World Egg !!!";	//直接输出字符串
			}
		}
		module.exports = HomeController;

> 注：定义的 Controller 类，会在每一个请求访问到 server 时实例化一个全新的对象，而项目中的 Controller 类继承于 egg.Controller，会有下面几个属性挂在 this 上。

> 1：this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
> 2：this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
> 3：this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
> 4：this.config：应用运行时的配置项。
> 5：this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。

* 3:编写路由器
			{$app_root}/app/router.js
			module.exports = app =>{
				const {router,controller} = app;
				router.get('/',controller.home.index);
			}
* 4：设置默认配置文件
			//{$app_toor}/config/config.default.js
			const path = require('path');
			//配置文件有两种写法
			1：exports.keys = '';	//设置安全字符串
			2：module.exports = appInfo =>{
				const config = exports = {}
				config.keys = '';	//设置安全字符串
				return config;
			}
* 5：此时项目目录如下：
		project
		    |-----app
			|		 |-----controller
			|					   |-----home.js
			|-----config
			|		 |-----config.default.js
			|-----package.json
* 5：启动应用
			npm run dev		// 此时将启动应用并监听7001端口
* 6：浏览器输入
			http://localhost:7001
[![](https://blog.mcloudhub.com/public/images/uploads/20180227/20180227233847_ac67def2ca61d82cbc0448a94174a149.jpeg)](https://blog.mcloudhub.com/public/images/uploads/20180227/20180227233847_ac67def2ca61d82cbc0448a94174a149.jpeg)

#### Egg加载视图(view)
> 使用官方支持的 View 插件 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks "egg-view-nunjucks") 为例

* 1：安装
		npm i egg-view-nunjucks --save
* 2：启用插件
		// {$app_root}/config/plugin.js
		exports.nunjucks = {
			enable: true,
			package: 'egg-view-nunjucks',
		};
* 3：配置插件
		// {$app_root}/config/config.default.js
		exports.view = {
		defaultViewEngine: 'nunjucks',
			mapping: {
				'.tpl': 'nunjucks',
			},
		};
###### 模板文件的根目录，为绝对路径，默认为 ${baseDir}/app/view。支持配置多个目录，以 , 分割，会从多个目录查找文件。
* 4：添加模板文件
		// {$app_root}/app/view/hme.tpl
		<html>
			<head>
			</head>
			<body>
				Hello World Egg !!!!
			</body>
		</html>
* 5：在控制器中将模板渲染
		// {$app_root}/app/controller/home.js
		const Controller = require('egg').Controller;
		class HomeController extends Controller {
			async index(){
				// this.ctx.body = "Hello World Egg !!!";	//直接输出字符串
				await this.ctx.render('home.tpl',[data]);
			}
		}

#### 加载静态文件
> Egg 内置了 static 插件，线上环境建议部署到 CDN，无需该插件。static 插件默认映射 /public/* -> app/public/* 目录此处，我们把静态资源都放到 app/public 目录即可：
> 直接使用

			<script type="text/javascript" src="/public/js/home.js" ></script>

#### 使用Service
> Service为复杂的过程应抽象为业务逻辑层

#### 使用MySql
		npm i egg-mysql --save
[egg-mysql使用文档：https://github.com/eggjs/egg-mysql](https://github.com/eggjs/egg-mysql "egg-mysql使用文档：https://github.com/eggjs/egg-mysql")


#### 使用cookie和session
		pass
cookie和session使用文档：[https://eggjs.org/zh-cn/core/cookie-and-session.html](https://eggjs.org/zh-cn/core/cookie-and-session.html "cookie和session使用文档：https://eggjs.org/zh-cn/core/cookie-and-session.html")

#### 使用model
> Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
>Sequelize是Node.js v4及更高版本的基于promise的ORM。它支持方言PostgreSQL，MySQL，SQLite和MSSQL，并具有坚实的事务支持，关系，读取复制等等。Egg官方也有egg-sequelize的插件,所以这里使用它来进行代码中所有SQL操作.

* 1：安装
		npm i --save egg-sequelize
		npm install --save mysql2 # For both mysql and mariadb dialects
		// Or use other database backend.
		npm install --save pg pg-hstore # PostgreSQL
		npm install --save tedious # MSSQL
* 2：配置
		// {$app_root}/config/config.default.js
		exports.sequelize = {
			dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
			database: 'test',
			host: 'localhost',
			port: '3306',
			username: 'root',
			password: '',
		};
* 3：启用插件
		// {$app_root}/config/plugin.js
		exports.sequelize = {
			enable: true,
			package: 'egg-sequelize'
		}
* 4：添加package.json
		// {$app_root}/package.json
		{
		  "scripts": {
			"migrate:new": "egg-sequelize migration:create",
			"migrate:up": "egg-sequelize db:migrate",
			"migrate:down": "egg-sequelize db:migrate:undo"
		  }
		}
* 5：使用
> NOTE: app.model is an Instance of Sequelize, so you can use methods like: app.model.sync, app.model.query ...

		// app/model/user.js
		module.exports = app => {
			const { STRING, INTEGER, DATE } = app.Sequelize;
			const User = app.model.define('user', {
				login: STRING,
				name: STRING(30),
				password: STRING(32),
				age: INTEGER,
				last_sign_in_at: DATE,
				created_at: DATE,
				updated_at: DATE,
			});

			User.findByLogin = function* (login) {
				return yield this.findOne({
					where: {
						login: login
					}
				});
			}

			User.prototype.logSignin = function* () {
				yield this.update({ last_sign_in_at: new Date() });
			}

			return User;
		
		};
> 在controller中使用：
		// {$app_root}/app/controller/home.js
		const Controller = require('egg').Controller;
		class HomeController extends Controller {
			index(){
				// this.ctx.body = "Hello World Egg !!!";	//直接输出字符串
				const users = yield this.ctx.model.User.findAll();
     			this.ctx.body = users; //直接输出
				// this.ctx.render('home.tpl,users);	//通过模板输出到前端
			}
		}
[github连接：https://github.com/eggjs/egg-sequelize](https://github.com/eggjs/egg-sequelize "https://github.com/eggjs/egg-sequelize")
[官方网站：http://docs.sequelizejs.com/](http://docs.sequelizejs.com/ "官方网站：http://docs.sequelizejs.com/")


#### 运行：
	npm run dev		// 开发环境运行
	npm run pro		// 生产环境运行
[官方连接：https://eggjs.org/zh-cn/intro/index.html](https://eggjs.org/zh-cn/intro/index.html "官方连接：https://eggjs.org/zh-cn/intro/index.html")
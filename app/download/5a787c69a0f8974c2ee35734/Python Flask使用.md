#### 安装Python
	
#### 安装并设置Python虚拟环境
> 1:安装虚拟环境
	
	pip install virtualenv
> 2:创建一个flask项目盒子

	virtualenv flask
	
> 3:激活虚拟环境

	source Virtualenv/flask-env/bin/activate
	
> 4:安装flask
	
	pip install falsk
	
#### 使用flask:
	from falsk import Flask
	app=Flask(__name__)
	@app.route("/")
	def Hello():
		return "Hello Flask"
	if __name__=="__main__":
		app.run()
####  设置debug模式：
> 1:直接设置

	app.run(debug=True)
> 2:通过配置文件设置

	app.config.form_object()
#### Python MySQL使用：
	pip install MySQL-python
	
###### 安装MySql-python报错：
```
warnings generated.
    cc -bundle -undefined dynamic_lookup -arch x86_64 -arch i386 -Wl,-F. build/temp.macosx-10.12-intel-2.7/_mysql.o -L/usr/local/Cellar/mysql/5.7.18_1/lib -lmysqlclient -lssl -lcrypto -o build/lib.macosx-10.12-intel-2.7/_mysql.so
    ld: library not found for -lssl
    clang: error: linker command failed with exit code 1 (use -v to see invocation)
    error: command 'cc' failed with exit status 1
```
	
###### 需要执行：xcode-select --install
#### Python安装flask-SQLAlchemy
	pip install flask-SQLAlchemy
	
python使用mysql文档：
[https://dev.mysql.com/doc/dev/connector-python/8.0/mysqlx.Session.html](https://dev.mysql.com/doc/dev/connector-python/8.0/mysqlx.Session.html "https://dev.mysql.com/doc/dev/connector-python/8.0/mysqlx.Session.html")


#### Flas获取数据
> 1:获取url中的数据

	data = request.args.get('key');
> 2:获取post提交的数据

	data = request.form('key');
	
###### 参考连接：
###### 1：[http://flask.pocoo.org/docs/0.12/api/#flask.request](http://flask.pocoo.org/docs/0.12/api/#flask.request 'http://flask.pocoo.org/docs/0.12/api/#flask.request);
###### 2：[http://flask.pocoo.org/docs/0.12/api/#incoming-request-data](http://flask.pocoo.org/docs/0.12/api/#incoming-request-data 'http://flask.pocoo.org/docs/0.12/api/#incoming-request-data);
###### 3：[http://flask.pocoo.org/docs/0.12/quickstart/#accessing-request-data](http://flask.pocoo.org/docs/0.12/quickstart/#accessing-request-data 'http://flask.pocoo.org/docs/0.12/quickstart/#accessing-request-data);
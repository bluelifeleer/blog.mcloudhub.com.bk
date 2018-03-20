#### mongodb使用：
> 启动mongodb服务:启动mongodb服务使用mongod命令

	// 通过直接指定参数的方式启动
	mongod --port=27017 --dbpath=/use/local/mongodb/data --logpath=/use/local/mongodb/log/mongodb.log --logappend
	// 通过配置文件的形式启动
	mongod -f /use/local/mongodb/etc/mongodb.conf
	
> mongod命令详解：

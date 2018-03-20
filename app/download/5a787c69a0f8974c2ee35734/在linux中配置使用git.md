#### Linux中git的配置与使用
> 安装git

	yum install git

> 设置git用户名和邮箱

	git config --global user.name ""
	git config --global user.emaile ''

###### 设置完成可通过命令git config --list能看到name、email说明设置成功

> 生成ssl-key

	ssh-keygen -t rsa -C "your_email@youremail.com"

> 将生成的ssh-key添加到github个人帐号下,默认生成的ssh-key在/root/.ssh/id_rsa.pub文件中
>将id_rsa.pub中的key复制添加到github中

[![](https://blog.mcloudhub.com/public/images/uploads/20180308/20180308135123_5390608e878f02c19ceaf58a015f3d9b.png)](https://blog.mcloudhub.com/public/images/uploads/20180308/20180308135123_5390608e878f02c19ceaf58a015f3d9b.png)

> 添加完成后测试是否可以连接

	ssh -T git@github.com

###### 执行后输出：Hi bluelifeleer! You've successfully authenticated, but GitHub does not provide shell access.表示可以连接到github上。此后就可以执行git操作了。


> 将github上的项目克隆到本地

	git clone 'you github project'

> 查看github远程地址

	git remote -v


#### git常用命令

	git init						// 初始化本地仓库
	git add 					//将文件或修改添加到仓库版本控制中
	git commit 					//将文件或修改提交到本地仓库缓存中
	git push						//将本地缓存中的文件或修改推送到远端版本库中
	git checkou						//从仓库中检出一个版本或文件
	git rm							//从版本库中删除一个文件或目录
	git remote						//查看远端地址
	git config							//查看配置项
	git --help							//获取帮助
	git -v									//查看当前git版本


> 更多git使用命令请查看git --help






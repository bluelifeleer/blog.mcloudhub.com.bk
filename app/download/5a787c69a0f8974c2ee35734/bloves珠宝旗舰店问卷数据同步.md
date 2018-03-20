#### 数据上传接口：
[http://api.bloves.com/Bloves/BespeakInsert](http://api.bloves.com/Bloves/BespeakInsert "http://api.bloves.com/Bloves/BespeakInsert")

#### 上传参数：
	MaleName 		// 用户名称
	MaleMobile		// 用户手机号
	OtherRequirement		// 用户所在地址

#### 脚本文件所在服务器：121.41.228.173
#### 脚本文件所在目录：/home/wwwroot/koolbao_wenjuan_new/system/application/controllers/report_api.php -> bloves_send
#### 执行方式：http://wen.koolbao.com/report_api/bloves_send


#### 待调试

> 调试完成，等待试运行一段时间

#### 定时任务：
> \*/15 \* \* \* \* curl -s  "http://wen.koolbao.com/report_api/bloves_send" >> /home/wwwlogs/bloves_upload.log 2>&1 &

#### 定时任务执行成功：
[![](https://blog.mcloudhub.com/public/images/uploads/20180315/20180315175945_91195381773c90f182ceabe7ea4d45d0.png)](https://blog.mcloudhub.com/public/images/uploads/20180315/20180315175945_91195381773c90f182ceabe7ea4d45d0.png)
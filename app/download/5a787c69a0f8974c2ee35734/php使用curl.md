### PHP使用curl

> 使用curl发送get请求

	<?php
		$ch = curl_init();			// 初始化一个curl会话
		$url = 'https://baidu.com';
		curl_setopt($ch, CURLOPT_URL, $url);	// 设置会话请求url
		curl_setopt($ch, CURLOPT_HEADER, 1);	// 设置头文件的信息作为数据流输出
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);	// 设置获取的信息以文件流的形式返回，而不是直接输出。
		$result = curl_exec($ch);	// 执行一个会话请求
		curl_close($ch);	//关闭会话
		var_dump($result);


> 使用curl发送post请求

		$ch = curl_init();
		$url = 'http://baidu.com';
		curl_setopt($curl, CURLOPT_HEADER, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POST, 1);
		// post可以提交数据或json字符串，如果是json则要设置header头
		$data = array();
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		// or json
		// $jsonStr = json_encode($data);
		// curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		// curl_setopt($ch, CURLOPT_HTTPHEADER, array(
			// 'Content-Type: application/json',
			// 'Content-Length: ' . strlen($json_str)
		// ));
		$result = curl_exec($ch);
		curl_close($ch);
		var_dump($result);


#### curl_setopt设置介绍

|          选项          |          值          |          值类型          |          备注          |
| --------   | -----:  | :----:  |
| CURLOPT_AUTOREFERER      | ture/false   |   boolean     |  TRUE 时将根据 Location: 重定向时，自动设置 header 中的Referer:信息。  |
| CURLOPT_BINARYTRANSFER        |   ture/false   |    boolean   |   设为 TRUE ，将在启用 CURLOPT_RETURNTRANSFER 时，返回原生的（Raw）输出。   |
| CURLOPT_COOKIESESSION        |   ture/false   |    boolean   |   设为 TRUE 时将开启新的一次 cookie 会话。它将强制 libcurl 忽略之前会话时存的其他 cookie。 libcurl 在默认状况下无论是否为会话，都会储存、加载所有 cookie。会话 cookie 是指没有过期时间，只存活在会话之中。   |
| CURLOPT_CERTINFO        |   ture/false   |    boolean   |   TRUE 将在安全传输时输出 SSL 证书信息到 STDERR。   |
| CURLOPT_CONNECT_ONLY        |   ture/false   |    boolean   |   TRUE 将让库执行所有需要的代理、验证、连接过程，但不传输数据。此选项用于 HTTP、SMTP 和 POP3。   |
| CURLOPT_CRLF        |   ture/false   |    boolean   |   启用时将Unix的换行符转换成回车换行符。   |
| CURLOPT_DNS_USE_GLOBAL_CACHE        |   ture/false   |    boolean   |   TRUE 会启用一个全局的DNS缓存。此选项非线程安全的，默认已开启。   |
| CURLOPT_FAILONERROR        |   ture/false   |    boolean   |   当 HTTP 状态码大于等于 400，TRUE 将将显示错误详情。 默认情况下将返回页面，忽略 HTTP 代码。   |
| CURLOPT_HEADER        |   ture/false   |    boolean   |   启用时会将头文件的信息作为数据流输出。   |
| CURLOPT_HTTPGET        |   ture/false   |    boolean   |  TRUE 时会设置 HTTP 的 method 为 GET，由于默认是 GET，所以只有 method 被修改时才需要这个选项。   |
| CURLOPT_POST        |   ture/false   |    boolean   |   TRUE 时会发送 POST 请求，类型为：application/x-www-form-urlencoded，是 HTML 表单提交时最常见的一种。   |
| CURLOPT_RETURNTRANSFER        |   ture/false   |    boolean   |   TRUE 将curl_exec()获取的信息以字符串返回，而不是直接输出。   |
| CURLOPT_POSTFIELDS        |  array/json   |    array/string   |   全部数据使用HTTP协议中的 "POST" 操作来发送。 要发送文件，在文件名前面加上@前缀并使用完整路径。 文件类型可在文件名后以 ';type=mimetype' 的格式指定。 这个参数可以是 urlencoded 后的字符串，类似'para1=val1&para2=val2&...'，也可以使用一个以字段名为键值，字段数据为值的数组。 如果value是一个数组，Content-Type头将会被设置成multipart/form-data。 从 PHP 5.2.0 开始，使用 @ 前缀传递文件时，value 必须是个数组。 从 PHP 5.5.0 开始, @ 前缀已被废弃，文件可通过 CURLFile 发送。 设置 CURLOPT_SAFE_UPLOAD 为 TRUE 可禁用 @ 前缀发送文件，以增加安全性。   |
| CURLOPT_URL        |   'http://blog.com'   |    string   |   需要获取的 URL 地址，也可以在curl_init() 初始化会话的时候。   |
| CURLOPT_HTTPHEADER        |  array('Content-type: text/plain', 'Content-length: 100')   |    array   |   设置 HTTP 头字段的数组。格式： array('Content-type: text/plain', 'Content-length: 100')   |

> 更多参数设置请查看：[http://php.net/manual/zh/function.curl-setopt.php](http://php.net/manual/zh/function.curl-setopt.php "http://php.net/manual/zh/function.curl-setopt.php")

参考文档：
[http://php.net/manual/zh/ref.curl.php](http://php.net/manual/zh/ref.curl.php "http://php.net/manual/zh/ref.curl.php")
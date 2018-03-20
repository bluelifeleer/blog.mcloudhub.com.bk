### swigw使用：
> 安装：

	npm install swig --save
	
> 使用：

	const swig = require('swig');
	// Compile a file and store it, rendering it later
	var tpl = swig.compileFile('/path/to/template.html');
	console.log(tpl({ article: { title: 'Swig is fun!' }}));

	// Immediately render a Swig template from a string
	console.log(swig.render('{% if foo %}Hooray!{% endif %}', { locals: { foo: true }}));

> 变量输出

	const hello = 'Hello Swig !!!';
	{{ hello }} // Hello Swig !!!

> 条件表达式

	const enable = true;
	{% if enable %}
		true
	{% endif %}
	// or else
	{% if enable %}
		true
	{% else %}
		false
	{% endif %}

> 模板继承
> swig使用extends和block继承模板

	// layout.html
	<!doctype html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <title>{% block title %}My Site{% endblock %}</title>

	  {% block head %}
	  <link rel="stylesheet" href="main.css">
	  {% endblock %}
	</head>
	<body>
	  {% block content %}{% endblock %}
	</body>
	</html>
	
	// index.html
	{% extends 'layout.html' %}

	{% block title %}My Page{% endblock %}

	{% block head %}
	  {% parent %}
	  <link rel="stylesheet" href="custom.css">
	{% endblock %}

	{% block content %}
	<p>This is just an awesome page.</p>
	{% endblock %}


> 过滤
> add(value)：使变量与value相加，可以转换为数值字符串会自动转换为数值。
> addslashes：用 \ 转义字符串
> capitalize：大写首字母
> date(format[, tzOffset])：转换日期为指定格式
> format：格式
> tzOffset：时区
> default(value)：默认值（如果变量为undefined，null，false）
> escape([type])：转义字符
> 默认： &, <, >, ", '
> js: &, <, >, ", ', =, -, ;
> first：返回数组第一个值
> join(glue)：同[].join
> json_encode([indent])：类似JSON.stringify, indent为缩进空格数
> last：返回数组最后一个值
> length：返回变量的length，如果是object，返回key的数量
> lower：同''.toLowerCase()
> raw：指定输入不会被转义
> replace(search, replace[, flags])：同''.replace
> reverse：翻转数组
> striptags：去除html/xml标签
> title：大写首字母
> uniq：数组去重
> upper：同''.toUpperCase
> url_encode：同encodeURIComponent
> url_decode：同decodeURIComponemt

> 函数使用

	var locals = { mystuff: function mystuff() { return '<p>Things!</p>'; } };
	swig.render('{{ mystuff() }}', { locals: locals });
	// => <p>Things!</p>
	// or
	{{ mystuff()|escape }}		// => &lt;p&gt;Things&lt;/p&gt;

> 循环
> loop.index：当前循环的索引（1开始）
> loop.index0：当前循环的索引（0开始）
> loop.revindex：当前循环从结尾开始的索引（1开始）
> loop.revindex0：当前循环从结尾开始的索引（0开始）
> loop.key：如果迭代是对象，是当前循环的键，否则同 loop.index
> loop.first：如果是第一个值返回 true
> loop.last：如果是最后一个值返回 true
> loop.cycle：一个帮助函数，以指定的参数作为周期

	const arr = [1,2,3,4,5];
	// or in templat 
	// {% set foo = [0, 1, 2, 3, 4, 5] %}
	{% for item in arr -%}
		{{ item }}		// 12345
	{%- endfor %}
	// or index
	{% for index,item in arr -%}
		{{ index }}:{{ item }}		// 0:1,1:2,3:4,4:5
	{%- endfor %}

> 在express中使用

	const app = require('express')(),
	//const express = require('express');
	// const app = express();
	swig = require('swig'),
	people;
	// This is where all the magic happens!
	app.engine('html', swig.renderFile);

	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');

	// Swig will cache templates for you, but you can disable
	// that and use Express's caching instead, if you like:
	app.set('view cache', false);
	// To disable Swig's cache, do the following:
	swig.setDefaults({ cache: false });
	// NOTE: You should always cache templates in a production environment.
	// Don't leave both of these to `false` in production!

	app.get('/', function (req, res) {
	  res.render('index', { /* template locals context */ });
	});

	app.listen(1337);
	console.log('Application Started on http://localhost:1337/');





参考连接：
[http://node-swig.github.io/swig-templates/docs/#express](http://node-swig.github.io/swig-templates/docs/#express "http://node-swig.github.io/swig-templates/docs/#express")
[http://node-swig.github.io/swig-templates/docs/api/](http://node-swig.github.io/swig-templates/docs/api/ "http://node-swig.github.io/swig-templates/docs/api/")
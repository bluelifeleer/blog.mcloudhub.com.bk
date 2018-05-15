<!DOCTYPE html>
<html>
<head>
	<title>{{ title }}</title>
	<script src="/public/js/vue.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
	<div id="vue-app">
		${ hello }
	</div>
</body>
<script>
	var vm = new Vue({
		delimiters: ['${', '}'],
		el:'#vue-app',
		data:{
			hello:'Hello Vue !!!! .'
		},
		methods:{

		}
	});
</script>
</html>
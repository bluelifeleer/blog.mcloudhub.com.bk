<!DOCTYPE html>
<html lang="en">

<head>
    <title>{{ title }}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link type="text/css" rel="stylesheet" href="/public/css/public.css" />
    <link type="text/css" rel="stylesheet" href="/public/css/qrcode.css" />
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script type="text/javascript">
        var page_type = '{{ page_type }}';
    </script>
</head>

<body>
    <div id="qrcode-app">
        <img src="" />
    </div>
</body>
<script type="text/javascript" src="/public/js/qrcode.js"></script>

</html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
        <title>{{ title }}</title>
        <link rel="icon" href="/public/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/public/images/favicon.ico" type="image/x-icon" sizes="any" />
        <link rel="stylesheet" href="/public/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" />
        <link rel="stylesheet" href="/public/css/public.css" />
        <link rel="stylesheet" href="/public/css/article-mobile-detaile.css" />
        <!-- <script type="text/javascript" src="/public/js/vue.js"></script> -->
        <script type="text/javascript" src="/public/js/vue.min.js"></script>
        <!--<script type="text/javascript" src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>-->
        <script type="text/javascript" src="/public/js/vue-resource.js"></script>
        <script src="https://unpkg.com/element-ui/lib/index.js"></script>
        <script type="text/javascript" src="/public/js/bdtj.js"></script>
    </head>
    <body>
        <div id="app">
            <div class="mobile-header">
                <div class="menus"><a href="javascript:void(0);" class="menus-toggle-but"><i class="icon iconfont">&#xe66d;</i></a></div>
                <div class="article-title">${article.title}</div>
                <div class="user-iconf"><a href="javascript:void(0);" class="user-toggle-but"><span class="user-name">bluelife</span><i class="icon iconfont">&#xe6aa;</i></a></div>
            </div>
            <div class="mobile-section">
                <div class="mobile-article-title">${article.title}</div>
                <div class="mobile-article-author">
                    <div class="mobile-author-iconf">
                        <div class="author-avatar"><img :src="article.author.avatar" /></div>
                        <div class="author-name">${article.author.name}</div>
                        <div class="autor-clear"></div>
                    </div>
                    <div class="mobile-article-dete"><span>${article.add_date}</span></div>
                </div>
                <div class="mobile-article-body" v-html="article.contents"></div>
            </div>
            <div class="mobile-footer"></div>
        </div>
        <script type="text/javascript" src="/public/js/article-mobile-detaile.js"></script>
    </body>
</html>
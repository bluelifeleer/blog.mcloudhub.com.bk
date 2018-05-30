<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
    <title>{{ title }}</title>
    <link rel="icon" href="/public/images/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="/public/images/favicon.ico" type="image/x-icon" sizes="any" /> 
    <link rel="stylesheet" href="https://bootswatch.com/4/simplex/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/public/js/marked/css/editormd.css">
    <!--<link rel="stylesheet" href="/public/js/marked/css/editormd.preview.css">-->
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/css/main.css" />
    <!-- <script type="text/javascript" src="/public/js/vue.js"></script> -->
    <script type="text/javascript" src="/public/js/vue.min.js"></script>
    <!--<script type="text/javascript" src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>-->
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script type="text/javascript">
        var page_type = '{{ page_type }}';
        var uid = '{{ uid }}';
        {% if page_type == 'account' %}
        var quid = '{{ quid }}';
        {% endif %}
        var platform = '{{ platform }}';
        {% if page_type == 'collections_detailes' || page_type == "document_detailes" || page_type == 'collections_edit' %}
        var coll_id = '{{ coll_id }}';
        {% endif %}
        {% if page_type == 'setting_applactions_edit' %}
        var app_id = '{{ app_id }}';
        {% endif %}
    </script>
</head>

<body>
    <div id="app">
        <header id="header-bar" class="header-bar">
            <nav class="navbar-box">
                <div class="navbar-list-box navbar-logo-box">
                    <a class="navbar-logo-img-box"><img src="/public/images/logo.png" /></a>
                </div>
                <div class="navbar-list-box navbar-header-box">
                    <span class="nav-bar-buts"><a href="/" title="">首页</a></span>
                    <!-- <span class="nav-bar-buts"><a href="" title="">文章列表</a></span> -->
                    <span class="nav-bar-buts"><a href="/photos" title="">相册</a></span>
                    <span class="nav-bar-buts"><a href="/resume" title="">简历</a></span>
                    <span class="nav-bar-buts navbar-search-form">
						<input type="text" name="navbar-search-box" class="navbar-search-box" placeholder="搜索" v-on:focus="navbarSearchButFocus($event)" v-on:blur="navbarSearchButBlur($event)" />
						<a class="navbar-search-but" v-bind:class="{'navbar-search-but-hover':navbarSearchHover}"><i class="icon iconfont">&#xe71e;</i></a>
					</span>
                </div>
                <div class="navbar-list-box navbar-users-box">
                    <div class="navbar-users-info-box" v-if="isSigin">
                        <el-dropdown placement='bottom-end'>
                            <span class="el-dropdown-link">
                        <span class="navbar-users-avarta-box"><img v-bind:src="users.avatar" /></span>
                            <span class="navbar-user-name-box">
                                <element class="navbar-user-name" v-bind:title="users.full_name">${users.name}</element>
                                <element class="navbar-user-icon"><i class="icon iconfont iconfont-style" v-html="accountSymbol">&#xe68f;</i></element>
                        </span>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item><a href="/account" class="account-setting-but"><i class="icon iconfont">&#xe614;</i>&nbsp;&nbsp;我的主页</a></el-dropdown-item>
                                <el-dropdown-item disabled><a href="/bookmarks" class="account-setting-but"><i class="icon iconfont">&#xe6a8;</i>&nbsp;&nbsp;我收藏的文章</a></el-dropdown-item>
                                <el-dropdown-item disabled><a href="/liked" class="account-setting-but"><i class="icon iconfont">&#xe641;</i>&nbsp;&nbsp;我喜欢的文章</a></el-dropdown-item>
                                <el-dropdown-item><a href="/setting/basic" class="account-setting-but"><i class="icon iconfont">&#xe632;</i>&nbsp;&nbsp;设置</a></el-dropdown-item>
                                <el-dropdown-item><a href="/help" class="account-setting-but"><i class="icon iconfont">&#xe60a;</i>&nbsp;&nbsp;问题与反馈</a></el-dropdown-item>
                                <el-dropdown-item><a href="/api/signout" class="account-signout-but"><i class="icon iconfont">&#xe633;</i>&nbsp;&nbsp;退出</a></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="navbar-users-info-box" v-else>
                        <a href="/login" class="login-link-block">登录</a>
                        <a href="/register" class="register-link-block">注册</a>
                    </div>
                    <a href="/editor" class="write-article-but"><i class="icon iconfont">&#xe63e;</i>&nbsp;写文章</a>
                </div>
            </nav>
        </header>
        {% block content %}{% endblock %}
        <footer class="footer-bar"></footer>
    </div>
    <script type="text/javascript" color="0,0,255" opacity='0.7' zIndex="-1" count="99" src="/public/js/canvas-nest.min.js"></script>
</body>
<script type="text/javascript" src="/public/js/main.js"></script>

</html>

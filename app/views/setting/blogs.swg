 {% extends '../common/headers.swg' %} {% block content %}
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/setting.css" />
    <div class="account-setting-block">
        <div class="account-set-menu-block">
            <ul class="set-menu-list-group">
                <li class="set-menu-list">
                    <a href="/setting/basic" class="setmenu-link"><i class="icon iconfont">&#xe650;</i>&nbsp;&nbsp;基础设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/profile" class="setmenu-link"><i class="icon iconfont">&#xe611;</i>&nbsp;&nbsp;个人资料</a>
                </li>
                <li class="set-menu-list menu-default">
                    <a href="/setting/blogs" class="setmenu-link"><i class="icon iconfont">&#xe64b;</i>&nbsp;&nbsp;微博认证</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/reward" class="setmenu-link"><i class="icon iconfont">&#xe606;</i>&nbsp;&nbsp;赞赏设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/misc" class="setmenu-link"><i class="icon iconfont">&#xe632;</i>&nbsp;&nbsp;帐号管理</a>
                </li>
            </ul>
        </div>
        <div class="account-set-body-block">
            <div class="set-body-list-block">
                <p class="bind-blogs-block"><a href="javascript:void(0);" class="bind-blogs-buts blogs-qq">绑定qq微博</a></p>
                <p class="bind-blogs-block"><a href="javascript:void(0);" class="bind-blogs-buts blogs-sina">绑定新浪微博</a></p>
                <p class="bind-blogs-block"><a href="javascript:void(0);" class="bind-blogs-buts blogs-163">绑定163微博</a></p>
            </div>
        </div>
    </div>
</section>
{% endblock %}
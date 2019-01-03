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
                <!--li class="set-menu-list">
                    <a href="/setting/blog;" class="setmenu-link"><i class="icon iconfont">&#xe64b;</i>&nbsp;&nbsp;微博认证</a>
                </li-->
                <li class="set-menu-list">
                    <a href="/setting/reward" class="setmenu-link"><i class="icon iconfont">&#xe606;</i>&nbsp;&nbsp;赞赏设置</a>
                </li>
                <li class="set-menu-list menu-default">
                    <a href="/setting/misc" class="setmenu-link"><i class="icon iconfont">&#xe632;</i>&nbsp;&nbsp;帐号管理</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/applactions" class="setmenu-link"><i class="icon iconfont">&#xe61b;</i>&nbsp;&nbsp;应用管理</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/adv" class="setmenu-link"><i class="icon iconfont">&#xe62c;</i>&nbsp;&nbsp;广告设置</a>
                </li>
            </ul>
        </div>
        <div class="account-set-body-block">
            <div class="set-body-list-block">
                <div class="basic-setting-list">
                    <div class="basic-setting-tip">打包下载所有文章：</div>
                    <div class="basic-setting-input-box">
                        <a href="javascript:void(0);" class="download-all-article-but" v-on:click.prevent="downloadAllArticles($event)">下载所有文章</a>
                    </div>
                    <span class="download-all-articles-a-box" ref="downloadAllArticles"></span>
                </div>
                <div class="basic-setting-list" style="border:none;">
                    <div class="basic-setting-tip">删除帐号：</div>
                    <div class="basic-setting-input-box">
                        <a href="javascript:void(0);" class="delete-account-but">删除所有帐号</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
{% endblock %}
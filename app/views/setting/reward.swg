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
                <li class="set-menu-list menu-default">
                    <a href="/setting/reward" class="setmenu-link"><i class="icon iconfont">&#xe606;</i>&nbsp;&nbsp;赞赏设置</a>
                </li>
                <li class="set-menu-list">
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
                <form v-on:submit.prevent="changeRewardSubmitForm($event)">
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">赞赏功能：</div>
                        <div class="basic-setting-input-box">
                            <input type="radio" name="rewardStatus" id="rewardStatus" value="1" v-model="users.rewardStatus">&nbsp;&nbsp;开启&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="rewardStatus" id="rewardStatus" value="2" v-model="users.rewardStatus">&nbsp;&nbsp;关闭
                        </div>
                    </div>
                    <div class="basic-setting-list h160">
                        <div class="basic-setting-tip h160">赞赏描述：</div>
                        <div class="basic-setting-input-box h160">
                            <textarea name="textarea-text-box" id="textarea-text-box" class="bgf0" cols="60" rows="2" placeholder="赞赏描述" v-model="users.rewardDesc"></textarea>
                        </div>
                    </div>
                    <input type="hidden" name="token" id="token" v-model="token" />
                    <div class="basic-setting-list" style="border:none;">
                        <input type="submit" value="保存" name="submit" id="setting-basic-submit-but" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
{% endblock %}
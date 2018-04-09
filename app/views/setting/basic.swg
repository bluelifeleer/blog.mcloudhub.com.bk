 {% extends '../common/headers.swg' %} {% block content %}
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/setting.css" />
    <div class="account-setting-block">
        <div class="account-set-menu-block">
            <ul class="set-menu-list-group">
                <li class="set-menu-list menu-default">
                    <a href="/setting/basic" class="setmenu-link"><i class="icon iconfont">&#xe650;</i>&nbsp;&nbsp;基础设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/profile" class="setmenu-link"><i class="icon iconfont">&#xe611;</i>&nbsp;&nbsp;个人资料</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/blogs" class="setmenu-link"><i class="icon iconfont">&#xe64b;</i>&nbsp;&nbsp;微博认证</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/reward" class="setmenu-link"><i class="icon iconfont">&#xe606;</i>&nbsp;&nbsp;赞赏设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/misc" class="setmenu-link"><i class="icon iconfont">&#xe632;</i>&nbsp;&nbsp;帐号管理</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/applactions" class="setmenu-link"><i class="icon iconfont">&#xe61b;</i>&nbsp;&nbsp;应用管理</a>
                </li>
            </ul>
        </div>
        <div class="account-set-body-block">
            <div class="set-body-list-block">
                <form v-on:submit.prevent="changeUserBasicSubmitForm($event)">
                    <div class="basic-setting-list h120" style="border:none;">
                        <div class="basic-setting-tip h120 padt20"><img src="" v-bind:src="users.avatar" class="account-avatar"></div>
                        <div class="basic-setting-input-box h120 padt50"><input type="file" name="change-avatar" id="change-avatar" v-on:change="changeAvatar($event)"><span class="input-file-substitute-but">更换头像</span></div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">昵称：</div>
                        <div class="basic-setting-input-box"><input type="text" name="nick" id="nick" v-model="users.nick" class="bgf0"></div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">常用邮箱：</div>
                        <div class="basic-setting-input-box" style="width:45%;"><input type="email" name="email" id="email" v-model="users.email" class="bgf0"></div>
                        <div class="basic-setting-email-verify-status-box">
                            <span v-if="users.email_verify" class="email-verify-success-buts el-alert__icon el-icon-success">邮箱已验证</span>
                            <a href="javascript:void(0);" v-else class="email-verify-warning-buts el-alert__icon el-icon-warning" v-on:click="sendMail($event)">邮箱未验证</a>
                        </div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">手机：</div>
                        <div class="basic-setting-input-box"><input type="text" name="phone" id="phone" v-model="users.phone"></div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">QQ：</div>
                        <div class="basic-setting-input-box"><input type="text" name="qq" id="qq" v-model="users.qq"></div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">微信：</div>
                        <div class="basic-setting-input-box"><input type="text" name="wechat" id="wechat" v-model="users.wechat"></div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">Github：</div>
                        <div class="basic-setting-input-box"><input type="text" name="wechat" id="wechat" v-model="users.github.html_url" v-bind:disabled="users.github_id"></div>
                    </div>
                    <div class="basic-setting-list">
                        <div class="basic-setting-tip">常用编辑器：</div>
                        <div class="basic-setting-input-box">
                            <input type="radio" name="editor" id="editor" value="1" v-model="users.editors">&nbsp;&nbsp;富文本&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="editor" id="editor" value="2" v-model="users.editors">&nbsp;&nbsp;MarkDown
                        </div>
                    </div>
                    <div class="basic-setting-list" style="border:none;">
                        <input type="submit" value="保存" name="submit" id="setting-basic-submit-but" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
{% endblock %}

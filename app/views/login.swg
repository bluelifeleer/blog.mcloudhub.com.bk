<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="/public/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/css/login.css" />
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="public/js/gt.js"></script>
    <script type="text/javascript">
        var page_type = '{{ page_type }}';
    </script>
</head>

<body>
    <div id="app-login">
        <div class="login-form-block">
            <div class="form-title-text"><a href="/login" class="login-tab active">登录</a>-<a href="/register" class="login-tab">注册</a></div>
            <div class="form-input-block">
                <form v-on:submit.prevent="submitForm($event,'signin')">
                    <div class="login-user-name-input-block"><i class="icon iconfont iconfontset">&#xe623;</i><input type="text" name="name" v-model="name" id="name" placeholder="用户名/手机号/邮箱" style="width:90%;" /></div>
                    <div class="login-user-password-input-block"><i class="icon iconfont iconfontset">&#xe66c;</i><input type="password" v-bind:type="inputType" v-model="password" name="password" id="password" placeholder="密码" style="width:90%;" /><a href="javascript:void(0);" class="eye-iconfont"
                            v-on:click="showpassword($event)"><i class="icon iconfont" v-html="eyeText">&#xe61e;</i></a></div>
                    <div class="form-help-block">
                        <span class="login-rememberme">
                            <el-tooltip class="item" effect="dark" content="如果是在网吧等公共场所请谨慎勾选此项。" placement="right">
                              <el-checkbox v-model="remember">记住我</el-checkbox>
                            </el-tooltip>
                        </span>
                        <span class="login-problem">登录遇到问题?</span>
                    </div>
                    <div class="validate-block">
                        <span class="validate-tip">点击完成验证</span>
                        <span id="captcha-block"></span>
                        <input type="hidden" name="validate-code" v-model="validateCode" value="" />
                    </div>
                    <div class="form-submit-block">
                        <input type="submit" class="form-submit-but login-but" value="登录" />
                    </div>
                </form>
            </div>
            <div class="other-login">
                <h6 class="other-title">其他帐号登录</h6>
                <p class="other-login-buts-block">
                    <a href="javascript:void(0);" class="other-but github" title="github帐号登录" v-on:click="thirdPartyLogin($event,'github')"><i class="icon iconfont othericonfont">&#xe691;</i></a>
                    <!-- <a href="javascript:void(0);" class="other-but qq" title="qq帐号登录" v-on:click="thirdPartyLogin($event,'github')"><i class="icon iconfont othericonfont">&#xe60f;</i></a>
                    <a href="javascript:void(0);" class="other-but wechat" title="微信帐号登录" v-on:click="thirdPartyLogin($event,'github')"><i class="icon iconfont othericonfont">&#xe640;</i></a>
                    <a href="javascript:void(0);" class="other-but sina" title="新浪帐号登录" v-on:click="thirdPartyLogin($event,'github')"><i class="icon iconfont othericonfont">&#xe6b8;</i></a>
                    <a href="javascript:void(0);" class="other-but other" title="其他帐号登录"><i class="icon iconfont othericonfont">&#xe66b;</i></a> -->
                </p>
                <span class="quick-login-link-box" ref="loginLinkBox"></span>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" src="/public/js/login.js"></script>

</html>

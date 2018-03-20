<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ title }}</title>
    <!-- <link rel="stylesheet" href="https://bootswatch.com/4/simplex/bootstrap.min.css" /> -->
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/css/login.css" />
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script type="text/javascript" src="https://static.geetest.com/static/tools/gt.js"></script>
    <script type="text/javascript" charset="utf-8">
        var page_type = '{{ page_type }}';
    </script>
</head>

<body>
    <div id="app-login">
        <div class="login-form-block">
            <div class="form-title-text"><a href="/login" class="login-tab">登录</a>-<a href="/register" class="login-tab active">注册</a></div>
            <div class="form-input-block">
                <form v-on:submit.prevent="submitForm($event,'signup')">
                    <div class="register-user-name-input-block"><i class="icon iconfont iconfontset">&#xe623;</i><input type="text" name="name" id="name" v-model="name" placeholder="昵称/邮箱"></div>
                    <div class="login-user-phone-block"><i class="icon iconfont iconfontset">&#xe693;</i><input type="text" name="phone" id="phone" v-model="phone" placeholder="手机号"></div>
                    <div class="register-user-confirm-input-block"><i class="icon iconfont iconfontset">&#xe66c;</i><input type="password" v-bind:type="inputType" name="password" v-model="password" id="password" placeholder="密码" style="width:90%;" /><a href="javascript:void(0);" class="eye-iconfont"
                            v-on:click="showpassword($event)"><i class="icon iconfont" v-html="eyeText">&#xe61e;</i></a></div>
                    <div class="register-user-password-input-block"><i class="icon iconfont iconfontset">&#xe66c;</i><input type="password" v-bind:type="inputType" name="password-confirm" v-model="passwordConfirm" v-on:blur="blur($event)" id="password-confirm" placeholder="确认密码" style="width:90%;"
                        /><a href="javascript:void(0);" class="eye-iconfont" v-on:click="showpassword($event)"><i class="icon iconfont" v-html="eyeText">&#xe61e;</i></a></div>
                    <div class="validate-block" style="display:none;">
                        <span class="validate-tip">点击完成验证</span>
                        <span id="captcha-block"></span>
                        <input type="hidden" name="validate-code" v-model="validateCode" value="" />
                    </div>
                    <div class="form-submit-block">
                        <input type="submit" class="form-submit-but regist-but" value="注册" />
                    </div>
                </form>
                <div class="form-register-msg">
                    点击 “注册” 即表示您同意并愿意遵守我们的<br/>
                    <a href="" class="user-protocol-link">用户协议</a>和<a href="" class="privacy-policy-link">隐私政策</a>
                </div>
            </div>
            <div class="other-register">
                <h6 class="other-title">社交帐号直接注册</h6>
                <p class="other-login-buts-block">
                    <a href="javascript:void(0);" class="other-but qq" title="qq帐号登录"><i class="icon iconfont othericonfont">&#xe60f;</i></a>
                    <a href="javascript:void(0);" class="other-but wechat" title="微信帐号登录"><i class="icon iconfont othericonfont">&#xe640;</i></a>
                </p>
            </div>
        </div>

    </div>
</body>
<script type="text/javascript" src="/public/js/login.js"></script>

</html>
const VM = new Vue({
    el: '#app-login',
    data: {
        name: '',
        phone: '',
        inputType: 'password',
        password: '',
        passwordConfirm: '',
        eyeText: '&#xe61e;',
        remember: false,
        validateCode: '',
        now_date: new Date()
    },
    methods: {
        init: function() {
            this.validate();
            this.remember = this.getCookieParams('remember')
            if (page_type == 'login' && this.remember == 'true') {
                this.name = this.getCookieParams('name');
                this.password = this.getCookieParams('password');
            }
        },
        validate: function() {
            const _this = this;
            this.$http.get('/api/gettest').then(res => {
                // console.log(res);
                let GeeTest = res.body;
                initGeetest({
                    gt: GeeTest.gt,
                    challenge: GeeTest.challenge,
                    offline: GeeTest.success,
                    new_captcha: GeeTest.new_captcha,
                    lang: 'zh-cn',
                    product: 'popup',
                    width: '100%'
                }, captchaObj => {
                    // console.log(captchaObj);
                    captchaObj.appendTo('#captcha-block');
                    captchaObj.onSuccess(() => {
                        let result = captchaObj.getValidate();
                        _this.validateCode = result.geetest_validate;
                    });
                    captchaObj.onError(() => {

                    });
                });
            });
        },
        showpassword: function(e) {
            if (this.eyeText == '&#xe61e;') {
                this.eyeText = '&#xe629;';
                this.inputType = 'text';
            } else {
                this.eyeText = '&#xe61e;';
                this.inputType = 'password';
            }
        },
        blur: function(e) {
            if (this.passwordConfirm != this.password) {
                alert('两次输入密码不同');
                return false;
            }
        },
        submitForm: function(e, type) {
            if (type == 'signup') { //signup
                this.$http.post('/api/signup', { name: this.name, phone: this.phone, password: this.password, passwordConfirm: this.passwordConfirm }).then((res) => {
                    if (!res) throw console.log(res);
                    if (res.body.code == 0 && res.body.ok == false) {
                        window.location = '/register';
                    } else {
                        window.location = '/login';
                    }
                });
            } else { // signin
                let redirect = this.getQueryString('redirect_uri');
                this.$http.post('/api/signin', { name: this.name, password: this.password, validateCode: this.validateCode, form: 'login', remember: this.remember, redirect: (redirect ? redirect : '') }).then((res) => {
                    if (!res) throw console.log(res);
                    if (res.body.code == 1) { // 登录成功
                        this.alertSuccess('登录成功，正在跳转');
                        if (redirect) {
                            window.location = redirect;
                        } else {
                            window.location = '/';
                        }
                    } else if (res.body.code == 2) { // 未注册
                        this.alertError(res.body.msg);
                        window.location = '/register';
                    } else { // 登录失败，显示各种错误信息
                        this.alertError(res.body.msg);
                    }
                });
            }
        },
        thirdPartyLogin: function(e, type) {
            let a = document.createElement('a');
            a.style.display = 'none';
            // a.target = '_blank';
            this.$refs.loginLinkBox.appendChild(a);
            a.setAttribute('href', 'https://github.com/login/oauth/authorize?client_id=5fe59ee126edbea8f3df&state=' + this.now_date.getTime() + '&redirect_uri=https://blog.mcloudhub.com/api/github');
            a.click();
            // a.parentNode.removeChild(a);
        },
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            return r != null ? unescape(r[2]) : null;
        },
        alertMessage(msg) {
            this.$message({
                showClose: true,
                message: msg
            });
        },
        alertSuccess(msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'success'
            });
        },
        alertWarning(msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            });
        },
        alertError(msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'error'
            });
        },
        getCookieParams: function(key) { // 通过正则匹配获取cookie中保存值
            var reg = new RegExp("(^|;) ?" + key + "=([^;]*)(;|$)", "i");
            var cookieValues = document.cookie.match(reg);
            return cookieValues ? decodeURIComponent(cookieValues[2]) : null;
        }
    },
    mounted(){
        this.init();
    }
});

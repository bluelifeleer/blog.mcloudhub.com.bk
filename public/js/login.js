const VM = new Vue({
    el:'#app-login',
    data:{
        name:'',
        phone:'',
        inputType:'password',
        password:'',
        passwordConfirm:'',
        eyeText : '&#xe61e;',
        remember:true,
        validateCode:'',
    },
    methods:{
        init:function(){
            this.validate();
        },
        validate:function(){
            const _this = this;
            this.$http.get('/api/gettest').then(res=>{
                console.log(res);
                let GeeTest = res.body;
                initGeetest({
                    gt: GeeTest.gt,
                    challenge: GeeTest.challenge,
                    offline: GeeTest.success,
                    new_captcha: GeeTest.new_captcha,
                    lang:'zh-cn',
                    product: 'popup',
                    width:'100%'
                },captchaObj=>{
                    // console.log(captchaObj);
                    captchaObj.appendTo('#captcha-block');
                    captchaObj.onSuccess(()=>{
                        let result = captchaObj.getValidate();
                        _this.validateCode = result.geetest_validate;
                    });
                    captchaObj.onError(()=>{

                    });
                });
            });
        },
        showpassword:function(e){
            if(this.eyeText == '&#xe61e;'){
                this.eyeText = '&#xe629;';
                this.inputType = 'text';
            }else{
                this.eyeText = '&#xe61e;';
                this.inputType = 'password';
            }
        },
        blur:function(e){
            if(this.passwordConfirm == this.password){
                // return false;
                alert('两次输入密码不同')
            }
        },
        submitForm:function(e,params){
            alert(e);
            // console.log(params);
        }
    }
});
VM.init();
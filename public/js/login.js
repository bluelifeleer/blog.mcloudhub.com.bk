const VM = new Vue({
    el:'#app-login',
    data:{
        token:'',
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
            this.getToken();
        },
        getToken:function(){
            if(!this.token || this.token == ''){
                this.$http.get('/api/gettoken').then((res)=>{
                    if(!res) throw console.log(err);
                    this.token = res.body.data.token;
                })
            }
        },
        validate:function(){
            const _this = this;
            this.$http.get('/api/gettest').then(res=>{
                // console.log(res);
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
            if(this.passwordConfirm != this.password){
                alert('两次输入密码不同');
                return false;
            }
        },
        submitForm:function(e,type){
            if(type == 'signup'){ //signup
                this.$http.post('/api/signup',{name:this.name,phone:this.phone,password:this.password,passwordConfirm:this.passwordConfirm,token:this.token}).then((res)=>{
                    if(!res) throw console.log(res);
                    // if(res.body.code == 0 && res.body.ok == false){
                    //     window.location = '/register';
                    // }else{
                    //     console.log(res);
                    // }
                });
            }else{ // signin
                this.$http.post('/api/signin',{name:this.name,password:this.password,token:this.token,validateCode:this.validateCode,form:'login',remember:this.remember}).then((res)=>{
                    if(!res) throw console.log(res);
                    // if(res.body.code == 0 && res.body.ok == false){
                    //     window.location = '/register';
                    // }else{
                    //     console.log(res);
                    // }
                });
            }
            // console.log(params);
        }
    }
});
VM.init();
const vm = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        token:'',
        name:'',
        password:'',
        remember:true,
        phone:'',
        nick:'',
        email:'',
        qq:'',
        wechat:'',
        introduce:'',
        website:'',
        introduce:'',
        editors:'',
        avatar:'/public/images/QQ20180131-224008@2x.png',
        sex:3,
        introduce:'',
        website:'http://|https://',
        rewardStatus:2,
        rewardDesc:'赞赏描述',
        slide_list:{},
        tags_list:{},
        slideAttr:{
            timer:null,
            left:0,
            length:0,
            value:1024,
            index:0,
            cursor:null
        },
        accountSymbol:'&#xe68f;',
        accountBox:'none',
        popupLayerBoxShow:'none',
        popupLayerWidth:'100%',
        popupLayerHeight:'100%',
        popupLayerLeft:0,
        popupLayerTop:0,
        popupLayerText:''
    },
    methods:{
        init:function(){
            this.getTags();
            this.getToken();
            this.getSlides();
            this.slideAutoPlay();
            this.getUsers();
        },
        switchSlide:function(e,direction){
            if(direction == 'next'){
                this.slideAttr.index--;
                if(this.slideAttr.index <= -this.slideAttr.length){
                    this.slideAttr.index = 0;
                }
            }else{
                this.slideAttr.index++;
                if(this.slideAttr.index >= 0){
                    this.slideAttr.index = -this.slideAttr.length+1;
                }
            }
            this.slidePlay(this.slideAttr.index);
        },
        slidePlay:function(index){
            this.slideAttr.left = index*this.slideAttr.value;
        },
        slideAutoPlay:function(){
            let _this = this;
            this.slideAttr.timer = setInterval(function(){
                _this.switchSlide(null,'next');
            },1000);
        },
        stopSlidePlay:function(){
            this.slideAttr.cursor = 'pointer';
            clearInterval(this.slideAttr.timer);
        },
        autoSlidePlay:function(){
            this.slideAttr.cursor = null;
            this.slideAutoPlay();
        },
        submitForm:function(e,type){
            this.$http.post('/api/signin',{name:this.name,password:this.password,token:this.token,form:'index',remember:this.remember}).then((res)=>{
                if(!res) throw console.log(res);
                if(res.body.code == 0 && res.body.ok == false){
                    window.location = '/register';
                }else{
                    console.log(res);
                }
            });
        },
        getToken:function(){
            if(!this.token || this.token == ''){
                this.$http.get('/api/gettoken').then((res)=>{
                    if(!res) throw console.log(err);
                    this.token = res.body.data.token;
                })
            }
        },
        getTags:function(){
            this.$http.get('/api/tags').then(res=>{
                this.tags_list = res.body.data;
            });
        },
        getSlides:function(){
            this.$http.get('/api/slides').then(res=>{
                this.slide_list = res.body.data;
                this.slideAttr.length = res.body.data.length;
            });
        },
        showAccountBox:function(){
            if(this.accountBox == 'none'){
                this.accountBox = 'block';
                this.accountSymbol = '&#xe68d';
            }else{
                this.accountBox = 'none';
                this.accountSymbol = '&#xe68f;';
            }
        },
        getUsers:function(){
            this.$http.get('/api/getUsers').then(res=>{
                if(!res) throw console.log(err);
                console.log(res);
                this.nick = res.body.data.nick;
                this.phone = res.body.data.phone;
                this.email = res.body.data.email;
                this.qq = res.body.data.qq;
                this.wechat = res.body.data.wechat;
                this.editors = res.body.data.editors;
                this.avatar = res.body.data.avatar ? res.body.data.avatar : this.avatar;
                this.sex = res.body.data.sex;
                this.introduce = res.body.data.introduce;
                this.website = res.body.data.website;
                this.rewardStatus = res.body.data.rewardStatus ? res.body.data.rewardStatus :this.rewardStatus;
                this.rewardDesc = res.body.data.rewardDesc;
            });
        },
        changeAvatar:function(e){
            console.log(e);
            let _this = this;
            let file = e.target.files[0];
            let Reader = new FileReader();
            Reader.addEventListener('load', function(e){
                console.log(e);
                console.log(Reader);
                _this.avatar = Reader.result;
            },false);
            Reader.readAsDataURL(file);
        },
        changeUserBasicSubmitForm:function(){
            this.$http.post('/api/updateUserBasic',{
                nick:this.nick,
                phone:this.phone,
                email:this.email,
                editors:this.editors,
                avatar:this.avatar,
                qq:this.qq,
                wechat:this.wechat,
                token:this.token
            }).then(res=>{
                if(!res) throw console.log(res);
                console.log(res);
                if(res.body.code && res.body.ok){
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = res.body.msg;
                }
            });
        },
        changeUserProfileSubmitForm:function(e){
            this.$http.post('/api/changeProfile',{
                sex:this.sex,
                introduce:this.introduce,
                website:this.website,
                token:this.token
            }).then(res=>{
                if(!res) throw console.log(res);
                console.log(res);
                if(res.body.code && res.body.ok){
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = res.body.msg;
                }
            });
        },
        changeRewardSubmitForm:function(e){
            this.$http.post('/api/changeReward',{
                rewardStatus:this.rewardStatus,
                rewardDesc:this.rewardDesc,
                token:this.token
            }).then(res=>{
                if(!res) throw console.log(res);
                console.log(res);
                if(res.body.code && res.body.ok){
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = res.body.msg;
                }
            });
        },
        closePopupLayer:function(){
            this.popupLayerBoxShow = 'none';
        },
        downloadAllArticles:function(){
            this.$http.get('/api/downloadAllArticles').then(res=>{
                if(!res) throw console.log(res);
                console.log(res);
                if(res.body.code && res.body.ok){
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = res.body.msg;
                }
            });
        }
    }
});
vm.init();
// vm.html2markdown();
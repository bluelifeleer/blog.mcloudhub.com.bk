const vm = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        winW: document.body.clientWidth || document.documentElement.clientWidth,
        winH: document.body.clientHeight || document.documentElement.clientHeight,
        token:'',
        name:'',
        password:'',
        remember:true,
        phone:'',
        nick:'',
        fullname:'',
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
        popupLayerText:'',
        articleLists:[],
        article:[],
        articleComments:'填写您的评论....',
        discuss:[],
        imgRegexp: /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        hasImg:null,
        collectionIconHtml:'<span class="collections-icon"><i class="icon iconfont icontext">&#xe603;</i></span>',
        collectionIcon:'',
        collectionName:'专题名称',
        collectionDesc:'专题描述。。。',
        collectionKeyWord:'',
        collectionAdmins:[],
        collectionPus:1,
        collectionVerify:1,
        adminArr: [],
        collectionLists:[],
        collHref : '',
        collectionPopupLayer:'none',
        collectionSearchKeyWord:'',
        collection:{},
        collSubscribe:false,
        collOffset:1
    },
    methods:{
        init:function(){
            console.log();
            if(token != '' && uid !=''){
                this.uid = uid;
                this.token = token;
                this.getUsers();
            }
            this.getTags();
            this.getSlides();
            this.slideAutoPlay();
            this.getAllArticles(0,10);
            this.getArticle();
            if(page_type == 'collections_list'){
                this.getCollections(0,9);
            }else{
                this.getCollections(0,7);
            }
            if(page_type == 'collections_detailes'){
                this.getCollectionById(coll_id);
            }
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
            this.$http.post('/api/signin',{name:this.name,password:this.password,form:'index',remember:this.remember}).then((res)=>{
                if(!res) throw console.log(res);
                console.log(res);
                if(res.body.code == 0){
                    window.location = '/register';
                }else{
                    window.location.reload();
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
        getAllArticles:function(offset,num){
            this.$http.get('/api/allArticles?offset='+offset+'&num='+num).then(all=>{
                let ArticleArrs = [];
                if(all.body.code && all.body.ok){
                    ArticleArrs= all.body.data;
                    ArticleArrs.forEach(item=>{
                        item.href='/article/details?id='+item._id;
                        item.hasImg = item.contents.search(this.imgRegexp) > 0 ? true : false;

                        item.imgHtml = item.hasImg ? item.contents.match(this.imgRegexp)[0]:'';
                        let content = item.contents.replace(/<[^>]*>/g, "");
                        item.contents = item.hasImg ? (content.length > 60 ? content.substr(0,60)+'...': content) : (content.length > 80 ? content.substr(0,80)+'...': content);
                    });
                    this.articleLists = ArticleArrs.reverse();
                }
            });
        },
        getArticle:function(){
            // alert(window.location.pathname);
            if(window.location.pathname == '/article/details'){
                let id = this.getQueryString('id');
                this.$http.get('/api/getArticle?id='+id).then(article=>{
                    console.log(article);
                    if(!article) throw console.log(article);
                    let articleArr = article.body.data.article;
                    articleArr['wordNumbers'] =articleArr.contents.replace(/<[^>]*>/g, "").length;
                    this.article = articleArr;
                    let discussArr = article.body.data.discuss;
                    discussArr.forEach(item=>{
                        item.add_date = this.formate_date(item.add_date);
                    })
                    this.discuss = discussArr.reverse();
                });
            }
        },
        getQueryString:function (name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            let r = window.location.search.substr(1).match(reg);
            return r!=null ? unescape(r[2]): null;
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
            this.$http.get('/api/getUsers?uid='+this.uid).then(res=>{
                if(!res) throw console.log(res);
                this.nick = res.body.data.nick;
                this.phone = res.body.data.phone;
                this.name = res.body.data.name.length >10 ? res.body.data.name.substr(0,10)+'...' : res.body.data.name;
                this.fullname = res.body.data.name;
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
                uid:this.uid,
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
                uid:this.uid,
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
                uid:this.uid,
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
        },
        commentFocus:function(e){
            this.articleComments = this.articleComments =='填写您的评论....' ? '':this.articleComments;
        },
        commentBlur:function(e){
            this.articleComments = this.articleComments ? this.articleComments : '填写您的评论....';
        },
        postCommentBut:function(e,id){
            if(uid !== '' && token !== ''){
                if(this.articleComments == '' || this.articleComments == '填写您的评论....'){
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = '请填写您的评论内容';
                    this.popupLayerLeft = parseInt((this.winW-500)/2)+'px';
                    this.popupLayerTop = '200px';
                    return false;
                }else{
                    this.$http.post('/api/postDiscuss',{
                        contents:this.articleComments,
                        uid:this.uid,
                        token:this.token,
                        id:id
                    }).then(res=>{
                        if(res.body.code && res.body.ok){
                            this.popupLayerBoxShow = 'block';
                            this.popupLayerText = '评论成功';
                            this.popupLayerLeft = parseInt((this.winW-500)/2)+'px';
                            this.popupLayerTop = '200px';
                        }
                        this.getDiscuss(id);
                    });
                }

            }else{
                this.popupLayerBoxShow = 'block';
                this.popupLayerText = '您尚未登录';
                this.popupLayerLeft = parseInt((this.winW-500)/2)+'px';
                this.popupLayerTop = '200px';
                return false;
            }
        },
        resetCommentBut:function(e){
            this.articleComments = '填写您的评论....';
        },
        getDiscuss:function(id){
            this.$http.get('/api/getDiscuss?id='+id+'&token='+this.token).then(discuss=>{
                if(discuss.body.code && discuss.body.ok){
                    let discussArr = discuss.body.data.reverse();
                    discussArr.forEach(item=>{
                        item.add_date = this.formate_date(item.add_date);
                    })
                    this.discuss = discussArr;

                }else{
                    this.discuss = [];
                }
            });
        },
        uploadCollectionIcon:function(e){
            let _this = this;
            let file = e.target.files[0];
            let fileRender = new FileReader();
            if(file){
                fileRender.readAsDataURL(file);
            }
            fileRender.addEventListener('load',function(e){
                _this.collectionIcon = e.target.result;
                _this.collectionIconHtml = '<img src="'+e.target.result+'" />';
            },false);
        },
        queryAdmins:function(e){
            this.$http.get('/api/allUsers?keyword='+this.collectionKeyWord).then(users=>{
                this.adminArr = users.body.data;
            });
        },
        collectionSubmitForm:function(e){
            let descArr = this.collectionDesc.split('\n');
            let tmp = '';
            descArr.forEach(desc=>{
                tmp+='<p>'+desc+'</p>';
            })
            this.$http.post('/api/collection/new',{
                uid:this.uid,
                token:this.token,
                icon:this.collectionIcon,
                name:this.collectionName,
                describe:tmp,
                push:this.collectionPus,
                verify:this.collectionVerify,
                admins:this.collectionAdmins
            }).then(res=>{
                if(res.body.code && res.body.ok){
                    window.location.href='/account/collections/detailes?id='+res.body.data._id;
                }else{
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = res.body.msg;
                    this.popupLayerLeft = parseInt((this.winW-500)/2)+'px';
                    this.popupLayerTop = '200px';
                }
            });
        },
        getCollections:function(offset,num){
            this.$http.get('/api/get_collections?uid='+this.uid+'&token='+this.token+'&offset='+offset+'&num='+num).then(res=>{
                let collections = res.body.data;
                collections.forEach(item=>{
                    item.href='/account/collections/detailes?id='+item._id;
                    item.describe = item.describe.replace(/<[^>]*>/g, "");
                    item.describe = item.describe.length > 30 ? item.describe.substr(0,30)+'...': item.describe;
                    item.subscribe.forEach(uids=>{
                        if(uids.uid == this.uid){
                            item.subscribed = true;
                        }else{
                            item.subscribed = false;
                        }
                    })
                })
                this.collectionLists = collections;
            });
        },
        getCollectionById:function(id){
            this.$http.get('/api/getCollectionById?id='+id+'&token='+this.token).then(coll=>{
                if(coll.body.code && coll.body.ok){
                    let collection = coll.body.data;
                    collection.subscribe.forEach(item=>{
                        if(item.uid == this.uid){
                            this.collSubscribe = true;
                        }
                    })
                    this.collection = collection;
                }
            });
        },
        followButs:function(e,id){
            this.$http.get('/api/collectionFollow?uid='+this.uid+'&id='+id+'&token='+this.token).then();
        },
        collectionPush:function(e,id){
            this.collectionPopupLayer = 'block';
            this.popupLayerLeft = parseInt((this.winW-580)/2)+'px';
            this.popupLayerTop = 120+'px';
        },
        collectionSearchArticle:function(e){
            this.$http.get('/api/allArticles?keyword='+this.collectionSearchKeyWord+'&token='+this.token).then(lists=>{
                if(lists.body.code && lists.body.ok){
                    let articleArr = lists.body.data;
                    articleArr.forEach(item=>{
                        item.add_date = this.formate_date(item.add_date);
                    })
                    this.articleLists = articleArr.reverse();
                }else{
                    this.articleLists = [];
                }
            });
        },
        closeCollectionPushPopupLayer:function(){
            this.collectionPopupLayer = 'none';
        },
        pushActionBut:function(e,article_id,id){
            this.$http.get('/api/articlePush?uid='+this.uid+'&article_id='+article_id+'&token='+this.token+'&id='+id).then(push=>{
                this.collectionPopupLayer = 'none';
                this.popupLayerBoxShow = 'block';
                this.popupLayerText = push.body.msg;
            });
        },
        moreCollections:function(e){
            this.collOffset++;
            this.$http.get('/api/get_collections?uid='+this.uid+'&token='+this.token+'&offset='+this.collOffset+'&num=9').then(res=>{
                let collections = res.body.data;
                if(collections.length > 0){
                    collections.forEach(item=>{
                        item.href='/account/collections/detailes?id='+item._id;
                        item.describe = item.describe.replace(/<[^>]*>/g, "");
                        item.describe = item.describe.length > 30 ? item.describe.substr(0,30)+'...': item.describe;
                        item.subscribe.forEach(uids=>{
                            if(uids.uid == this.uid){
                                item.subscribed = true;
                            }else{
                                item.subscribed = false;
                            }
                        })
                        this.collectionLists.push(item);
                    })
                }
            });
        },
        formate_date:function(date){
            let MyDate = new Date(date);
            return MyDate.getFullYear()+'-'+((MyDate.getMonth()+1) <=9 ? '0'+(MyDate.getMonth()+1) : (MyDate.getMonth()+1))+'-'+MyDate.getDate()+' '+(MyDate.getHours() <=90 ? '0'+MyDate.getHours(): MyDate.getHours())+':'+(MyDate.getMinutes() <= 9 ? '0'+MyDate.getMinutes():MyDate.getMinutes())+':'+(MyDate.getSeconds() <= 9? '0'+MyDate.getSeconds() : MyDate.getSeconds());
        }
    }
});
vm.init();
// vm.html2markdown();
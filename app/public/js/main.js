const vm = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        dialogTableVisible: false,
        isSigin: false,
        navbarSearchHover: false,
        navbarUsersInfoDropdownShow: 'none',
        dropdownToggle: false,
        users: {
            name: '',
            password: '',
            avatar: '',
            accountHref: '',
            github: {
                html_url: ''
            },
            article_num: 0,
            world_num: 0,
            like_num: 0,
            follow_num: 0
        },
        remember: true,
        slide_list: {},
        docs_list: {},
        accountSymbol: '&#xe68f;',
        accountBox: 'none',
        popupLayerBoxShow: 'none',
        popupLayerText: '',
        articleLists: [],
        article: {
            start: 0,
            author: {
                avatar: '',
                article: '',
                name: '',
                href: ''
            },
            issue_contents: [],
            page:{
                total:0,
                offset:0,
                num:0
            }
        },
        articleComments: '填写您的评论....',
        imgRegexp: /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        hasImg: null,
        collection: {
            icon: '',
            icon_html: '<span class="collections-icon"><i class="icon iconfont icontext">&#xe603;</i></span>',
            name: '专题名称',
            describe: '专题描述',
            admins: [],
            keyWord: '',
            push: 1,
            verify: 1,
            href: '',
            issubscribe: false,
            searchKeyWord:'',
        },
        collectionLists: [],
        switchButsNew: 0,
        collSubscribe: false,
        collOffset: 1,
        newIncludeArticleLists: [],
        switchButSelected: true,
        swtichFlagShow: 'none',
        swtichFlagLeft: 0,
        showAccountIntroduceEditForm: 'none',
        showAccountIntroduceText: 'block',
        documentLists: null,
        switchContentsNew: 'block',
        switchContentsDiscuss: 'none',
        switchContentsHot: 'none',
        doc: {
            author: {
                href: '',
                name: '',
                avatar: ''
            },
            article_nums:0
        },
        collectionFormNew: true,
        collection_id: '',
        now_date: new Date(),
        dialogVisible: false,
        rewardAmountButsActive: true,
        showRewardSelfAmount: true,
        selfAmountAutofocus: true,
        selfAmountNums: 0,
        rewardMessage: '给Ta留言。。。',
        rewardAmount: '￥2',
        changePayMethodText: '更换',
        showPayMethod: 'none',
        payMethodActive: true,
        payMethod: 'wechat',
        app: {
          name: '应用名称',
          type: 'PC应用',
          avatar: '',
          redirect_uri: 'http://|https://',
          desc: '应用描述不多于200字',
          showAddAppIcon:true
      },
        appactions:{
            count:0,
            lists:[]
        },
        multipleSelection: [],
        commentPermissions: '1'
    },
    methods: {
        init: function() {
            if (uid != '') {
                this.isSigin = true;
                this.users.uid = page_type == 'account' ? quid : uid;
                this.getUsers();
            }
            this.getDocs();
            this.getSlides();
            this.getArticle();
            if(page_type == 'index'){
                this.getAllArticles(0, 100);
            }
            if (page_type == 'account') {
                this.users.uid = quid;
                this.getUsers();
                this.getDocuments();
                this.getAllArticles(0, 100);
            }
            if (page_type == 'collections_list') {
                this.getCollections(0, 9);
            } else {
                this.getCollections(0, 7);
            }
            if (page_type == 'collections_detailes') {
                this.getCollectionById(coll_id, 'detailes');
            }
            if (page_type == 'collections_edit') {
                this.collectionFormNew = false;
                this.getCollectionById(coll_id, 'edit');
            }
            if (page_type == 'document_detailes') {
                this.getDoc();
            }
            if(page_type == 'setting_applactions'){
                this.getApplactions();
            }
            if(page_type == 'setting_applactions_edit'){
                this.getApplactionsById(app_id);
            }
        },
        submitForm: function(e, type) {
            this.$http.post('/api/signin', { name: this.users.name, password: this.users.password, form: 'index', remember: this.remember }).then((res) => {
                if (!res) throw console.log(res);
                if (res.body.code == 0) {
                    window.location = '/register';
                } else {
                    window.location.reload();
                }
            });
        },
        getDocs: function() {
            this.$http.get('/api/docs').then(docs => {
                if (docs.body.code && docs.body.ok) {
                    let docs_data = docs.body.data;
                    docs_data.forEach(item => {
                        item.href = '/account/dcs?id=' + item._id;
                    })
                    this.docs_list = docs_data;
                }
            });
        },
        getSlides: function() {
            this.$http.get('/api/slides').then(res => {
                this.slide_list = res.body.data;
            });
        },
        getDocuments: function() {
            let query_string = page_type == 'account' ? 'uid=' + quid + '&offset=1&num=10' : 'offset=1&num=10';
            this.$http.get('/api/getDocLists?' + query_string).then(doc => {
                if (doc.body.code && doc.body.ok) {
                    if (doc.body.data.length > 0) {
                        let docs = doc.body.data;
                        docs.forEach(item => {
                            item.href = '/account/dcs?id=' + item._id;
                        })
                        this.documentLists = docs;
                    } else {
                        this.documentLists = null;
                    }

                } else {
                    this.documentLists = null;
                }
            });
        },
        getDoc: function() {
            let id = this.getQueryString('id');
            this.$http.get('/api/documents/get?id=' + id).then(doc => {
                if (doc.body.code && doc.body.ok) {
                    let documents = doc.body.data;
                    documents.author.href = '/account?uid=' + documents.author._id;
                    documents.article_nums = documents.article.length;
                    documents.article.forEach(item => {
                        item.href = '/article/details?id=' + item._id;
                        item.hasImg = item.contents.search(this.imgRegexp) > 0 ? true : false;
                        item.imgHtml = item.hasImg ? item.contents.match(this.imgRegexp)[0] : '';
                        let content = item.contents.replace(/<[^>]*>/g, "");
                        item.contents = item.hasImg ? (content.length > 60 ? content.substr(0, 60) + '...' : content) : (content.length > 80 ? content.substr(0, 80) + '...' : content);
                    })
                    this.swtichFlagShow = 'block';
                    this.swtichFlagLeft = this.$refs.switchButsNew.offsetLeft + 'px';
                    this.$refs.switchContentsNew.style = 'display:block';
                    this.$refs.switchContentsDiscuss.style = 'display:none';
                    this.$refs.switchContentsHot.style = 'display:none';
                    this.doc = documents;
                } else {
                    this.doc = {};
                }
            });
        },
        getAllArticles: function(offset, num) {
            let query_string = '';
            if (page_type == 'account') {
                query_string = 'uid=' + quid + '&offset=' + offset + '&num=' + num;
            } else if (page_type == 'collections_detailes') {
                query_string = 'uid=' + this.users.uid + '&offset=' + offset + '&num=' + num;
            } else {
                query_string = 'offset=' + offset + '&num=' + num;
            }
            this.$http.get('/api/allArticles?' + query_string).then(all => {
                let ArticleArrs = [];
                if (all.body.code && all.body.ok) {
                    ArticleArrs = all.body.data.articles;
                    ArticleArrs.forEach(item => {
                        item.href = '/article/details?id=' + item._id;
                        item.hasImg = item.contents.search(this.imgRegexp) > 0 ? true : false;

                        item.imgHtml = item.hasImg ? item.contents.match(this.imgRegexp)[0] : '';
                        let content = item.contents.replace(/<[^>]*>/g, "");
                        item.contents = item.hasImg ? (content.length > 60 ? content.substr(0, 60) + '...' : content) : (content.length > 80 ? content.substr(0, 80) + '...' : content);
                    });
                    this.articleLists = ArticleArrs.reverse();
                }
            });
        },
        getArticle: function() {
            if (window.location.pathname == '/article/details') {
                let id = this.getQueryString('id');
                this.$http.get('/api/getArticle?id=' + id).then(article => {
                    if(article.body.code && article.body.ok){
                        let articleArr = article.body.data.article;
                        articleArr.author.href = '/account?uid=' + articleArr.author._id;
                        articleArr.issue_contents.forEach(item => {
                            item.add_date = this.formate_date(item.add_date);
                            item.author.href = '/account?uid=' + item.author._id;
                        })
                        articleArr.issue_contents = articleArr.issue_contents.reverse();
                        articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;

                        this.article = articleArr;
                    }
                });
            }
        },
        getApplactions:function(){
            this.$http.get('/api/apps/list?user_id='+this.users.uid+'&offset=1&num=10').then(res=>{
                console.log(res);
                if(res.body.code && res.body.ok){
                    this.appactions.count = res.body.data.count;
                    let lists = res.body.data.list.reverse();
                    lists.forEach(item=>{
                        item.type = item.type == 1 ? 'PC应用': 'APP应用';
                        item.status = item.status == 1 ? '开启': '暂停';
                    });
                    this.appactions.lists = lists;
                }
            });
        },
        getApplactionsById:function(id){
            this.$http.get('/api/apps/get?id='+id).then(res=>{
                if(res.body.code && res.body.ok){
                    let app = res.body.data;
                    app.type = app.type == 1 ? 'PC应用': 'APP应用';
                    this.app = app;
                }
            });
        },
        getQueryString: function(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            return r != null ? unescape(r[2]) : null;
        },
        showAccountBox: function(e) {
            if (this.navbarUsersInfoDropdownShow == 'none') {
                this.navbarUsersInfoDropdownShow = 'block';
                this.accountSymbol = '&#xe68d';
            } else {
                this.navbarUsersInfoDropdownShow = 'none';
                this.accountSymbol = '&#xe68f;';
            }
        },
        navbarSearchButFocus: function(e) {
            this.navbarSearchHover = !this.navbarSearchHover;
        },
        navbarSearchButBlur: function() {
            this.navbarSearchHover = !this.navbarSearchHover;
        },
        getUsers: function() {
            this.$http.get('/api/getUsers?uid=' + this.users.uid).then(res => {
                if (!res) throw console.log(res);
                let data = res.body.data;
                data.uid = data._id;
                data.name = data.name.length > 10 ? data.name.substr(0, 10) + '...' : data.name;
                data.fullname = data.name;
                data.avatar = data.avatar ? data.avatar : '/public/images/avatar_default-78d4d1f68984cd6d4379508dd94b4210.png';
                data.rewardStatus = data.rewardStatus ? data.rewardStatus : 2;
                data.rewardDesc = data.rewardDesc ? data.rewardDesc : '如果您觉得这文章能帮助到您，您可以对我进行打赏。';
                data.accountHref = '/account?uid=' + data._id;
                data.article_num = data.article.length;
                data.world_num = 0;
                data.like_num = 0;
                data.follow_num = data.follows;
                this.users = data;
            });
        },
        changeAvatar: function(e) {
            let _this = this;
            let file = e.target.files[0];
            let Reader = new FileReader();
            Reader.addEventListener('load', function(e) {
                _this.users.avatar = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
        },
        changeUserBasicSubmitForm: function() {
            this.$http.post('/api/updateUserBasic', {
                uid: this.users.uid,
                nick: this.users.nick,
                phone: this.users.phone,
                email: this.users.email,
                editors: this.users.editors,
                avatar: this.users.avatar,
                qq: this.users.qq,
                wechat: this.users.wechat,
                github: this.users.github
            }).then(res => {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    this.alertSuccess(res.body.msg);
                }
            });
        },
        changeUserProfileSubmitForm: function(e) {
            this.$http.post('/api/changeProfile', {
                uid: this.users.uid,
                sex: this.users.sex,
                introduce: this.users.introduce,
                website: this.users.website
            }).then(res => {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    this.alertSuccess(res.body.msg);
                }
            });
        },
        changeRewardSubmitForm: function(e) {
            this.$http.post('/api/changeReward', {
                uid: this.users.uid,
                rewardStatus: this.users.rewardStatus,
                rewardDesc: this.users.rewardDesc
            }).then(res => {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    this.alertSuccess(res.body.msg);
                }
            });
        },
        closePopupLayer: function() {
            this.popupLayerBoxShow = 'none';
        },
        downloadAllArticles: function() {
            let a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            a.setAttribute('target', '_blank');
            this.$refs.downloadAllArticles.appendChild(a);
            this.$http.get('/api/downloadAllArticles?uid=' + this.users.uid).then(res => {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    a.setAttribute('href', res.body.data.tar_path);
                    a.click();
                    a.parentNode.removeChild(a);
                    this.alertSuccess(res.body.msg);
                }
            });
        },
        commentFocus: function(e) {
            this.articleComments = this.articleComments == '填写您的评论....' ? '' : this.articleComments;
        },
        commentBlur: function(e) {
            this.articleComments = this.articleComments ? this.articleComments : '填写您的评论....';
        },
        postCommentBut: function(e, id) {
            if (uid !== '') {
                if (this.articleComments == '' || this.articleComments == '填写您的评论....') {
                    this.alertWarning(res.body.msg);
                    return false;
                } else {
                    this.$http.post('/api/postDiscuss', {
                        contents: this.articleComments,
                        uid: this.users.uid,
                        id: id,
                        permissions: parseInt(this.commentPermissions)
                    }).then(res => {
                        if (res.body.code && res.body.ok) {
                            this.alertSuccess('评论成功');
                            this.articleComments = '填写您的评论....';
                        }
                        this.getArticle(id);
                    });
                }

            } else {
                this.popupLayerBoxShow = 'block';
                this.popupLayerText = '您尚未登录';
                this.popupLayerLeft = parseInt((this.winW - 500) / 2) + 'px';
                this.popupLayerTop = '200px';
                return false;
            }
        },
        resetCommentBut: function(e) {
            this.articleComments = '填写您的评论....';
        },
        uploadCollectionIcon: function(e) {
            let _this = this;
            let file = e.target.files[0];
            let fileRender = new FileReader();
            if (file) {
                fileRender.readAsDataURL(file);
            }
            fileRender.addEventListener('load', function(e) {
                _this.collection.icon = e.target.result;
                _this.collection.icon_html = '<img src="' + e.target.result + '">';
            }, false);
        },
        queryAdmins: function(e) {
            this.$http.get('/api/allUsers?keyword=' + this.collectionKeyWord).then(users => {
                this.adminArr = users.body.data;
            });
        },
        collectionSubmitForm: function(e, s) {
            let descArr = platform == 'win32' ? this.collection.describe.split('\r\n') : this.collection.describe.split('\n');
            let tmp = '';
            descArr.forEach(desc => {
                tmp += '<p>' + desc + '</p>';
            });
            let url = s ? '/api/collection/new' : '/api/collection/update';
            let data = s ? {
                uid: this.users.uid,
                icon: this.collection.icon,
                name: this.collection.name,
                describe: tmp,
                push: this.collection.push,
                verify: this.collection.verify,
                admins: this.collection.admins
            } : {
                id: this.collection._id,
                uid: this.users.uid,
                icon: this.collection.icon,
                name: this.collection.name,
                describe: tmp,
                push: this.collection.push,
                verify: this.collection.verify,
                admins: this.collection.admins
            };
            this.$http.post(url, data).then(res => {
                if (res.body.code && res.body.ok) {
                    window.location.href = '/account/collections/detailes?id=' + res.body.data._id;
                } else {
                    this.alertError('专题创建失败');
                }
            });

        },
        getCollections: function(offset, num) {
            let query_string = page_type == 'account' ? 'uid=' + quid + '&offset=' + offset + '&num=' + num : 'offset=' + offset + '&num=' + num
            this.$http.get('/api/get_collections?' + query_string).then(res => {
                let collections = res.body.data;
                collections.forEach(item => {
                    item.href = '/account/collections/detailes?id=' + item._id;
                    item.describe = item.describe.replace(/<[^>]*>/g, "");
                    item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                    item.subscribe.forEach(uids => {
                        if (uids._id == this.users.uid) {
                            item.isSubscribed = true;
                        } else {
                            item.isSubscribed = false;
                        }
                    })
                })
                this.collectionLists = collections;
            });
        },
        getCollectionById: function(id, type) {
            this.$http.get('/api/getCollectionById?id=' + id).then(coll => {
                if (coll.body.code && coll.body.ok) {
                    let collection = coll.body.data;
                    if (type == 'edit') {
                        let replaceText = platform == 'win32' ? '\r\n' : '\n'; // 根据不同的系统确定换行符
                        collection.describe = collection.describe.replace(/<p>/g, ''); // 将开头的p标签去掉
                        collection.describe = collection.describe.replace(/<\/p>/g, replaceText); // 将结束的p标签替换成换行符
                        collection.icon_html = '<img src="' + collection.icon + '">';
                        this.collection = collection;
                    } else {
                        collection.href = '/account/collections/edit?id=' + collection._id;
                        collection.icon_html = '<img src="' + collection.icon + '">';
                        collection.article.forEach(item => {
                            item.href = '/article/details?id=' + item._id;
                            item.hasImg = item.contents.search(this.imgRegexp) > 0 ? true : false;
                            item.imgHtml = item.hasImg ? item.contents.match(this.imgRegexp)[0] : '';
                            let content = item.contents.replace(/<[^>]*>/g, "");
                            item.contents = item.hasImg ? (content.length > 60 ? content.substr(0, 60) + '...' : content) : (content.length > 80 ? content.substr(0, 80) + '...' : content);
                        });
                        collection.subscribe.forEach(item => {
                                if (item._id == this.users.uid) {
                                    collection.issubscribe = true;
                                }
                            });
                        collection.article = collection.article.reverse();
                            // console.log(this.$refs.switchButs);
                        this.swtichFlagShow = 'block';
                        this.swtichFlagLeft = this.$refs.switchButsNew.offsetLeft + 'px';
                        this.$refs.switchContentsNew.style = 'display:block';
                        this.$refs.switchContentsDiscuss.style = 'display:none';
                        this.$refs.switchContentsHot.style = 'display:none';
                        this.newIncludeArticleLists = collection.articles;
                        console.log(collection);
                        this.collection = collection;
                    }
                }
            });
        },
        switchButOver: function(type) {
            switch (type) {
                case 'discuss':
                    this.swtichFlagLeft = this.$refs.switchButsDiscuss.offsetLeft + 'px';
                    break;
                case 'hot':
                    this.swtichFlagLeft = this.$refs.switchButsHot.offsetLeft + 'px';
                    break;
                default:
                    this.swtichFlagLeft = this.$refs.switchButsNew.offsetLeft + 'px';
                    break;
            }
        },
        switchButs: function(e, type) {
            switch (type) {
                case 'discuss':
                    this.swtichFlagLeft = this.$refs.switchButsDiscuss.offsetLeft + 'px';
                    this.$refs.switchContentsNew.style = 'display:none';
                    this.$refs.switchContentsDiscuss.style = 'display:block';
                    this.$refs.switchContentsHot.style = 'display:none';
                    break;
                case 'hot':
                    this.swtichFlagLeft = this.$refs.switchButsHot.offsetLeft + 'px';
                    this.$refs.switchContentsNew.style = 'display:none';
                    this.$refs.switchContentsDiscuss.style = 'display:none';
                    this.$refs.switchContentsHot.style = 'display:block';
                    break;
                default:
                    this.swtichFlagLeft = this.$refs.switchButsNew.offsetLeft + 'px';
                    this.$refs.switchContentsNew.style = 'display:block';
                    this.$refs.switchContentsDiscuss.style = 'display:none';
                    this.$refs.switchContentsHot.style = 'display:none';
                    break;
            }
        },
        followButs: function(e, id) {
            if (this.isSigin) {
                this.$http.get('/api/collectionFollow?uid=' + this.users.uid + '&id=' + id).then(res => {
                    if (res.body.code && res.body.ok) {
                        this.alertSuccess(res.body.msg);
                    } else {
                        this.alertError(res.body.msg);
                    }
                });
            } else {
                window.location.href = '/login?redirect_uri=' + window.location.href;
            }
        },
        collectionPush: function(e, id) {
            if (this.isSigin) {
                this.getAllArticles(0, 100);
                this.dialogTableVisible = true;
            } else {
                window.location.href = '/login?redirect_uri=' + window.location.href;
            }

        },
        collectionSearchArticle: function(e) {
            this.$http.get('/api/allArticles?keyword=' + this.collection.searchKeyWord).then(lists => {
                if (lists.body.code && lists.body.ok) {
                    let articleArr = lists.body.data;
                    articleArr.forEach(item => {
                        item.add_date = this.formate_date(item.add_date);
                    })
                    this.articleLists = articleArr.reverse();
                } else {
                    this.articleLists = [];
                }
            });
        },
        pushActionBut: function(e, article_id, id) {
            this.$http.get('/api/articlePush?uid=' + this.users.uid + '&article_id=' + article_id + '&id=' + id).then(push => {
                if (push.body.code && push.body.ok) {
                    if (push.body.code == 1) {
                        this.alertSuccess(push.body.msg);
                    } else {
                        this.alertWarning(push.body.msg);
                    }
                } else {
                    this.alertError(push.body.msg);
                }

            });
        },
        moreCollections: function(e) {
            this.collOffset++;
            this.$http.get('/api/get_collections?uid=' + this.users.uid + '&offset=' + this.collOffset + '&num=9').then(res => {
                let collections = res.body.data;
                if (collections.length > 0) {
                    collections.forEach(item => {
                        item.href = '/account/collections/detailes?id=' + item._id;
                        item.describe = item.describe.replace(/<[^>]*>/g, "");
                        item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                        item.subscribe.forEach(uids => {
                            if (uids._id == this.users.uid) {
                                item.isSubscribed = true;
                            } else {
                                item.isSubscribed = false;
                            }
                        })
                        this.collectionLists.push(item);
                    })
                }
            });
        },
        accountIntroduceEditBut: function(e) {
            this.showAccountIntroduceEditForm = 'block';
            this.showAccountIntroduceText = 'none';
        },
        accountIntroduceFromSaveBut: function(e) {
            this.$http.post('/api/updateIntroduce', {
                uid: this.users.uid,
                introduce: this.users.introduce
            }).then(res => {
                if (res.body.code && res.body.ok) {
                    this.introduce = this.introduce;
                    this.showAccountIntroduceEditForm = 'none';
                    this.showAccountIntroduceText = 'block';
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = res.body.msg;
                    this.popupLayerLeft = parseInt((this.winW - 500) / 2) + 'px';
                    this.popupLayerTop = '200px';
                } else {
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = '个人介绍修改失败';
                    this.popupLayerLeft = parseInt((this.winW - 500) / 2) + 'px';
                    this.popupLayerTop = '200px';
                }
            });
        },
        accountIntroduceFromResetBut: function() {
            this.showAccountIntroduceEditForm = 'none';
            this.showAccountIntroduceText = 'block';
        },
        deleteCollection: function(e, id) {
            this.$http.get('/api/collections/delete?id=' + id + '&uid=' + this.users.uid).then(res => {
                if (res.body.code && res.body.ok) {
                    this.alertSuccess(res.body.msg);
                } else {
                    this.alertError(res.body.msg);
                }
            });
        },
        articlFollowAuthorBut: function(e, id) {
            this.$http.get('/api/users/follow?uid=' + this.users.uid + '&follow_id=' + id).then(res => {
                if (res.body.code && res.body.ok) {
                    this.alertSuccess('您已成功关注');
                } else {
                    this.alertError('您关注失败');
                }
            });
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
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        selectAmountButs: function(e, index, nums) {
            let buts = this.$refs.rewardAmountButs.children;
            for (let i = 0; i < buts.length; i++) {
                buts[i].style.color = '#999';
                buts[i].style.border = '1px solid #e6e6e6';
                // Vue.set(buts[i],'reward-amount-buts-default',false);
            }
            buts[index].style.color = '#EA6F5A';
            buts[index].style.border = '1px solid #EA6F5A';
            if (!nums) {
                this.showRewardSelfAmount = false;
                this.rewardAmount = '￥' + this.selfAmountNums;
            } else {
                this.showRewardSelfAmount = true;
                this.rewardAmount = '￥' + nums;
            }
        },
        setSelfAmountNums: function(e) {
            this.rewardAmount = this.selfAmountNums ? '￥' + this.selfAmountNums : '￥0';
        },
        // hiddenSelfAmountInput:function(e){
        //     this.showRewardSelfAmount = !this.showRewardSelfAmount;
        // },
        // showSelfAmountInput:function(e){
        //     this.showRewardSelfAmount = !this.showRewardSelfAmount;
        // },
        rewardMessageTextareaFocus: function(e) {
            this.rewardMessage = this.rewardMessage != '给Ta留言。。。' ? this.rewardMessage : '';
        },
        rewardMessageTextareaBlur: function(e) {
            this.rewardMessage = this.rewardMessage != '给Ta留言。。。' && this.rewardMessage != '' ? this.rewardMessage : '给Ta留言。。。';
        },
        chenagePayMethod: function(e) {
            if (this.showPayMethod == 'none') {
                this.showPayMethod = 'block';
                this.changePayMethodText = '关闭';
            } else {
                this.showPayMethod = 'none';
                this.changePayMethodText = '更换';
            }
        },
        selectPayMethods: function(e, pay) {
            this.payMethodActive = !this.payMethodActive;
            this.payMethod = pay;
        },
        payAmountActive: function(e) {
            let rewardAmount = this.rewardAmount.substr(1, this.rewardAmount.length);
            alert('支付方式：' + this.payMethod + "；支付金额：" + rewardAmount + '；留言：' + this.rewardMessage);
        },
        sendMail: function(e) {
            this.$http.get('/api/send_maile').then(res => {
                console.log(res);
            });
        },
        appPauseBut:function(){
            alert('pause');
        },
        appRecoverBut:function(){
            alert('recover');
        },
        appDeleteBut:function(){
            alert('delete');
        },
        uploadAppIcon:function(e){
            let _this = this;
            let file = e.target.files[0];
            let Reader = new FileReader();
            Reader.addEventListener('load', function(e) {
                _this.app.showAddAppIcon = false;
                _this.app.avatar = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
        },
        appNewFormOnSubmit:function(id){
            if(id){
                this.$http.post('/api/applaction/update',{id:id,app:this.app}).then(res=>{
                    window.location.href = "/setting/applactions";
                });
            }else{
                this.$http.post('/api/applaction/new',{app:this.app}).then(res=>{
                    window.location.href = "/setting/applactions";
                });
            }
        },
        appNewResetbut:function(){
            window.location.href = "/setting/applactions";
        },
        applactionEdit:function(i,id){
            window.location.href = "/setting/applactions/edit?id="+id;
        },
        toggleSelection(rows) {
            if (rows) {
              rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
              });
            } else {
              this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        applistpageCurrentChange:function(current){
            alert(current);
        },
        articleLikeButs:function(e,id){
            this.$http.get('/api/article/start?id='+id).then(res=>{
                if(res.body.ok && res.body.code == 1){
                    this.article.start = res.body.data.start;
                    this.alertSuccess("点赞成功");
                }else if(res.body.ok && res.body.code == 3){
                    window.location.href = '/login?redirect_uri=' + window.location.href;
                }else{
                    this.alertError('点赞失败');
                }
            });
        },
        articleShareButs:function(e,type,id){
            alert(type+':'+id);
        },
        articlePrevBut:function(e,id){
            this.$http.get('/api/article/get?id='+id+'&page=prev').then(res=>{
                if(res.body.code && res.body.ok){
                    let articleArr = res.body.data.article;
                    articleArr.author.href = '/account?uid=' + articleArr.author._id;
                    articleArr.issue_contents.forEach(item => {
                        item.add_date = this.formate_date(item.add_date);
                        item.author.href = '/account?uid=' + item.author._id;
                    })
                    articleArr.issue_contents = articleArr.issue_contents.reverse();
                    articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                    this.article = articleArr;
                }
            });
        },
        articleNextBut:function(e,id){
            this.$http.get('/api/article/get?id='+id+'&page=next').then(res=>{
                if(res.body.code && res.body.ok){
                    if(res.body.code && res.body.ok){
                        let articleArr = res.body.data.article;
                        articleArr.author.href = '/account?uid=' + articleArr.author._id;
                        articleArr.issue_contents.forEach(item => {
                            item.add_date = this.formate_date(item.add_date);
                            item.author.href = '/account?uid=' + item.author._id;
                        })
                        articleArr.issue_contents = articleArr.issue_contents.reverse();
                        articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                        this.article = articleArr;
                    }
                }
            });
        },
        formate_date: function(date) {
            let MyDate = new Date(date);
            return MyDate.getFullYear() + '-' + ((MyDate.getMonth() + 1) <= 9 ? '0' + (MyDate.getMonth() + 1) : (MyDate.getMonth() + 1)) + '-' + (MyDate.getDate() <= 9 ? '0' + MyDate.getDate() : MyDate.getDate()) + ' ' + (MyDate.getHours() <= 9 ? '0' + MyDate.getHours() : MyDate.getHours()) + ':' + (MyDate.getMinutes() <= 9 ? '0' + MyDate.getMinutes() : MyDate.getMinutes()) + ':' + (MyDate.getSeconds() <= 9 ? '0' + MyDate.getSeconds() : MyDate.getSeconds());
        },
        alertMsessage(msg) {
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
        }
    }
});
vm.init();
// vm.html2markdown();

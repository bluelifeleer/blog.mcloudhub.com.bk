'use strict';

var vm = new Vue({
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
            author: {
                avatar: '',
                article: '',
                name: '',
                href: ''
            },
            issue_contents: []
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
            searchKeyWord: ''
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
            }
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
            desc: '应用描述不多于200字',
            showAddAppIcon: true
        },
        appactions: {
            count: 0,
            lists: []
        },
        multipleSelection: [],
        commentPermissions: '1'
    },
    methods: {
        init: function init() {
            if (uid != '') {
                this.isSigin = true;
                this.users.uid = page_type == 'account' ? quid : uid;
                this.getUsers();
            }
            this.getDocs();
            this.getSlides();
            this.getArticle();
            if (page_type == 'index') {
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
                this.getAllArticles(0, 100);
            }
            if (page_type == 'collections_edit') {
                this.collectionFormNew = false;
                this.getCollectionById(coll_id, 'edit');
            }
            if (page_type == 'document_detailes') {
                this.getDoc();
            }
            if (page_type == 'setting_applactions') {
                this.getApplactions();
            }
            if (page_type == 'setting_applactions_edit') {
                this.getApplactionsById(app_id);
            }
        },
        submitForm: function submitForm(e, type) {
            this.$http.post('/api/signin', { name: this.users.name, password: this.users.password, form: 'index', remember: this.remember }).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code == 0) {
                    window.location = '/register';
                } else {
                    window.location.reload();
                }
            });
        },
        getDocs: function getDocs() {
            var _this2 = this;

            this.$http.get('/api/docs').then(function (docs) {
                if (docs.body.code && docs.body.ok) {
                    var docs_data = docs.body.data;
                    docs_data.forEach(function (item) {
                        item.href = '/account/dcs?id=' + item._id;
                    });
                    _this2.docs_list = docs_data;
                }
            });
        },
        getSlides: function getSlides() {
            var _this3 = this;

            this.$http.get('/api/slides').then(function (res) {
                _this3.slide_list = res.body.data;
            });
        },
        getDocuments: function getDocuments() {
            var _this4 = this;

            var query_string = page_type == 'account' ? 'uid=' + quid + '&offset=1&num=10' : 'offset=1&num=10';
            this.$http.get('/api/getDocLists?' + query_string).then(function (doc) {
                if (doc.body.code && doc.body.ok) {
                    if (doc.body.data.length > 0) {
                        var docs = doc.body.data;
                        docs.forEach(function (item) {
                            item.href = '/account/dcs?id=' + item._id;
                        });
                        _this4.documentLists = docs;
                    } else {
                        _this4.documentLists = null;
                    }
                } else {
                    _this4.documentLists = null;
                }
            });
        },
        getDoc: function getDoc() {
            var _this5 = this;

            var id = this.getQueryString('id');
            this.$http.get('/api/documents/get?id=' + id).then(function (doc) {
                if (doc.body.code && doc.body.ok) {
                    var documents = doc.body.data;
                    documents.author.href = '/account?uid=' + documents.author._id;
                    documents.article.forEach(function (item) {
                        item.href = '/article/details?id=' + item._id;
                        item.hasImg = item.contents.search(_this5.imgRegexp) > 0 ? true : false;
                        item.imgHtml = item.hasImg ? item.contents.match(_this5.imgRegexp)[0] : '';
                        var content = item.contents.replace(/<[^>]*>/g, "");
                        item.contents = item.hasImg ? content.length > 60 ? content.substr(0, 60) + '...' : content : content.length > 80 ? content.substr(0, 80) + '...' : content;
                    });
                    _this5.swtichFlagShow = 'block';
                    _this5.swtichFlagLeft = _this5.$refs.switchButsNew.offsetLeft + 'px';
                    _this5.$refs.switchContentsNew.style = 'display:block';
                    _this5.$refs.switchContentsDiscuss.style = 'display:none';
                    _this5.$refs.switchContentsHot.style = 'display:none';
                    _this5.doc = documents;
                } else {
                    _this5.doc = {};
                }
            });
        },
        getAllArticles: function getAllArticles(offset, num) {
            var _this6 = this;

            var query_string = '';
            if (page_type == 'account') {
                query_string = 'uid=' + quid + '&offset=' + offset + '&num=' + num;
            } else if (page_type == 'collections_detailes') {
                query_string = 'uid=' + this.users.uid + '&offset=' + offset + '&num=' + num;
            } else {
                query_string = 'offset=' + offset + '&num=' + num;
            }
            this.$http.get('/api/allArticles?' + query_string).then(function (all) {
                var ArticleArrs = [];
                if (all.body.code && all.body.ok) {
                    ArticleArrs = all.body.data;
                    ArticleArrs.forEach(function (item) {
                        item.href = '/article/details?id=' + item._id;
                        item.hasImg = item.contents.search(_this6.imgRegexp) > 0 ? true : false;

                        item.imgHtml = item.hasImg ? item.contents.match(_this6.imgRegexp)[0] : '';
                        var content = item.contents.replace(/<[^>]*>/g, "");
                        item.contents = item.hasImg ? content.length > 60 ? content.substr(0, 60) + '...' : content : content.length > 80 ? content.substr(0, 80) + '...' : content;
                    });
                    _this6.articleLists = ArticleArrs.reverse();
                }
            });
        },
        getArticle: function getArticle() {
            var _this7 = this;

            if (window.location.pathname == '/article/details') {
                var id = this.getQueryString('id');
                this.$http.get('/api/getArticle?id=' + id).then(function (article) {
                    if (!article) throw console.log(article);
                    var articleArr = article.body.data.article;
                    articleArr.author.href = '/account?uid=' + articleArr.author._id;
                    articleArr.issue_contents.forEach(function (item) {
                        item.add_date = _this7.formate_date(item.add_date);
                        item.author.href = '/account?uid=' + item.author._id;
                    });
                    articleArr.issue_contents = articleArr.issue_contents.reverse();
                    articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                    _this7.article = articleArr;
                });
            }
        },
        getApplactions: function getApplactions() {
            var _this8 = this;

            this.$http.get('/api/apps/list?user_id=' + this.users.uid + '&offset=1&num=10').then(function (res) {
                console.log(res);
                if (res.body.code && res.body.ok) {
                    _this8.appactions.count = res.body.data.count;
                    var lists = res.body.data.list.reverse();
                    lists.forEach(function (item) {
                        item.type = item.type == 1 ? 'PC应用' : 'APP应用';
                        item.status = item.status == 1 ? '开启' : '暂停';
                    });
                    _this8.appactions.lists = lists;
                }
            });
        },
        getApplactionsById: function getApplactionsById(id) {
            var _this9 = this;

            this.$http.get('/api/apps/get?id=' + id).then(function (res) {
                if (res.body.code && res.body.ok) {
                    var app = res.body.data;
                    app.type = app.type == 1 ? 'PC应用' : 'APP应用';
                    _this9.app = app;
                }
            });
        },
        getQueryString: function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            return r != null ? unescape(r[2]) : null;
        },
        showAccountBox: function showAccountBox(e) {
            if (this.navbarUsersInfoDropdownShow == 'none') {
                this.navbarUsersInfoDropdownShow = 'block';
                this.accountSymbol = '&#xe68d';
            } else {
                this.navbarUsersInfoDropdownShow = 'none';
                this.accountSymbol = '&#xe68f;';
            }
        },
        navbarSearchButFocus: function navbarSearchButFocus(e) {
            this.navbarSearchHover = !this.navbarSearchHover;
        },
        navbarSearchButBlur: function navbarSearchButBlur() {
            this.navbarSearchHover = !this.navbarSearchHover;
        },
        getUsers: function getUsers() {
            var _this10 = this;

            this.$http.get('/api/getUsers?uid=' + this.users.uid).then(function (res) {
                if (!res) throw console.log(res);
                var data = res.body.data;
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
                _this10.users = data;
            });
        },
        changeAvatar: function changeAvatar(e) {
            var _this = this;
            var file = e.target.files[0];
            var Reader = new FileReader();
            Reader.addEventListener('load', function (e) {
                _this.users.avatar = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
        },
        changeUserBasicSubmitForm: function changeUserBasicSubmitForm() {
            var _this11 = this;

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
            }).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    _this11.alertSuccess(res.body.msg);
                }
            });
        },
        changeUserProfileSubmitForm: function changeUserProfileSubmitForm(e) {
            var _this12 = this;

            this.$http.post('/api/changeProfile', {
                uid: this.users.uid,
                sex: this.users.sex,
                introduce: this.users.introduce,
                website: this.users.website
            }).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    _this12.alertSuccess(res.body.msg);
                }
            });
        },
        changeRewardSubmitForm: function changeRewardSubmitForm(e) {
            var _this13 = this;

            this.$http.post('/api/changeReward', {
                uid: this.users.uid,
                rewardStatus: this.users.rewardStatus,
                rewardDesc: this.users.rewardDesc
            }).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    _this13.alertSuccess(res.body.msg);
                }
            });
        },
        closePopupLayer: function closePopupLayer() {
            this.popupLayerBoxShow = 'none';
        },
        downloadAllArticles: function downloadAllArticles() {
            var _this14 = this;

            var a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            a.setAttribute('target', '_blank');
            this.$refs.downloadAllArticles.appendChild(a);
            this.$http.get('/api/downloadAllArticles?uid=' + this.users.uid).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    a.setAttribute('href', res.body.data.tar_path);
                    a.click();
                    a.parentNode.removeChild(a);
                    _this14.alertSuccess(res.body.msg);
                }
            });
        },
        commentFocus: function commentFocus(e) {
            this.articleComments = this.articleComments == '填写您的评论....' ? '' : this.articleComments;
        },
        commentBlur: function commentBlur(e) {
            this.articleComments = this.articleComments ? this.articleComments : '填写您的评论....';
        },
        postCommentBut: function postCommentBut(e, id) {
            var _this15 = this;

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
                    }).then(function (res) {
                        if (res.body.code && res.body.ok) {
                            _this15.alertSuccess('评论成功');
                            _this15.articleComments = '填写您的评论....';
                        }
                        _this15.getArticle(id);
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
        resetCommentBut: function resetCommentBut(e) {
            this.articleComments = '填写您的评论....';
        },
        uploadCollectionIcon: function uploadCollectionIcon(e) {
            var _this = this;
            var file = e.target.files[0];
            var fileRender = new FileReader();
            if (file) {
                fileRender.readAsDataURL(file);
            }
            fileRender.addEventListener('load', function (e) {
                _this.collection.icon = e.target.result;
                _this.collection.icon_html = '<img src="' + e.target.result + '">';
            }, false);
        },
        queryAdmins: function queryAdmins(e) {
            var _this16 = this;

            this.$http.get('/api/allUsers?keyword=' + this.collectionKeyWord).then(function (users) {
                _this16.adminArr = users.body.data;
            });
        },
        collectionSubmitForm: function collectionSubmitForm(e, s) {
            var _this17 = this;

            var descArr = platform == 'win32' ? this.collection.describe.split('\r\n') : this.collection.describe.split('\n');
            var tmp = '';
            descArr.forEach(function (desc) {
                tmp += '<p>' + desc + '</p>';
            });
            var url = s ? '/api/collection/new' : '/api/collection/update';
            var data = s ? {
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
            this.$http.post(url, data).then(function (res) {
                if (res.body.code && res.body.ok) {
                    window.location.href = '/account/collections/detailes?id=' + res.body.data._id;
                } else {
                    _this17.alertError('专题创建失败');
                }
            });
        },
        getCollections: function getCollections(offset, num) {
            var _this18 = this;

            var query_string = page_type == 'account' ? 'uid=' + quid + '&offset=' + offset + '&num=' + num : 'offset=' + offset + '&num=' + num;
            this.$http.get('/api/get_collections?' + query_string).then(function (res) {
                var collections = res.body.data;
                collections.forEach(function (item) {
                    item.href = '/account/collections/detailes?id=' + item._id;
                    item.describe = item.describe.replace(/<[^>]*>/g, "");
                    item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                    item.subscribe.forEach(function (uids) {
                        if (uids._id == _this18.users.uid) {
                            item.isSubscribed = true;
                        } else {
                            item.isSubscribed = false;
                        }
                    });
                });
                _this18.collectionLists = collections;
            });
        },
        getCollectionById: function getCollectionById(id, type) {
            var _this19 = this;

            this.$http.get('/api/getCollectionById?id=' + id).then(function (coll) {
                if (coll.body.code && coll.body.ok) {
                    var collection = coll.body.data;
                    if (type == 'edit') {
                        var replaceText = platform == 'win32' ? '\r\n' : '\n'; // 根据不同的系统确定换行符
                        collection.describe = collection.describe.replace(/<p>/g, ''); // 将开头的p标签去掉
                        collection.describe = collection.describe.replace(/<\/p>/g, replaceText); // 将结束的p标签替换成换行符
                        collection.icon_html = '<img src="' + collection.icon + '">';
                        _this19.collection = collection;
                    } else {
                        collection.href = '/account/collections/edit?id=' + collection._id;
                        collection.icon_html = '<img src="' + collection.icon + '">';
                        collection.article.forEach(function (item) {
                            item.href = '/article/details?id=' + item._id;
                            item.hasImg = item.contents.search(_this19.imgRegexp) > 0 ? true : false;
                            item.imgHtml = item.hasImg ? item.contents.match(_this19.imgRegexp)[0] : '';
                            var content = item.contents.replace(/<[^>]*>/g, "");
                            item.contents = item.hasImg ? content.length > 60 ? content.substr(0, 60) + '...' : content : content.length > 80 ? content.substr(0, 80) + '...' : content;
                        });
                        collection.subscribe.forEach(function (item) {
                            if (item._id == _this19.users.uid) {
                                collection.issubscribe = true;
                            }
                        });
                        collection.article = collection.article.reverse();
                        // console.log(this.$refs.switchButs);
                        _this19.swtichFlagShow = 'block';
                        _this19.swtichFlagLeft = _this19.$refs.switchButsNew.offsetLeft + 'px';
                        _this19.$refs.switchContentsNew.style = 'display:block';
                        _this19.$refs.switchContentsDiscuss.style = 'display:none';
                        _this19.$refs.switchContentsHot.style = 'display:none';
                        _this19.newIncludeArticleLists = collection.articles;
                        console.log(collection);
                        _this19.collection = collection;
                    }
                }
            });
        },
        switchButOver: function switchButOver(type) {
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
        switchButs: function switchButs(e, type) {
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
        followButs: function followButs(e, id) {
            var _this20 = this;

            if (this.isSigin) {
                this.$http.get('/api/collectionFollow?uid=' + this.users.uid + '&id=' + id).then(function (res) {
                    if (res.body.code && res.body.ok) {
                        _this20.alertSuccess(res.body.msg);
                    } else {
                        _this20.alertError(res.body.msg);
                    }
                });
            } else {
                window.location.href = '/login?redirect_uri=' + window.location.href;
            }
        },
        collectionPush: function collectionPush(e, id) {
            if (this.isSigin) {
                this.dialogTableVisible = true;
            } else {
                window.location.href = '/login?redirect_uri=' + window.location.href;
            }
        },
        collectionSearchArticle: function collectionSearchArticle(e) {
            var _this21 = this;

            this.$http.get('/api/allArticles?keyword=' + this.collection.searchKeyWord).then(function (lists) {
                if (lists.body.code && lists.body.ok) {
                    var articleArr = lists.body.data;
                    articleArr.forEach(function (item) {
                        item.add_date = _this21.formate_date(item.add_date);
                    });
                    _this21.articleLists = articleArr.reverse();
                } else {
                    _this21.articleLists = [];
                }
            });
        },
        pushActionBut: function pushActionBut(e, article_id, id) {
            var _this22 = this;

            this.$http.get('/api/articlePush?uid=' + this.users.uid + '&article_id=' + article_id + '&id=' + id).then(function (push) {
                if (push.body.code && push.body.ok) {
                    if (push.body.code == 1) {
                        _this22.alertSuccess(push.body.msg);
                    } else {
                        _this22.alertWarning(push.body.msg);
                    }
                } else {
                    _this22.alertError(push.body.msg);
                }
            });
        },
        moreCollections: function moreCollections(e) {
            var _this23 = this;

            this.collOffset++;
            this.$http.get('/api/get_collections?uid=' + this.users.uid + '&offset=' + this.collOffset + '&num=9').then(function (res) {
                var collections = res.body.data;
                if (collections.length > 0) {
                    collections.forEach(function (item) {
                        item.href = '/account/collections/detailes?id=' + item._id;
                        item.describe = item.describe.replace(/<[^>]*>/g, "");
                        item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                        item.subscribe.forEach(function (uids) {
                            if (uids._id == _this23.users.uid) {
                                item.isSubscribed = true;
                            } else {
                                item.isSubscribed = false;
                            }
                        });
                        _this23.collectionLists.push(item);
                    });
                }
            });
        },
        accountIntroduceEditBut: function accountIntroduceEditBut(e) {
            this.showAccountIntroduceEditForm = 'block';
            this.showAccountIntroduceText = 'none';
        },
        accountIntroduceFromSaveBut: function accountIntroduceFromSaveBut(e) {
            var _this24 = this;

            this.$http.post('/api/updateIntroduce', {
                uid: this.users.uid,
                introduce: this.users.introduce
            }).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this24.introduce = _this24.introduce;
                    _this24.showAccountIntroduceEditForm = 'none';
                    _this24.showAccountIntroduceText = 'block';
                    _this24.popupLayerBoxShow = 'block';
                    _this24.popupLayerText = res.body.msg;
                    _this24.popupLayerLeft = parseInt((_this24.winW - 500) / 2) + 'px';
                    _this24.popupLayerTop = '200px';
                } else {
                    _this24.popupLayerBoxShow = 'block';
                    _this24.popupLayerText = '个人介绍修改失败';
                    _this24.popupLayerLeft = parseInt((_this24.winW - 500) / 2) + 'px';
                    _this24.popupLayerTop = '200px';
                }
            });
        },
        accountIntroduceFromResetBut: function accountIntroduceFromResetBut() {
            this.showAccountIntroduceEditForm = 'none';
            this.showAccountIntroduceText = 'block';
        },
        deleteCollection: function deleteCollection(e, id) {
            var _this25 = this;

            this.$http.get('/api/collections/delete?id=' + id + '&uid=' + this.users.uid).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this25.alertSuccess(res.body.msg);
                } else {
                    _this25.alertError(res.body.msg);
                }
            });
        },
        articlFollowAuthorBut: function articlFollowAuthorBut(e, id) {
            var _this26 = this;

            this.$http.get('/api/users/follow?uid=' + this.users.uid + '&follow_id=' + id).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this26.alertSuccess('您已成功关注');
                } else {
                    _this26.alertError('您关注失败');
                }
            });
        },
        thirdPartyLogin: function thirdPartyLogin(e, type) {
            var a = document.createElement('a');
            a.style.display = 'none';
            // a.target = '_blank';
            this.$refs.loginLinkBox.appendChild(a);
            a.setAttribute('href', 'https://github.com/login/oauth/authorize?client_id=5fe59ee126edbea8f3df&state=' + this.now_date.getTime() + '&redirect_uri=https://blog.mcloudhub.com/api/github');
            a.click();
            // a.parentNode.removeChild(a);
        },
        handleClose: function handleClose(done) {
            this.$confirm('确认关闭？').then(function (_) {
                done();
            }).catch(function (_) {});
        },

        selectAmountButs: function selectAmountButs(e, index, nums) {
            var buts = this.$refs.rewardAmountButs.children;
            for (var i = 0; i < buts.length; i++) {
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
        setSelfAmountNums: function setSelfAmountNums(e) {
            this.rewardAmount = this.selfAmountNums ? '￥' + this.selfAmountNums : '￥0';
        },
        // hiddenSelfAmountInput:function(e){
        //     this.showRewardSelfAmount = !this.showRewardSelfAmount;
        // },
        // showSelfAmountInput:function(e){
        //     this.showRewardSelfAmount = !this.showRewardSelfAmount;
        // },
        rewardMessageTextareaFocus: function rewardMessageTextareaFocus(e) {
            this.rewardMessage = this.rewardMessage != '给Ta留言。。。' ? this.rewardMessage : '';
        },
        rewardMessageTextareaBlur: function rewardMessageTextareaBlur(e) {
            this.rewardMessage = this.rewardMessage != '给Ta留言。。。' && this.rewardMessage != '' ? this.rewardMessage : '给Ta留言。。。';
        },
        chenagePayMethod: function chenagePayMethod(e) {
            if (this.showPayMethod == 'none') {
                this.showPayMethod = 'block';
                this.changePayMethodText = '关闭';
            } else {
                this.showPayMethod = 'none';
                this.changePayMethodText = '更换';
            }
        },
        selectPayMethods: function selectPayMethods(e, pay) {
            this.payMethodActive = !this.payMethodActive;
            this.payMethod = pay;
        },
        payAmountActive: function payAmountActive(e) {
            var rewardAmount = this.rewardAmount.substr(1, this.rewardAmount.length);
            alert('支付方式：' + this.payMethod + "；支付金额：" + rewardAmount + '；留言：' + this.rewardMessage);
        },
        sendMail: function sendMail(e) {
            this.$http.get('/api/send_maile').then(function (res) {
                console.log(res);
            });
        },
        appPauseBut: function appPauseBut() {
            alert('pause');
        },
        appRecoverBut: function appRecoverBut() {
            alert('recover');
        },
        appDeleteBut: function appDeleteBut() {
            alert('delete');
        },
        uploadAppIcon: function uploadAppIcon(e) {
            var _this = this;
            var file = e.target.files[0];
            var Reader = new FileReader();
            Reader.addEventListener('load', function (e) {
                _this.app.showAddAppIcon = false;
                _this.app.avatar = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
        },
        appNewFormOnSubmit: function appNewFormOnSubmit(id) {
            if (id) {
                this.$http.post('/api/applaction/update', { id: id, app: this.app }).then(function (res) {
                    window.location.href = "/setting/applactions";
                });
            } else {
                this.$http.post('/api/applaction/new', { app: this.app }).then(function (res) {
                    window.location.href = "/setting/applactions";
                });
            }
        },
        appNewResetbut: function appNewResetbut() {
            window.location.href = "/setting/applactions";
        },
        applactionEdit: function applactionEdit(i, id) {
            window.location.href = "/setting/applactions/edit?id=" + id;
        },
        toggleSelection: function toggleSelection(rows) {
            var _this27 = this;

            if (rows) {
                rows.forEach(function (row) {
                    _this27.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange: function handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        applistpageCurrentChange: function applistpageCurrentChange(current) {
            alert(current);
        },
        formate_date: function formate_date(date) {
            var MyDate = new Date(date);
            return MyDate.getFullYear() + '-' + (MyDate.getMonth() + 1 <= 9 ? '0' + (MyDate.getMonth() + 1) : MyDate.getMonth() + 1) + '-' + (MyDate.getDate() <= 9 ? '0' + MyDate.getDate() : MyDate.getDate()) + ' ' + (MyDate.getHours() <= 9 ? '0' + MyDate.getHours() : MyDate.getHours()) + ':' + (MyDate.getMinutes() <= 9 ? '0' + MyDate.getMinutes() : MyDate.getMinutes()) + ':' + (MyDate.getSeconds() <= 9 ? '0' + MyDate.getSeconds() : MyDate.getSeconds());
        },
        alertMsessage: function alertMsessage(msg) {
            this.$message({
                showClose: true,
                message: msg
            });
        },
        alertSuccess: function alertSuccess(msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'success'
            });
        },
        alertWarning: function alertWarning(msg) {
            this.$message({
                showClose: true,
                message: msg,
                type: 'warning'
            });
        },
        alertError: function alertError(msg) {
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
//# sourceMappingURL=main.js.map
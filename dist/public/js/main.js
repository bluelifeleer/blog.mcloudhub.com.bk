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
            }
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
            users: {
                article: '',
                name: ''
            }
        },
        articleComments: '填写您的评论....',
        discuss: [],
        imgRegexp: /<img [^>]*src=['"]([^'"]+)[^>]*>/gi,
        hasImg: null,
        collectionIconHtml: '<span class="collections-icon"><i class="icon iconfont icontext">&#xe603;</i></span>',
        collectionIcon: '',
        collectionName: '专题名称',
        collectionDesc: '专题描述。。。',
        collectionKeyWord: '',
        collectionAdmins: [],
        collectionPus: 1,
        collectionVerify: 1,
        adminArr: [],
        collectionLists: [],
        collHref: '',
        collectionSearchKeyWord: '',
        collection: {},
        collSubscribe: false,
        collOffset: 1,
        newIncludeArticleLists: [],
        switchButSelected: true,
        swtichFlagShow: 'none',
        swtichFlagLeft: 0,
        showAccountIntroduceEditForm: 'none',
        showAccountIntroduceText: 'block',
        documentLists: null,
        doc: {},
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
        payMethod: 'wechat'
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
            this.getAllArticles(0, 20);
            this.getArticle();
            if (page_type == 'account') {
                this.users.uid = quid;
                this.getUsers();
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
            if (page_type == 'account') {
                this.getDocuments();
            }
            if (page_type == 'document_detailes') {
                this.getDoc();
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
            this.$http.get('/api/documents/get?uid=' + this.users.uid + '&id=' + id).then(function (doc) {
                if (doc.body.code && doc.body.ok) {
                    _this5.doc = doc.body.data;
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

            // alert(window.location.pathname);
            if (window.location.pathname == '/article/details') {
                var id = this.getQueryString('id');
                this.$http.get('/api/getArticle?id=' + id).then(function (article) {
                    if (!article) throw console.log(article);
                    var articleArr = article.body.data.article;
                    articleArr.users = {};
                    _this7.$http.get('/api/getUsers?uid=' + articleArr.uid).then(function (user) {
                        if (user.body.code && user.body.ok) {
                            articleArr.users = user.body.data;
                            articleArr.users.accountHref = '/account?uid=' + user.body.data._id;
                        }
                    });
                    articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                    _this7.article = articleArr;
                    var discussArr = article.body.data.discuss;
                    discussArr.forEach(function (item) {
                        item.add_date = _this7.formate_date(item.add_date);
                        _this7.$http.get('/api/getUsers?uid=' + item.uid).then(function (user) {
                            if (user.body.code && user.body.ok) {
                                item.users = user.body.data;
                                item.users.accountHref = '/account?uid=' + user.body.data._id;
                            }
                        });
                    });
                    _this7.discuss = discussArr.reverse();
                });
            }
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
            var _this8 = this;

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
                _this8.users = data;
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
            var _this9 = this;

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
                    _this9.alertSuccess(res.body.msg);
                }
            });
        },
        changeUserProfileSubmitForm: function changeUserProfileSubmitForm(e) {
            var _this10 = this;

            this.$http.post('/api/changeProfile', {
                uid: this.users.uid,
                sex: this.users.sex,
                introduce: this.users.introduce,
                website: this.users.website
            }).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    _this10.alertSuccess(res.body.msg);
                }
            });
        },
        changeRewardSubmitForm: function changeRewardSubmitForm(e) {
            var _this11 = this;

            this.$http.post('/api/changeReward', {
                uid: this.users.uid,
                rewardStatus: this.users.rewardStatus,
                rewardDesc: this.users.rewardDesc
            }).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    _this11.alertSuccess(res.body.msg);
                }
            });
        },
        closePopupLayer: function closePopupLayer() {
            this.popupLayerBoxShow = 'none';
        },
        downloadAllArticles: function downloadAllArticles() {
            var _this12 = this;

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
                    _this12.alertSuccess(res.body.msg);
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
            var _this13 = this;

            if (uid !== '') {
                if (this.articleComments == '' || this.articleComments == '填写您的评论....') {
                    this.alertWarning(res.body.msg);
                    return false;
                } else {
                    this.$http.post('/api/postDiscuss', {
                        contents: this.articleComments,
                        uid: this.users.uid,
                        id: id
                    }).then(function (res) {
                        if (res.body.code && res.body.ok) {
                            _this13.alertSuccess('评论成功');
                        }
                        _this13.getDiscuss(id);
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
        getDiscuss: function getDiscuss(id) {
            var _this14 = this;

            this.$http.get('/api/getDiscuss?id=' + id).then(function (discuss) {
                if (discuss.body.code && discuss.body.ok) {
                    var discussArr = discuss.body.data.reverse();
                    discussArr.forEach(function (item) {
                        item.add_date = _this14.formate_date(item.add_date);
                        _this14.$http.get('/api/getUsers?uid=' + item.uid).then(function (user) {
                            if (user.body.code && user.body.ok) {
                                item.users = user.body.data;
                                item.users.accountHref = '/account?uid=' + user.body.data._id;
                            }
                        });
                    });
                    _this14.discuss = discussArr;
                } else {
                    _this14.discuss = [];
                }
            });
        },
        uploadCollectionIcon: function uploadCollectionIcon(e) {
            var _this = this;
            var file = e.target.files[0];
            var fileRender = new FileReader();
            if (file) {
                fileRender.readAsDataURL(file);
            }
            fileRender.addEventListener('load', function (e) {
                _this.collectionIcon = e.target.result;
                _this.collectionIconHtml = '<img src="' + e.target.result + '" />';
            }, false);
        },
        queryAdmins: function queryAdmins(e) {
            var _this15 = this;

            this.$http.get('/api/allUsers?keyword=' + this.collectionKeyWord).then(function (users) {
                _this15.adminArr = users.body.data;
            });
        },
        collectionSubmitForm: function collectionSubmitForm(e, s) {
            var _this16 = this;

            var descArr = platform == 'win32' ? this.collectionDesc.split('\r\n') : this.collectionDesc.split('\n');
            var tmp = '';
            descArr.forEach(function (desc) {
                tmp += '<p>' + desc + '</p>';
            });
            var url = s ? '/api/collection/new' : '/api/collection/update';
            var data = s ? {
                uid: this.users.uid,
                icon: this.collectionIcon,
                name: this.collectionName,
                describe: tmp,
                push: this.collectionPus,
                verify: this.collectionVerify,
                admins: this.collectionAdmins
            } : {
                id: this.collection_id,
                uid: this.users.uid,
                icon: this.collectionIcon,
                name: this.collectionName,
                describe: tmp,
                push: this.collectionPus,
                verify: this.collectionVerify,
                admins: this.collectionAdmins
            };
            this.$http.post(url, data).then(function (res) {
                if (res.body.code && res.body.ok) {
                    window.location.href = '/account/collections/detailes?id=' + (s ? res.body.data._id : _this16.collection_id);
                } else {
                    _this16.popupLayerBoxShow = 'block';
                    _this16.popupLayerText = res.body.msg;
                    _this16.popupLayerLeft = parseInt((_this16.winW - 500) / 2) + 'px';
                    _this16.popupLayerTop = '200px';
                }
            });
        },
        getCollections: function getCollections(offset, num) {
            var _this17 = this;

            var query_string = page_type == 'account' ? 'uid=' + quid + '&offset=' + offset + '&num=' + num : 'offset=' + offset + '&num=' + num;
            this.$http.get('/api/get_collections?' + query_string).then(function (res) {
                var collections = res.body.data;
                collections.forEach(function (item) {
                    item.href = '/account/collections/detailes?id=' + item._id;
                    item.describe = item.describe.replace(/<[^>]*>/g, "");
                    item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                    item.subscribe.forEach(function (uids) {
                        if (uids.uid == _this17.users.uid) {
                            item.subscribed = true;
                        } else {
                            item.subscribed = false;
                        }
                    });
                });
                _this17.collectionLists = collections;
            });
        },
        getCollectionById: function getCollectionById(id, type) {
            var _this18 = this;

            this.$http.get('/api/getCollectionById?id=' + id).then(function (coll) {
                if (coll.body.code && coll.body.ok) {
                    var collection = coll.body.data;
                    if (type == 'edit') {
                        var describe = collection.describe.replace(/<p>/g, ''); // 将开头的p标签去掉
                        var replaceText = platform == 'win32' ? '\r\n' : '\n'; // 根据不同的系统确定换行符
                        describe = describe.replace(/<\/p>/g, replaceText); // 将结束的p标签替换成换行符
                        _this18.collectionIconHtml = '<img src="' + collection.icon + '">';
                        _this18.collection_id = collection._id;
                        _this18.collectionIcon = collection.icon;
                        _this18.collectionName = collection.name;
                        _this18.collectionDesc = describe;
                        _this18.collectionPus = collection.push;
                        _this18.collectionVerify = collection.verify;
                    } else {
                        collection.articles = [];
                        collection.article_ids.forEach(function (ids) {
                            _this18.$http.get('/api/getArticle?id=' + ids.id).then(function (article) {
                                var articleContents = article.body.data.article;
                                articleContents.href = '/article/details?id=' + articleContents._id;
                                articleContents.hasImg = articleContents.contents.search(_this18.imgRegexp) > 0 ? true : false;

                                articleContents.imgHtml = articleContents.hasImg ? articleContents.contents.match(_this18.imgRegexp)[0] : '';
                                var content = articleContents.contents.replace(/<[^>]*>/g, "");
                                articleContents.contents = articleContents.hasImg ? content.length > 60 ? content.substr(0, 60) + '...' : content : content.length > 80 ? content.substr(0, 80) + '...' : content;
                                collection.articles.push(articleContents);
                            });
                        });
                        collection.editHref = '/account/collections/edit?id=' + collection._id;
                        collection.subscribe.forEach(function (item) {
                            if (item.uid == _this18.users.uid) {
                                _this18.collSubscribe = true;
                            }
                        });
                        // console.log(this.$refs.switchButs);
                        _this18.swtichFlagShow = 'block';
                        _this18.swtichFlagLeft = _this18.$refs.switchButsNew.offsetLeft + 'px';
                        _this18.$refs.switchContentsNew.style = 'display:block';
                        _this18.$refs.switchContentsDiscuss.style = 'display:none';
                        _this18.$refs.switchContentsHot.style = 'display:none';
                        _this18.collection = collection;
                        _this18.newIncludeArticleLists = collection.articles;
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
            var _this19 = this;

            this.$http.get('/api/collectionFollow?uid=' + this.users.uid + '&id=' + id).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this19.alertSuccess('您已关注');
                } else {
                    _this19.alertError('您关注此专题失败');
                }
            });
        },
        collectionPush: function collectionPush(e, id) {
            this.dialogTableVisible = true;
        },
        collectionSearchArticle: function collectionSearchArticle(e) {
            var _this20 = this;

            this.$http.get('/api/allArticles?keyword=' + this.collectionSearchKeyWord).then(function (lists) {
                if (lists.body.code && lists.body.ok) {
                    var articleArr = lists.body.data;
                    articleArr.forEach(function (item) {
                        item.add_date = _this20.formate_date(item.add_date);
                    });
                    _this20.articleLists = articleArr.reverse();
                } else {
                    _this20.articleLists = [];
                }
            });
        },
        pushActionBut: function pushActionBut(e, article_id, id) {
            var _this21 = this;

            this.$http.get('/api/articlePush?uid=' + this.users.uid + '&article_id=' + article_id + '&id=' + id).then(function (push) {
                if (push.body.code && push.body.ok) {
                    _this21.alertSuccess('您已投稿');
                } else {
                    _this21.alertError('您投稿失败');
                }
            });
        },
        moreCollections: function moreCollections(e) {
            var _this22 = this;

            this.collOffset++;
            this.$http.get('/api/get_collections?uid=' + this.users.uid + '&offset=' + this.collOffset + '&num=9').then(function (res) {
                var collections = res.body.data;
                if (collections.length > 0) {
                    collections.forEach(function (item) {
                        item.href = '/account/collections/detailes?id=' + item._id;
                        item.describe = item.describe.replace(/<[^>]*>/g, "");
                        item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                        item.subscribe.forEach(function (uids) {
                            if (uids.uid == _this22.users.uid) {
                                item.subscribed = true;
                            } else {
                                item.subscribed = false;
                            }
                        });
                        _this22.collectionLists.push(item);
                    });
                }
            });
        },
        accountIntroduceEditBut: function accountIntroduceEditBut(e) {
            this.showAccountIntroduceEditForm = 'block';
            this.showAccountIntroduceText = 'none';
        },
        accountIntroduceFromSaveBut: function accountIntroduceFromSaveBut(e) {
            var _this23 = this;

            this.$http.post('/api/updateIntroduce', {
                uid: this.users.uid,
                introduce: this.users.introduce
            }).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this23.introduce = _this23.introduce;
                    _this23.showAccountIntroduceEditForm = 'none';
                    _this23.showAccountIntroduceText = 'block';
                    _this23.popupLayerBoxShow = 'block';
                    _this23.popupLayerText = res.body.msg;
                    _this23.popupLayerLeft = parseInt((_this23.winW - 500) / 2) + 'px';
                    _this23.popupLayerTop = '200px';
                } else {
                    _this23.popupLayerBoxShow = 'block';
                    _this23.popupLayerText = '个人介绍修改失败';
                    _this23.popupLayerLeft = parseInt((_this23.winW - 500) / 2) + 'px';
                    _this23.popupLayerTop = '200px';
                }
            });
        },
        accountIntroduceFromResetBut: function accountIntroduceFromResetBut() {
            this.showAccountIntroduceEditForm = 'none';
            this.showAccountIntroduceText = 'block';
        },
        deleteCollection: function deleteCollection(e, id) {
            var _this24 = this;

            this.$http.get('/api/collections/delete?id=' + id + '&uid=' + this.users.uid).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this24.alertSuccess('您已删除专题');
                } else {
                    _this24.alertError('您删除专题失败');
                }
            });
        },
        articlFollowAuthorBut: function articlFollowAuthorBut(e, id) {
            var _this25 = this;

            this.$http.get('/api/users/follow?uid=' + this.users.uid + '&follow_id=' + id).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this25.alertSuccess('您已成功关注');
                } else {
                    _this25.alertError('您关注失败');
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
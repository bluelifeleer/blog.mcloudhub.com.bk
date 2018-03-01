'use strict';

var _data;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vm = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: (_data = {
        winW: document.body.clientWidth || document.documentElement.clientWidth,
        winH: document.body.clientHeight || document.documentElement.clientHeight,
        token: '',
        name: '',
        password: '',
        remember: true,
        phone: '',
        nick: '',
        fullname: '',
        email: '',
        qq: '',
        wechat: '',
        website: '',
        editors: '',
        avatar: '/public/images/QQ20180131-224008@2x.png',
        sex: 3,
        introduce: ''
    }, _defineProperty(_data, 'website', 'http://|https://'), _defineProperty(_data, 'rewardStatus', 2), _defineProperty(_data, 'rewardDesc', '赞赏描述'), _defineProperty(_data, 'slide_list', {}), _defineProperty(_data, 'tags_list', {}), _defineProperty(_data, 'slideAttr', {
        timer: null,
        left: 0,
        length: 0,
        value: 1024,
        index: 0,
        cursor: null
    }), _defineProperty(_data, 'accountSymbol', '&#xe68f;'), _defineProperty(_data, 'accountBox', 'none'), _defineProperty(_data, 'popupLayerBoxShow', 'none'), _defineProperty(_data, 'popupLayerWidth', '100%'), _defineProperty(_data, 'popupLayerHeight', '100%'), _defineProperty(_data, 'popupLayerLeft', 0), _defineProperty(_data, 'popupLayerTop', 0), _defineProperty(_data, 'popupLayerText', ''), _defineProperty(_data, 'articleLists', []), _defineProperty(_data, 'article', []), _defineProperty(_data, 'articleComments', '填写您的评论....'), _defineProperty(_data, 'discuss', []), _defineProperty(_data, 'imgRegexp', /<img [^>]*src=['"]([^'"]+)[^>]*>/gi), _defineProperty(_data, 'hasImg', null), _defineProperty(_data, 'collectionIconHtml', '<span class="collections-icon"><i class="icon iconfont icontext">&#xe603;</i></span>'), _defineProperty(_data, 'collectionIcon', ''), _defineProperty(_data, 'collectionName', '专题名称'), _defineProperty(_data, 'collectionDesc', '专题描述。。。'), _defineProperty(_data, 'collectionKeyWord', ''), _defineProperty(_data, 'collectionAdmins', []), _defineProperty(_data, 'collectionPus', 1), _defineProperty(_data, 'collectionVerify', 1), _defineProperty(_data, 'adminArr', []), _defineProperty(_data, 'collectionLists', []), _defineProperty(_data, 'collHref', ''), _defineProperty(_data, 'collectionPopupLayer', 'none'), _defineProperty(_data, 'collectionSearchKeyWord', ''), _defineProperty(_data, 'collection', {}), _defineProperty(_data, 'collSubscribe', false), _defineProperty(_data, 'collOffset', 1), _defineProperty(_data, 'newIncludeArticleLists', []), _defineProperty(_data, 'switchButSelected', true), _defineProperty(_data, 'swtichFlagShow', 'none'), _defineProperty(_data, 'swtichFlagLeft', 0), _defineProperty(_data, 'showAccountIntroduceEditForm', 'none'), _defineProperty(_data, 'showAccountIntroduceText', 'block'), _defineProperty(_data, 'documentLists', null), _data),
    methods: {
        init: function init() {
            console.log();
            if (token != '' && uid != '') {
                this.uid = uid;
                this.token = token;
                this.getUsers();
            }
            this.getTags();
            this.getSlides();
            this.slideAutoPlay();
            this.getAllArticles(0, 10);
            this.getArticle();
            if (page_type == 'collections_list') {
                this.getCollections(0, 9);
            } else {
                this.getCollections(0, 7);
            }
            if (page_type == 'collections_detailes') {
                this.getCollectionById(coll_id);
            }
            if (page_type == 'account') {
                this.getDocuments();
            }
        },
        switchSlide: function switchSlide(e, direction) {
            if (direction == 'next') {
                this.slideAttr.index--;
                if (this.slideAttr.index <= -this.slideAttr.length) {
                    this.slideAttr.index = 0;
                }
            } else {
                this.slideAttr.index++;
                if (this.slideAttr.index >= 0) {
                    this.slideAttr.index = -this.slideAttr.length + 1;
                }
            }
            this.slidePlay(this.slideAttr.index);
        },
        slidePlay: function slidePlay(index) {
            this.slideAttr.left = index * this.slideAttr.value;
        },
        slideAutoPlay: function slideAutoPlay() {
            var _this = this;
            this.slideAttr.timer = setInterval(function () {
                _this.switchSlide(null, 'next');
            }, 1000);
        },
        stopSlidePlay: function stopSlidePlay() {
            this.slideAttr.cursor = 'pointer';
            clearInterval(this.slideAttr.timer);
        },
        autoSlidePlay: function autoSlidePlay() {
            this.slideAttr.cursor = null;
            this.slideAutoPlay();
        },
        submitForm: function submitForm(e, type) {
            this.$http.post('/api/signin', { name: this.name, password: this.password, form: 'index', remember: this.remember }).then(function (res) {
                if (!res) throw console.log(res);
                console.log(res);
                if (res.body.code == 0) {
                    window.location = '/register';
                } else {
                    window.location.reload();
                }
            });
        },
        getToken: function getToken() {
            var _this2 = this;

            if (!this.token || this.token == '') {
                this.$http.get('/api/gettoken').then(function (res) {
                    if (!res) throw console.log(err);
                    _this2.token = res.body.data.token;
                });
            }
        },
        getTags: function getTags() {
            var _this3 = this;

            this.$http.get('/api/tags').then(function (res) {
                _this3.tags_list = res.body.data;
            });
        },
        getSlides: function getSlides() {
            var _this4 = this;

            this.$http.get('/api/slides').then(function (res) {
                _this4.slide_list = res.body.data;
                _this4.slideAttr.length = res.body.data.length;
            });
        },
        getDocuments: function getDocuments() {
            var _this5 = this;

            this.$http.get('/api/getDocLists').then(function (doc) {
                if (doc.body.code && doc.body.ok) {
                    if (doc.body.data.length > 0) {
                        var docs = doc.body.data;
                        docs.forEach(function (item) {
                            item.href = '/account/dcs?id' + item._id;
                        });
                        _this5.documentLists = docs;
                    } else {
                        _this5.documentLists = null;
                    }
                } else {
                    _this5.documentLists = null;
                }
            });
        },
        getAllArticles: function getAllArticles(offset, num) {
            var _this6 = this;

            this.$http.get('/api/allArticles?offset=' + offset + '&num=' + num).then(function (all) {
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
                    console.log(article);
                    if (!article) throw console.log(article);
                    var articleArr = article.body.data.article;
                    articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                    _this7.article = articleArr;
                    var discussArr = article.body.data.discuss;
                    discussArr.forEach(function (item) {
                        item.add_date = _this7.formate_date(item.add_date);
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
        showAccountBox: function showAccountBox() {
            if (this.accountBox == 'none') {
                this.accountBox = 'block';
                this.accountSymbol = '&#xe68d';
            } else {
                this.accountBox = 'none';
                this.accountSymbol = '&#xe68f;';
            }
        },
        getUsers: function getUsers() {
            var _this8 = this;

            this.$http.get('/api/getUsers?uid=' + this.uid).then(function (res) {
                if (!res) throw console.log(res);
                _this8.nick = res.body.data.nick;
                _this8.phone = res.body.data.phone;
                _this8.name = res.body.data.name.length > 10 ? res.body.data.name.substr(0, 10) + '...' : res.body.data.name;
                _this8.fullname = res.body.data.name;
                _this8.email = res.body.data.email;
                _this8.qq = res.body.data.qq;
                _this8.wechat = res.body.data.wechat;
                _this8.editors = res.body.data.editors;
                _this8.avatar = res.body.data.avatar ? res.body.data.avatar : _this8.avatar;
                _this8.sex = res.body.data.sex;
                _this8.introduce = res.body.data.introduce;
                _this8.website = res.body.data.website;
                _this8.rewardStatus = res.body.data.rewardStatus ? res.body.data.rewardStatus : _this8.rewardStatus;
                _this8.rewardDesc = res.body.data.rewardDesc;
            });
        },
        changeAvatar: function changeAvatar(e) {
            console.log(e);
            var _this = this;
            var file = e.target.files[0];
            var Reader = new FileReader();
            Reader.addEventListener('load', function (e) {
                console.log(e);
                console.log(Reader);
                _this.avatar = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
        },
        changeUserBasicSubmitForm: function changeUserBasicSubmitForm() {
            var _this9 = this;

            this.$http.post('/api/updateUserBasic', {
                uid: this.uid,
                nick: this.nick,
                phone: this.phone,
                email: this.email,
                editors: this.editors,
                avatar: this.avatar,
                qq: this.qq,
                wechat: this.wechat,
                token: this.token
            }).then(function (res) {
                if (!res) throw console.log(res);
                console.log(res);
                if (res.body.code && res.body.ok) {
                    _this9.popupLayerBoxShow = 'block';
                    _this9.popupLayerLeft = parseInt((_this9.winW - 500) / 2) + 'px';
                    _this9.popupLayerTop = '200px';
                    _this9.popupLayerText = res.body.msg;
                }
            });
        },
        changeUserProfileSubmitForm: function changeUserProfileSubmitForm(e) {
            var _this10 = this;

            this.$http.post('/api/changeProfile', {
                uid: this.uid,
                sex: this.sex,
                introduce: this.introduce,
                website: this.website,
                token: this.token
            }).then(function (res) {
                if (!res) throw console.log(res);
                console.log(res);
                if (res.body.code && res.body.ok) {
                    _this10.popupLayerBoxShow = 'block';
                    _this10.popupLayerLeft = parseInt((_this10.winW - 500) / 2) + 'px';
                    _this10.popupLayerTop = '200px';
                    _this10.popupLayerText = res.body.msg;
                }
            });
        },
        changeRewardSubmitForm: function changeRewardSubmitForm(e) {
            var _this11 = this;

            this.$http.post('/api/changeReward', {
                uid: this.uid,
                rewardStatus: this.rewardStatus,
                rewardDesc: this.rewardDesc,
                token: this.token
            }).then(function (res) {
                if (!res) throw console.log(res);
                console.log(res);
                if (res.body.code && res.body.ok) {
                    _this11.popupLayerBoxShow = 'block';
                    _this11.popupLayerLeft = parseInt((_this11.winW - 500) / 2) + 'px';
                    _this11.popupLayerTop = '200px';
                    _this11.popupLayerText = res.body.msg;
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
            document.body.appendChild(a);
            this.$http.get('/api/downloadAllArticles?uid=' + this.uid + '&token=' + this.token).then(function (res) {
                if (!res) throw console.log(res);
                if (res.body.code && res.body.ok) {
                    a.setAttribute('href', res.body.data.tar_path);
                    a.click();
                    a.parentNode.removeChild(a);
                    // window.open(res.body.data.tar_path,'_blank');
                    _this12.popupLayerBoxShow = 'block';
                    _this12.popupLayerLeft = parseInt((_this12.winW - 500) / 2) + 'px';
                    _this12.popupLayerTop = '200px';
                    _this12.popupLayerText = res.body.msg;
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

            if (uid !== '' && token !== '') {
                if (this.articleComments == '' || this.articleComments == '填写您的评论....') {
                    this.popupLayerBoxShow = 'block';
                    this.popupLayerText = '请填写您的评论内容';
                    this.popupLayerLeft = parseInt((this.winW - 500) / 2) + 'px';
                    this.popupLayerTop = '200px';
                    return false;
                } else {
                    this.$http.post('/api/postDiscuss', {
                        contents: this.articleComments,
                        uid: this.uid,
                        token: this.token,
                        id: id
                    }).then(function (res) {
                        if (res.body.code && res.body.ok) {
                            _this13.popupLayerBoxShow = 'block';
                            _this13.popupLayerText = '评论成功';
                            _this13.popupLayerLeft = parseInt((_this13.winW - 500) / 2) + 'px';
                            _this13.popupLayerTop = '200px';
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

            this.$http.get('/api/getDiscuss?id=' + id + '&token=' + this.token).then(function (discuss) {
                if (discuss.body.code && discuss.body.ok) {
                    var discussArr = discuss.body.data.reverse();
                    discussArr.forEach(function (item) {
                        item.add_date = _this14.formate_date(item.add_date);
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
        collectionSubmitForm: function collectionSubmitForm(e) {
            var _this16 = this;

            var descArr = this.collectionDesc.split('\n');
            var tmp = '';
            descArr.forEach(function (desc) {
                tmp += '<p>' + desc + '</p>';
            });
            this.$http.post('/api/collection/new', {
                uid: this.uid,
                token: this.token,
                icon: this.collectionIcon,
                name: this.collectionName,
                describe: tmp,
                push: this.collectionPus,
                verify: this.collectionVerify,
                admins: this.collectionAdmins
            }).then(function (res) {
                if (res.body.code && res.body.ok) {
                    window.location.href = '/account/collections/detailes?id=' + res.body.data._id;
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

            this.$http.get('/api/get_collections?uid=' + this.uid + '&token=' + this.token + '&offset=' + offset + '&num=' + num).then(function (res) {
                var collections = res.body.data;
                collections.forEach(function (item) {
                    item.href = '/account/collections/detailes?id=' + item._id;
                    item.describe = item.describe.replace(/<[^>]*>/g, "");
                    item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                    item.subscribe.forEach(function (uids) {
                        if (uids.uid == _this17.uid) {
                            item.subscribed = true;
                        } else {
                            item.subscribed = false;
                        }
                    });
                });
                _this17.collectionLists = collections;
            });
        },
        getCollectionById: function getCollectionById(id) {
            var _this18 = this;

            this.$http.get('/api/getCollectionById?id=' + id + '&token=' + this.token).then(function (coll) {
                if (coll.body.code && coll.body.ok) {
                    var collection = coll.body.data;
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
                    collection.subscribe.forEach(function (item) {
                        if (item.uid == _this18.uid) {
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
            this.$http.get('/api/collectionFollow?uid=' + this.uid + '&id=' + id + '&token=' + this.token).then();
        },
        collectionPush: function collectionPush(e, id) {
            this.collectionPopupLayer = 'block';
            this.popupLayerLeft = parseInt((this.winW - 580) / 2) + 'px';
            this.popupLayerTop = 120 + 'px';
        },
        collectionSearchArticle: function collectionSearchArticle(e) {
            var _this19 = this;

            this.$http.get('/api/allArticles?keyword=' + this.collectionSearchKeyWord + '&token=' + this.token).then(function (lists) {
                if (lists.body.code && lists.body.ok) {
                    var articleArr = lists.body.data;
                    articleArr.forEach(function (item) {
                        item.add_date = _this19.formate_date(item.add_date);
                    });
                    _this19.articleLists = articleArr.reverse();
                } else {
                    _this19.articleLists = [];
                }
            });
        },
        closeCollectionPushPopupLayer: function closeCollectionPushPopupLayer() {
            this.collectionPopupLayer = 'none';
        },
        pushActionBut: function pushActionBut(e, article_id, id) {
            var _this20 = this;

            this.$http.get('/api/articlePush?uid=' + this.uid + '&article_id=' + article_id + '&token=' + this.token + '&id=' + id).then(function (push) {
                _this20.collectionPopupLayer = 'none';
                _this20.popupLayerBoxShow = 'block';
                _this20.popupLayerText = push.body.msg;
            });
        },
        moreCollections: function moreCollections(e) {
            var _this21 = this;

            this.collOffset++;
            this.$http.get('/api/get_collections?uid=' + this.uid + '&token=' + this.token + '&offset=' + this.collOffset + '&num=9').then(function (res) {
                var collections = res.body.data;
                if (collections.length > 0) {
                    collections.forEach(function (item) {
                        item.href = '/account/collections/detailes?id=' + item._id;
                        item.describe = item.describe.replace(/<[^>]*>/g, "");
                        item.describe = item.describe.length > 30 ? item.describe.substr(0, 30) + '...' : item.describe;
                        item.subscribe.forEach(function (uids) {
                            if (uids.uid == _this21.uid) {
                                item.subscribed = true;
                            } else {
                                item.subscribed = false;
                            }
                        });
                        _this21.collectionLists.push(item);
                    });
                }
            });
        },
        accountIntroduceEditBut: function accountIntroduceEditBut(e) {
            this.showAccountIntroduceEditForm = 'block';
            this.showAccountIntroduceText = 'none';
        },
        accountIntroduceFromSaveBut: function accountIntroduceFromSaveBut(e) {
            var _this22 = this;

            this.$http.post('/api/updateIntroduce', {
                uid: this.uid,
                token: this.token,
                introduce: this.introduce
            }).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this22.introduce = _this22.introduce;
                    _this22.showAccountIntroduceEditForm = 'none';
                    _this22.showAccountIntroduceText = 'block';
                    _this22.popupLayerBoxShow = 'block';
                    _this22.popupLayerText = res.body.msg;
                    _this22.popupLayerLeft = parseInt((_this22.winW - 500) / 2) + 'px';
                    _this22.popupLayerTop = '200px';
                } else {
                    _this22.popupLayerBoxShow = 'block';
                    _this22.popupLayerText = '个人介绍修改失败';
                    _this22.popupLayerLeft = parseInt((_this22.winW - 500) / 2) + 'px';
                    _this22.popupLayerTop = '200px';
                }
            });
        },
        accountIntroduceFromResetBut: function accountIntroduceFromResetBut() {
            this.showAccountIntroduceEditForm = 'none';
            this.showAccountIntroduceText = 'block';
        },
        formate_date: function formate_date(date) {
            var MyDate = new Date(date);
            return MyDate.getFullYear() + '-' + (MyDate.getMonth() + 1 <= 9 ? '0' + (MyDate.getMonth() + 1) : MyDate.getMonth() + 1) + '-' + MyDate.getDate() + ' ' + (MyDate.getHours() <= 90 ? '0' + MyDate.getHours() : MyDate.getHours()) + ':' + (MyDate.getMinutes() <= 9 ? '0' + MyDate.getMinutes() : MyDate.getMinutes()) + ':' + (MyDate.getSeconds() <= 9 ? '0' + MyDate.getSeconds() : MyDate.getSeconds());
        }
    }
});
vm.init();
// vm.html2markdown();
//# sourceMappingURL=main.js.map
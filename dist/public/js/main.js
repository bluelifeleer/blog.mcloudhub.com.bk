'use strict';

var _data;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vm = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: (_data = {
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
        introduce: '',
        website: ''
    }, _defineProperty(_data, 'introduce', ''), _defineProperty(_data, 'editors', ''), _defineProperty(_data, 'avatar', '/public/images/QQ20180131-224008@2x.png'), _defineProperty(_data, 'sex', 3), _defineProperty(_data, 'introduce', ''), _defineProperty(_data, 'website', 'http://|https://'), _defineProperty(_data, 'rewardStatus', 2), _defineProperty(_data, 'rewardDesc', '赞赏描述'), _defineProperty(_data, 'slide_list', {}), _defineProperty(_data, 'tags_list', {}), _defineProperty(_data, 'slideAttr', {
        timer: null,
        left: 0,
        length: 0,
        value: 1024,
        index: 0,
        cursor: null
    }), _defineProperty(_data, 'accountSymbol', '&#xe68f;'), _defineProperty(_data, 'accountBox', 'none'), _defineProperty(_data, 'popupLayerBoxShow', 'none'), _defineProperty(_data, 'popupLayerWidth', '100%'), _defineProperty(_data, 'popupLayerHeight', '100%'), _defineProperty(_data, 'popupLayerLeft', 0), _defineProperty(_data, 'popupLayerTop', 0), _defineProperty(_data, 'popupLayerText', ''), _defineProperty(_data, 'articleLists', []), _defineProperty(_data, 'article', []), _data),
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
            this.getAllArticles();
            this.getArticle();
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
        getAllArticles: function getAllArticles() {
            var _this5 = this;

            this.$http.get('/api/allArticles').then(function (all) {
                var tmp = [];
                if (all.body.code && all.body.ok) {
                    tmp = all.body.data;
                    tmp.forEach(function (item) {
                        item.href = '/article/details?id=' + item._id;
                        var content = item.contents.replace(/<[^>]*>/g, "");
                        item.contents = content.length > 30 ? content.substr(0, 30) + '...' : content;
                    });
                    _this5.articleLists = tmp;
                }
            });
        },
        getArticle: function getArticle() {
            var _this6 = this;

            // alert(window.location.pathname);
            if (window.location.pathname == '/article/details') {
                var id = this.getQueryString('id');
                this.$http.get('/api/getArticle?id=' + id).then(function (article) {
                    console.log(article);
                    if (!article) throw console.log(article);
                    var articleArr = article.body.data;
                    articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                    _this6.article = articleArr;
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
            var _this7 = this;

            this.$http.get('/api/getUsers?uid=' + this.uid).then(function (res) {
                if (!res) throw console.log(res);
                _this7.nick = res.body.data.nick;
                _this7.phone = res.body.data.phone;
                _this7.name = res.body.data.name.length > 10 ? res.body.data.name.substr(0, 10) + '...' : res.body.data.name;
                _this7.fullname = res.body.data.name;
                _this7.email = res.body.data.email;
                _this7.qq = res.body.data.qq;
                _this7.wechat = res.body.data.wechat;
                _this7.editors = res.body.data.editors;
                _this7.avatar = res.body.data.avatar ? res.body.data.avatar : _this7.avatar;
                _this7.sex = res.body.data.sex;
                _this7.introduce = res.body.data.introduce;
                _this7.website = res.body.data.website;
                _this7.rewardStatus = res.body.data.rewardStatus ? res.body.data.rewardStatus : _this7.rewardStatus;
                _this7.rewardDesc = res.body.data.rewardDesc;
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
            var _this8 = this;

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
                    _this8.popupLayerBoxShow = 'block';
                    _this8.popupLayerText = res.body.msg;
                }
            });
        },
        changeUserProfileSubmitForm: function changeUserProfileSubmitForm(e) {
            var _this9 = this;

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
                    _this9.popupLayerBoxShow = 'block';
                    _this9.popupLayerText = res.body.msg;
                }
            });
        },
        changeRewardSubmitForm: function changeRewardSubmitForm(e) {
            var _this10 = this;

            this.$http.post('/api/changeReward', {
                uid: this.uid,
                rewardStatus: this.rewardStatus,
                rewardDesc: this.rewardDesc,
                token: this.token
            }).then(function (res) {
                if (!res) throw console.log(res);
                console.log(res);
                if (res.body.code && res.body.ok) {
                    _this10.popupLayerBoxShow = 'block';
                    _this10.popupLayerText = res.body.msg;
                }
            });
        },
        closePopupLayer: function closePopupLayer() {
            this.popupLayerBoxShow = 'none';
        },
        downloadAllArticles: function downloadAllArticles() {
            var _this11 = this;

            this.$http.get('/api/downloadAllArticles').then(function (res) {
                if (!res) throw console.log(res);
                console.log(res);
                if (res.body.code && res.body.ok) {
                    _this11.popupLayerBoxShow = 'block';
                    _this11.popupLayerText = res.body.msg;
                }
            });
        }
    }
});
vm.init();
// vm.html2markdown();
//# sourceMappingURL=main.js.map
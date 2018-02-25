'use strict';

var VM = new Vue({
    delimiters: ['${', '}'],
    el: '#article-editor-app',
    data: {
        title: '无标题文档',
        contents: '### 文章详情',
        markdownText: '### 文章详情',
        previewHtml: '',
        tags: null,
        editors: 2,
        marked: null,
        wangedit: null,
        editorsWidth: "100%",
        editorsHeight: "100%",
        wangEditor: 'block',
        markdownEditor: 'none',
        imgSrc: '',
        accountSymbol: '&#xe68f;',
        accountBox: 'none',
        checked: false,
        tagLists: [],
        uid: '',
        token: '',
        docName: '输入文集名称',
        userName: '',
        docList: [],
        articleLsts: [],
        docInputBox: 'none',
        doc_id: '',
        docActive: 'document-active',
        nowArticleId: '',
        showLoadBut: 'none',
        docMenuShow: 'none',
        articleMenuShow: 'none',
        articleMenuDocShow: 'none',
        articleTitleIndex: 0,
        saveTip: 'none'
    },
    methods: {
        init: function init() {
            if (token != '' && uid != '') {
                this.token = token;
                this.uid = uid;
                this.getUser();
            }
        },
        initMarked: function initMarked(w, h) {
            var _this = this;
            $(function () {
                _this.editormd = editormd("editormd", {
                    width: w,
                    height: h,
                    emoji: true,
                    syncScrolling: "single",
                    path: "/public/js/marked/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
                    toolbarIcons: function toolbarIcons() {
                        // return editormd.toolbarModes['full']; // full, simple, mini
                        // Using "||" set icons align right.
                        return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "list-ul", "list-ol", "hr", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "link", "image", "code", "preformatted-text", "code-block", "emoji", "table", "html-entities", "||", "watch", "fullscreen", "preview", "clear", "help"];
                    },
                    // theme: "dark",
                    // previewTheme: "dark",
                    // editorTheme: "pastel-on-dark",
                    // //markdown: md,
                    // codeFold: true,
                    saveHTMLToTextarea: true, //注意3：这个配置，方便post提交表单
                    // /**设置主题颜色*/
                    // // editorTheme: "pastel-on-dark",
                    // theme: "gray",
                    // previewTheme: "dark",
                    // // taskList: true,
                    // searchReplace: true,
                    watch: false, // 关闭实时预览
                    // htmlDecode: "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启
                    toolbar: true, //关闭工具栏
                    // previewCodeHighlight: false, // 关闭预览 HTML 的代码块高亮，默认开启
                    // tocm: true, // Using [TOCM]
                    tex: false, // 开启科学公式TeX语言支持，默认关闭
                    flowChart: true, //开启流程图支持，默认关闭
                    sequenceDiagram: true, //开启时序/序列图支持，默认关闭,
                    dialogLockScreen: false, //设置弹出层对话框不锁屏，全局通用，默认为true
                    dialogShowMask: false, //设置弹出层对话框显示透明遮罩层，全局通用，默认为true
                    dialogDraggable: false, //设置弹出层对话框不可拖动，全局通用，默认为true
                    dialogMaskOpacity: 0.4, //设置透明遮罩层的透明度，全局通用，默认值为0.1
                    dialogMaskBgColor: "#000", //设置透明遮罩层的背景颜色，全局通用，默认为#fff
                    //
                    codeFold: true,
                    //
                    imageUpload: true,
                    imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL: "/api/uploader",
                    onload: function onload() {
                        //this.fullscreen();
                        //this.unwatch();
                        //this.watch().fullscreen();
                        //this.width("100%");
                        //this.height(480);
                        //this.resize("100%", 640);
                    },
                    onchange: function onchange() {}
                });
                // _this.editormd.config("toolbarAutoFixed", false);
            });
        },
        initEditor: function initEditor(w, h) {
            var E = window.wangEditor;
            this.wangedit = new E('#exampleTextarea');
            this.wangedit.customConfig.menus = ['head', // 标题
            'bold', // 粗体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'video', // 插入视频
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
            ];
            // editor.customConfig.onchange = function (html) {
            //     // html 即变化之后的内容
            //     this.contents = html;
            //     // console.log(html)
            // }
            this.wangedit.create();
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
                _this3.tags = res.body.data;
            });
        },
        getUser: function getUser() {
            var _this4 = this;

            var winH = document.body.clientHeight || document.documentElement.clientHeight;
            this.editorsHeight = winH + 'px';
            this.$http.get('/api/getUsers?uid=' + this.uid).then(function (res) {
                if (!res) throw console.log(res);
                _this4.uid = res.body.data._id;
                _this4.userName = res.body.data.name;
                _this4.editors = res.body.data.editors;
                if (_this4.editors == 2) {
                    _this4.markdownEditor = 'block';
                    _this4.wangEditor = 'none';
                    _this4.initMarked(_this4.editorsWidth, _this4.editorsHeight);
                } else {
                    _this4.initEditor(_this4.editorsWidth, _this4.editorsHeight);
                    _this4.markdownEditor = 'none';
                    _this4.wangEditor = 'block';
                }
                _this4.getDocLists();
            });
        },
        getDocLists: function getDocLists() {
            var _this5 = this;

            this.$http.get('/api/getDocLists?uid=' + this.uid).then(function (res) {
                if (!res) throw console.log(res);
                _this5.docList = res.body.data;
                if (_this5.docList.length > 0) {
                    _this5.docList[0].active = true;
                    _this5.doc_id = res.body.data[0]._id;
                    _this5.docName = res.body.data[0].name;
                    _this5.getArticleLists();
                }
            });
        },
        getArticleLists: function getArticleLists() {
            var _this6 = this;

            this.$http.get('/api/getArticleLists?doc_id=' + this.doc_id).then(function (res) {
                if (!res) throw console.log(res);
                _this6.articleLsts = res.body.data;
                if (_this6.articleLsts.length > 0) {
                    _this6.articleLsts[0].active = true;
                    _this6.nowArticleId = res.body.data[0]._id;
                    _this6.title = res.body.data[0].title;
                    if (_this6.editors == 2) {
                        _this6.contents = res.body.data[0].markDownText;
                    } else {
                        _this6.contents = res.body.data[0].contents;
                        _this6.wangedit.txt.html(_this6.contents);
                    }
                }
            });
        },
        getArticle: function getArticle() {
            var _this7 = this;

            this.$http.get('/api/getArticle?id=' + this.nowArticleId).then(function (res) {
                if (!res) throw console.log(res);
                _this7.title = res.body.data.article.title;
                _this7.nowArticleId = res.body.data.article._id;
                if (_this7.editors == 2) {
                    _this7.contents = res.body.data.article.markDownText;
                    _this7.editormd.setMarkdown(_this7.contents);
                } else {
                    _this7.contents = res.body.data.article.contents;
                    _this7.wangedit.txt.html(_this7.contents);
                }
            });
        },
        uploadfile: function uploadfile(e) {
            console.log(e);
            var _this = this;
            var file = e.target.files[0];
            var Reader = new FileReader();
            Reader.addEventListener('load', function (e) {
                console.log(e);
                console.log(Reader);
                _this.imgSrc = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
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
        createDocument: function createDocument(e) {
            this.docInputBox = 'block';
        },
        focus: function focus(e) {
            this.docName = '';
        },
        confirmDocSubmitForm: function confirmDocSubmitForm(e) {
            var _this8 = this;

            this.$http.post('/api/newDocument', {
                uid: this.uid,
                name: this.docName
            }).then(function (res) {
                if (!res) throw console.log(res);
                _this8.docInputBox = 'none';
                _this8.getDocLists();
            });
        },
        cleanDocConfirm: function cleanDocConfirm(e) {
            this.docInputBox = 'none';
        },
        documentSetting: function documentSetting(e, id, index) {
            if (this.docMenuShow == 'none') {
                this.docMenuShow = 'block';
            } else {
                this.docMenuShow = 'none';
            }
            this.$refs.menu[index].style.display = this.docMenuShow;
        },
        editDocument: function editDocument(e, id, index) {
            if (this.docMenuShow == 'none') {
                this.docMenuShow = 'block';
            } else {
                this.docMenuShow = 'none';
            }
            this.$refs.menu[index].style.display = this.docMenuShow;
            this.$refs.showDocumentBox[index].style.display = 'none';
            this.$refs.showDocumentInput[index].style.display = 'block';
            this.$refs.showDocumentInput[index].focus();
        },
        psotDocumentNameEdit: function psotDocumentNameEdit(e, id, index) {
            var value = this.$refs.showDocumentInput[index].value;
            this.$refs.showDocumentBox[index].innerHTML = value;
            this.$http.post('/api/updateDocumentName', {
                uid: this.uid,
                id: id,
                token: this.token,
                name: value
            }).then(function (res) {
                // pass
            });
        },
        documentInputBlur: function documentInputBlur(e, id, index) {
            this.$refs.showDocumentBox[index].style.display = 'block';
            this.$refs.showDocumentInput[index].style.display = 'none';
            this.$refs.showDocumentBox[index].innerHTML = this.$refs.showDocumentInput[index].value;
        },
        deleteDocument: function deleteDocument(e, id, index) {
            var _this9 = this;

            this.$http.get('/api/deleteDoc?id=' + id + '&uid=' + this.uid + '&token=' + this.token).then(function (res) {
                if (!res) throw console.log(res);
                _this9.docMenuShow = 'none';
                _this9.$refs.menu[index].style.display = _this9.docMenuShow;
                _this9.getDocLists();
            });
        },
        createArticle: function createArticle(e) {
            var _this10 = this;

            this.showLoadBut = 'block';
            this.$http.post('/api/newArticle', {
                uid: this.uid,
                doc_id: this.doc_id,
                doc_name: this.docName,
                user_name: this.userName,
                token: this.token
            }).then(function (res) {
                _this10.showLoadBut = 'none';
                if (!res) throw console.log(res);
                console.log(res);
                _this10.nowArticleId = res.body.data.id;
                _this10.getArticleLists();
            });
        },
        saveArticle: function saveArticle(e, id) {
            var _this11 = this;

            // markdownToHTML
            if (this.editors == 2) {
                this.markdownText = this.editormd.getMarkdown();
                this.contents = this.editormd.getHTML();
            } else {
                this.contents = this.wangedit.txt.html();
            }

            this.$http.post('/api/saveArticle', {
                id: id,
                title: this.title,
                contents: this.contents,
                markdownText: this.markdownText
            }).then(function (res) {
                _this11.showSaveTip();
            });
        },
        articleSetting: function articleSetting(e, id, index) {
            if (this.articleMenuShow == 'none') {
                this.articleMenuShow = 'block';
            } else {
                this.articleMenuShow = 'none';
            }
            this.$refs.articleMenu[index].style.display = this.articleMenuShow;
        },
        selectDocumentButs: function selectDocumentButs(e, doc, i) {
            this.docList.forEach(function (item) {
                Vue.set(item, 'active', false);
            });
            this.doc_id = doc._id;
            this.docName = doc.name;
            Vue.set(doc, 'active', true);
            this.getArticleLists();
        },
        selectArticleBut: function selectArticleBut(e, article, index) {
            this.articleLsts.forEach(function (item) {
                Vue.set(item, 'active', false);
            });
            this.nowArticleId = article._id;
            Vue.set(article, 'active', true);
            this.title = article.title;
            this.articleTitleIndex = index;
            this.getArticle();
        },
        releaseArticle: function releaseArticle(e, id, index) {
            var _this12 = this;

            this.$http.get('/api/releaseArticle?id=' + id + '&uid=' + this.uid + '&token=' + this.token).then(function (res) {
                if (!res) throw console.log(res);
                _this12.articleMenuShow = 'none';
                _this12.$refs.articleMenu[index].style.display = _this12.articleMenuShow;
                _this12.getArticleLists();
            });
        },
        moveArticle: function moveArticle(e, id, index) {
            if (this.articleMenuDocShow == 'none') {
                this.articleMenuDocShow = 'block';
            } else {
                this.articleMenuDocShow = 'none';
            }
            this.$refs.articlMenuDocumentBlock.style.display = this.articleMenuDocShow;
            this.$refs.articlMenuDocumentBlock.style.top = parseInt(68 * (index + 1) + 72) + 'px';
        },
        deleteArticle: function deleteArticle(e, id, index) {
            var _this13 = this;

            this.$http.get('/api/deleteArticle?id=' + id + '&uid=' + this.uid + '&token=' + this.token).then(function (res) {
                if (!res) throw console.log(res);
                _this13.articleMenuShow = 'none';
                _this13.$refs.articleMenu[index].style.display = _this13.articleMenuShow;
                _this13.getArticleLists();
            });
        },
        changeArticleTitle: function changeArticleTitle(e) {
            var _this14 = this;

            this.$http.post('/api/changeAticleTitle', {
                uid: this.uid,
                token: this.token,
                id: this.nowArticleId,
                title: this.title
            }).then(function (res) {
                _this14.showSaveTip();
            });
            this.$refs.articleTitle[this.articleTitleIndex].innerHTML = this.title;
        },
        showSaveTip: function showSaveTip() {
            this.saveTip = 'block';
            var _this = this;
            setTimeout(function () {
                _this.saveTip = 'none';
            }, 200);
        }
    }
});
VM.init();
//# sourceMappingURL=articleeditor.js.map
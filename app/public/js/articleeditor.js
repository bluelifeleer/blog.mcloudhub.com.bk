const VM = new Vue({
    delimiters: ['${', '}'],
    el: '#article-editor-app',
    data: {
        isSignin: false,
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
        editorsArticlListHeight:'100%',
        editorsArticlBoxHeight:'100%',
        wangEditor: 'block',
        markdownEditor: 'none',
        imgSrc: '',
        accountSymbol: '&#xe68f;',
        accountBox: 'none',
        checked: false,
        tagLists: [],
        uid: '',
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
        init: function() {
            if (uid != '') {
                this.uid = uid;
                this.getUser();
                this.isSignin = true;
                // this.autoSaveArticle(null);
            }
        },
        initMarked: function(w, h) {
            let _this = this;
            $(function() {
                _this.editormd = editormd("editormd", {
                    width: w,
                    height: h,
                    emoji: true,
                    syncScrolling: "single",
                    path: "/public/js/marked/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
                    toolbarIcons: function() {
                        // return editormd.toolbarModes['full']; // full, simple, mini
                        // Using "||" set icons align right.
                        return ["undo", "redo", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "list-ul", "list-ol", "hr", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "link", "image", "code", "preformatted-text", "code-block", "emoji", "table", "html-entities", "||", "watch", "fullscreen", "preview", "clear", "help"]
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
                    watch: true, // 关闭实时预览
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
                    onload: function() {
                        //this.fullscreen();
                        //this.unwatch();
                        //this.watch().fullscreen();
                        //this.width("100%");
                        //this.height(480);
                        //this.resize("100%", 640);
                    },
                    onchange: function() {

                    }
                });
                // _this.editormd.config("toolbarAutoFixed", false);
            });
        },
        initEditor: function(w, h) {
            const E = window.wangEditor;
            this.wangedit = new E('#exampleTextarea');
            this.wangedit.customConfig.menus = [
                'head', // 标题
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
        getTags: function() {
            this.$http.get('/api/tags').then(res => {
                this.tags = res.body.data;
            });
        },
        getUser: function() {
            let winH = document.body.clientHeight || document.documentElement.clientHeight;
            this.editorsHeight = winH + 'px';
            this.editorsArticlBoxHeight = parseInt(winH-50)+'px';
            this.$http.get('/api/getUsers?uid=' + this.uid).then(res => {
                if (!res) throw console.log(res);
                this.uid = res.body.data._id;
                this.userName = res.body.data.name;
                this.editors = res.body.data.editors;
                if (this.editors == 2) {
                    this.markdownEditor = 'block';
                    this.wangEditor = 'none';
                    this.initMarked(this.editorsWidth, this.editorsHeight);
                } else {
                    this.initEditor(this.editorsWidth, this.editorsHeight);
                    this.markdownEditor = 'none';
                    this.wangEditor = 'block';
                }
                this.getDocLists();
            });
        },
        getDocLists: function() {
            this.$http.get('/api/getDocLists?uid=' + this.uid).then(res => {
                if (!res) throw console.log(res);
                this.docList = res.body.data;
                if (this.docList.length > 0) {
                    this.docList[0].active = true;
                    this.doc_id = res.body.data[0]._id;
                    this.docName = res.body.data[0].name;
                    this.getArticleLists();
                }
            });
        },
        getArticleLists: function(type = null) {
            this.$http.get('/api/getArticleLists?doc_id=' + this.doc_id).then(res => {
                if (!res) throw console.log(res);
                let articleLsts = res.body.data;
                this.editorsArticlListHeight = parseInt(60*articleLsts.length)+'px';
                if (articleLsts.length > 0) {
                    if(!type){
                        articleLsts[0].active = true;
                        this.nowArticleId = articleLsts[0]._id;
                        this.title = articleLsts[0].title;
                        this.contents = this.editors == 2 ? articleLsts[0].markDownText : articleLsts[0].contents;
                        this.editors == 2 ? null : this.wangedit.txt.html(this.contents);
                    }else{
                        let index = parseInt(res.body.data.length-1);
                        articleLsts[index].active = true;
                        this.contents = this.editors == 2 ? articleLsts[index].markDownText : articleLsts[index].contents;
                        this.editors == 2 ? null : this.wangedit.txt.html(this.contents);
                    }
                }
                this.articleLsts = articleLsts;
            });
        },
        getArticle: function() {
            this.$http.get('/api/getArticle?id=' + this.nowArticleId).then(res => {
                if (!res) throw console.log(res);
                this.title = res.body.data.article.title;
                this.nowArticleId = res.body.data.article._id;
                this.contents = this.editors == 2 ? res.body.data.article.markDownText: res.body.data.article.contents;
                this.editors == 2 ? this.editormd.setMarkdown(this.contents) : this.wangedit.txt.html(this.contents);
            });
        },
        uploadfile: function(e) {
            let _this = this;
            let file = e.target.files[0];
            let Reader = new FileReader();
            Reader.addEventListener('load', function(e) {
                console.log(e);
                console.log(Reader);
                _this.imgSrc = Reader.result;
            }, false);
            Reader.readAsDataURL(file);
        },
        showAccountBox: function() {
            if (this.accountBox == 'none') {
                this.accountBox = 'block';
                this.accountSymbol = '&#xe68d';
            } else {
                this.accountBox = 'none';
                this.accountSymbol = '&#xe68f;'
            }
        },
        createDocument: function(e) {
            this.docInputBox = 'block';
        },
        focus: function(e) {
            this.docName = '';
        },
        confirmDocSubmitForm: function(e) {
            this.$http.post('/api/newDocument', {
                uid: this.uid,
                name: this.docName
            }).then(res => {
                if (!res) throw console.log(res);
                this.docInputBox = 'none';
                this.getDocLists();
            });
        },
        cleanDocConfirm: function(e) {
            this.docInputBox = 'none';
        },
        documentSetting: function(e, id, index) {
            if (this.docMenuShow == 'none') {
                this.docMenuShow = 'block';
            } else {
                this.docMenuShow = 'none';
            }
            this.$refs.menu[index].style.display = this.docMenuShow;
        },
        editDocument: function(e, id, index) {
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
        psotDocumentNameEdit: function(e, id, index) {
            let value = this.$refs.showDocumentInput[index].value;
            this.$refs.showDocumentBox[index].innerHTML = value;
            this.$http.post('/api/updateDocumentName', {
                uid: this.uid,
                id: id,
                name: value
            }).then(res => {
                // pass
            });
        },
        documentInputBlur: function(e, id, index) {
            this.$refs.showDocumentBox[index].style.display = 'block';
            this.$refs.showDocumentInput[index].style.display = 'none';
            this.$refs.showDocumentBox[index].innerHTML = this.$refs.showDocumentInput[index].value;
        },
        deleteDocument: function(e, id, index) {
            this.$http.get('/api/deleteDoc?id=' + id + '&uid=' + this.uid).then(res => {
                if (!res) throw console.log(res);
                this.alertSuccess('文集删除成功');
                this.docMenuShow = 'none';
                this.$refs.menu[index].style.display = this.docMenuShow;
                this.getDocLists();
            });
        },
        createArticle: function(e) {
            this.showLoadBut = 'block';
            this.$http.post('/api/newArticle', {
                uid: this.uid,
                doc_id: this.doc_id,
                doc_name: this.docName,
                user_name: this.userName
            }).then(res => {
                if(res.body.code && res.body.ok){
                    this.showLoadBut = 'none';
                    this.title = res.body.data.title;
                    this.nowArticleId = res.body.data._id;
                    this.getArticleLists(true);
                    this.alertSuccess(res.body.msg);
                }else{
                    this.alertError(res.body.msg);
                }
            });
        },
        saveArticle: function(e, id) {

            // markdownToHTML
            if (this.editors == 2) {
                this.markdownText = this.editormd.getMarkdown();
                this.contents = this.editormd.getPreviewedHTML();
            } else {
                this.contents = this.wangedit.txt.html()
            }
            this.checkSignin();
            if(this.isSignin){
                this.$http.post('/api/saveArticle', {
                    id: id,
                    title: this.title,
                    contents: this.contents,
                    markdownText: this.markdownText
                }).then(res => {
                    this.alertSuccess('文章已保存');
                    this.showSaveTip();
                });
            }else{
                this.alertWarning('cookie已失效');
                window.location.href = '/login?redirect_uri=' + window.location.href;
            }

        },
        articleSetting: function(e, id, index) {
            if (this.articleMenuShow == 'none') {
                this.articleMenuShow = 'block';
            } else {
                this.articleMenuShow = 'none';
            }
            this.$refs.articleMenu[index].style.display = this.articleMenuShow;
        },
        selectDocumentButs: function(e, doc, i) {
            this.docList.forEach(item => {
                Vue.set(item, 'active', false);
            })
            this.doc_id = doc._id;
            this.docName = doc.name;
            Vue.set(doc, 'active', true);
            this.getArticleLists();
        },
        selectArticleBut: function(e, article, index) {
            this.articleLsts.forEach(item => {
                Vue.set(item, 'active', false);
            })
            this.nowArticleId = article._id;
            Vue.set(article, 'active', true);
            this.title = article.title;
            this.articleTitleIndex = index;
            this.getArticle();
        },
        releaseArticle: function(e, id, index) {
            this.$http.get('/api/releaseArticle?id=' + id + '&uid=' + this.uid).then(res => {
                if (!res) throw console.log(res);
                this.articleMenuShow = 'none';
                this.$refs.articleMenu[index].style.display = this.articleMenuShow;
                this.getArticleLists();
            });
        },
        moveArticle: function(e, id, index) {
            if (this.articleMenuDocShow == 'none') {
                this.articleMenuDocShow = 'block';
            } else {
                this.articleMenuDocShow = 'none';
            }
            this.$refs.articlMenuDocumentBlock.style.display = this.articleMenuDocShow;
            this.$refs.articlMenuDocumentBlock.style.top = parseInt((68 * (index + 1)) + 72) + 'px';
        },
        deleteArticle: function(e, id, index) {
            this.$http.get('/api/deleteArticle?id=' + id + '&uid=' + this.uid).then(res => {
                if (!res) throw console.log(res);
                this.alertSuccess('文章删除成功');
                this.articleMenuShow = 'none';
                this.$refs.articleMenu[index].style.display = this.articleMenuShow;
                this.getArticleLists();
            });
        },
        changeArticleTitle: function(e) {

            this.$http.post('/api/changeAticleTitle', {
                uid: this.uid,
                id: this.nowArticleId,
                title: this.title,
            }).then(res => {
                this.showSaveTip();
            });
            this.$refs.articleTitle[this.articleTitleIndex].innerHTML = this.title;
        },
        autoSaveArticle: function(e) { // 自动将当前修改的文章保存，时间间隔1分钟
            let = _this = this;
            if(_this.isSignin){
                setInterval(function() {
                    if (_this.nowArticleId) {
                        _this.saveArticle(e, _this.nowArticleId);
                    }
                }, 60000);
            }else{
                this.alertWarning('cookie已失效，请登录！！！')
            }
        },
        setPermissions:function(e,id,i,type){
            this.$http.get('/api/article/set_permissions?id='+id+'&&type='+type).then(status=>{
                console.log(status);
            });
        },
        checkSignin:function(){ // 检测是否登录
            this.$http.get('/api/check_signin').then(status=>{
                this.isSignin = status.body.data.isSignin;
            });
        },
        showSaveTip: function() {
            this.saveTip = 'block';
            let _this = this;
            setTimeout(function() {
                _this.saveTip = 'none';
            }, 200)
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
VM.init();

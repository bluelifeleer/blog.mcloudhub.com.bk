const VM = new Vue({
    delimiters: ['${', '}'],
    el:'#article-editor-app',
    data:{
        title:'无标题文档',
        contents:'',
        previewHtml:'',
        tags:null,
        editors:2,
        marked:null,
        wangedit:null,
        editorsWidth:"100%",
        editorsHeight:"100%",
        wangEditor:'block',
        markdownEditor:'none',
        imgSrc:'',
        accountSymbol:'&#xe68f;',
        accountBox:'none',
        checked:false,
        tagLists:[],
        uid:'',
        token:'',
        docName:'输入文集名称',
        docList:[],
        articleLsts:[],
        docInputBox:'none',
        doc_id:'',
        docActive:'document-active',
        nowArticleId:'',
        showLoadBut:'none'
    },
    methods:{
        init:function(){
            if(token != '' && uid != ''){
                this.token = token;
                this.uid = uid;
                this.getUser();
            }
        },
        initMarked:function(w,h){
            let _this = this;
            $(function() {
                _this.editormd = editormd("editormd", {
                    width: w,
                    height: h,
                    emoji: true,
                    syncScrolling: "single",
                    path: "/public/js/marked/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
                    toolbarIcons : function() {
                        // return editormd.toolbarModes['full']; // full, simple, mini
                        // Using "||" set icons align right.
                        return ["undo", "redo", "|", "bold","del","italic","quote","ucwords","uppercase","lowercase","|","list-ul","list-ol", "hr", "|","h1","h2","h3","h4","h5","h6", "|","link","image", "code","preformatted-text","code-block","emoji","table","html-entities","||", "watch", "fullscreen", "preview","clear","help"]
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
                    // codeFold: true,
                    //
                    // imageUpload: true,
                    // imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    // imageUploadURL: "/smart-api/upload/editormdPic/",
                    // onload: function() {
                    //     //console.log('onload', this);
                    //     //this.fullscreen();
                    //     //this.unwatch();
                    //     //this.watch().fullscreen();
                    //     //this.width("100%");
                    //     //this.height(480);
                    //     //this.resize("100%", 640);
                    // },
                    onchange:function(){
                        console.log(this);
                    }
                });
            });
        },
        initEditor:function(w,h){
            const E = window.wangEditor;
            this.wangedit = new E('#exampleTextarea');
            this.wangedit.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ];
            // editor.customConfig.onchange = function (html) {
            //     // html 即变化之后的内容
            //     this.contents = html;
            //     // console.log(html)
            // }
            this.wangedit.create();
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
                this.tags = res.body.data;
            });
        },
        getUser:function(){
            let winH = document.body.clientHeight || document.documentElement.clientHeight;
            this.editorsHeight = winH+'px';
            this.$http.get('/api/getUsers?uid='+this.uid).then(res=>{
                if(!res) throw console.log(res);
                this.uid = res.body.data._id;
                this.editors = res.body.data.editors;
                if(this.editors == 2){
                    this.markdownEditor = 'block';
                    this.wangEditor = 'none';
                    this.initMarked(this.editorsWidth,this.editorsHeight);
                }else{
                    this.initEditor(this.editorsWidth,this.editorsHeight);
                    this.markdownEditor = 'none';
                    this.wangEditor = 'block';
                }
                this.getDocLists();
            });
        },
        getDocLists:function(){
            this.$http.get('/api/getDocLists?uid='+this.uid).then(res=>{
                if(!res) throw console.log(res);
                this.docList = res.body.data;
                this.docList[0].active = true;
                this.doc_id = res.body.data[0]._id;
                this.getArticleLists();
            });
        },
        getArticleLists:function(){
            this.$http.get('/api/getArticleLists?doc_id='+this.doc_id).then(res=>{
                if(!res) throw console.log(res);
                this.articleLsts = res.body.data;
                this.articleLsts[0].active = true;
                this.nowArticleId = res.body.data[0]._id;
                this.title = res.body.data[0].title;
            });
        },
        getArticle:function(){
            this.$http.get('/api/getArticle?id='+this.nowArticleId).then(res=>{
                if(!res) throw console.log(res);
                this.title = res.body.data.title;
                this.nowArticleId = res.body.data._id;
                this.contents = res.body.data.contents;
            });
        },
        uploadfile:function(e){
            console.log(e);
            let _this = this;
            let file = e.target.files[0];
            let Reader = new FileReader();
            Reader.addEventListener('load', function(e){
                console.log(e);
                console.log(Reader);
                _this.imgSrc = Reader.result;
            },false);
            Reader.readAsDataURL(file);
        },
        showAccountBox:function(){
            if(this.accountBox == 'none'){
                this.accountBox = 'block';
                this.accountSymbol = '&#xe68d';
            }else{
                this.accountBox = 'none';
                this.accountSymbol = '&#xe68f;'
            }
        },
        createDocument:function(e){
            this.docInputBox='block';
        },
        focus:function(e){
            this.docName = '';
        },
        confirmDocSubmitForm:function(e){
            this.$http.post('/api/newDocument',{
                uid:this.uid,
                name:this.docName
            }).then(res=>{
                if(res) throw console.log(res);
                console.log(res);
            });
        },
        cleanDocConfirm:function(e){
            this.docInputBox='none';
        },
        documentSetting:function(e,id){
            alert(id);
        },
        createArticle:function(e){
            this.showLoadBut = 'block';
            this.$http.post('/api/newArticle',{
                uid:this.uid,
                doc_id:this.doc_id,
                token:this.token
            }).then(res=>{
                this.showLoadBut = 'none';
                if(!res) throw console.log(res);
                console.log(res);
                this.nowArticleId = res.body.data.id;
                this.getArticleLists();
            });
        },
        saveArticle:function(e,id){

            // markdownToHTML
            let contents = this.editors == 2 ? this.editormd.getHTML() :this.wangedit.txt.html();
            alert(contents);
            // this.$http.post('/api/saveArticle',{
            //     id:id,
            //     title:this.title,
            //     contents:contents
            // }).then(res=>{
            //     console.log(res);
            // });
        },
        articleSetting:function(e,id){
            alert(id);
        },
        selectDocumentButs:function(e,doc,i){
            this.docList.forEach(item=>{
                Vue.set(item,'active',false);
            })
            this.doc_id = doc._id;
            Vue.set(doc,'active',true);
            this.getArticleLists();
        },
        selectArticleBut:function(e,article,i){
            this.articleLsts.forEach(item=>{
                Vue.set(item,'active',false);
            })
            this.nowArticleId = article._id;
            Vue.set(article,'active',true);
            this.title = article.title;
            this.getArticle();
        }
    }
});
VM.init();
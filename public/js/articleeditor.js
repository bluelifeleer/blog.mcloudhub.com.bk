const VM = new Vue({
    delimiters: ['${', '}'],
    el:'#article-editor-app',
    data:{
        title:'',
        describe:'',
        textareaText:'',
        previewHtml:'',
        tags:null,
        editorType:1,
        wangEditor:'block',
        markdownEditor:'none'
    },
    methods:{
        init:function(){
            this.initEditor();
            this.getTags();
        },
        html2markdown:function(){
            // let markDown = new showdown();
            let converter = new showdown.Converter();
            this.previewHtml = converter.makeHtml(this.textareaText);
        },
        initEditor:function(){
            const E = window.wangEditor;
            let editor = new E('#exampleTextarea');
            editor.customConfig.menus = [
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
            editor.customConfig.onchange = function (html) {
                // html 即变化之后的内容
                console.log(html)
            }
            editor.create();
        },
        getTags:function(){
            this.$http.get('/api/tags').then(res=>{
                this.tags = res.body.data;
            });
        },
        switchEditor:function(e,editor){
            if(editor == 'wang'){
                this.wangEditor = 'block';
                this.markdownEditor = 'none';
                this.editorType = 1;
            }else{
                this.wangEditor = 'none';
                this.markdownEditor = 'block';
                this.editorType = 2;
            }
        }
    }
});
VM.init();
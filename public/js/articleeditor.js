const VM = new Vue({
    el:'#article-editor-app',
    data:{
        title:'',
        describe:'',
        html:'',
        preview:''
    },
    methods:{
        init:function(){
            this.initEditor();
        },
        html2markdown:function(){
            // let markDown = new showdown();
            let converter = new showdown.Converter();
            this.preview = converter.makeHtml(this.html);
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
        }
    }
});
VM.init();
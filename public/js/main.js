const vm = new Vue({
    el: '#app',
    data: {
        hello: 'Hello Node.js',
        textHtml:'## 请输入博客内容',
        html:''
    },
    methods:{
        html2markdown:function(e){
            // alert(this.textHtml);
            let markdown = new showdown.Converter();
            let html = markdown.makeHtml(this.textHtml);
            //展示到对应的地方  result便是id名称
            this.html = html;
        },
        switchRegin:function(){
            alert('注册');
        }
    }
});
vm.html2markdown();
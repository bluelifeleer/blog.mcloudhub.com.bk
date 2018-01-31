const vm = new Vue({
    el: '#app',
    data: {
        // hello: 'Hello Node.js',
        // textHtml:'## 请输入博客内容',
        // html:'',
        token:'',
        name:'bluelife',
        password:'',
    },
    methods:{
        // html2markdown:function(e){
        //     // alert(this.textHtml);
        //     let markdown = new showdown.Converter();
        //     let html = markdown.makeHtml(this.textHtml);
        //     //展示到对应的地方  result便是id名称
        //     this.html = html;
        // },
        // switchRegin:function(){
        //     alert('注册');
        // },
        submitForm:function(e){
            this.$http.post('/api/signin',{name:this.name,password:this.password,token:this.token}).then((err,res)=>{
                if(err) throw console.log(err);
                console.log(res);
            });
        },
        get_token:function(){
            if(!this.token || this.token == ''){
                this.$http.get('/api/gettoken').then((res)=>{
                    if(!res) throw console.log(err);
                    console.log(res.body.data.token);
                    this.token = res.body.data.token;
                })
            }
        }
    }
});
vm.get_token();
// vm.html2markdown();
const vm = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        token:'',
        name:'',
        password:'',
        slide_list:{},
        tags_list:{},
        slideAttr:{
            timer:null,
            left:0,
            length:0,
            value:1024,
            index:0,
            cursor:null
        },
    },
    methods:{
        init:function(){
            this.get_tags();
            this.get_token();
            this.get_slides();
            this.slideAutoPlay();
        },
        switchSlide:function(e,direction){
            if(direction == 'next'){
                this.slideAttr.index--;
                if(this.slideAttr.index <= -this.slideAttr.length){
                    this.slideAttr.index = 0;
                }
            }else{
                this.slideAttr.index++;
                if(this.slideAttr.index >= 0){
                    this.slideAttr.index = -this.slideAttr.length+1;
                }
            }
            this.slidePlay(this.slideAttr.index);
        },
        slidePlay:function(index){
            this.slideAttr.left = index*this.slideAttr.value;
        },
        slideAutoPlay:function(){
            let _this = this;
            this.slideAttr.timer = setInterval(function(){
                _this.switchSlide(null,'next');
            },1000);
        },
        stopSlidePlay:function(){
            this.slideAttr.cursor = 'pointer';
            clearInterval(this.slideAttr.timer);
        },
        autoSlidePlay:function(){
            this.slideAttr.cursor = null;
            this.slideAutoPlay();
        },
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
        },
        get_tags:function(){
            this.$http.get('/api/tags').then(res=>{
                this.tags_list = res.body.data;
            });
        },
        get_slides:function(){
            this.$http.get('/api/slides').then(res=>{
                this.slide_list = res.body.data;
                this.slideAttr.length = res.body.data.length;
            });
        }
    }
});
vm.init();
// vm.html2markdown();
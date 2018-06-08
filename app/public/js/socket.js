'use strict';
const VMM = new Vue({
    delimiters: ['${', '}'],
    el: '#socket-app',
    data: {
        user:{
            name: '',
            password: ''
        },
        app:{
            width:0,
            height:0,
            left:0,
            top:0
        },
        firends:[],
        currentUser:{},
        currentFirend:{},
        socket: null,
        editor: null,
        sendMsg: '请输入要发送的信息.....',
    },
    methods: {
        init: function(){
            this.app.width = document.body.clientWidth || document.documentElement.clientWidth;
            this.app.height = document.body.clientHeight || document.documentElement.clientHeight;
            this.$refs.socketApp.style.left = parseInt(parseInt(this.app.width-980)/2)+'px';
            this.$refs.socketApp.style.top = parseInt(parseInt(this.app.height-710)/2)+'px';
            this.socket = io.connect('wss://blog.mcloudhub.com');
            this.socket.on('status', data =>{
                console.log(data);
            });
            // console.log(this.socket.connected);
            // console.log(this.socket.disconnected);
            var toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block']
            ];
            this.editor = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
        },
        moveApp: function(e){
            let _this = this;
            let ev = e || event;
            let _x = ev.clientX - this.$refs.socketApp.offsetLeft;
            let _y = ev.clientY - this.$refs.socketApp.offsetTop;
            let width = this.getAttrComputedStyle(_this.$refs.socketApp,'width');
            let height = this.getAttrComputedStyle(_this.$refs.socketApp,'height');
            document.onmousemove = function(e){
                let ev = e || event;
                let x = ev.clientX - _x;
                let y = ev.clientY - _y;
                let targetX = Math.ceil(_this.app.width-width);
                let targetY = Math.ceil(_this.app.height-height);
                if(x < 0){
                    x = 0;
                }else if(x >= targetX){
                    x = targetX;
                }else{
                    x = x;
                }

                if(y <= 0){
                    y = 0;
                }else if(y > targetY){
                    y = targetY;
                }else{
                    y = y;
                }
                _this.$refs.socketApp.style.left = x+'px';
                _this.$refs.socketApp.style.top = y+'px';
                ev.setCapture && ev.setCapture();   // 设置事件捕获
                ev.preventDefault();                // 阻止默认事件
                return false;
            }
            document.onmouseup = function(e){
                let ev = e || event;
                this.onmouseup = this.onmousemove = null;
                ev.releaseCapture && ev.releaseCapture();   // 取消事件捕获
            }
        },
        switchUsers: function(firend){
            this.currentFirend = firend;
        },
        submitMsg: function(){
            this.socket.emit('msg', {forom:this.currentUser.id,to:this.currentFirend.id,msg:this.editor.getContents().ops[0].insert});
        },
        loginSubmit: function(){
            this.$refs.loginMarkeLayer.style.transform="translateY(-100%)";
            this.$refs.loginFormLayer.style.transform="translateY(-200%)";
            this.socket.emit('user', {name:this.user.name});
            this.socket.on('logins',json=>{
                this.firends = json.logins;
            });
            this.socket.on('loginUser', json=>{
                this.currentUser = json;
            });
        },
        getAttrComputedStyle:function(el,attr){
            let computed = document.defaultView === window ? window.getComputedStyle : document.defaultView.getComputedStyle;
            return attr == 'width' || attr == 'height' || attr == 'left' || attr == 'top' ? parseInt(computed(el,null)[attr]) : computed(el,null)[attr];
        }
    }
});
VMM.init();
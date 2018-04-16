const VM = new Vue({
    delimiters: ['${', '}'],
    el:'#app-maile-new',
    data:{
        isCollapse: false,
        dialogFormVisible:false,
        mailUsers: [],
        form:{
            name:'',
            title:''
        },
        fileList:[],
        formLabelWidth: '120px',
        mailReceiverValue: [],
        mailReceiver:[]
    },
    methods:{
        init:function(){
            this.initEditor(300, 450);
            this.get_mail_users();
            this.getMailReceivers();
        },
        mailUserSelectionChange(options) {
            this.multipleSelection = options;
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
        },
        get_mail_users:function(){
            this.$http.get('/api/mail/user/list?offset=1&num=100').then(res=>{
                if(res.body.code && res.body.ok){
                    this.mailUserTotal = res.body.data.count;
                    let mail_user = res.body.data.list;
                    mail_user.forEach(item=>{
                        item.group = item.group.name;
                    });
                    this.mailUsers = mail_user;
                }
            });
        },
        getMailReceivers:function(){
            this.$http.get('/api/mail/user/list?offset=1&num=100').then(res=>{
                if(res.body.code && res.body.ok){
                    this.mailUserTotal = res.body.data.count;
                    let mail_receiver = res.body.data.list;
                    let tmp = [];
                    mail_receiver.forEach(item=>{
                        tmp.push({key:item.name,label:item.name});
                    });
                    this.mailReceiver = tmp;
                }
            });
        },
        renderFunc: function() {
            let tmp = '';
            for(var i=0;i<this.mailUsers.length;i++){
                tmp += '<span>'+this.mailUsers.name+' - '+this.mailUsers.name+'</span>';
            }
            return tmp;
        },
        handlePreview:function(){},
        handleRemove:function(){},
        onSubmit:function(){},
        addContacts:function(){
            this.dialogFormVisible = true;
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
        mailReceiverConfirm:function(){
            this.dialogFormVisible = false;
            this.form.name = this.mailReceiverValue.join();
        },
        alertInfo(msg) {
            this.$message(msg);
        },
        alertSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },

        alertWarning(msg) {
            this.$message({
                message: msg,
                type: 'warning'
            });
        },

        alertError(msg) {
            this.$message.error(msg);
        }
    }
});
VM.init();
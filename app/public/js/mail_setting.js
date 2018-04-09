const VM = new Vue({
    delimiters: ['${', '}'],
    el:'#app-mail-setting',
    data:{
        isCollapse: false,
        mailUsers: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogAddGroupVisible:false,
        multipleSelection:[],
        mailUserForm: {
            name: '',
            email: '',
            phone: '',
            group: '',
            mark: ''
        },
        mailUserTotal:0,
        mailGroupForm:{
            _id:'',
            name:''
        },
        mailGroupSelect:[],
        formLabelWidth: '120px'
    },
    methods:{
        init:function(){
            this.get_mail_group();
            this.get_mail_users();
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
        get_mail_users:function(){
            this.$http.get('/api/mail/user/list?offset=1&num=20').then(res=>{
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
        currentChange:function(current){
            this.$http.get('/api/mail/user/list?offset='+current+'&num=20').then(res=>{
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
        add_mail_user_form_but:function(){
            if(!this.mailUserForm.name){
                this.alertError('用户名必填');
                return false;
            }
            if(!this.mailUserForm.email){
                this.alertError('邮箱地址必填');
                return false;
            }
            if(!this.mailUserForm.phone){
                this.alertError('用户手机号必填');
                return false;
            }
            this.mailUserForm.group = this.mailGroupSelect._id;
            this.$http.post('/api/mail/user/add',{mail_user:this.mailUserForm}).then(res=>{
                console.log(res);
                if(res.body.code && res.body.ok){
                    let data = res.body.data;
                    data.group = data.group.name;
                    this.mailUsers.push(data);
                    this.alertSuccess('用户添加成功');
                }
            });
            console.log(this.mailUserForm);
        },
        showAddGroupDialog:function(){
            this.dialogAddGroupVisible = true;
        },
        get_mail_group:function(){
            this.$http.get('/api/mail/group/list').then(res=>{
                if(res.body.code && res.body.ok){
                    this.mailGroupSelect = res.body.data[0];
                    this.mailGroupForm = res.body.data;
                }
            });
        },
        add_mail_group_form_but:function(){
            this.$http.post('/api/mail/group/add',{name:this.mailGroupForm.name}).then(res=>{
                if(res.body.code && res.body.ok){
                    this.mailGroupForm.push(res.body.data);
                    this.dialogAddGroupVisible = false;
                }
            });
        },
        select_mail_group:function(id){
            this.$http.get('/api/mail/group/get?id='+id).then(res=>{
                if(res.body.code && res.body.ok){
                    this.mailGroupSelect = res.body.data;
                }
            });
        },
        moveToGroup:function(id){
            if(this.multipleSelection.length){
                this.multipleSelection.forEach(item=>{
                    this.$http.get('/api/mail/move_user_to_group?user_id='+item._id+'&id='+id).then(res=>{
                        if(res.body.code && res.body.ok){
                            this.alertSuccess('移动成功');
                        }else{
                            this.alertSuccess('移动失败')
                        }
                        this.get_mail_users();
                    });
                });
            }else{
                this.alertError('请选择要移动到组的用户');
            }
        },
        deleteMailUserbut:function(){
            if(this.multipleSelection.length){
                this.multipleSelection.forEach(item=>{
                    this.$http.get('/api/mail/user/delete?user_id='+item._id).then(res=>{
                        if(res.body.code && res.body.ok){
                            this.alertSuccess('删除成功');
                        }else{
                            this.alertSuccess('删除失败')
                        }
                        this.get_mail_users();
                    });
                });
            }else{
                this.alertError('请选择要删除的用户');
            }
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
'use strict';

var VM = new Vue({
    delimiters: ['${', '}'],
    el: '#app-mail-setting',
    data: {
        isCollapse: false,
        mailUsers: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogAddGroupVisible: false,
        multipleSelection: [],
        mailUserForm: {
            name: '',
            email: '',
            phone: '',
            group: '',
            mark: ''
        },
        mailUserTotal: 0,
        mailGroupForm: {
            _id: '',
            name: ''
        },
        mailGroupSelect: [],
        formLabelWidth: '120px'
    },
    methods: {
        init: function init() {
            this.get_mail_group();
            this.get_mail_users();
        },
        mailUserSelectionChange: function mailUserSelectionChange(options) {
            this.multipleSelection = options;
        },
        handleOpen: function handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose: function handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        get_mail_users: function get_mail_users() {
            var _this = this;

            this.$http.get('/api/mail/user/list?offset=1&num=20').then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this.mailUserTotal = res.body.data.count;
                    var mail_user = res.body.data.list;
                    mail_user.forEach(function (item) {
                        item.group = item.group.name;
                    });
                    _this.mailUsers = mail_user;
                }
            });
        },
        currentChange: function currentChange(current) {
            var _this2 = this;

            this.$http.get('/api/mail/user/list?offset=' + current + '&num=20').then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this2.mailUserTotal = res.body.data.count;
                    var mail_user = res.body.data.list;
                    mail_user.forEach(function (item) {
                        item.group = item.group.name;
                    });
                    _this2.mailUsers = mail_user;
                }
            });
        },
        add_mail_user_form_but: function add_mail_user_form_but() {
            var _this3 = this;

            if (!this.mailUserForm.name) {
                this.alertError('用户名必填');
                return false;
            }
            if (!this.mailUserForm.email) {
                this.alertError('邮箱地址必填');
                return false;
            }
            if (!this.mailUserForm.phone) {
                this.alertError('用户手机号必填');
                return false;
            }
            this.mailUserForm.group = this.mailGroupSelect._id;
            this.$http.post('/api/mail/user/add', { mail_user: this.mailUserForm }).then(function (res) {
                console.log(res);
                if (res.body.code && res.body.ok) {
                    var data = res.body.data;
                    data.group = data.group.name;
                    _this3.mailUsers.push(data);
                    _this3.alertSuccess('用户添加成功');
                }
            });
            console.log(this.mailUserForm);
        },
        showAddGroupDialog: function showAddGroupDialog() {
            this.dialogAddGroupVisible = true;
        },
        get_mail_group: function get_mail_group() {
            var _this4 = this;

            this.$http.get('/api/mail/group/list').then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this4.mailGroupSelect = res.body.data[0];
                    _this4.mailGroupForm = res.body.data;
                }
            });
        },
        add_mail_group_form_but: function add_mail_group_form_but() {
            var _this5 = this;

            this.$http.post('/api/mail/group/add', { name: this.mailGroupForm.name }).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this5.mailGroupForm.push(res.body.data);
                    _this5.dialogAddGroupVisible = false;
                }
            });
        },
        select_mail_group: function select_mail_group(id) {
            var _this6 = this;

            this.$http.get('/api/mail/group/get?id=' + id).then(function (res) {
                if (res.body.code && res.body.ok) {
                    _this6.mailGroupSelect = res.body.data;
                }
            });
        },
        moveToGroup: function moveToGroup(id) {
            var _this7 = this;

            if (this.multipleSelection.length) {
                this.multipleSelection.forEach(function (item) {
                    _this7.$http.get('/api/mail/move_user_to_group?user_id=' + item._id + '&id=' + id).then(function (res) {
                        if (res.body.code && res.body.ok) {
                            _this7.alertSuccess('移动成功');
                        } else {
                            _this7.alertSuccess('移动失败');
                        }
                        _this7.get_mail_users();
                    });
                });
            } else {
                this.alertError('请选择要移动到组的用户');
            }
        },
        deleteMailUserbut: function deleteMailUserbut() {
            var _this8 = this;

            if (this.multipleSelection.length) {
                this.multipleSelection.forEach(function (item) {
                    _this8.$http.get('/api/mail/user/delete?user_id=' + item._id).then(function (res) {
                        if (res.body.code && res.body.ok) {
                            _this8.alertSuccess('删除成功');
                        } else {
                            _this8.alertSuccess('删除失败');
                        }
                        _this8.get_mail_users();
                    });
                });
            } else {
                this.alertError('请选择要删除的用户');
            }
        },
        alertInfo: function alertInfo(msg) {
            this.$message(msg);
        },
        alertSuccess: function alertSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        alertWarning: function alertWarning(msg) {
            this.$message({
                message: msg,
                type: 'warning'
            });
        },
        alertError: function alertError(msg) {
            this.$message.error(msg);
        }
    }
});
VM.init();
//# sourceMappingURL=mail_setting.js.map
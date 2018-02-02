const VM = new Vue({
    delimiters: ['${', '}'],
    el: '#blog-account-app',
    data: {
        account:'用户中心',
        accountSymbol:'&#xe68f;',
        accountBox:'none'
    },
    methods: {
        showAccountBox:function(){
            if (this.accountBox == 'none') {
                this.accountBox = 'block';
                this.accountSymbol = '&#xe68d';
            }else{
                this.accountBox = 'none';
                this.accountSymbol = '&#xe68f;'
            }
        }
    }
});
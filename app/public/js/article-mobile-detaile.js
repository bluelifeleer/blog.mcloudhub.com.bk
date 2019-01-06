const vm = new Vue({
	delimiters: ['${', '}'],
    el: '#app',
    data: {
        article:{
            start: 0,
			author: {
				avatar: '',
				article: '',
				name: '',
				href: ''
			},
			issue_contents: [],
			page: {
				total: 0,
				offset: 0,
				num: 0
			}
        }
    },
    methods:{
        init: function(){
            this.getArticle();
        },
        getArticle: function(){
            let id = this.getQueryString('id');
            this.$http.get('/api/getArticle?id=' + id).then(article => {
                if (article.body.code && article.body.ok) {
                    let articleArr = article.body.data.article;
                    articleArr.author.href = '/account?uid=' + articleArr.author._id;
                    articleArr.issue_contents.forEach(item => {
                        if (item.last_update_date) {
                            item.last_update_date = this.formate_date(item.last_update_date);
                        }
                        item.add_date = this.formate_date(item.add_date);
                        item.author.href = '/account?uid=' + item.author._id;
                    })
                    articleArr.issue_contents = articleArr.issue_contents.reverse();
                    articleArr['wordNumbers'] = articleArr.contents.replace(/<[^>]*>/g, "").length;
                    this.article = articleArr;
                }
            });
        },
        getQueryString: function(name) {
			let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			let r = window.location.search.substr(1).match(reg);
			return r != null ? unescape(r[2]) : null;
		},
    },
    mounted(){
        this.init();
    }
});
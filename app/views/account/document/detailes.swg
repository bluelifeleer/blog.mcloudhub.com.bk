{% extends '../../common/headers.swg' %} {% block content %}
<link rel="stylesheet" href="/public/css/collection_lists.css">
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/collection_dewtailes.css" />
    <div class="collections-detailes-body-block">
        <div class="collections-detailes-layout-left">
            <div class="collections-detailes-headers-block">
                <div class="collections-icon-box"><img src="/public/images/avatar-notebook-default-640f7dde88592bdf6417d8ce1902636e.png" alt=""></div>
                <div class="collections-title-box">
                    <p class="collections-title">${doc.name}</p>
                    <p class="collections-info">收录了<span>0</span>篇文章 · <span>0</span>人关注</p>
                </div>
            </div>
            <div class="collections-detailes-contents-block">
                <div class="collections-switch-buts-box">
                    <a href="javascript:void(0);" class="collections-switch-buts" data-type="discuss" v-on:click="switchButs($event,'discuss')" v-on:mouseover="switchButOver('discuss')" v-bind:is-now="switchButSelected" ref="switchButsDiscuss"><i class="icon iconfont">&#xe626;</i>&nbsp;最新发布</a>
                    <a href="javascript:void(0);" class="collections-switch-buts" data-type="new" v-on:click="switchButs($event,'new')" v-on:mouseover="switchButOver('new')" v-bind:is-now="switchButSelected" ref="switchButsNew"><i class="icon iconfont">&#xe607;</i>&nbsp;最新收录</a>
                    <a href="javascript:void(0);" class="collections-switch-buts" data-type="hot" v-on:click="switchButs($event,'hot')" v-on:mouseover="switchButOver('hot')" v-bind:is-now="switchButSelected" ref="switchButsHot"><i class="icon iconfont">&#xe604;</i>&nbsp;目录</a>
                    <span class="switch-flag-box" v-bind:style="{display:swtichFlagShow,left:swtichFlagLeft}"></span>
                </div>
                <div class="collections-switch-list-group-box">
                    <div class="collections-switch-list-box" ref="switchContentsDiscuss">
                        暂无文章
                    </div>
                    <div class="collections-switch-list-box" ref="switchContentsNew">
                        <div class="article-list-box" v-for="(article,$index) in doc.article" v-bind:class="{'has-img':article.hasImg}">
                        <div class="article-list" v-if="article.hasImg">
                            <a v-bind:href="article.href">
                                <div class="article-list-img-box" v-html="article.imgHtml"></div>
                            </a>
                            <div class="article-list-describe-box">
                                <a v-bind:href="article.href">
                                    <div class="article-list-describe-author"><span class="article-tags">${article.document.name}</span><span class="article-author">@${article.author.name}</span><span class="article-date">${article.add_date}</span></div>
                                    <h2 class="article-list-describe-title">${article.title}</h2>
                                    <p class="article-list-describe-text">${article.contents}</p>
                                </a>
                                <p class="ctr-buts-block">
                                    <a href="javascript:void(0);" class="share-but-box"><i class="icon iconfont">&#xe61f;</i></a>
                                    <a href="javascript:void(0);" class="liked-but-box"><i class="icon iconfont">&#xe630;</i></a>
                                    <a href="javascript:void(0);" class="collection-but-box"><i class="icon iconfont">&#xe605;</i></a>
                                </p>
                            </div>
                            <div class="clear-both"></div>
                        </div>
                        <div class="article-list" v-else>
                            <a target="_blank" v-bind:href="article.href">
                                <div class="article-title"><span href="javascript:void(0);">${article.title}</span></div>
                                <div class="article-author"><span class="article-tags">${article.doc_name}</span><span class="article-author">@${article.author}</span><span class="article-date">${article.add_date}</span></div>
                                <div class="article-contents">${article.contents}</div>
                            </a>
                            <p class="ctr-buts-block">
                                <a href="javascript:void(0);" class="share-but-box"><i class="icon iconfont">&#xe61f;</i></a>
                                <a href="javascript:void(0);" class="liked-but-box"><i class="icon iconfont">&#xe630;</i></a>
                                <a href="javascript:void(0);" class="collection-but-box"><i class="icon iconfont">&#xe605;</i></a>
                            </p>
                        </div>
                        </div>
                    </div>
                    <div class="collections-switch-list-box" ref="switchContentsHot">暂无文章</div>
                </div>
            </div>
        </div>
        <div class="collections-detailes-layout-right">
            <div class="collections-detailes-models">
                <div class="collections-detailes-models-header">文集作者</div>
                <div class="collections-detailes-models-contents">
                <a class="doc-author-link-label" v-bind:href="doc.author.href">
                    <span class="doc-author-icon-box"><img v-bind:src="doc.author.avatar" alt=""></span>
                    <span class="doc-author-name-box">${doc.author.name}</span>
                </a>
                </div>
            </div>
        </div>
    </div>
</section>
{% endblock %}

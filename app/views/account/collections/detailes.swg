{% extends '../../common/headers.swg' %} {% block content %}
<link rel="stylesheet" href="/public/css/collection_lists.css">
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/collection_dewtailes.css" />
    <div class="collections-detailes-body-block">
        <div class="collections-detailes-layout-left">
            <div class="collections-detailes-headers-block">
                <div class="collections-icon-box"><img v-bind:src="collection.icon" alt=""></div>
                <div class="collections-title-box">
                    <p class="collections-title">${collection.name}</p>
                    <p class="collections-info">收录了<span>${collection.include}</span>篇文章 · <span>${collection.follow}</span>人关注</p>
                </div>
                <div class="collections-fn-box">
                    <a href="javascript:void(0);" class="collections-push-but" @click="collectionPush">投稿</a>
                    <a href="javascript:void(0);" class="collections-follw-but" v-if="collection.issubscribe" v-bind:class="{'collections-follwed':collSubscribe}"><i class="icon iconfont">&#xe699;</i>&nbsp;已关注</a>
                    <a href="javascript:void(0);" class="collections-follw-but" v-else v-on:click="followButs($event,collection._id)"><i class="icon iconfont">&#xe628;</i>&nbsp;关注</a>
                </div>
            </div>
            <div class="collections-detailes-contents-block">
                <div class="collections-switch-buts-box">
                    <a href="javascript:void(0);" class="collections-switch-buts" data-type="discuss" v-on:click="switchButs($event,'discuss')" v-on:mouseover="switchButOver('discuss')" v-bind:is-now="switchButSelected" ref="switchButsDiscuss"><i class="icon iconfont">&#xe626;</i>&nbsp;最新评论</a>
                    <a href="javascript:void(0);" class="collections-switch-buts" data-type="new" v-on:click="switchButs($event,'new')" v-on:mouseover="switchButOver('new')" v-bind:is-now="switchButSelected" ref="switchButsNew"><i class="icon iconfont">&#xe607;</i>&nbsp;最新收录</a>
                    <a href="javascript:void(0);" class="collections-switch-buts" data-type="hot" v-on:click="switchButs($event,'hot')" v-on:mouseover="switchButOver('hot')" v-bind:is-now="switchButSelected" ref="switchButsHot"><i class="icon iconfont">&#xe634;</i>&nbsp;热门</a>
                    <span class="switch-flag-box" v-bind:style="{display:swtichFlagShow,left:swtichFlagLeft}"></span>
                </div>
                <div class="collections-switch-list-group-box">
                    <div class="collections-switch-list-box" ref="switchContentsDiscuss">
                        暂无文章
                    </div>
                    <div class="collections-switch-list-box" ref="switchContentsNew">
                        <div class="article-list-box" v-for="(article,$index) in collection.article" v-bind:class="{'has-img':article.hasImg}">
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
                                    <div class="article-author"><span class="article-tags">${article.document.name}</span><span class="article-author">@${article.author.name}</span><span class="article-date">${article.add_date}</span></div>
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
                <div class="collections-detailes-models-header">专题公告</div>
                <div class="collections-detailes-models-contents" v-html="collection.describe"></div>
            </div>
            <div class="collections-detailes-models" style="border:none;margin:10px 0 0 0;" v-if="collection.user_id == uid">
                <a v-bind:href="collection.href" class="edit-collections-buts">修改专题</a> ·
                <a href="javascript:void(0);" class="delete-collections-buts" v-on:click="deleteCollection($event,collection._id)">删除专题</a>
            </div>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
            <div class="collection-push-popup-contents-header">
                <div class="collection-push-popup-tip">
                    <span class="collection-push-popup-notice">给该专题投稿</span>
                    <a href="https://blog.mcloudhub.com/editor" class="collection-push-popup-new">写篇新文章</a>
                </div>
                <div class="collection-push-popup-search-box">
                    <input type="text" name="collection-push-popup-search-input" id="collection-push-popup-search-input" value="" placeholder="搜索我的文章" v-model="collection.searchKeyWord" />
                    <a href="javascript:void(0);" class="collection-push-popup-search-buts" v-on:click="collectionSearchArticle($event)"><i class="icon iconfont">&#xe71e;</i></a>
                </div>
            </div>
            <div class="collection-push-popup-contents-body">
                <ul class="collection-push-popup-article-list-group">
                    <li class="collection-push-popup-article-list-box" v-for="(article,$index) in articleLists" v-bind:data-id="article._id">
                        <span class="collection-push-popup-article-name"><a target="_blank" v-bind:href="article.href">${article.title}</a></span>
                        <a href="javascript:void(0);" class="collections-push-action-but" v-on:click="pushActionBut($event,article._id,collection._id)">投稿</a>
                    </li>
                </ul>
            </div>
            <div class="collection-push-popup-contents-footer"></div>
        </el-dialog>
    </div>
</section>
{% endblock %}

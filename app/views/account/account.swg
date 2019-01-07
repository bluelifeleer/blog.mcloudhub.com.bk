{% extends '../common/headers.swg' %} {% block content %}
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/account.css" />
    <div class="account-block">
        <div class="account-layout-left">
            <div class="account-header-block">
                <div class="account-icon-box"><img v-bind:src="users.avatar" alt=""></div>
                <div class="account-info-box">
                    <p class="account-name-box">${users.name}</p>
                    <p class="account-fn-box">
                        <span class="account-info-labels account-info-follw-box"><element>0</element><br/>关注</span>
                        <span class="account-info-labels account-info-article-box"><element>${users.article_num}</element><br/>文章</span>
                        <span class="account-info-labels account-info-keyword-nums-box"><element>0</element><br/>字数</span>
                        <span class="account-info-labels account-info-likes-box"><element>0</element><br/>喜欢</span>
                    </p>
                </div>
            </div>
            <div class="account-content-block">
                <ul class="account-content-switch-buts-box">
                    <li><a href="javascript:void(0);" @click="accountContentToggle(0)"><i class="icon iconfont">&#xe607;</i>&nbsp;文章</a></li>
                    <li><a href="javascript:void(0);" @click="accountContentToggle(1)"><i class="icon iconfont">&#xe618;</i>&nbsp;动态</a></li>
                    <li><a href="javascript:void(0);" @click="accountContentToggle(2)"><i class="icon iconfont">&#xe626;</i>&nbsp;最新评论</a></li>
                    <li><a href="javascript:void(0);" @click="accountContentToggle(3)"><i class="icon iconfont">&#xe634;</i>&nbsp;热门</a></li>
                    <span class="account-content-switch-buts-flag" ref="accountContentFlg"></span>
                </ul>
                <div class="account-content-switch-contents-box">
                    <div class="account-article-box" ref="article">
                        <div class="article-list-groups">
                            <div class="article-list-box" v-for="(article,$index) in articles.list" v-bind:class="{'has-img':article.hasImg}" :key="$index">
                                <div class="article-list" v-if="article.hasImg" :data-id="article._id">
                                    <a target="_blank" v-bind:href="article.href" :data-id="article._id">
                                        <div class="article-list-img-box" v-html="article.imgHtml"></div>
                                        <div class="article-list-describe-box">
                                            <div class="article-list-describe-author"><span class="article-tags">${article.document.name}</span><span class="article-author">@${article.author.name}</span><span class="article-date">${article.add_date}</span></div>
                                            <h2 class="article-list-describe-title">${article.title}</h2>
                                            <p class="article-list-describe-text">${article.contents}</p>
                                    </a>
                                    <p class="ctr-buts-block">
                                        <a href="javascript:void(0);" :data-id="article._id" class="share-but-box" @click="shart($event, article._id)"><i class="icon iconfont">&#xe61f;</i></a>
                                        <a href="javascript:void(0);" :data-id="article._id" class="liked-but-box" @click="linked($event, article._id)"><i class="icon iconfont">&#xe630;</i></a>
                                        <a href="javascript:void(0);" :data-id="article._id" class="collection-but-box" @click="stars($event, article._id)"><i class="icon iconfont">&#xe605;</i></a>
                                    </p>
                                    </div>
                                    <div class="clear-both"></div>
                                </div>
                                <div class="article-list" v-else :data-id="article._id">
                                    <a target="_blank" v-bind:href="article.href" :data-id="article._id">
                                        <div class="article-title"><span href="javascript:void(0);">${article.title}</span></div>
                                        <div class="article-author"><span class="article-tags">${article.document.name}</span><span class="article-author">@${article.author.name}</span><span class="article-date">${article.add_date}</span></div>
                                        <div class="article-contents">${article.contents}</div>
                                    </a>
                                    <p class="ctr-buts-block">
                                        <a href="javascript:void(0);" :data-id="article._id" class="share-but-box" @click="shart($event, article._id)"><i class="icon iconfont">&#xe61f;</i></a>
                                        <a href="javascript:void(0);" :data-id="article._id" class="liked-but-box" @click="linked($event, article._id)"><i class="icon iconfont">&#xe630;</i></a>
                                        <a href="javascript:void(0);" :data-id="article._id" class="collection-but-box" @click="stars($event, article._id)"><i class="icon iconfont">&#xe605;</i></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="loader-more"><a href="javascript:void(0);" class="load-more-but" :data-num="articles.num" :data-total="articles.count" :data-size="articles.size" :data-offset="articles.offset" @click="loadMoreArticle">加载更多</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="account-layout-right">
            <div class="account-model-block">
                <div class="account-model-title-box">
                    <p class="account-model-tip">个人介绍</p>
                    <a href="javascript:void(0);" v-if="isSigin" class="edit-introduce" v-on:click="accountIntroduceEditBut($event)"><i class="icon iconfont">&#xe621;</i>&nbsp;编辑</a>
                </div>
                <div class="account-model-introduce-edit-form-box" v-bind:style="{display:showAccountIntroduceEditForm}">
                    <form v-on:submit.prevent="accountIntroduceFromSaveBut($event)">
                        <p class="account-introduce-texarea-box"><textarea name="account-introduce-edit" id="account-introduce-edit" cols="30" rows="10" v-model="users.introduce"></textarea></p>
                        <p class="account-introduce-buts-box">
                            <input type="submit" id="account-introduce-from-save-but" value="保存">
                            <a href="javascript:void(0);" id="account-introduce-from-reset-but" v-on:click="accountIntroduceFromResetBut($event)">取消</a>
                        </p>
                    </form>
                </div>
                <div class="account-model-introduce-box" v-bind:style="{display:showAccountIntroduceText}">
                    <p>${users.introduce}</p>
                </div>
            </div>
            <div class="account-model-block">
                <div class="account-follow-collections"><a href="javascript:void(0);" class=""><i class="icon iconfont">&#xe603;</i>&nbsp;我关注的专题/文集/连载</a></div>
                <div class="account-likes-articles"><a href="javascript:void(0);" class=""><i class="icon iconfont">&#xe65c;</i>&nbsp;我喜欢的文章</a></div>
            </div>
            <div class="account-model-block">
                <div class="account-collections-tip-box">
                    <p class="account-collection-tip">我创建的专题</p>
                    <p class="new-collection-link-box">
                        <a href="/account/collections/new" v-if="isSigin && collectionLists.length" target="_blank" class="account-collection-new-link" v-if="collectionLists.length"><i class="icon iconfont">&#xe628;</i>创建一个新文集</a>
                    </p>
                </div>
                <ul class="account-collections-list-group-box" v-if="collectionLists.length">
                    <li class="account-collections-list-box" v-for="(collection,$index) in collectionLists">
                        <a v-bind:href="collection.href"><span class="account-collections-icon"><img v-bind:src="collection.icon" alt=""></span><span class="account-collections-name">${collection.name}</span></a>
                    </li>
                    <li class="account-collections-list-box"><a href="/account/collections/lists">查看更多<i class="icon iconfont">&#xe656;</i></a></li>
                </ul>
                <div class="new-collection-block" v-else><a v-if="isSigin" href="/account/collections/new" target="_blank"><i class="icon iconfont">&#xe628;</i>创建一个新专题</a></div>
            </div>
            <div class="account-model-block">
                <div class="account-document-tip">我创建的文集</div>
                <ul class="account-document-list-group-box" v-if="documentLists">
                    <li class="account-document-list-box" v-for="(document,$index) in documentLists" v-bind:data-id="document._id"><a v-bind:href="document.href"><i class="icon iconfont iconfont-style">&#xe625;</i>&nbsp;&nbsp;&nbsp;&nbsp;${document.name}</a></li>
                </ul>
                <div class="new-document-block" v-else><a href="/editor" target="_blank"><i class="icon iconfont">&#xe628;</i>创建一个新文集</a></div>
            </div>
        </div>
    </div>
</section>
{% endblock %}

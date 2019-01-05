{% extends './common/headers.swg' %} {% block content %}
<section class="contents-bar">
    <template>
        <el-carousel :interval="5000" arrow="always" height="380px" v-if="slide_list.length">
            <el-carousel-item v-for="item in slide_list" :key="item" v-if="item.url">
                <a :href="item.link" target="_blank" class="">
                    <div class="slide-img-block"><img v-bind:src="item.url" alt="" class="slide-img-block"></div>
                    <div class="slide-text-box">
                        <div class="slide-title-block">${item.title}</div>
                        <div class="slide-text-block">${item.remark}</div>
                    </div>
                </a>
            </el-carousel-item>
        </el-carousel>
    </template>
    <!-- <div id="say-something-block">
        <h5 class="say-something-title">说些什么吧：</h5>
        <div class="something-contents-block"><textarea name="" id="" cols="30" rows="10" class="something-textarea"></textarea></div>
        <div class="something-ctr-block">
            <a href="" class="add-something-price-but"><i class="icon iconfont something-iconfont">&#xe67b;</i></a>
            <a href="" class="add-something-attr-but"><i class="icon iconfont something-iconfont">&#xe6a7;</i></a>
            <a href="" class="add-something-send-but">发表</a>
        </div>
    </div> -->
    <div id="body-content">
        <!--jumbotron-->
        <div class="body-layout-l">
            <div class="collections-group-block">
                <a v-bind:href="collection.href" v-bind:title="collection.name" class="collections-list-box" v-for="(collection,$index) in collectionLists"><span class="collection-icon-box"><img
                            v-bind:src="collection.icon" alt=""></span><span class="collection-name-box">${collection.name}</span></a>
                <a href="https://blog.mcloudhub.com/account/collections/lists" class="more-collections">更多热门专题&nbsp;<i class="icon iconfont">&#xe6c4;</i></a>
            </div>
            <div class="article-list-groups" ref="articleListGroups">
                <div class="article-list-box" v-for="(article,$index) in articleLists" v-bind:class="{'has-img':article.hasImg}" v-if="article.permissions == 1" :key="$index">
                    <div class="article-list" v-if="article.hasImg" :data-id="article._id">
                        <a v-bind:href="article.href" :data-id="article._id">
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
                        <a v-bind:href="article.href" :data-id="article._id">
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
        </div>
        <div class="body-layout-r">
            <div class="model-box" v-if="isSigin">
                <div class="model-tag-name">用户信息</div>
                <div class="model-contents-box">
                    <div class="index-user-avatar-img-box"><img src="" v-bind:src="users.avatar"></div>
                    <div class="index-user-name-box">
                        用户名：<span v-bind:title="users.fullname">${users.name}</span>
                    </div>
                    <div class="index-user-nick-box">昵称：<span>${users.nick}</span></div>
                    <div class="insex-user-introduce-box">简介：<span>${users.introduce}</span></div>
                    <div class="index-user-website-box"><span>个人网站：<a v-bind:href="users.website">${users.website}</a></span></div>
                </div>
            </div>
            <div class="model-box" v-else>
                <div class="model-tag-name">登录</div>
                <div class="model-contents-box">
                    <form v-on:submit.prevent="submitForm($event,'signin')">
                        <fieldset>
                            <div class="form-group">
                                <label for="exampleInputEmail1">用户名/邮箱/手机号：</label>
                                <input type="text" v-model="users.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="用户名/邮箱/手机号">
                                <!--<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>-->
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">密码：</label>
                                <input type="password" v-model="users.password" class="form-control" id="exampleInputPassword1" placeholder="密码">
                            </div>
                            <fieldset class="form-group">
                                <div class="form-check">
                                    <label class="form-check-label">
                                            <input class="form-check-input" type="checkbox" value="" checked="" v-model="remember" />
                                            记住密码
                                        </label>
                                </div>
                            </fieldset>
                            <button type="submit" class="btn btn-primary btn-lg btn-block btn-success">登录</button>
                        </fieldset>
                    </form>
                    <div class="quick-account">
                        <p class="quick-account-tip">快速登录：</p>
                        <p class="quick-account-buts-box">
                            <!-- <a href="javascript:void(0);" class="quick-account-buts qq" v-on:click="thirdPartyLogin($event,'qq')"><i class="icon iconfont iconfont-set">&#xe60f;</i></a>
                                <a href="javascript:void(0);" class="quick-account-buts wechat" v-on:click="thirdPartyLogin($event,'wechat')"><i class="icon iconfont iconfont-set">&#xe640;</i></a>
                                <a href="javascript:void(0);" class="quick-account-buts sina" v-on:click="thirdPartyLogin($event,'sina')"><i class="icon iconfont iconfont-set">&#xe6b8;</i></a> -->
                            <a href="javascript:void(0);" class="quick-account-buts github" v-on:click="thirdPartyLogin($event,'github')"><i class="icon iconfont iconfont-set">&#xe691;</i></a>
                        </p>
                        <span class="quick-login-link-box" ref="loginLinkBox"></span>
                    </div>
                </div>
            </div>
            <div class="model-box">
                <div class="model-tag-name">热门标签</div>
                <div class="model-contents-box">
                    <a v-bind:href="doc.href" class="tages-box" v-for="doc in docs_list" v-bind:data-id="doc._id">
                            ${doc.name}
                        </a>
                </div>
            </div>
            <div class="model-box">
                <div class="model-tag-name">moment</div>
                <div class="model-contents-box">
                    <ul class="moment-list-box">
                        <li><a href="#">生命很脆弱，失去了就回不来了。留下生命，就是对生命最大的尊重。</a></li>
                        <li><a href="#">世界太荒芜了，需要种一些情话。</a></li>
                        <li><a href="#">作为工匠，我更愿意把我有限的生命用在作品上，而不是对工具的无止境的学习上。</a></li>
                        <li><a href="#">我把最深沉的秘密放在那里。</a></li>
                        <li><a href="#">你不懂我，我不怪你。</a></li>
                        <li><a href="#">每个人都有一道伤口， 或深或浅，盖上布，以为不存在。</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
{% endblock %}

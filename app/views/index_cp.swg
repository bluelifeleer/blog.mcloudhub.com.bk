<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>MyBlog</title>
    <link rel="stylesheet" href="https://bootswatch.com/4/simplex/bootstrap.min.css">
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/css/main.css" />
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
</head>

<body>
    <div id="app">
        <header class="header-bar">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">MyBlog</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor03">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link nav-a-but" href="#">首页<span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item nav-a-but">
                            <a class="nav-link" href="#">文章列表</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">相册</a>
                        </li>
                        <!--<li class="nav-item">-->
                        <!--<a class="nav-link" href="#">About</a>-->
                        <!--</li>-->
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search">
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                <a href="/editor" class="badge badge-primary write-article-but"><i class="icon iconfont">&#xe63e;</i>写文章</a>
                <div class="account-center-block">
                    <span class="account-avatar-block"><img src="/public/images/f15.jpg" alt="" class="account-avatar-img"></span>
                    <span class="account-username">bluelife</span>
                    <a href="javascript:void(0);" class="account-contr-buts" v-on:click="showAccountBox"><i class="icon iconfont" v-html="accountSymbol"></i></a>
                    <div class="account-options-box" v-bind:style="{display:accountBox}">
                        <a href="/account" class="account-setting-but"><i class="icon iconfont">&#xe614;</i>我的主页</a>
                        <a href="/bookmarks" class="account-setting-but"><i class="icon iconfont">&#xe6a8;</i>我收藏的文章</a>
                        <a href="/liked" class="account-setting-but"><i class="icon iconfont">&#xe641;</i>我喜欢的文章</a>
                        <a href="/setting" class="account-setting-but"><i class="icon iconfont">&#xe632;</i>设置</a>
                        <a href="/help" class="account-setting-but"><i class="icon iconfont">&#xe60a;</i>问题与反馈</a>
                        <a href="/api/signout" class="account-signout-but"><i class="icon iconfont">&#xe633;</i>退出</a>
                    </div>
                </div>
            </nav>
        </header>
        <section class="contents-bar">
            <div class="slide-bar" v-on:mouseover="stopSlidePlay($event)" v-on:mouseout="autoSlidePlay($event)" v-bind:style="{cursor:slideAttr.cursor}">
                <ul class="slide-list-group" v-bind:style="{left:slideAttr.left+'px'}">
                    <li class="slide-lists" v-for="slide in slide_list">
                        <div class="slide-img-block"><img v-bind:src="slide.path" alt="" class="slide-img-block"></div>
                        <div class="slide-title-block">${slide.title}</div>
                        <div class="slide-text-block">${slide.describe}</div>
                    </li>
                </ul>
                <div class="buts-block-box">
                    <a href="javascript:void(0);" class="prev-but-block" v-on:click="switchSlide($event,'prev')"><i class="icon iconfont prev-incofont">&#xe639;</i></a>
                    <a href="javascript:void(0);" class="next-but-block" v-on:click="switchSlide($event,'next')"><i class="icon iconfont next-incofont">&#xe638;</i></a>
                </div>
            </div>
            <div id="body-content">
                <!--jumbotron-->
                <div class="body-layout-l">
                    <div class="article-list-groups">
                        <div class="article-list-box">
                            <div class="article-list-img-box"><img src="/public/images/f10.jpg" alt="" class="article-img"></div>
                            <div class="article-list-describe-box">
                                <div class="article-list-describe-author"><span class="article-tags"><a href="javascript:void(0);">article</a></span><span class="article-author"><a
                                        href="javascript:void(0);">@amazeUI</a></span><span class="article-date"><a href="javascript:void(0);">2015/10/9</a></span></div>
                                <h2 class="article-list-describe-title"><a href="javascript:void(0);">我本楚狂人，凤歌笑孔丘</a></h2>
                                <p class="article-list-describe-text">我们一直在坚持着，不是为了改变这个世界，而是希望不被这个世界所改变。</p>
                            </div>
                            <div class="clear-both"></div>
                        </div>
                        <div class="article-list-box">
                            <div class="article-list-img-box"><img src="/public/images/f10.jpg" alt="" class="article-img"></div>
                            <div class="article-list-describe-box">
                                <div class="article-list-describe-author"><span class="article-tags"><a href="javascript:void(0);">article</a></span><span class="article-author"><a
                                        href="javascript:void(0);">@amazeUI</a></span><span class="article-date"><a href="javascript:void(0);">2015/10/9</a></span></div>
                                <h2 class="article-list-describe-title"><a href="javascript:void(0);">我本楚狂人，凤歌笑孔丘</a></h2>
                                <p class="article-list-describe-text">我们一直在坚持着，不是为了改变这个世界，而是希望不被这个世界所改变。</p>
                            </div>
                            <div class="clear-both"></div>
                        </div>
                        <div class="article-list-box">
                            <div class="article-list-img-box"><img src="/public/images/f10.jpg" alt="" class="article-img"></div>
                            <div class="article-list-describe-box">
                                <div class="article-list-describe-author"><span class="article-tags"><a href="javascript:void(0);">article</a></span><span class="article-author"><a
                                        href="javascript:void(0);">@amazeUI</a></span><span class="article-date"><a href="javascript:void(0);">2015/10/9</a></span></div>
                                <h2 class="article-list-describe-title"><a href="javascript:void(0);">我本楚狂人，凤歌笑孔丘</a></h2>
                                <p class="article-list-describe-text">我们一直在坚持着，不是为了改变这个世界，而是希望不被这个世界所改变。</p>
                            </div>
                            <div class="clear-both"></div>
                        </div>
                        <div class="article-list-box">
                            <div class="article-list-img-box"><img src="/public/images/f10.jpg" alt="" class="article-img"></div>
                            <div class="article-list-describe-box">
                                <div class="article-list-describe-author"><span class="article-tags"><a href="javascript:void(0);">article</a></span><span class="article-author"><a
                                        href="javascript:void(0);">@amazeUI</a></span><span class="article-date"><a href="javascript:void(0);">2015/10/9</a></span></div>
                                <h2 class="article-list-describe-title"><a href="javascript:void(0);">我本楚狂人，凤歌笑孔丘</a></h2>
                                <p class="article-list-describe-text">我们一直在坚持着，不是为了改变这个世界，而是希望不被这个世界所改变。</p>
                            </div>
                            <div class="clear-both"></div>
                        </div>
                    </div>
                </div>
                <div class="body-layout-r">
                    <div class="model-box">
                        <div class="model-tag-name">登录</div>
                        <div class="model-contents-box">
                            <form v-on:submit.prevent="submitForm($event)">
                                <fieldset>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">用户名/邮箱/手机号：</label>
                                        <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="用户名/邮箱/手机号">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">密码：</label>
                                        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="密码">
                                        <input type="hidden" name="token" v-model="token" value="" />
                                    </div>
                                    <fieldset class="form-group">
                                        <div class="form-check">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="checkbox" value="" checked="">
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
                                    <a href="javascript:void(0);" class="quick-account-buts qq"><i class="icon iconfont iconfont-set">&#xe60f;</i></a>
                                    <a href="javascript:void(0);" class="quick-account-buts wechat"><i class="icon iconfont iconfont-set">&#xe640;</i></a>
                                    <a href="javascript:void(0);" class="quick-account-buts sina"><i class="icon iconfont iconfont-set">&#xe6b8;</i></a>
                                    <a href="javascript:void(0);" class="quick-account-buts github"><i class="icon iconfont iconfont-set">&#xe691;</i></a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="model-box">
                        <div class="model-tag-name">热门标签</div>
                        <div class="model-contents-box">
                            <a href="javascript:void(0);" class="tages-box" v-for="tag in tags_list" v-bind:data-id="tag._id">
                                ${tag.name}
                            </a>
                        </div>
                    </div>
                    <div class="model-box">
                        <div class="model-tag-name">moment</div>
                        <div class="model-contents-box">
                            <ul class="moment-list-box">
                                <li><a href="#">每个人都有一个死角， 自己走不出来，别人也闯不进去。</a></li>
                                <li><a href="#">我把最深沉的秘密放在那里。</a></li>
                                <li><a href="#">你不懂我，我不怪你。</a></li>
                                <li><a href="#">每个人都有一道伤口， 或深或浅，盖上布，以为不存在。</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer class="footer-bar"></footer>
    </div>
</body>
<script type="text/javascript" src="/public/js/main.js"></script>

</html>
 {% extends '../common/headers.swg' %} {% block content %}
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/article.css">
    <div class="article-details-block">
        <div class="article-details-title">
            ${article.title}
        </div>
        <div class="article-details-author">
            <div class="author-avatar-block">
                <img v-if="article.author.avatar" v-bind:src="article.author.avatar" alt="" class="article-author-avatar">
                <img v-else src="/public/images/avatar_default-78d4d1f68984cd6d4379508dd94b4210.png" alt="" class="article-author-avatar">
            </div>
            <div class="author-account-info-block">
                <div class="author-account-info-top">
                    <span class="article-authorn-name-box"><a v-bind:href="article.author.href" class="author-name">${article.author.name}</a></span>
                    <a href="javascript:void(0);" class="account-follow-buts" v-on:click="articlFollowAuthorBut($event,article.author._id)"><i class="icon iconfont">&#xe628;</i>关注</a>
                </div>
                <div class="author-account-info-bottom">
                    <span class="article-date"><element>${article.add_date}</element></span>
                    <span class="article-wordage">字数<element>${article.wordNumbers}</element></span>
                    <span class="article-view-count">阅读<element>${article.watch}</element></span>
                    <span class="article-comment-count">评论<element>${article.issue}</element></span>
                    <span class="article-likes-count">喜欢<element>${article.start}</element></span>
                    <span class="clear-both-box"></span>
                </div>
            </div>
        </div>
        <div class="article-detaile-content-body-box">
            <div class="article-details-contents" v-html="article.contents"></div>
            <div class="article-reward-but-box" v-if="article.author.rewardStatus">
                <div class="article-rewar-desc-box">${article.author.rewardDesc}</div>
                <div class="article-rewar-but-boc"><a href="javascript:void(0);" class="reward-buts" @click="dialogVisible = true">赞赏支持</a></div>
                <div class="article-rewar-authors-list-box"></div>
            </div>
        </div>
        <!--评论列表-->
        <div class="article-comments-block">
        <div class="send-comment-block" v-if="isSigin">
            <div class="comments-send-author-block">
                <div class="comment-author-avatar-box">
                    <a v-bind:href="users.accountHref" v-bind:title="users.name"><img v-bind:src="users.avatar" alt="" class="comment-avatar-img" title="bluelife"></a>
                </div>
                <div class="comment-textarea-block">
                    <textarea name="" id="" cols="30" rows="10" class="comment-contents-box" v-model="articleComments" v-on:focus="commentFocus($event)" v-on:blur="commentBlur($event)">填写您的评论</textarea>
                </div>
            </div>
            <div class="comment-buts-box">
                <a href="javascript:void(0);" class="comments-send-but" v-on:click="postCommentBut($event,article._id)">提交</a>
                <a href="javascript:void(0);" class="comments-clean-but" v-on:click="resetCommentBut($event)">取消</a>
                <span class="comment-permissions-buts-box">
                    <label>评论是否可见：</label>
                    <template>
                        <el-radio v-model="commentPermissions" label="1">可见</el-radio>
                        <el-radio v-model="commentPermissions" label="2">不可见</el-radio>
                    </template>
                </span>
            </div>
        </div>
        <div class="send-comment-block" v-else>
            <div class="comments-send-author-block">
                <div class="comment-author-avatar-box">
                    <a href="javascript:void(0);" class=""><img src="/public/images/avatar_default-78d4d1f68984cd6d4379508dd94b4210.png" alt="" class="comment-avatar-img" title="bluelife"></a>
                </div>
                <div class="comment-textarea-block" style="width:690px;height:180px;margin:0 0 0 20px;text-align:center;border:1px solid #c1c1c1;border-radius:3px;background:#f0f0f0;padding:8%">
                    <a href="/login" class="login-buts">登录</a><span>后发表评论</span>
                </div>
            </div>
        </div>
        <div class="comments-list-block" v-if="article.issue_contents.length">
            <div class="comments-list-box" v-for="(item,$index) in article.issue_contents" v-if="item.permissions==1">
                <div class="comments-author-block">
                    <div class="comments-author-avatar-box">
                        <a v-bind:href="item.author.href" title="" v-if="item.author.avatar"><img v-bind:src="item.author.avatar" alt="" class="comment-avatar-list-img" /></a>
                        <a title="" v-else><img src="/public/images/avatar_default-78d4d1f68984cd6d4379508dd94b4210.png" alt="" class="comment-avatar-list-img" /></a>
                    </div>
                    <div class="comments-author-info-block">
                        <div class="comment-author-name"><a v-bind:href="item.author.href" title="">${item.author.name}</a></div>
                        <div class="comment-author-athor">${item.add_date}</div>
                    </div>
                </div>
                <div class="comments-content-block">
                    <p>${item.contents}</p>
                </div>
            </div>
        </div>
        <div class="comments-list-block" v-else>
            <div class="comments-list-box">
                <div class="comments-content-block">
                    <p>暂无评论</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" width="40%" center>
        <div class="reward-aothue-dialog-box">
            <a class="reward-aothue-icon-box"><img v-bind:src="article.author.avatar" alt=""></a>
            <a class="reward-aothue-name-box">${article.author.name}</a>
            <i class="icon iconfont teng-iconfont">&#xe725;</i>
        </div>
        <div class="reward-amount-select-buts-dialog-box" ref="rewardAmountButs">
            <a href="javascript:void(0);" class="reward-amount-buts" :class="{'reward-amount-buts-default':rewardAmountButsActive}" @click="selectAmountButs($event,0,2)"><i class="icon iconfont">&#xe725;</i>&nbsp;<span class="reward-amounts">2</span>颗</a>
            <a href="javascript:void(0);" class="reward-amount-buts" :class="{'reward-amount-buts-default':!rewardAmountButsActive}" @click="selectAmountButs($event,1,5)" style="margin-left:19px;margin-right:19px;"><i class="icon iconfont">&#xe725;</i>&nbsp;<span class="reward-amounts">5</span>颗</a>
            <a href="javascript:void(0);" class="reward-amount-buts" :class="{'reward-amount-buts-default':!rewardAmountButsActive}" @click="selectAmountButs($event,2,10)"><i class="icon iconfont">&#xe725;</i><span class="reward-amounts">&nbsp;10</span>颗</a>
            <a href="javascript:void(0);" class="reward-amount-buts" :class="{'reward-amount-buts-default':!rewardAmountButsActive}" @click="selectAmountButs($event,3,50)"><i class="icon iconfont">&#xe725;</i><span class="reward-amounts">&nbsp;50</span>颗</a>
            <a href="javascript:void(0);" class="reward-amount-buts" :class="{'reward-amount-buts-default':!rewardAmountButsActive}" @click="selectAmountButs($event,4,100)" style="margin-left:19px;margin-right:19px;"><i class="icon iconfont">&#xe725;</i>&nbsp;<span class="reward-amounts">100</span>颗</a>
            <a href="javascript:void(0);" class="reward-amount-buts" :class="{'reward-amount-buts-default':!rewardAmountButsActive}" @click="selectAmountButs($event,5,null)">
                <span class="reward-self-amounts" style="font-size:14px;" :class="{'self-amount-text':showRewardSelfAmount}">自定义</span>
                <span class="reward-self-amounts" style="font-size:14px;" :class="{'self-amount-text':!showRewardSelfAmount}"><i class="icon iconfont">&#xe725;</i><input type="number" name="self-amount-input-box" id="self-amount-input-box" v-model="selfAmountNums" :autofocus="selfAmountAutofocus" @keyup="setSelfAmountNums($event)">颗</span>
            </a>
        </div>
        <div class="reward-message-box"><textarea name="reward-message-textarea" class="reward-message-textarea" v-model="rewardMessage" @focus="rewardMessageTextareaFocus($event)" @blur="rewardMessageTextareaBlur($event)"></textarea></div>
        <div class="reward-show-amount-box">
            <span class="reward-show-amount">${rewardAmount}</span>
            <span class="pay-method">，用户微信支付<a href="javascript:void(0);" class="chenage-pay-method" @click="chenagePayMethod($event)">${changePayMethodText}</a></span>
        </div>
        <div class="reward-pay-methods-box" :style="{display:showPayMethod}">
            <a href="javascript:void(0);" class="select-pay-method-buts" :class="{'select-pay-method-default':payMethodActive}" @click="selectPayMethods($event,'wechat')" style="margin-right:5px;"><img src="/public/images/wechat-b876a8446e11c13deb9f7c04093d5369.png"></a>
            <a href="javascript:void(0);" class="select-pay-method-buts" :class="{'select-pay-method-default':!payMethodActive}" @click="selectPayMethods($event,'alipay')" style="margin-left:5px;"><img src="/public/images/alipay-819dd0110c4f574b52bf4d193de5b0f5.png"></a>
        </div>
        <span slot="footer" class="dialog-footer">
        <a href="javascript:void(0);" class="pay-amount-buts" @click="payAmountActive($event)">立即支付</a>
      </span>
    </el-dialog>
</section>
{% endblock %}

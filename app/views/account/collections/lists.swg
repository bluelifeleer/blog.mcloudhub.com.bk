{% extends '../../common/headers.swg' %} {% block content %}
<link rel="stylesheet" href="/public/css/collection_lists.css">
<section class="contents-bar">
    <div class="collections-list-body-block">
        <div class="collection-headers-block"></div>
        <div class="collections-list-group-block">
            <div class="collections-list-box" v-for="(collection,$index) in collectionLists">
                <a v-bind:href="collection.href">
                    <div class="collection-icon-box"><img v-bind:src="collection.icon"></div>
                    <div class="collection-title-box">${collection.name}</div>
                    <div class="collection-desc-box">${collection.describe}</div>
                </a>
                <div class="collection-fn-box">
                    <p class="follow-block">
                        <a href="javascript:void(0);" class="follow-but" v-if="collection.isSubscribed" v-bind:class="{'collections-follwed':collection.subscribed}"><i class="icon iconfont">&#xe699;</i>&nbsp;关注</a>
                        <a href="javascript:void(0);" class="follow-but" v-else v-on:click="followButs($event,collection._id)"><i class="icon iconfont">&#xe628;</i>&nbsp;关注</a>
                    </p>
                    <p class="show-msg"><span>${collection.include}</span>篇文章 · <span>${collection.follow}</span>人关注</p>
                </div>
            </div>
        </div>
        <div class="more-collections-block"><a href="javascript:void(0);" class="more-collections-buts" v-on:click="moreCollections($event)">加载更多</a></div>
    </div>
</section>
{% endblock %}

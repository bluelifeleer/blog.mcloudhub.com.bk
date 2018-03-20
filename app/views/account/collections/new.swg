{% extends '../../common/headers.swg' %} {% block content %}
<link rel="stylesheet" href="/public/css/collections.css" />
<section class="contents-bar">
    <div class="collections-new-block-box">
        <form v-on:submit.prevent="collectionSubmitForm($event,collectionFormNew)" enctype="multipart/form-data">
            <h3>创建专题</h3>
            <div class="collections-rows-box" style="height:120px;">
                <div class="collections-lables" style="height:120px;" v-html="collection.icon_html"></div>
                <div class="collections-inputs" style="height:120px;">
                    <input type="file" name="collections-uoload-but" id="collections-uoload-but" v-on:change="uploadCollectionIcon($event)" placeholder="专题名称" />
                    <span class="collections-upload-marke">上传专题封面</span>
                </div>
            </div>
            <div class="collections-rows-box">
                <div class="collections-lables">名称：</div>
                <div class="collections-inputs"><input type="text" name="collection-name" id="collection-name" v-model="collection.name"></div>
            </div>
            <div class="collections-rows-box" style="height:150px;">
                <div class="collections-lables" style="height:150px;">描述：</div>
                <div class="collections-inputs" style="height:150px;"><textarea name="collection-descs" id="collection-descs" cols="30" rows="10" v-model="collection.describe"  placeholder="专题描述"></textarea></div>
            </div>
            <div class="collections-rows-box" style="position:relative;">
                <div class="collections-lables">其他管理员：</div>
                <div class="collections-inputs"><input type="text" name="collection-admins" id="collection-admins" v-model="collectionKeyWord" v-on:keyup="queryAdmins($event)"></div>
                <ul class="admins-list-layer" v-for="(admin,$index) in adminArr">
                    <li class="admin-lists-box" v-bind:data-uid="admin._id">${admin.name}</li>
                </ul>
            </div>
            <div class="collections-rows-box">
                <div class="collections-lables">是否允许投稿：</div>
                <div class="collections-inputs"><input type="radio" name="collection-pus" id="collection-pus" checked="checked" value="1" v-model="collection.push" />允许<input type="radio" name="collection-pus" id="collection-pus" value="0" v-model="collection.push" />不允许</div>
            </div>
            <div class="collections-rows-box">
                <div class="collections-lables">投稿是否需要审核：</div>
                <div class="collections-inputs"><input type="radio" name="collection-verify" id="collection-verify" checked="checked" value="1" v-model="collection.verify" />需要<input type="radio" name="collection-verify" id="collection-verify" value="0" v-model="collection.verify" />不需要</div>
            </div>
            <div class="collections-rows-box">
                <input type="submit" id="form-submit" value="创建专题" v-if="collectionFormNew" />
                <input type="submit" id="form-submit" value="修改专题" v-else />
            </div>
        </form>
    </div>
</section>
{% endblock %}

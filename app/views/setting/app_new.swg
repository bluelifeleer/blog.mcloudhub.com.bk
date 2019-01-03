{% extends '../common/headers.swg' %} {% block content %}
<section class="contents-bar">
    <link rel="stylesheet" href="/public/css/setting.css" />
    <div class="account-setting-block">
        <div class="account-set-menu-block">
            <ul class="set-menu-list-group">
                <li class="set-menu-list">
                    <a href="/setting/basic" class="setmenu-link"><i class="icon iconfont">&#xe650;</i>&nbsp;&nbsp;基础设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/profile" class="setmenu-link"><i class="icon iconfont">&#xe611;</i>&nbsp;&nbsp;个人资料</a>
                </li>
                <!--li class="set-menu-list">
                    <a href="/setting/blog;" class="setmenu-link"><i class="icon iconfont">&#xe64b;</i>&nbsp;&nbsp;微博认证</a>
                </li-->
                <li class="set-menu-list">
                    <a href="/setting/reward" class="setmenu-link"><i class="icon iconfont">&#xe606;</i>&nbsp;&nbsp;赞赏设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/misc" class="setmenu-link"><i class="icon iconfont">&#xe632;</i>&nbsp;&nbsp;帐号管理</a>
                </li>
                <li class="set-menu-list menu-default">
                    <a href="/setting/applactions" class="setmenu-link"><i class="icon iconfont">&#xe61b;</i>&nbsp;&nbsp;应用管理</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/adv" class="setmenu-link"><i class="icon iconfont">&#xe62c;</i>&nbsp;&nbsp;广告设置</a>
                </li>
            </ul>
        </div>
        <div class="account-set-body-block">
            <div class="set-body-list-block">
                <!--el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb-->
                <el-form ref="form" :model="app" label-width="120px">
                  <el-form-item label="应用名称：">
                    <el-input v-model="app.name"></el-input>
                  </el-form-item>
                  <el-form-item label="应用类型：">
                    <el-select v-model="app.type" placeholder="请选择应用类型">
                      <el-option label="PC应用" value="1"></el-option>
                      <el-option label="APP应用" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="el-form-item app-form-icon-box">
                        <div class="label-box">应用图标：</div>
                        <div class="upload-app-icon-box">
                            <div class="upload-app-icon-buts-box" v-bind:class="{'show-add-app-icon':app.showAddAppIcon}">
                                <i class="icon iconfont app-icon-add">&#xe628;</i>
                                <input type="file" id="upload-app-icon" class="upload-app-icon" @change="uploadAppIcon($event)" />
                            </div>
                            <div class="app-icon-box" v-bind:class="{'show-add-app-icon':!app.showAddAppIcon}">
                                <img :src="app.avatar" class="app-icon-img"  v-bind:class="{'show-add-app-icon':!app.showAddAppIcon}" />
                            </div>
                        </div>
                  </div>
                  <el-form-item label="回调地址：">
                    <el-input v-model="app.redirect_uri"></el-input>
                  </el-form-item>
                  <el-form-item label="应用描述：">
                    <el-input type="textarea" v-model="app.desc"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" v-if="app._id" @click="appNewFormOnSubmit(app._id)">更新应用</el-button>
                    <el-button type="primary" v-else @click="appNewFormOnSubmit()">立即创建</el-button>
                    <el-button @click="appNewResetbut">取消</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</section>
{% endblock %}

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
                <li class="set-menu-list">
                    <a href="/setting/applactions" class="setmenu-link"><i class="icon iconfont">&#xe61b;</i>&nbsp;&nbsp;应用管理</a>
                </li>
                <li class="set-menu-list menu-default">
                    <a href="/setting/adv" class="setmenu-link"><i class="icon iconfont">&#xe62c;</i>&nbsp;&nbsp;广告设置</a>
                </li>
            </ul>
        </div>
        <div class="account-set-body-block">
            <div class="set-body-list-block">
                <div class="adv-seting-title">广告设置</div>
                <div class="adv-modles-box">
                    <div class="adv-modle-header" @click="showAdvBody">
                        <div class="adv-modle-title">轮播设置</div>
                        <div class="adv-model-icon"><i class="icon iconfont">&#xe6c4;</i></div>
                    </div>
                    <div class="adv-modle-body" :class="{'adv-modle-active':showAdvModel}">
                        <div class="adv-model-slide-items">
                            <div class="adv-modle-slide-title">第一张：</div>
                            <div class="adv-modle-slide-form">
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-prictue">轮播图：</label>
                                    <input type="text" name="silde-prictue" class="silde-picture-input" placeholder="图片连接：https://|http://" v-model="adv.slides[0].url">
                                    <a href="javascript:void(0);" class="upload-picture-but" title="点击上传图片">
                                        <i class="icon iconfont">&#xe67b;</i>
                                        <input type="file" name="upload-pictures" class="upload-pictures" @change="uploadPictures($event, 0)" />
                                    </a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">点击连接：</label>
                                    <input type="text" name="silde-prictue" class="silde-click-link-input" placeholder="点击连接：https://|http://" v-model="adv.slides[0].link">
                                    <a href="javascript:void(0);" class="" title="点击查看连接"><i class="icon iconfont">&#xe6bc;</i></a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">描述：</label>
                                    <textarea name="silde-remark" id="silde-remark" cols="30" rows="10" v-model="adv.slides[0].remark">描述</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="adv-model-slide-items">
                            <div class="adv-modle-slide-title">第二张：</div>
                            <div class="adv-modle-slide-form">
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-prictue">轮播图：</label>
                                    <input type="text" name="silde-prictue" class="silde-picture-input" placeholder="图片连接：https://|http://" v-model="adv.slides[1].url">
                                    <a href="javascript:void(0);" class="upload-picture-but" title="点击上传图片">
                                        <i class="icon iconfont">&#xe67b;</i>
                                        <input type="file" name="upload-pictures" class="upload-pictures" @change="uploadPictures($event, 1)" />
                                    </a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">点击连接：</label>
                                    <input type="text" name="silde-prictue" class="silde-click-link-input" placeholder="点击连接：https://|http://" v-model="adv.slides[1].link">
                                    <a href="javascript:void(0);" class="" title="点击查看连接"><i class="icon iconfont">&#xe6bc;</i></a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">描述：</label>
                                    <textarea name="silde-remark" id="silde-remark" cols="30" rows="10" v-model="adv.slides[1].remark">描述</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="adv-model-slide-items">
                            <div class="adv-modle-slide-title">第三张：</div>
                            <div class="adv-modle-slide-form">
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-prictue">轮播图：</label>
                                    <input type="text" name="silde-prictue" class="silde-picture-input" placeholder="图片连接：https://|http://" v-model="adv.slides[2].url">
                                    <a href="javascript:void(0);" class="upload-picture-but" title="点击上传图片">
                                        <i class="icon iconfont">&#xe67b;</i>
                                        <input type="file" name="upload-pictures" class="upload-pictures" @change="uploadPictures($event, 2)" />
                                    </a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">点击连接：</label>
                                    <input type="text" name="silde-prictue" class="silde-click-link-input" placeholder="点击连接：https://|http://" v-model="adv.slides[2].link">
                                    <a href="javascript:void(0);" class="" title="点击查看连接"><i class="icon iconfont">&#xe6bc;</i></a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">描述：</label>
                                    <textarea name="silde-remark" id="silde-remark" cols="30" rows="10" v-model="adv.slides[2].remark">描述</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="adv-model-slide-items">
                            <div class="adv-modle-slide-title">第四张：</div>
                            <div class="adv-modle-slide-form">
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-prictue">轮播图：</label>
                                    <input type="text" name="silde-prictue" class="silde-picture-input" placeholder="图片连接：https://|http://" v-model="adv.slides[3].url">
                                    <a href="javascript:void(0);" class="upload-picture-but" title="点击上传图片">
                                        <i class="icon iconfont">&#xe67b;</i>
                                        <input type="file" name="upload-pictures" class="upload-pictures" @change="uploadPictures($event, 3)" />
                                    </a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">点击连接：</label>
                                    <input type="text" name="silde-prictue" class="silde-click-link-input" placeholder="点击连接：https://|http://" v-model="adv.slides[3].link">
                                    <a href="javascript:void(0);" class="" title="点击查看连接"><i class="icon iconfont">&#xe6bc;</i></a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">描述：</label>
                                    <textarea name="silde-remark" id="silde-remark" cols="30" rows="10" v-model="adv.slides[3].remark">描述</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="adv-model-slide-items">
                            <div class="adv-modle-slide-title">第五张：</div>
                            <div class="adv-modle-slide-form">
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-prictue">轮播图：</label>
                                    <input type="text" name="silde-prictue" class="silde-picture-input" placeholder="图片连接：https://|http://" v-model="adv.slides[4].url">
                                    <a href="javascript:void(0);" class="upload-picture-but" title="点击上传图片">
                                        <i class="icon iconfont">&#xe67b;</i>
                                        <input type="file" name="upload-pictures" class="upload-pictures" @change="uploadPictures($event, 4)" />
                                    </a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">点击连接：</label>
                                    <input type="text" name="silde-prictue" class="silde-click-link-input" placeholder="点击连接：https://|http://" v-model="adv.slides[4].link">
                                    <a href="javascript:void(0);" class="" title="点击查看连接"><i class="icon iconfont">&#xe6bc;</i></a>
                                </div>
                                <div class="adv-modle-slide-form-item">
                                    <label for="silde-remark">描述：</label>
                                    <textarea name="silde-remark" id="silde-remark" cols="30" rows="10" v-model="adv.slides[4].remark">描述</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="adv-model-slide-items">
                            <a href="javascript:void(0);" class="adv-model-silde-form-submit" @click="advModelSildeFormSubmit">保存</a>
                            <a href="javascript:void(0);" class="adv-model-silde-form-reset" @click="advModelSildeFormReset">取消</a>
                        </div>
                    </div>
                </div>

                <div class="adv-modles-box">
                    <div class="adv-modle-header" @click="showAdvBody">
                        <div class="adv-modle-title">广告设置</div>
                        <div class="adv-model-icon"><i class="icon iconfont">&#xe6c4;</i></div>
                    </div>
                    <div class="adv-modle-body" :class="{'adv-modle-active':!showAdvModel}"></div>
                </div>
            </div>
        </div>
    </div>
</section>
{% endblock %}

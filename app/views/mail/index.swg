<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no" />
    <title>{{ title }}</title>
    <link rel="icon" href="/public/images/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="/public/images/favicon.ico" type="image/x-icon" sizes="any" />
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/css/mail.css" />
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/public/js/wangEditor.js"></script>
    <script type="text/javascript">
        var page_type = '{{ page_type }}';
    </script>
</head>
    <div id="app-maile-new">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
                    model="horizontal"
                    background-color="#eef1f6"
                    text-color="#48576a">
                        <el-menu-item index="1" style="text-align:left;">
                            <a href="/mail/new">
                                <i class="el-icon-edit-outline"></i>
                                <span slot="title">写邮件</span>
                            </a>
                        </el-menu-item>
                        <el-menu-item index="2" style="text-align:left;">
                            <a href="/mail">
                                <i class="el-icon-time"></i>
                                <span slot="title" >未读邮件</span>
                            </a>
                        </el-menu-item>
                        <el-submenu index="3" style="text-align:left;">
                            <template slot="title" style="padding:0;text-align:left;">
                            <i class="el-icon-menu"></i>
                            <span slot="title">其他文件夹</span>
                            </template>
                            <el-menu-item-group>
                            <el-menu-item index="3-1">
                                <i class="el-icon-delete"></i>
                                <span slot="title" >已删除邮件</span>
                            </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="4" style="text-align:left;">
                            <a href="/mail/draft">
                                <i class="el-icon-document"></i>
                                <span slot="title">草稿箱</span>
                            </a>
                        </el-menu-item>
                        <el-menu-item index="5" style="text-align:left;">
                            <a href="/mail/setting">
                                <i class="el-icon-setting"></i>
                                <span slot="title">通讯录</span>
                            </a>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="mail-buts-box">
                        <div class="input-but-box">
                            <a href="javascript:void(0);" class="buts-block buts-success"><i class="icon iconfont">&#xe624;</i>发送</a>
                            <a href="javascript:void(0);" class="buts-block but-info">预览</a>
                            <a href="javascript:void(0);" class="buts-block but-info">存草稿</a>
                            <a href="javascript:void(0);" class="buts-block but-info">取消</a>
                        </div>
                        <div class="text-but-box">
                            <el-button type="text">抄送</el-button>
                            <el-button type="text">密送</el-button>
                            <a href="javascript:void(0);" class="buts-block buts-success" @click="addContacts"><i class="icon iconfont">&#xe60d;</i>添加联系人</a>
                        </div>
                    </div>
                    <el-form ref="form" :model="form" label-width="80px" label-position="left">
                    <el-form-item label="收件人：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="主题：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <div class="attr-box">
                        <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary"><i class="icon iconfont">&#xe6a7;</i>添加附件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                    <div class="text-area-box">
                        <div id="exampleTextarea"></div>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">发送</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>

                    <el-dialog title="添加收件人" :visible.sync="dialogFormVisible" width="50%">
                      <template>
                        <el-transfer
                          v-model="value3"
                          filterable
                          :left-default-checked="[2, 3]"
                          :right-default-checked="[1]"
                          :render-content="renderFunc"
                          :titles="['Source', 'Target']"
                          :button-texts="['到左边', '到右边']"
                          :format="{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                          }"
                          @change="handleChange"
                          :data="data">
                          <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
                          <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
                        </el-transfer>
                      </template>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                      </div>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
<body>
</body>
<script type="text/javascript" src="/public/js/mail_new.js"></script>
</html>
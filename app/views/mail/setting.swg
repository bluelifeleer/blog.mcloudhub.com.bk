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
    <div id="app-mail-setting">
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
                            <a href="javascript:void(0);" class="buts-block buts-success" @click="dialogFormVisible = true"><i class="icon iconfont">&#xe60d;</i>添加联系人</a>
                            <el-dropdown @command="moveToGroup">
                              <span class="el-dropdown-link">
                                复制到组<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="mailGroup in mailGroupForm" v-bind:command="mailGroup._id">${mailGroup.name}</el-dropdown-item>
                              </el-dropdown-menu>
                            </el-dropdown>
                            <a href="/mail/new" class="buts-block but-info">写信</a>
                            <a href="javascript:void(0);" class="buts-block but-info" @click="deleteMailUserbut">删除</a>
                        </div>
                    </div>
                    <el-table
                    ref="multipleTable"
                    :data="mailUsers"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="mailUserSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <!--<el-table-column
                        label="姓名"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>-->
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="email"
                        label="邮件地址"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="手机号码"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="group"
                        label="所在分组"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                        prop="group"
                        label="操作"
                        show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    </template>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="mailUserTotal"
                    @current-change="currentChange">
                    </el-pagination>

                    <el-dialog title="新建联系人" :visible.sync="dialogFormVisible" center>

                        <el-dialog
                              width="30%"
                              title="新建分组"
                              :visible.sync="dialogAddGroupVisible"
                              append-to-body
                              center>
                              <el-form ref="form" :model="mailUserForm" label-width="80px">
                                <el-form-item label="分组名称">
                                <el-input v-model="mailGroupForm.name"></el-input>
                                </el-form-item>
                               </el-form>
                               <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogAddGroupVisible = false">取 消</el-button>
                                <el-button type="primary" @click.prevent="add_mail_group_form_but">保 存</el-button>
                               </div>
                        </el-dialog>

                      <el-form ref="form" :model="mailUserForm" label-width="80px">
                        <el-form-item label="姓名">
                          <el-input v-model="mailUserForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱">
                          <el-input v-model="mailUserForm.email"></el-switch>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="mailUserForm.phone"></el-switch>
                        </el-form-item>
                        <el-form-item label="分组">
                            <el-col :span="12">
                                <el-dropdown trigger="click" @command="select_mail_group">
                                  <span class="el-dropdown-link" v-bind:id="mailGroupSelect._id">
                                    ${mailGroupSelect.name}<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="mailGroup in mailGroupForm" v-bind:command="mailGroup._id">${mailGroup.name}</el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                              </el-col>

                            <a href="javascript:void(0);" class="dialog-body-add-group" @click="showAddGroupDialog"><i class="icon iconfont">&#xe628;</i>新建分组</a>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input type="textarea" v-model="mailUserForm.mark"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click.prevent="add_mail_user_form_but">确 定</el-button>
                      </div>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
<body>
</body>
<script type="text/javascript" src="/public/js/mail_setting.js"></script>
</html>
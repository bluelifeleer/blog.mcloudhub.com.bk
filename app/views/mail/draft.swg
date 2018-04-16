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
    <div id="app-mail-draft">
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
                    <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                    </el-table-column>
                    </el-table>
                    </template>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                    </el-pagination>
                </el-main>
            </el-container>
        </el-container>
    </div>
<body>
</body>
<script type="text/javascript" src="/public/js/mail_draft.js"></script>
</html>
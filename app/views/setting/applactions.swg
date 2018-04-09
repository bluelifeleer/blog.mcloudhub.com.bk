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
                <li class="set-menu-list">
                    <a href="/setting/blog;" class="setmenu-link"><i class="icon iconfont">&#xe64b;</i>&nbsp;&nbsp;微博认证</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/reward" class="setmenu-link"><i class="icon iconfont">&#xe606;</i>&nbsp;&nbsp;赞赏设置</a>
                </li>
                <li class="set-menu-list">
                    <a href="/setting/misc" class="setmenu-link"><i class="icon iconfont">&#xe632;</i>&nbsp;&nbsp;帐号管理</a>
                </li>
                <li class="set-menu-list menu-default">
                    <a href="/setting/applactions" class="setmenu-link"><i class="icon iconfont">&#xe61b;</i>&nbsp;&nbsp;应用管理</a>
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
                <div class="apps-buts-box">
                    <a class="app-new-buts" href="/setting/applactions/new">创建应用</a>
                    <a class="app-pause-buts app-buts-default" href="javascript:void(0);" @appPauseBut>暂停</a>
                    <a class="app-recover-buts app-buts-default" href="javascript:void(0);" @appRecoverBut>恢复</a>
                    <a class="app-delete-buts app-buts-default" href="javascript:void(0);" @appDeleteBut>删除</a>
                </div>
                <template>
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
                          label="应用名称"
                          width="120">
                          <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="APPID"
                          width="120">
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="应用密钥"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="应用分类"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="状态"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="操作"
                          show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </template>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="10"
                  :current-page="1"
                  :total="100"
                  @current-change="applistpageCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</section>
{% endblock %}

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>添加文章</title>
    <link rel="stylesheet" href="/public/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/js/marked/css/editormd.min.css" />
    <link rel="stylesheet" href="/public/css/articleeditor.css" />
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/public/js/marked/jquery-1.8.3.js"></script>
    <script type="text/javascript" src="/public/js/wangEditor.js"></script>
    <script type="text/javascript" src="/public/js/marked/editormd.min.js"></script>
    <script type="text/javascript">
        var uid = '{{ uid }}';
        var page_type = '{{ page_type }}';
    </script>
</head>

<body>
    <div id="article-editor-app">
        <div class="article-editor-layout-left" v-bind:style="{height:editorsHeight}">
            <div class="callback-index-block"><a href="/" class="callback-index-link">返回首页</a></div>
            <div class="create-document-but-block"><a href="javascript:void(0);" class="create-document-but" v-on:click="createDocument($event)"><i class="icon iconfont">&#xe628;</i>&nbsp;&nbsp;创建文集</a></div>
            <div class="create-document-input-block" v-bind:style="{display:docInputBox}">
                <form v-on:submit.prevent="confirmDocSubmitForm($event)">
                    <input type="text" name="doc-name" id="doc-name" v-on:focus.prevent="focus($event)" v-model="docName" value="" placeholder="输入文集名称" />
                    <input type="hidden" name="uid" id="uid" v-model="uid" value="" />
                    <div class="button-blox">
                        <input type="submit" value="确定" id="doc-confirm-but" />
                        <input type="reset" value="取消" id="doc-reset-but" v-on:click.prevent="cleanDocConfirm($event)" />
                    </div>
                </form>
            </div>
            <div class="documents-list-group-block" v-bind:style="{height:editorsDocumentBoxHeight}">
                <ul class="documents-list-group-box">
                    <!--document-list-default-->
                    <li class="documents-list-box" v-for="(doc,$index) in docList" v-on:click.stop="selectDocumentButs($event,doc,$index)" v-bind:class="{'document-active':doc.active,'document-unactive':!doc.active}">
                        <span class="document-name" ref="showDocumentBox">${doc.name}</span>
                        <input type="text" name="document-input-name" ref="showDocumentInput" id="document-input-name" v-bind:value="doc.name" v-on:keyUp="psotDocumentNameEdit($event,doc._id,$index)" v-on:blur="documentInputBlur($event,doc._id,$index)" />
                        <span class="document-setting-buts" v-on:click.stop="documentSetting($event,doc._id,$index)"><i class="icon iconfont">&#xe926;</i></span>
                        <ul class="document-menu-list-group" ref="menu">
                            <li class="document-menu-list-box" v-on:click.stop="editDocument($event,doc._id,$index)"><i class="icon iconfont">&#xe601;</i>&nbsp;&nbsp;修改文集</li>
                            <li class="document-menu-list-box" v-on:click.stop="deleteDocument($event,doc._id,$index)"><i class="icon iconfont">&#xe631;</i>&nbsp;&nbsp;删除文集</li>
                        </ul>
                    </li>
                    <!--<li class="documents-list-box">-->
                    <!--<span class="document-name">随笔</span>-->
                    <!--<span class="document-setting-buts" v-on:click="documentSetting($event)"><i class="icon iconfont">&#xe926;</i></span>-->
                    <!--</li>-->
                </ul>
            </div>
        </div>
        <div class="article-editor-layout-center">
            <div class="create-article-but-block"><a href="javascript:void(0);" class="create-article-but" v-on:click="createArticle($event)"><i class="icon iconfont">&#xe6a3;</i>&nbsp;&nbsp;创建文章&nbsp;&nbsp;<span class="loading-box" v-bind:style="{display:showLoadBut}"></span></a></div>
            <div class="article-list-group-block" v-bind:style="{height:editorsArticlBoxHeight}">
                <ul class="article-list-group-box" v-bind:style="{height:editorsArticlListHeight}">
                    <!--article-list-default-->
                    <li class="article-list-box" v-for="(article,$index) in articleLsts" v-on:click.stop="selectArticleBut($event,article,$index)" v-bind:class="{'article-active':article.active,'article-unactive':!article.active}" :key="$index">
                        <i class="icon iconfont article-iconfont">&#xe62e;</i>
                        <span class="article-name" ref="articleTitle" :title="article.title">${article.simpleTitle}</span>
                        <span class="article-setting-buts" v-on:click.stop="articleSetting($event,article._id,$index)"><i class="icon iconfont">&#xe926;</i></span>
                        <ul class="article-menu-list-group" ref="articleMenu">
                            <li class="article-menu-list-box" v-if="article.permissions == 2" v-on:click.stop="setPermissions($event,article._id,$index,2)"><i class="icon iconfont">&#xe8d4;</i>&nbsp;&nbsp;设为公开</li>
                            <li class="article-menu-list-box" v-else-if="article.permissions == 3" v-on:click.stop="setPermissions($event,article._id,$index,3)"><i class="icon iconfont">&#xe63c;</i>&nbsp;&nbsp;指定人可见</li>
                            <li class="article-menu-list-box" v-else v-on:click.stop="setPermissions($event,article._id,$index,1)"><i class="icon iconfont">&#xe8d5;</i>&nbsp;&nbsp;设为私密</li>
                            <li class="article-menu-list-box" v-on:click.stop="releaseArticle($event,article._id,$index)"><i class="icon iconfont">&#xe601;</i>&nbsp;&nbsp;直接发布</li>
                            <li class="article-menu-list-box" v-on:click.stop="moveArticle($event,article._id,$index)" style="padding:0;"><i class="icon iconfont" style="color:#c1c1c1;">&#xe72f;</i><i class="icon iconfont">&#xe7aa;</i>&nbsp;&nbsp;移动文章</li>
                            <li class="article-menu-list-box" v-on:click.stop="deleteArticle($event,article._id,$index)"><i class="icon iconfont">&#xe631;</i>&nbsp;&nbsp;删除文章</li>
                        </ul>
                    </li>
                </ul>
                <ul class="document-menu-group-block" ref="articlMenuDocumentBlock">
                    <li class="document-menu-group-list-box" v-for="(doc,$index) in docList" v-bind:data-id="doc._id">
                        <span>${doc.name}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="article-editor-layout-right">
            <div class="article-editor-block">
                <div class="article-editor-title">
                    <input type="text" name="article-title" id="article-title" value="" v-model="title" v-on:keyUp="changeArticleTitle($event)">
                    <span class="save-tip-box" v-bind:style="{display:saveTip}">已保存</span>
                    <a href="javascript:void(0);" class="send-article-but" title="发布文章" v-on:click="saveArticle($event,nowArticleId)"><i class="icon iconfont">&#xe662;</i></a>
                </div>
                <div class="article-editor-contents-block">
                    <div id="editormd" v-bind:style="{display:markdownEditor,width:editorsWidth,height:editorsHeight}">
                        <textarea style="display:none;" calss="editormd-markdown-textarea" name="editormd-markdown-doc"></textarea>
                    </div>
                    <div id="exampleTextarea" v-bind:style="{display:wangEditor,width:editorsWidth,height:editorsHeight}">
                        <!--<p>${contents}</p>-->
                    </div>
                    <input type="hidden" name="uid" id="uid" v-model="uid" value="" />
                    <input type="hidden" name="doc-id" id="doc-id" v-model="doc_id" value="" />
                    <input type="hidden" name="article-id" id="article-id" v-model="nowArticleId" value="" />
                </div>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" src="/public/js/articleeditor.js"></script>

</html>

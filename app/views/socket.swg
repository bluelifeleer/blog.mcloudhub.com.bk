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
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link rel="stylesheet" href="/public/css/public.css" />
    <link rel="stylesheet" href="/public/css/socket.css" />
    <script type="text/javascript" src="https://blog.mcloudhub.com/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="/public/js/vue.js"></script>
    <script type="text/javascript" src="/public/js/vue-resource.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script type="text/javascript" src="/public/js/wangEditor.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

</head>
<body>
    <div id="socket-app">
        <div class="socket-app-block" ref="socketApp">
            <div class="socket-app-nume-box" @mousedown="moveApp">
                <div class="app-buts-box">
                    <a href="javascript:void(0);" class="app-buts clost-but"></a>
                    <a href="javascript:void(0);" class="app-buts reset-but-min"></a>
                    <a href="javascript:void(0);" class="app-buts reset-but-max"></a>
                </div>
                <div class="user-avatar-icon-box"><a href="javascript:void(0);" class="user-avatar"><img src="/public/images/avatar_default-78d4d1f68984cd6d4379508dd94b4210.png" alt=""></a></div>
                <div class="massage-icon-box">
                    <a href="javascript:void(0);" class="wechart">
                        <span class="massage-icon"><i class="icon iconfont iconfont-msg">&#xe62a;</i></span>
                        <span class="massage-nums-icon">2</span>
                    </a>
                </div>
                <div class="contact-icon-box">
                    <a href="javascript:void(0);" class="user-list">
                        <span class="users-icon"><i class="icon iconfont iconfont-user">&#xe664;</i></span>
                    </a>
                </div>
                <div class="contact-icon-box" style="position:absolute;left:0;top:640px;">
                    <a href="javascript:void(0);" class="more-list">
                        <span class="users-icon"><i class="icon iconfont iconfont-more">&#xe62b;</i></span>
                    </a>
                </div>
            </div>
            <div class="socket-app-user-list-box">
                <div class="search-ox"></div>
                <div class="users-list-box">
                    <div class="user-list-item-box" v-for="(firend,$index) in firends">
                        <a href="javascript:void(0);" :data-id="firend.id" @click="switchUsers(firend)" class="user-list-item-link">
                            <div class="user-list-items">
                                <div class="user-list-avatar-box">
                                    <span class="user-list-avatar-img"><img src="/public/images/QQ20180131-224008@2x.png" alt=""></span>
                                    <span class="user-list-avatar-msg-nums">2</span>
                                </div>
                                <div class="user-list-info-box">
                                    <div class="user-list-info">
                                        <span class="user-list-info-name">${firend.name}</span>
                                        <span class="user-list-info-timer">12:30</span>
                                    </div>
                                    <div class="user-list-last-msg">也不是我想选，只是这个都是.....</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="socket-app-massage-box">
                <div class="socket-app-massage-box-header" @mousedown="moveApp">
                    <div class="socket-app-massage-box-header-user-name">${currentFirend.name}</div>
                    <div class="socket-app-massage-box-header-user-info-icon"><a href="javascript:void(0);" class="massage-header-user-info"><i class="icon iconfont" style="font-size:20px;">&#xe61c;</i></a></div>
                </div>
                <div class="socket-app-massage-box-body">
                    <div class="msg-info-group-box">
                        <div class="msg-info-item-box">
                            <div class="msg-info-date-box">12:30</div>
                            <div class="msg-info-friend-box">
                                <span class="msg-info-friend-avatar"><img src="/public/images/QQ20180131-224008@2x.png" alt=""></span>
                                <span class="msg-info-massage">君君，你啥时候方便我让他过去拿一下钥匙？君君，你啥时候方便我让他过去拿一下钥匙？君君，你啥时候方便我让他过去拿一下钥匙？君君，你啥时候方便我让他过去拿一下钥匙？君君，你啥时候方便我让他过去拿一下钥匙？君君，你啥时候方便我让他过去拿一下钥匙？</span>
                            </div>
                        </div>
                        <div class="msg-info-item-box">
                            <div class="msg-info-date-box">12:30</div>
                            <div class="msg-info-friend-box">
                                <span class="msg-info-friend-avatar"><img src="/public/images/QQ20180131-224008@2x.png" alt=""></span>
                                <span class="msg-info-massage">君君，你啥时候方便我让他过去拿一下钥匙？</span>
                            </div>
                        </div>
                        <div class="msg-info-item-box">
                            <div class="msg-info-date-box">12:30</div>
                            <div class="msg-info-friend-box">
                                <span class="msg-info-friend-avatar"><img src="/public/images/QQ20180131-224008@2x.png" alt=""></span>
                                <span class="msg-info-massage">君君，你啥时候方便我让他过去拿一下钥匙？</span>
                            </div>
                        </div>
                        <div class="msg-info-item-box">
                            <div class="msg-info-date-box">12:30</div>
                            <div class="msg-info-friend-box">
                                <span class="msg-info-friend-avatar"><img src="/public/images/QQ20180131-224008@2x.png" alt=""></span>
                                <span class="msg-info-massage">君君，你啥时候方便我让他过去拿一下钥匙？</span>
                            </div>
                        </div>
                        <div class="msg-info-item-box">
                            <div class="msg-info-date-box">12:30</div>
                            <div class="msg-info-self-box">
                                <span class="msg-info-friend-avatar"><img src="/public/images/QQ20180131-224008@2x.png" alt=""></span>
                                <span class="msg-info-massage">君君，你啥时候方便我让他过去拿一下钥匙？</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="socket-app-massage-box-footer">
                    <!-- <div class="masg-send-buts"></div>
                    <div class="masg-send-content-input">
                        <textarea id="msg-content-input" v-model="sendMsg" @keyup.enter.stop="submitMsg">请输入要发送的信息.....</textarea>
                    </div> -->
                    <div id="editor" @keyup.enter.stop="submitMsg">
                      
                    </div>
                </div>
            </div>
        </div>

        <div class="login-marke-layer" ref="loginMarkeLayer"></div>
        <div class="ligin-form-layer" ref="loginFormLayer">
            <div class="login-form-layer-header">
                <a href="javascript:void(0);" class="app-buts clost-but"></a>
                <a href="javascript:void(0);" class="app-buts reset-but-min"></a>
                <a href="javascript:void(0);" class="app-buts reset-but-max"></a>
            </div>
            <div class="login-form-form">
                <p class="form-item-box">
                    <label for="name">用户名：</label><input type="text" name="name" value="" v-model="user.name" />
                </p>
                <p class="form-item-box">
                    <label for="password">密  码：</label><input type="password" name="password" value="" v-model="user.password" />
                </p>
                <p class="form-item-box">
                    <a href="javascript:void(0);" class="login-submit" @click="loginSubmit">登录</a>
                </p>
            </div>
        </div>
    </div>
</body>
<script type="text/javascript" src="/public/js/socket.js"></script>
</html>
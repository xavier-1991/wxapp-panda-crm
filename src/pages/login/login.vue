<template lang="pug">
    view(class="wrap re")
        image(class="bg" mode="widthFix" src="../../static/image/login/login-bg.png")
        view(class="main")
            view
                view(class="df jcc mt70")
                    image(class="logo" src="../../static/image/login/logo.png")
                view(class="fs36 cor mt15 tac") 欢迎来到CRM平台
            view(class="inp-wrap mt15")
                view(class="item df ai-center")
                    image(src="../../static/image/login/phone.png")
                    input(placeholder="请输入手机号" type="number" maxlength="11")
                view(class="item df ai-center")
                    image(src="../../static/image/login/safe.png")
                    input(placeholder="请输入密码" type="password")
            view(class="btn_wrap")
                view(class="btn-default") 登录
                view(class="df jcfe mt30")
                    view(class="forgot" @tap="toForgotPassword()") 忘记密码

</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
    export default {
        data(){
            return {

            }
        },
        onLoad(){
            wx.setNavigationBarColor({
                frontColor:"#000000",
                backgroundColor:"#ffffff"
            });
        },
        methods: {
            toForgotPassword(){
                util.linkto('login-password-forgot')
            }
        }
    }
</script>
<style lang="stylus">
    @import "./login"
</style>
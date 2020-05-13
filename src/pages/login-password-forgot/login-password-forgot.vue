<template lang="pug">
    view(class="wrap re")
        image(class="bg" mode="widthFix" src="../../static/login/login-bg.png")
        view(class="main")
            view(class="inp-wrap ")
                view(class="item df ai-center")
                    image(src="../../static/login/phone.png")
                    input(placeholder="请输入手机号" type="number" maxlength="11")
                view(class="item df ai-center re")
                    image(src="../../static/login/safe.png")
                    input(placeholder="请输入验证码" type="number")
                    view(class="code") 获取验证码
                view(class="item df ai-center")
                    image(src="../../static/login/safe.png")
                    input(placeholder="请输入新密码" type="password")
            view(class="btn_wrap")
                view(class="btn-default") 登录
                

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
    @import "./login-password-forgot"
</style>
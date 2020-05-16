<template lang="pug">
    view(class="wrap re")
        view(class="df ai-center jcsb item")
            view() 原密码
            input(type="password" placeholder="请输入原密码" placeholder-class="pl" class="bb1")
        view(class="df ai-center jcsb item")
            view() 新密码
            input(type="password" placeholder="请输入新密码" placeholder-class="pl" class="bb1")
        view(class="df ai-center jcsb item")
            view() 确认密码
            input(type="password" placeholder="请再次确认新密码" placeholder-class="pl" class="bb1")
        view(class="btn_wrap")
                view(class="btn-default") 确定
                

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
          
        },
        methods: {
            toForgotPassword(){
                util.linkto('login-password-forgot')
            }
        }
    }
</script>
<style lang="stylus">
    @import "./login-password-reset"
</style>
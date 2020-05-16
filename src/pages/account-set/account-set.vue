<template lang="pug">
    view(class="wrap re")
        image(class="bg" mode="widthFix" src="../../static/image/login/login-bg.png")
        view(class="main")
            view(class="btn_wrap")
                view(class="btn-default") 退出登录
                view(class="df jcfe mt30")
                    view(class="forgot" @tap="toResetPassword()") 修改密码
               
        tabbar(currTabbar="set")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
import tabbar from "../../components/tabbar/tabbar.vue";
export default {
    data(){
        return {
            // 时间选择器插件
            showPicker: false,
            type: 'range',
            value: '',
            aaa:''
        }
    },
    components:{
        tabbar
    },
    onLoad(){

    },
    methods: {
        toResetPassword(){
            util.linkto('login-password-reset')
        }
    }
}
</script>
<style lang="stylus">
    @import "./account-set"
</style>
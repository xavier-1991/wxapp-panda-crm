<template lang="pug">
    view(class="wrap re")
        image(class="bg" mode="widthFix" src="../../static/image/login/login-bg.png")
        view(class="main")
            view()
                image(class="lock" src="../../static/image/login/lock-big.png")
            view(class="btn_wrap")
                view(class="btn-default" @tap="toLoginOut") 退出登录
                view(class="df jcfe mt30")
                    view(class="forgot" @tap="toResetPassword()") 修改密码
               
        tabbar(currTabbar="account-set")


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
        },
        toLoginOut(){
            util.showConfirm('','退出登录','是否退出当前账号',()=>{
                util.showLoadingDialog('正在加载');
                http.request(urls.LOGIN_OUT, "GET", null).then(result => {
                    util.hideLoadingDialog();
                    util.reLaunch('login');
                });
            })
        }
    }
}
</script>
<style lang="stylus">
    @import "./account-set"
</style>
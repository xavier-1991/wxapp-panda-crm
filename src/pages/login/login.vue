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
                    input(v-model="mobile" placeholder="请输入手机号" type="number" maxlength="11")
                view(class="item df ai-center")
                    image(src="../../static/image/login/lock.png")
                    input(v-model="password" placeholder="请输入密码" type="password")
            view(class="btn_wrap")
                view(class="btn-default" @tap="toLogin") 登录
                view(class="df jcfe mt30")
                    view(class="forgot" @tap="toForgotPassword()") 忘记密码

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            mobile: "",
            password: ""
        };
    },
    onLoad() {
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
        });
        let userInfo=pd.getUserInfo();
        if(userInfo&&userInfo.mobile){
            this.mobile=userInfo.mobile;
        }
    },
    methods: {
        toLogin() {
            if (!this.mobile) {
                util.showToast("请输入手机号");
                return;
            }
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                util.showToast("手机号格式错误");
                return;
            }
            if (!this.password) {
                util.showToast("请输入密码");
                return;
            }
            util.showLoadingDialog("正在登录");
            let params = { mobile: this.mobile, password: this.password };
            http.request(urls.LOGIN, "POST", params, false).then(result => {
                pd.storeUserInfo(result.user);
                util.hideLoadingDialog();
                util.reLaunch("index");
            });
        },
        toForgotPassword() {
            util.linkto("login-password-forgot");
        }
    }
};
</script>
<style lang="stylus">
@import './login'
</style>
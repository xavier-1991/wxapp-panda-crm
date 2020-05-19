<template lang="pug">
    view(class="wrap re")
        image(class="bg" mode="widthFix" src="../../static/image/login/login-bg.png")
        view(class="main")
            view(class="inp-wrap ")
                view(class="item df ai-center")
                    image(src="../../static/image/login/phone.png")
                    input(v-model="mobile" placeholder="请输入手机号" type="number" maxlength="11")
                view(class="item df ai-center re")
                    image(src="../../static/image/login/safe.png")
                    input(v-model="verificationCode" placeholder="请输入验证码" type="number")
                    view(class="code" @tap="toSendCode") {{codeStr}}
                view(class="item df ai-center")
                    image(src="../../static/image/login/safe.png")
                    input(v-model="password" placeholder="请输入新密码" type="password")
            view(class="btn_wrap")
                view(class="btn-default" @tap="toSubmit") 登录
                

</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
export default {
    data() {
        return {
            mobile: "",
            verificationCode: "",
            password: "",
            sec: 60,
            timer: null,
            codeStr: "获取验证码"
        };
    },
    onLoad() {
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
        });
    },
    methods: {
        toSendCode() {
            var mobile = this.mobile;
            if (!util.checkPhone(mobile)) {
                util.showToast("请输入正确的手机号");
                return false;
            }
            if (this.sec != 60) {
                util.showToast("请" + this.sec + "秒后重试！", null);
                return false;
            }
            let params = { mobile: this.mobile, type: 21 };
            util.showLoadingDialog("请稍候");
            http.request(urls.SEND_CODE, "POST", params, false).then(data => {
                this.intTimer = setInterval(() => {
                    if (this.sec == 1) {
                        this.codeStr = "获取验证码";
                        this.sec = 60;
                        clearInterval(this.intTimer);
                    } else {
                        var sec = this.sec - 1;
                        this.codeStr = sec + "秒后获取";
                        this.sec = sec;
                    }
                }, 1000);
                util.hideLoadingDialog();
            });
        },
        toSubmit() {
            if (!util.checkPhone(this.mobile)) {
                util.showToast("请输入正确的手机号");
                return false;
            }
            if (!this.verificationCode.trim()) {
                util.showToast("验证码不能为空");
                return false;
            }
            if (!util.checkPassword(this.password)) {
                util.showToast("请输入正确格式的密码");
                return false;
            }
            util.showLoadingDialog("正在提交");
            let params = {
                mobile: this.mobile,
                verificationCode: this.verificationCode,
                password: this.password
            };
            http.request(urls.FORGOT_LOGIN_PASSWORD, "PUT", params, false).then(
                data => {
                    util.showToast('重置成功')
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        util.reLaunch('login');
                    }, 1000);
                    
                }
            );
        }
    }
}
</script>
<style lang="stylus">
    @import "./login-password-forgot"
</style>
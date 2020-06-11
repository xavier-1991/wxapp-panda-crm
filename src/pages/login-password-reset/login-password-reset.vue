<template lang="pug">
    view(class="wrap re")
        view(class="df ai-center jcsb item")
            view() 原密码
            input(v-model="params.oldPassword" type="password" placeholder="请输入原密码" placeholder-class="pl" class="bb1")
        view(class="df ai-center jcsb item")
            view() 新密码
            input(v-model="params.password" type="password" placeholder="请输入新密码" placeholder-class="pl" class="bb1")
        view(class="df ai-center jcsb item")
            view() 确认密码
            input(v-model="params.confirmPassword" type="password" placeholder="请再次确认新密码" placeholder-class="pl" class="bb1")
        view(class="btn_wrap")
                view(class="btn-default" @tap="toSubmit") 确定
                

</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
export default {
    data(){
        return {
            params:{
                oldPassword:'',
                password:'',
                confirmPassword:''
            }
           
        }
    },
    methods: {
        toLoginPasswordForgot(){
            util.linkto('login-password-forgot');
        },
        toSubmit(){
            if (!util.checkPassword(this.params.oldPassword)) {
                util.showToast("原密码输入错误");
                return false;
            }
            if (!this.params.password) {
                util.showToast("新密码不能为空");
                return false;
            }
            // if (!util.checkPassword(this.params.password)) {
            //     util.showToast("请输入正确格式的新密码");
            //     return false;
            // }
            if (this.params.password != this.params.confirmPassword) {
                util.showToast("两次输入密码不一致");
                return false;
            }
            util.showLoadingDialog("正在修改");
            http.request(urls.CHANGE_PASSWORD, "PUT", this.params).then(
                data => {
                    util.showToast('修改成功')
                    setTimeout(() => {
                        util.hideLoadingDialog();
                        uni.navigateBack();
                    }, 1000);
                    
                }
            );
        }
    }
}
</script>
<style lang="stylus">
    @import "./login-password-reset"
</style>
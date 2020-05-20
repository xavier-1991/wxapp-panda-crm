<template lang="pug">
    view(class="")
        view(class="bk_f" style="padding:25rpx;")
            view(class="df")
                view(class="top-left") 发货方式
                view(class="top-right") 快递
            view(class="df mt15")
                view(class="top-left") 快递公司
                view(class="top-right") 百世快递
            view(class="df mt15")
                view(class="top-left") 快递单号
                view(class="top-right") 12378888999000000
                

</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
    export default {
        data(){
            return {
                data:null
            }
        },
        onLoad(options){
            this.loadData(options.id);
        },
        methods: {
            loadData(id){
                util.showLoadingDialog('加载中');
                http.request(
                    urls.EXPRESS_INFO.format(id),
                    "GET"
                ).then(data => {
                    this.data=data;
                    this.hasData=data;
                    util.hideLoadingDialog();
                })
           }
        }
    }
</script>
<style lang="stylus">
    @import "./order-logistics"
</style>
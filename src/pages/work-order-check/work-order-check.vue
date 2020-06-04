<template lang="pug">
    view(class="wrap re")
        view(class="add-w")
            view(class="add-item df jcsb ai-center")
                view(class="aw-l") 
                    text(class="fs28" style="color:#FF662E;") *
                    text 订单编号
                input(class="aw-r aw-inp" placeholder="" placeholder-class="aw-inp-pl")
            view(class="add-item df jcsb ai-center")
                view(class="aw-l") 
                    text(class="fs28" style="color:#FF662E;") *
                    text 问题记录
                view(class="df area-wrap aw-r")
                    image(v-if="!params.notes" class="edit fls0" src="../../static/image/other/edit.png")
                    textarea(v-model="params.notes" placeholder-class="pl2" placeholder="请填写问题描述~")
            view(class="add-item df jcsb ai-center")
                view(class="aw-l") 上传图片
                view(class="df aw-r")
                    image(v-for="(item,index) in imageArr" :key="index" :src="item" class="up-img-wrap bk_gray" lazy-load="true" mode="aspectFill")
                   

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
           imageArr:['1']
        };
    },
    onLoad() {
       
    },
    methods: {
       
    }
};
</script>
<style lang="stylus">
@import './work-order-check'
</style>
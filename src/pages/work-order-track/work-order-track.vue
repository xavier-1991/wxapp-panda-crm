<template lang="pug">
    view(class="")
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
                view(class="df p25lr")
                    view(class="up-img-wrap re" v-for="(item,index) in imageArr" :key="index")
                        image(:src="item" class="storeImg" lazy-load="true" mode="aspectFill" class="up-img bk_")
                        image(@tap="delImage"
                            class="delimg"
                            src="../../static/image/other/del_img.png")
                    view(class="df jcc ai-center fldc up-img-wrap bk_gray" v-if="count>0" @tap="chooseImage")
                        image(class="camera" src="../../static/image/store/camera.png")
                        view(class="mt5 fs20 cor") 上传图片
            view(class="add-item df jcsb ai-center")
                view(class="aw-l") 
                    text(class="fs28" style="color:#FF662E;") *
                    text 跟踪记录
                view(class="df area-wrap aw-r")
                    image(v-if="!params.notes" class="edit fls0" src="../../static/image/other/edit.png")
                    textarea(v-model="params.notes" placeholder-class="pl2" placeholder="请填写问题描述~")
        view(class="add-btn-wrap bt1 df jcsb")
            view(class="add-btn") 取消
            view(class="add-btn add-btn2") 确定

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            count: 3, //随着imageArr的length改变而改变,最多传3张图
            imageArr: ['1','2'], //本地
        };
    },
    onLoad() {
       
    },
    methods: {
        
    }
};
</script>
<style lang="stylus">
@import './work-order-track'
</style>
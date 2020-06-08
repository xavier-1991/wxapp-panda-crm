<template lang="pug">
    view(class="")
        view(class="add-w")
            view(class="df jcsb ai-center")
                view(class="aw-l") 
                    text 订单编号
                view(class="aw-r bb1") 123fddsfdsfsdf
            view(class="df jcsb ai-center")
                view(class="aw-l") 
                    text 手机号
                view(class="aw-r bb1") 1856696321
            view(class="df jcsb")
                view(class="aw-l") 
                    text 问题记录
                view(class="aw-r bb1" style="padding-right:24rpx;box-sizing:border-box;") 文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案
            view(class="df jcsb")
                view(class="aw-l") 图片
                view(class="df aw-r")
                    image(class="up-img bk_gray" v-for="(item,index) in imageArr" :key="index" :src="item" lazy-load="true" mode="aspectFill")
        view(class="gray_bar" style="height:25rpx;")
        view(class="record")
            view(class="r-title") 工单跟踪记录
            view(class="fs24 cor r-list bb1")
                view(class="df jcsb")
                    view()
                        text(class="cor_9") 处理人：
                        text() 啊啊啊
                    view(class="df ai-center")
                        image(class="time-img" src="../../static/image/other/time.png")
                        view() 2019-05-15 09:02
                view(class="mt15") 已通知供货商补发文案文案文案文案文案文案
        view
            view(class="gray_bar" style="height:25rpx;")
            view(class="record record2")
                view(class="r-title") 工单已完结
                view(class="fs24 cor r-list")
                    view(class="df jcsb")
                        view()
                            text(class="cor_9") 处理人：
                            text() 啊啊啊
                        view(class="df ai-center")
                            image(class="time-img" src="../../static/image/other/time.png")
                            view() 2019-05-15 09:02
                    view(class="mt15") 已通知供货商补发文案文案文案文案文案文案
            //- view(class="add-item df jcsb ai-center")
            //-     view(class="aw-l") 
            //-         text(class="fs28" style="color:#FF662E;") *
            //-         text 跟踪记录
            //-     view(class="df area-wrap aw-r")
            //-         image(v-if="!params.notes" class="edit fls0" src="../../static/image/other/edit.png")
            //-         textarea(v-model="params.notes" placeholder-class="pl2" placeholder="请填写问题描述~")
        //- view(class="add-btn-wrap bt1 df jcsb")
        //-     view(class="add-btn") 取消
        //-     view(class="add-btn add-btn2") 确定

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
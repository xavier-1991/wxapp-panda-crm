<template lang="pug">
    view(class="wrap")
        view(class="df jcsba top bk_f")
            view(class="top-item re curr-top") 拜访签到
            view(class="top-item re") 拜访记录
        view(class="main")
            //- 拜访签到
            view(v-if="1")
                view(class="map")
                view(class="qiaodao p25lr")
                    view(style="padding:32rpx 0 16rpx" class="fs28 cor") 万象城巴拉巴拉巴拉
                    view(class="riji")
                        view(class="fs28 cor") 拜访日记
                        textarea(placeholder="请输入此拜访沟通的内容及结果~" class="area" placeholder-class='pl')
                view(class="df mt15 p25lr")
                    view(class="up-img-wrap re")
                        image(src="" class="up-img bk_f")
                    view(class="up-img-wrap re")
                        image(src="" class="up-img bk_f")
                    view(class="df jcc ai-center fldc up-img-wrap bk_f")
                        image(class="camera" src="../../static/image/store/camera.png")
                        view(class="mt5")
                            text(class="xing") *
                            text(class="fs24 cor") 上传图片
                view(class="btn_wrap")
                    view(class="btn-default") 提交签到
            view(v-else)
                view(class="df jcsb p25")
                    view(class="jilu-nav curr-nav") 全部
                    view(class="jilu-nav") 今日
                    view(class="jilu-nav") 本月
                    view(class="jilu-nav") 自定义
                view(class="jilu-list")
                    view(class="jilu-item bk_f")
                        view(class="jl-item-top p25 bb1")
                            view(class="fs28 cor fwb5") 门店名称名称名称
                            view(class="fs24 cor_9 df jcsb mt15")
                                view() 拜访时间
                                view() 2020-05-09 18:30
                        view(class="bf-xq df ai-center jcsb")
                            view(class="df ai-center")
                                view(class="bar")
                                view(class="fs28 cor ml15 fwb4") 商品
                            image(class="arrow" src="../../static/image/arrow-down.png")
                        view(class="pl25")
                            view(class="df")
                                view(class="fs24 cor") 拜访日记
                                view(class="jl-text") 内容文案文案文案文案文案文案文案文案文案备内容文案文案文案文案文案文案文案文案文案备内容文案文案文案文案文案文案文案文案文案备
                            view(class="df mt25") 
                                view(class="fs24 cor") 门店图片
                                view(class="df")
                                    image(src="" class="bg_sky jl-store-img")
                            





                

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
           
        }
    }
</script>
<style lang="stylus">
    @import "./store-visit"
</style>
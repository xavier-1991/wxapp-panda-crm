<template lang="pug">
    view
        view(class="search-wrap")
            search(@outKeyWord="outKeyWord")
            view(class="df jcsb mt20")
                view(class="nav curr-nav") 全部
                view(class="nav") 今日
                view(class="nav") 本月
                view(class="nav") 自定义
                view(class="nav df jcc ai-center")
                    text 筛选
                    image(class="arrow ml5" src="../../static/image/arrow-down.png")
        view(class="list")
            view(class="item df" v-for="(item,index) in 5" :key="index")
                image(src="" class="store-img bg_sky")
                view(class="item-main")
                    view(class="df jcsb ai-center")
                        view(class="textFlow store-name") 门店名称
                        view(class="df")
                            view(class="tag") 单体
                            view(class="tag tag4 ml15") 未下单
                    view(class="df jcsb ai-end")
                        view(class="fs24 cor_9")
                            view(class="mt-x") 王小二 18888888888
                            view(class="mt-x") 安徽安徽安徽安徽安徽安徽安徽
                        view(class="df")
                            image(class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                            image(class="btn-img" src="../../static/image/other/latent-addr.png")
                    view(class="df jcsb mt30")
                        view(class="btn0") 编辑
                        view(class="btn0 btn1") 拜访
        view(class="mask" v-if="0")
            view(class="filter")
                view(class="f-item")
                    view(class="f-title") 门店类型
                    view(class="df")
                        view(class="f-tag curr-f-tag mr-y") 单体门店
                        view(class="f-tag") 连锁门店
                view(class="f-item")
                    view(class="f-title") 门店状态
                    view(class="df")
                        view(class="f-tag  mr-y") 正常
                        view(class="f-tag") 关闭
                view(class="f-item")
                    view(class="f-title") 审核状态
                    view(class="df")
                        view(class="f-tag mr-y") 待审核
                        view(class="f-tag mr-y") 审核通过
                        view(class="f-tag") 审核未通过
                view(class="f-item")
                    view(class="f-title") 下单记录
                    view(class="df")
                        view(class="f-tag mr-y") 注册未下单
                        view(class="f-tag") 已下单
                view(class="f-btn-wrap df")
                    view(class="f-btn f-btn1") 取消
                    view(class="f-btn f-btn2") 确定

                



        











        //- tabbar 
        tabbar(currTabbar="store-manage")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
import search from "../../components/search/search"
import tabbar from "../../components/tabbar/tabbar.vue";
export default {
    data(){
        return {

        }
    },
    components:{
        search,
        tabbar
    },
    onLoad(){

    },
    methods: {
        outKeyWord(e){
            console.log(e);
        }
    }
}
</script>
<style lang="stylus">
    @import "./store-manage"
</style>
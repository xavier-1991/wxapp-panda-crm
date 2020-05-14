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
            view(class="item df")
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
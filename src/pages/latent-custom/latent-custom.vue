<template lang="pug">
    view
        view(class="search-wrap")
            search(@outKeyWord="outKeyWord")
        view(class="p25lr" style="margin-top:114rpx;")
            view(class="fs28 cor fwb5") 门店列表
            view(class="list")
                view(class="item" v-for="(item,index) in 8" :key="index")
                    view(class="df jcsb")
                        view(class="fs28 cor textFlow store-name") 门店名称门店名称门店名称门店名称门店名称门店名称门店名称
                        view(class="fs24 cor_9") 距离3km
                    view(class="df jcsb ai-end")
                        view(class="fs24 cor_9")
                            view(class="mt-x") 王小二 18888888888
                            view(class="mt-x") 安徽安徽安徽安徽安徽安徽安徽
                        view(class="df")
                            image(class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                            image(class="btn-img" src="../../static/image/other/latent-addr.png")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
import search from "../../components/search/search"
export default {
    data(){
        return {

        }
    },
    components:{
        search
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
    @import "./latent-custom"
</style>
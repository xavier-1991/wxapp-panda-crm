<template lang="pug">
    view(class="wrap")
        view(class="top")
            view(class="df jcsba top-nav bk_f")
                view(class="top-item re curr-top") 门店列表
                view(class="top-item re") 潜在客户
            view(class="search1")
                view(class="df jcsb ai-center")
                    view(class="df jcsb input-wrap")
                        view(class="df ai-center")
                            image(class="search-img" src="../../static/image/search/search.png")
                            input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keyWord" @input="inputKeyWrod")
                        image(@tap="clear" class="search-del" src="../../static/image/search/del.png")
                    view(class="se") 搜索
        view(class="main")
            view(class="p25lr" style="margin-top:114rpx;")
                view(class="fs28 cor fwb5") 门店列表
                //- 门店列表
                view(class="list" v-if="0")
                    view(class="item" v-for="(item,index) in 8" :key="index")
                        view(class="df jcsb")
                            view(class="fs28 cor textFlow store-name") 门店名称门店名称门店名称门店名称门店名称门店名称门店名称
                            view(class="fs24 cor_9") 距离3km
                        view(class="df jcsb ai-end")
                            view(class="fs24 cor_9")
                                view(class="mt-x") 安徽安徽安徽安徽安徽安徽安徽
                //- 潜在客户
                view(class="list" v-else)
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
    @import "./store-choose"
</style>
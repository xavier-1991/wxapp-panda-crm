<template lang="pug">
    view()
        view(class="df jcsb ai-center search-box")
            view(class="df jcsb input-wrap")
                view(class="df ai-center inp-left")
                    image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                    input(class="search-inp" placeholder="请输入业务员名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
            view(class="se" @tap="toSearch") 搜索
        view(class="list bk_f pl25")
            view(class="fs24 cor_9") 转移门店给其他业务员
            view(class="item bb1 df jcsb ai-center" v-for="(item,index) in 5" :key="index")
                view(class="fs28 cor") 王晓二
                image(class="sel-img" src="../../static/image/store/selected-no.png")
        view(class="btn_wrap")
            view(class="btn-default" @tap="toSend") 确定转移

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
           
        };
    },
    onLoad() {
       
    },
    methods: {
       
    }
};
</script>
<style lang="stylus">
@import './store-move-people';
</style>
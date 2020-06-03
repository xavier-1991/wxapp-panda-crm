<template lang="pug">
    view()
        view(class="df jcsb ai-center search-box")
            view(class="df jcsb input-wrap")
                view(class="df ai-center inp-left")
                    image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                    input(class="search-inp" placeholder="请输入门店名称/订单号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
            view(class="se" @tap="toSearch") 搜索
        //- 其他条件筛选
        view(class="c-filter")
            view(class="c-f-item df ai-center")
                view(class="c-f-item-l") 创建时间
                view(class="df ai-center fs24")
                    view(class="re")
                        view(class="df ai-center jcsb c-date-box")
                            input(class="c-date-inp" v-model="startTime" placeholder='开始时间' :disabled='true' placeholder-class='c-date-pl')
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        picker(class="c-date-picker" :value="startTime" :end="dateNow" mode="date" @change="chooseStart") 11
                    view(class="c-date-line")
                    view(class="re")
                        view(class="df ai-center jcsb c-date-box")
                            input(class="c-date-inp" v-model="endTime" placeholder='结束时间' :disabled='true' placeholder-class='c-date-pl')
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        picker(class="c-date-picker" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") 12
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l") 业务员
                view(class="c-yewu-box df ai-center")
                     image(@tap="" class="c-y-search-img" src="../../static/image/search/search.png")
                     input(class="c-y-inp" placeholder="全部" placeholder-class='c-y-inp-pl')
                     image(class="c-y-down" src="../../static/image/arrow-down.png")
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l") 区域
        //- 门店列表
        view(class="list mt25")
            view(class="l-title bb1 p25lr df jcsb ai-center")
                view(class="df ai-center")
                    image(class="sel-img" src="../../static/image/store/selected-no.png")
                    view(class="fs28 cor ml20") 全选
                view(class="fs28 cor_blue" @tap="toStoreMovePeople") 批量转移 
            view(class="item pt20 df" v-for="(item,index) in 5" :key="index")
                image(class="sel-img p25lr fls0" src="../../static/image/store/selected-no.png")
                view(class="item-r bb1")
                    view(class="df jcsb")
                        view(class="fs28 cor textFlow i-s-name") 门店名称门店名称门店名称
                        view(class="fs28 cor_blue mr25") 转移
                    view(class="mt-x fs24 cor_9")
                        text() 王小二
                        text(class="ml5") 16999999993
                    view(class="mt-x fs24 cor_9 textFlow i-s-addr") 安徽省地址安徽省地址安徽省地址安徽省地址安徽省地址
                        
                
               
            



</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            keywords:"",
            startTime: "",
            endTime: "",
        };
    },
    onLoad() {
        
    },
    methods: {
        toStoreMovePeople(){
            util.linkto("store-move-people");
        }
    }
};
</script>
<style lang="stylus">
    @import './store-move'
</style>
<template lang="pug">
    view
        //- 头部信息
        view(class="header re")
            image(class="banner" src="../../static/index/banner.png")
            view(class="re header-main")
                image(class="bg0" src="../../static/index/bg0.png")
                view(class="data") 
                    view(class="data-title") 本月数据
                    view(class="df mt20")
                        view(class="data-item")
                            view(class="item-num") 21
                            view(class="item-text") 新增下单门店
                        view(class="data-item")
                            view(class="item-num") 22399884.00
                            view(class="item-text") 销售额(元)
                        view(class="data-item")
                            view(class="item-num") 21
                            view(class="item-text") 累计下单门店
        //- 待办事项
        view(class="section mt20")
            view(class="title") 待办事项
            view(class="mt15 df jcsb")
                view(class="re todo-item")
                    image(class="toDoImg" src="../../static/index/bg1.png")
                    view(class="todo-item-main")
                        view(class="df ai-center jcsb")
                            view(class="fs24 cor") 待审核门店
                            image(class="arrow-right" src="../../static/arrow-right.png")
                        view(class="todo-num") 12
                view(class="re todo-item")
                    image(class="toDoImg" src="../../static/index/bg2.png")
                    view(class="todo-item-main")
                        view(class="df ai-center jcsb")
                            view(class="fs24 cor") 待发货订单
                            image(class="arrow-right" src="../../static/arrow-right.png")
                        view(class="todo-num") 102
                view(class="re todo-item")
                    image(class="toDoImg" src="../../static/index/bg3.png")
                    view(class="todo-item-main")
                        view(class="df ai-center jcsb")
                            view(class="fs24 cor") 已注册未下单
                            image(class="arrow-right" src="../../static/arrow-right.png")
                        view(class="todo-num") 12
        //- 数据分析
        view(class="section")
            view(class="title") 数据分析
            view(class="mt15 df jcsba analysis")
                view(class="analysis-item")
                    view(class="df jcc")
                        image(class="icon" src="../../static/index/icon1.png")
                    view(class="fs24 cor mt10") 门店拜访
                view(class="analysis-item")
                    view(class="df jcc")
                        image(class="icon" src="../../static/index/icon2.png")
                    view(class="fs24 cor mt10") 潜在客户
                view(class="analysis-item")
                    view(class="df jcc")
                        image(class="icon" src="../../static/index/icon3.png")
                    view(class="fs24 cor mt10") 数据统计
        //- 本月新增门店
        view(class="section")
            view(class="title") 本月新增门店
            view(class="mt15 newly-added")
                view(class="newly-item df ai-center jcsb" v-for="(item,index) in 10" :key="index")
                    view(class="textFlow newly-store") 门店名称文案文案门店名称文案文案
                    viwe(class="df ai-center")
                        view(class="btn_wrap df")
                            view(class="btn-item") 已审核
                            view(class="btn-item btn-item-gray") 未下单
                        image(class="arrow-right" src="../../static/arrow-right.png")
        
        
        //- tabbar 
        tabbar(currTabbar="index")

                    
</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
import tabbar from "../../components/tabbar/tabbar.vue";
export default {
    data(){
        return {

        }
    },
    components:{
        tabbar
    },
    onLoad(){

    },
    methods: {
        
    }
}
</script>
<style lang="stylus">
    @import "./index"
</style>
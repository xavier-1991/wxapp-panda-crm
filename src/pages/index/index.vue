<template lang="pug">
    view
        //- 已登录
        view(v-if="1" style="padding-bottom:200rpx")
            //- 头部信息
            view(class="header re")
                image(class="banner" src="../../static/image/index/banner.png")
                view(class="re header-main")
                    image(class="bg0" src="../../static/image/index/bg0.png")
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
                        image(class="toDoImg" src="../../static/image/index/bg1.png")
                        view(class="todo-item-main")
                            view(class="df ai-center jcsb")
                                view(class="fs24 cor") 待审核门店
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                            view(class="todo-num") 12
                    view(class="re todo-item")
                        image(class="toDoImg" src="../../static/image/index/bg2.png")
                        view(class="todo-item-main")
                            view(class="df ai-center jcsb")
                                view(class="fs24 cor") 待发货订单
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                            view(class="todo-num") 102
                    view(class="re todo-item")
                        image(class="toDoImg" src="../../static/image/index/bg3.png")
                        view(class="todo-item-main")
                            view(class="df ai-center jcsb")
                                view(class="fs24 cor") 已注册未下单
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                            view(class="todo-num") 12
            //- 数据分析
            view(class="section")
                view(class="title") 数据分析
                view(class="mt15 df jcsba analysis")
                    view(class="analysis-item" @tap="toStoreVisit")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon1.png")
                        view(class="fs24 cor mt10") 门店拜访
                    view(class="analysis-item" @tap="toLatentCustom")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon2.png")
                        view(class="fs24 cor mt10") 潜在客户
                    view(class="analysis-item" @tap="toDataAnalysis")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon3.png")
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
                            image(class="arrow-right" src="../../static/image/arrow-right.png")
            
            
            //- tabbar 
            tabbar(currTabbar="index")
        view(v-else class="wrap re")
            image(class="bg" mode="widthFix" src="../../static/image/login/login-bg.png")
            view(class="main")
                view(class="action df jcc")
                    image(src="../../static/image/index/action.png")
                view(class="cor fs36 fwb5 mt40 tac") 潘德妈妈crm平台
                view(class="mt40 tac") 
                    text(class="cor fs28 fwb4") 让员工快捷管理门店\n查看数据统计及订单信息
                view(class="btn_wrap2")
                    view(class="btn-default") 立即进入


                    
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
        toLatentCustom(){
            util.linkto('latent-custom');
        },
        toStoreVisit(){
            util.linkto('store-visit');
        },
        toDataAnalysis(){
            util.linkto('data-analysis');
        }
    }
}
</script>
<style lang="stylus">
    @import "./index"
</style>
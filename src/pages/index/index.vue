<template lang="pug">
    view(class="wrap")
        //- 已登录
        view(v-if="hasData" style="padding-bottom:200rpx")
            //- 头部信息
            view(class="header re")
                image(class="banner" src="../../static/image/index/banner.png")
                view(class="re header-main")
                    image(class="bg0" src="../../static/image/index/bg0.png")
                    image(v-if="roleType==2" class="month-img" src="../../static/image/index/sales-support/title.png")
                    image(v-else class="month-img" src="../../static/image/index/month-data.png")
                    view(class="data") 
                        //- 重要信息（销售支持）
                        view(class="df" style="margin-top:72rpx" v-if="roleType==2")
                            view(class="data-item")
                                view(class="item-num") 12
                                view(class="item-text") 待审核门店
                            view(class="data-item")
                                view(class="item-num") 23453453
                                view(class="item-text") 待审核商品
                            view(class="data-item")
                                view(class="item-num") 23523423
                                view(class="item-text") 待发货订单
                        //- 本月数据（业务员，省区经理）
                        view(v-else class="df" style="margin-top:72rpx")
                            view(class="data-item")
                                view(class="item-num") {{data.newAddedOrderStoreNum}}
                                view(class="item-text") 新增下单门店
                            view(class="data-item")
                                view(class="item-num") {{data.monthGmv}}
                                view(class="item-text") 销售额(元)
                            view(class="data-item")
                                view(class="item-num") {{data.monthOrderStoreCount}}
                                view(class="item-text") 累计下单门店
            //- 省区经理功能栏
            view(class="section3 mt30 mb30" v-if="roleType==1")
                view(class="section2 df jcsba bk_f mt15")
                    view(class="analysis-item" @tap="toStoreMove")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon0.png")
                        view(class="fs24 cor mt10") 门店转移
                    view(class="analysis-item" @tap="toLatentCustom")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon2.png")
                        view(class="fs24 cor mt10") 潜在客户
                    view(class="analysis-item" @tap="toDataAnalysis")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon3.png")
                        view(class="fs24 cor mt10") 数据统计
            //- 待办事项 (业务员显示)
            view(class="section3 mt30" v-if="roleType==0")
                view(class="title") 待办事项
                view(class="mt15 df jcsb")
                    view(class="re todo-item" @tap="toStore('audit','0')")
                        image(class="toDoImg" src="../../static/image/index/bg1.png")
                        view(class="todo-item-main")
                            view(class="df ai-center jcsb")
                                view(class="fs24 cor") 待审核门店
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                            view(class="todo-num") {{data.toBeReviewedStoreCount}}
                    view(class="re todo-item" @tap="toOrder('status',20)")
                        image(class="toDoImg" src="../../static/image/index/bg2.png")
                        view(class="todo-item-main")
                            view(class="df ai-center jcsb")
                                view(class="fs24 cor") 待发货订单
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                            view(class="todo-num") {{data.toBeDeliveredCount}}
                    view(class="re todo-item" @tap="toStore('orderOrNot','0')")
                        image(class="toDoImg" src="../../static/image/index/bg3.png")
                        view(class="todo-item-main")
                            view(class="df ai-center jcsb")
                                view(class="fs24 cor") 已注册未下单
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                            view(class="todo-num") {{data.noOrderPlacedCount}}
            //- 数据分析 (业务员显示)
            view(class="section3 mt30 mb30" v-if="roleType==0")
                view(class="title") 数据分析
                view(class="section2 df jcsba bk_f mt15")
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
                    view(class="analysis-item" @tap="toWorkOrder")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/icon4.png")
                        view(class="fs24 cor mt10 tac") 工单
            //- 销售支持功能栏
            view(class="section3 mt30 mb30" v-if="roleType==2")
                view(class="section2 df jcsba bk_f mt15")
                    view(class="analysis-item" @tap="toRedPackets")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/sales-support/icon-01.png")
                        view(class="fs24 cor mt10") 发红包
                    view(class="analysis-item" @tap="toWorkOrder")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/sales-support/icon-02.png")
                        view(class="fs24 cor mt10") 工单
                    view(class="analysis-item" @tap="toSalesList")
                        view(class="df jcc")
                            image(class="icon" src="../../static/image/index/sales-support/icon-03.png")
                        view(class="fs24 cor mt10") 业务员管理
            //- 管理中心 (销售支持)
            view(class="section3 mt30 mb30" v-if="roleType==2")
                view(class="title") 管理中心
                view(class="df jcsb mt15")
                    view(class="df jcc ai-center sup-wrap" @tap="toStore('audit','0')")
                        image(src="../../static/image/index/sales-support/icon-05.png" class="sup-icon")
                        view(class="sup-text") 门店审核
                        image(class="arrow-right" src="../../static/image/arrow-right.png")
                    view(class="df jcc ai-center sup-wrap sup-wrap2" @tap="toGoodsList")
                        image(src="../../static/image/index/sales-support/icon-06.png" class="sup-icon")
                        view(class="sup-text") 商品审核
                        image(class="arrow-right" src="../../static/image/arrow-right.png")
            //- 本月新增门店
            view(class="section3")
                view(class="title") 本月新增门店
                scroll-view(:scroll-y="true" class="scroll-view mt15" @scrolltolower="scrolltolower")
                    view(class="newly-added")
                        view(class="newly-item df ai-center jcsb" v-for="(item,index) in list" :key="index" @tap="toStore('keywords',item.mobile)")
                            view(class="textFlow newly-store") {{item.name}}
                            viwe(class="df ai-center")
                                view(class="btn_wrap df")
                                    view(:class="['btn-item',item.audit===1?'':'btn-item-gray']") {{item.auditStr}}
                                    view(v-if="item.audit===1" :class="['btn-item',item.orderOrNot===1?'':'btn-item-gray']") {{item.orderOrNotStr}}
                                image(class="arrow-right" src="../../static/image/arrow-right.png")
                        view(v-if="showLoadMoreLoading")
                            bottom-bar(bottomType="loading")
                        view(v-if="isReachBottom")
                            bottom-bar(bottomType="noMore")
                        view(v-if="!list.length" class="no-list") 暂无数据
            //- tabbar 
            tabbar(currTabbar="index")
        //- 引导页
        view(v-if="actionShow" class="wrap re" :style="{'height':wh+'px'}")
            image(class="bg" mode="widthFix" src="../../static/image/login/login-bg.png")
            view(class="main")
                view(class="action df jcc")
                    image(src="../../static/image/index/action.png")
                view(class="cor fs36 fwb5 mt40 tac") 潘德妈妈crm平台
                view(class="mt40 tac") 
                    text(class="cor fs28 fwb4") 让员工快捷管理门店\n查看数据统计及订单信息
                view(class="btn_wrap2")
                    view(class="btn-default" @tap="toLogin") 立即进入
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import tabbar from "../../components/tabbar/tabbar.vue";
import bottomBar from "../../components/template/bottom-bar/bottom-bar";
export default {
    data() {
        return {
            hasData: false,
            data:{},
            list:[],
            page:1,
            count:0,
            pageTotal:0,
            showLoadMoreLoading:false,
            isReachBottom: false,
            actionShow:false,
            wh:0,
            roleType:0
        };
    },
    components: {
        tabbar,
        "bottom-bar": bottomBar
    },
    onLoad() {
        this.roleType=2||pd.getRoleType();
        let that=this;
        uni.getSystemInfo({
            success: function (res) {
                //用于未登录状态下底部背景为白色
                that.wh=res.windowHeight;
            }
        });
        let userInfo = pd.getUserInfo();
        let token = userInfo ? userInfo.token:'';
        let nowTime=Math.ceil(new Date().getTime()/1000);
        if (userInfo && userInfo.token && nowTime < userInfo.tokenExpireTime){
            this.loadData();
            this.loadStoreList();
        }else{
            this.actionShow=true;
        } 
        
    },
    onPullDownRefresh() {
        this.page=1;
        this.loadData();
        this.loadStoreList();
    },
    onShareAppMessage: function (res) {
        return {
        title: '欢迎进入潘德妈妈CRM小程序 ',
        path: '/pages/index/index'
        }
    },
    methods: {
        scrolltolower() {
            if (this.showLoadMoreLoading) {
                return;
            }
            if (this.page >= this.pageTotal) {
                this.isReachBottom = true;
                return;
            }
            this.page += 1;
            this.loadStoreList();
        },
        loadData() {
            util.showLoadingDialog("加载中");
            http.request(
                urls.SALESMAN,
                "GET"
            ).then(data => {
                this.data=data;
                util.hideLoadingDialog();
            }).finally(()=>{
                uni.stopPullDownRefresh();
            })
        },
        loadStoreList(){
            if (this.page == 1) {
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            let params={
                page:this.page
            }
            http.request(
                urls.STORE_LIST,
                "GET",
                params
            ).then(data => {
                if(this.page==1){
                    this.count=data.count;
                    this.pageTotal=data.pageTotal;
                    this.list=data.list;
                    this.hasData=true;
                }else{
                    this.list=[...this.list,...data.list];
                }
            }).finally(()=>{
                this.showLoadMoreLoading = false;
                util.hideTopLoading();
            })
        },
        toLatentCustom() {
            util.linkto("latent-custom");
        },
        toStoreVisit() {
            util.linkto("store-visit");
        },
        toDataAnalysis() {
            util.linkto("data-analysis");
        },
        toStoreMove(){
            util.linkto("store-move");
        },
        toWorkOrder(){
            util.linkto("work-order");
        },
        toGoodsList(){
            util.linkto("goods-list");
        },
        toSalesList(){
            util.linkto('sales-list');
        },
        toRedPackets(){
            util.linkto('red-packets');
        },
        toLogin(){
            util.reLaunch("login");
        },
        toStore(params,data){
            if(params){
                this.$globalData.tabbarPramas={[params]:data};
            }
            util.linkto('store-manage');
        },
        toOrder(params,data){
            this.$globalData.tabbarPramas={[params]:data};
            util.linkto('order-list');
        }
    }
};
</script>
<style lang="stylus">
@import './index'
</style>
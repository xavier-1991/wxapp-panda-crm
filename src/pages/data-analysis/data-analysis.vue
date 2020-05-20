<template lang="pug">
    view(class="wrap" v-if="1")
        view(class="top df ai-center re bk_f")
            view(class="top-item")
                view(class="fs40 cor fwb5") 2019
                view(class="fs24 cor fwb4 mt10") 全部门店
            view(class="top-item")
                view(class="fs40 cor fwb5") 223316
                view(class="fs24 cor fwb4 mt10") 全部潜在客户
        view(class="df jcsb nav-wrap")
            view(class="nav curr-nav") 今日
            view(class="nav") 昨日
            view(class="nav") 本月
            view(class="nav") 上月
            view(class="nav") 选择时间
        view(class="df ai-center fs24 pb10" v-if="1")
            view() 2019/09/09 - 2020/02/09
            view(class="reChoose") 重新选择
        view()
            view(class="fwb5 cor fs28 mt10") 数据统计
            view(class="data re mt30")
                image(src="../../static/image/index/bg-data.png")
                view(class="data-main")
                    view(class="data-main-sec df")
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") 2019
                            view(class="fs24 cor fwb4 mt10") 全部门店
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") 19
                            view(class="fs24 cor fwb4 mt10") 新增拜访
                    view(class="data-main-sec df")
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") 2
                            view(class="fs24 cor fwb4 mt10") 新增下单门店
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") 20
                            view(class="fs24 cor fwb4 mt10") 新增潜在客户
        view()
            view(class="fwb5 cor fs28 mt30" @tap="changeData") 订单分析
            view(class="order mt30")
                view(class="df jcfe")
                    view(class="order-top") 
                        text 客单价格：
                        text 1800元
                view(class="df jcc canvas-wrap")
                    view(class="qiun-charts")
                        canvas(canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie")
                view()
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot1")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot2")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 已经付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot3")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot4")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot5")
                        view(class="order-r df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
        

            


</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import uCharts from "../../components/u-charts/u-charts";
var _self;
var canvaPie = null;
export default {
    data() {
        return {
            hasData:false,
            data:null,
            //请求参数
            type:"today",
            startTime:"",
            endTime:"",
            //图表数据
            cWidth: "",
            cHeight: "",
            pixelRatio: 1,
            chartData:{
                "series": [{
                    "name": "一班",
                    "data": 50
                }, {
                    "name": "二班",
                    "data": 30
                }, {
                    "name": "三班",
                    "data": 20
                }, {
                    "name": "四班",
                    "data": 18
                }, {
                    "name": "六班",
                    "data": 8
                }]
            },
            chartData2:{
                "series": [{
                    "name": "一班",
                    "data": 3
                }, {
                    "name": "二班",
                    "data": 3
                }, {
                    "name": "三班",
                    "data": 20
                }, {
                    "name": "四班",
                    "data": 18
                }, {
                    "name": "六班",
                    "data": 8
                },
                 {
                    "name": "8班",
                    "data": 8
                }]
            },
        }
    },
    onLoad() {
        //this.loadData();
        this.creatCanvas();
    },
    methods: {
        loadData(){
            util.showLoadingDialog('加载中');
            let params={
                type:this.type
            }
            if(this.startTime){
                params.startTime=startTime;
                params.endTime=endTime;
            }
            http.request(
                urls.STATISTICS,
                "GET",
                params
            ).then(data => {
                this.data=data;
                this.hasData=data;
                util.hideLoadingDialog();
            })
        },
        creatCanvas() {
            _self = this;
            this.cWidth = uni.upx2px(700);
            this.cHeight = uni.upx2px(500);
            this.getServerData();
        },
        getServerData() {
            let Pie =this.chartData;
             _self.textarea = JSON.stringify(this.chartData);
            _self.showPie("canvasPie", Pie);
        },
        showPie(canvasId, chartData) {
            canvaPie = new uCharts({
                $this: _self,
                canvasId: canvasId,
                type: "pie",
                fontSize: 11,
                legend: { show: true },
                background: "#FFFFFF",
                pixelRatio: _self.pixelRatio,
                series: chartData.series,
                animation: true,
                width: _self.cWidth * _self.pixelRatio,
                height: _self.cHeight * _self.pixelRatio,
                dataLabel: true,
                extra: {
                    pie: {
                        lableWidth: 15
                    }
                }
            });
        },
        touchPie(e) {
            canvaPie.showToolTip(e, {
                format: function(item) {
                    return item.name + ":" + item.data;
                }
            });
        },
        changeData() {
             canvaPie.updateData({
                series: this.chartData2.series
            });
        }
    }
};
</script>
<style lang="stylus">
@import './data-analysis'
</style>
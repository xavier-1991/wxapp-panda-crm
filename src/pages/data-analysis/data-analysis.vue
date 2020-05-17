<template lang="pug">
    view(class="wrap")
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
            view(class="fwb5 cor fs28 mt30") 订单分析
            view(class="order mt30")
                view(class="df jcfe")
                    view(class="order-top") 
                        text 客单价格：
                        text 1800元
                view(class="df jcc canvas-wrap")
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
import uCharts from "../../components/uCharts-for-UNIAPP/u-charts";
var _self;
var canvaPie = null;
export default {
    data() {
        return {
            cWidth: "",
            cHeight: "",
            pixelRatio: 1,
            serverData: ""
        };
    },
    components: {
        uCharts
    },
    onLoad() {
        this.creatCanvas();
    },
    methods: {
        creatCanvas() {
            _self = this;
            this.cWidth = uni.upx2px(750);
            this.cHeight = uni.upx2px(500);
            this.getServerData();
        },
        getServerData() {
            uni.request({
                url: "https://www.ucharts.cn/data.json",
                data: {},
                success: function(res) {
                    console.log(res.data.data);
                    let Pie = { series: [] };
                    //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                    Pie.series = res.data.data.Pie.series;
                    _self.showPie("canvasPie", Pie);
                },
                fail: () => {
                    _self.tips = "网络错误，小程序端请检查合法域名";
                }
            });
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
        }
    }
};
</script>
<style lang="stylus">
@import './data-analysis'
</style>
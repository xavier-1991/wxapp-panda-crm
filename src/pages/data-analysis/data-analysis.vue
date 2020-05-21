<template lang="pug">
    view(class="wrap" v-if="hasData")
        view(class="top df ai-center re bk_f")
            view(class="top-item")
                view(class="fs40 cor fwb5") {{data.allStoreCount}}
                view(class="fs24 cor fwb4 mt10") 全部门店
            view(class="top-item")
                view(class="fs40 cor fwb5") {{data.allCustomerCount}}
                view(class="fs24 cor fwb4 mt10") 全部潜在客户
        view(class="df jcsb nav-wrap")
            view(:class="['nav',state=='today'?'curr-nav':'']" @tap="changType('today')") 今日
            view(:class="['nav',state=='yesterday'?'curr-nav':'']" @tap="changType('yesterday')") 昨日
            view(:class="['nav',state=='month'?'curr-nav':'']" @tap="changType('month')") 本月
            view(:class="['nav',state=='lastMonth'?'curr-nav':'']" @tap="changType('lastMonth')") 上月
            view(:class="['nav',state=='custom'?'curr-nav':'']" @tap="changType('custom')") 选择时间
        view(class="df ai-center fs24 pb10" v-if="showTimeRange")
            view(class="cor_9") {{startTime}} - {{endTime}}
        view()
            view(class="fwb5 cor fs28 mt10") 数据统计
            view(class="data re mt30")
                image(src="../../static/image/index/bg-data.png")
                view(class="data-main")
                    view(class="data-main-sec df")
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") {{data.newerStoreCount}}
                            view(class="fs24 cor fwb4 mt10") 新增门店
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") {{data.newerVisited}}
                            view(class="fs24 cor fwb4 mt10") 新增拜访
                    view(class="data-main-sec df")
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") {{data.newerStoreCountByOrder}}
                            view(class="fs24 cor fwb4 mt10") 新增下单门店
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") {{data.newerCustomer}}
                            view(class="fs24 cor fwb4 mt10") 新增潜在客户
        view()
            view(class="fwb5 cor fs28 mt30") 订单分析
            view(class="order mt30")
                view(class="df jcfe")
                    view(class="order-top") 
                        text 客单价格：
                        text {{data.userAvgPrice}}元
                view(v-if="chartData.series.length")
                    view(class="df jcc canvas-wrap")
                        view(class="qiun-charts")
                            canvas(canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie")
                    view()
                        view(class="df ai-center" v-for="(item,index) in chartData.series" :key="index")
                            view(class="dot-wrap df jcc")
                                view(class="dot" :style="{background:item.color}")
                            view(class="order-r bb1 df ai-center jcsb fs28 cor")
                                view(class="df ai-center")
                                    view(class="or-1") {{item.name}}订单
                                    view(class="or-2") {{item.data}}笔
                                view(class="or-3") ￥{{item.totalPrice}}
                view(v-else class="no-list") 暂无相关数据
                   
        //- 时间选择器
        <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" color="#1677FE" :showHoliday="false" begin-text="开始" end-text="结束"  @confirm="onSelected" @cancel="onSelected" />
        

            


</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import uCharts from "../../components/u-charts/u-charts";
import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue";
var _self;
var canvaPie = null;
export default {
    data() {
        return {
            hasData: false,
            data: null,
            showTimeRange: false,
            //请求参数
            state: "today",
            startTime: "",
            endTime: "",
            //图表数据
            cWidth: "",
            cHeight: "",
            pixelRatio: 1,
            chartData: {
                series: []
            },
            // 时间选择器插件数据
            showPicker: false,
            type: "range",
            value: ""
        };
    },
    components: {
        MxDatePicker
    },
    onLoad() {
        this.loadData();
    },
    onPullDownRefresh() {
        this.state = "today";
        this.startTime = "";
        this.endTime = "";
        this[this.type] = ""; //清除上次时间选择在日历上的样式渲染
        this.loadData();
    },
    methods: {
        loadData() {
            util.showLoadingDialog("加载中");
            let params = {
                type: this.state
            };
            if (this.state == "custom" && this.startTime) {
                params.startTime = this.startTime;
                params.endTime = this.endTime;
            }
            http.request(urls.STATISTICS, "GET", params)
                .then(data => {
                    this.data = data;
                    this.hasData = true;
                    this.formatPieData(data.statistics);
                    util.hideLoadingDialog();
                })
                .finally(() => {
                    uni.stopPullDownRefresh();
                });
        },
        changType(state) {
            if (this.state == state && this.state != "custom") {
                return;
            }
            this.state = state;
            if (this.state == "custom") {
                if (this.startTime) {
                    //点击自定义 已经选过时间：显示已选时间，并加载数据
                    this.showTimeRange = true;
                    this.loadData();
                } else {
                    //点击自定义 没选过时间：隐藏已选时间，弹起时间控件
                    this.showTimeRange = false;
                    this.showPicker = true;
                }
            } else {
                //点击除自定义以外的：隐藏已选时间, 并加载数据
                this.showTimeRange = false;
                this.loadData();
            }
        },
        reChooseTime() {
            this.showPicker = true;
        },
        // uCharts 饼图方法
        formatPieData(data) {
            let series = data.map(item => {
                /*  status
                0   => '待付款',
                10  => '已取消',
                20  => '待发货',
                30  => '退款中',
                50  => '已退款',
                60  => '待收货',
                70  => '待评价',
                */
                let obj = {
                    name: item.statusStr,
                    data: item.orderCount,
                    totalPrice: item.totalPrice
                };
                // switch (item.status) {
                //     case 0:
                //         obj.color="#6FD0A4"
                //         break;
                //     case 10:
                //         obj.color="#8EB8FF"
                //         break;
                //     case 20:
                //         obj.color=""
                //         break;
                //     case 30:
                //         obj.color="#6FD0A4"
                //         break;
                //     case 0:
                //         obj.color="#6FD0A4"
                //         break;
                //     case 0:
                //         obj.color="#6FD0A4"
                //         break;
                //     case 0:
                //         obj.color="#6FD0A4"
                //         break;

                //     default:
                //         break;
                // }
                return obj;
            });
            this.chartData.series = series;
            if (canvaPie) {
                this.changeData(series);
            } else {
                this.creatCanvas();
            }
        },
        creatCanvas() {
            _self = this;
            this.cWidth = uni.upx2px(700);
            this.cHeight = uni.upx2px(500);
            this.getServerData();
        },
        getServerData() {
            let Pie = this.chartData;
            _self.textarea = JSON.stringify(this.chartData);
            _self.showPie("canvasPie", Pie);
        },
        showPie(canvasId, chartData) {
            canvaPie = new uCharts({
                $this: _self,
                canvasId: canvasId,
                type: "pie",
                fontSize: 11,
                legend: {
                    show: true,
                    position: "right",
                    float: "center",
                    itemGap: 10,
                    padding: 5,
                    lineHeight: 26,
                    margin: 5,
                    borderWidth: 1
                },
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
        changeData(series) {
            canvaPie.updateData({
                series: series
            });
        },
        // 时间选择器方法
        onShowDatePicker(type) {
            //显示
            this.type = type;
            this.showPicker = true;
            this.value = this[type];
        },
        onSelected(e) {
            //选择
            this.showPicker = false;
            if (e) {
                this[this.type] = e.value;
                this.startTime = e.value[0];
                this.endTime = e.value[1];
                this.showTimeRange = true;
                this.loadData();
            }
        }
    }
};
</script>
<style lang="stylus">
@import './data-analysis'
</style>
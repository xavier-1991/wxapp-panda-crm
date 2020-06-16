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
        //- 其他过滤条件
        //- 时间
        view(v-if="state=='custom'" class="c-f-item df ai-center mt25")
            view(class="c-f-item-l") 创建时间
            view(class="df ai-center fs24")
                view(class="df ai-center jcsb c-date-box")
                    picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                    image(src="../../static/image/other/date.png" class="c-date-img")
                view(class="c-date-line")
                view(class="df ai-center jcsb c-date-box")
                    picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                    image(src="../../static/image/other/date.png" class="c-date-img")
        //- 区域
        view(v-if="roleType" class="c-f-item df ai-center mt25")
            view(class="c-f-item-l") 区域
            view(class="c-yewu-box df ai-center" style="width:256rpx;")
                picker(mode='selector' class="c-area-picker pl20 df" :range='areaList' range-key="provinceName" @change="provinceChange") 
                    view(class="df ai-center jcsb" style="width:236rpx")
                        view(:class="['c-area-text',provinceId?'':'c-area-text-empty']") {{provinceName?provinceName:'选择省区'}}
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
            view(class="c-yewu-box df ai-center ml25" style="width:256rpx;")
                picker(mode='selector' class="c-area-picker pl20 df" :range='cityList' range-key="cityName" @change="cityChange") 
                    view(class="df ai-center jcsb" style="width:236rpx")
                        view(:class="['c-area-text',cityId?'':'c-area-text-empty']") {{cityName?cityName:'选择城市'}}
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
        //- 业务员
        view(v-if="roleType" class="c-f-item df ai-center mt25")
            view(class="c-f-item-l") 业务员
            view(class="c-yewu-box df ai-center")
                input(class="c-y-inp" @input="getSalesman(salesman)" v-model="salesman" placeholder="全部" placeholder-class='c-y-inp-pl')
                picker(mode='selector' class="c-yewu-picker" :range='salesmanList' range-key="realName" @change="salesmanChange")
                    image(class="c-y-down" src="../../static/image/arrow-down.png")
            view(class="ml10 fs28 cor_blue p20" @tap="resetAll") 重置
        //- 数据统计
        view()
            view(class="fwb5 cor fs28 mt25 title") 数据统计
            view(class="data re mt30")
                image(src="../../static/image/index/bg-data.png")
                view(class="data-main")
                    view(class="data-main-sec df")
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") {{data.placeOrderCount}}
                            view(class="fs24 cor fwb4 mt10") 下单数量
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") {{data.salesAmount}}
                            view(class="fs24 cor fwb4 mt10") 下单金额
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") {{data.newerStoreCount}}
                            view(class="fs24 cor fwb4 mt10") 新增门店
                    view(class="data-main-sec df")
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") {{data.newerVisited}}
                            view(class="fs24 cor fwb4 mt10") 新增拜访
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") {{data.newerStoreCountByOrder}}
                            view(class="fs24 cor fwb4 mt10") 新增下单门店
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") {{data.newerCustomer}}
                            view(class="fs24 cor fwb4 mt10") 新增潜在客户
        view()
            view(class="fwb5 cor fs28 mt30 title") 订单分析
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
                                    view(class="or-1") {{item.name}}
                                    view(class="or-2") {{item.data}}笔
                                view(class="or-3") ￥{{item.totalPrice}}
                view(v-else class="no-list") 暂无相关数据
        

            


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
            hasData: false,
            data: null,
            showTimeRange: false,
            roleType: pd.getRoleType(),
            //请求参数
            state: "today",
            startTime: "",
            endTime: "",
            dateNow:pd.dateNowStr(),
            salesmanId: 0, //业务员id
            provinceId: 0,
            cityId: 0,
            // 时间选择
            showTime: false,
            dateNow: pd.dateNowStr(),
            //业务员
            salesman: "", //业务员姓名
            salesmanList: [], //展示的业务员列表
            salesmanListAll: [], //全部业务员列表
            //省市
            provinceName: "",
            cityName: "",
            areaList: [], //区域数据总表
            cityList: [],
            //图表数据
            cWidth: "",
            cHeight: "",
            pixelRatio: 1,
            chartData: {
                series: []
            }
        };
    },
    onLoad() {
        this.loadData();
        if (pd.getRoleType()) {
            this.getSalesman();
            this.getArea();
        }
    },
    onPullDownRefresh() {
        this.loadData();
    },
    onUnload(){
        canvaPie = null;
    },
    methods: {
        loadData() {
            util.showLoadingDialog("加载中");
            let params = {
                type: this.state
            };
            if (this.state == "custom" && this.startTime && this.endTime) {
                params.startTime = this.startTime;
                params.endTime = this.endTime;
            }
            if (this.roleType) {
                // 省区经理 销售支持所需数据
                params.salesmanId = this.salesmanId;
                params.provinceId = this.provinceId;
                params.cityId = this.cityId;
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
            if (this.state == "custom" && this.startTime && this.endTime) {
                this.loadData();               
            }
            if(this.state != "custom"){
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
                1  => '待付款',
                2  => '已付款',
                3  => '已成交',
                4  => '已取消',
                5  => '退款订单'
                */
                let obj = {
                    name: item.statusStr,
                    data: item.orderCount,
                    totalPrice: item.totalPrice
                };
                switch (item.status) {
                    case 1:
                        obj.color="#6FD0A4"
                        break;
                    case 2:
                        obj.color="#7085FE"
                        break;
                    case 3:
                        obj.color="#FFA0A0"
                        break;
                    case 4:
                        obj.color="#8EB8FF"
                        break;
                    case 5:
                        obj.color="#BABABA"
                        break;
                }
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
                    show: false,
                    // position: "right",
                    // float: "center",
                    // itemGap: 10,
                    // padding: 5,
                    // lineHeight: 26,
                    // margin: 5,
                    // borderWidth: 1
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
        // 时间选择
        chooseStart(e) {
            this.startTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadData();
            }
        },
        chooseEnd(e) {
            this.endTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadData();
            }
        },
        // 业务员筛选
        getSalesman(salesman) {
            if (!salesman && this.salesmanListAll.length) {
                this.salesmanList = JSON.parse(
                    JSON.stringify(this.salesmanListAll)
                );
                return;
            }
            let params = {};
            if (salesman) {
                params.keywords = salesman;
            }
            http.request(urls.SALESMAN_LIST, "GET", params).then(data => {
                this.salesmanList = data.list;
                if (!salesman) {
                    this.salesmanListAll = data.list;
                }
            });
        },
        salesmanChange(e) {
            let i = e.detail.value * 1;
            this.salesman = this.salesmanList[i].realName;
            this.salesmanId = this.salesmanList[i].id;
            this.page = 1;
            this.loadData();
        },
        // 区域筛选
        getArea(salesman) {
            http.request(urls.AREA_LIST, "GET").then(data => {
                this.areaList = data.list;
            });
        },
        provinceChange(e) {
            let i = e.detail.value * 1;
            this.cityList = this.areaList[i].city;
            this.provinceName = this.areaList[i].provinceName;
            this.provinceId = this.areaList[i].provinceCode;
            this.cityId = 0;
            this.cityName = "";
            this.page = 1;
            this.loadData();
        },
        cityChange(e) {
            let i = e.detail.value * 1;
            this.cityName = this.cityList[i].cityName;
            this.cityId = this.cityList[i].cityCode;
            this.page = 1;
            this.loadData();
        },
        // 重置（全部条件）
        resetAll() {
            // this.state="today";
            this.startTime = "";
            this.endTime = "";
            this.salesmanId = 0;
            this.provinceId = 0;
            this.cityId = 0;
            this.salesman = "";
            this.provinceName = "";
            this.cityName = "";
            this.loadData();
        }
    }
};
</script>
<style lang="stylus">
@import './data-analysis'
</style>
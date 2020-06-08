<template lang="pug">
    view(v-if="hasData")
        view(class="top-wrap")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(v-if="keywords" @tap="clear" class="search-del" src="../../static/image/search/del.png")
                view(v-if="!roleType" class="add" @tap="toAdd") 新增
                view(v-else class="search-btn" @tap="toSearch") 搜索
            //- 其他过滤条件
            //- 时间
            view(v-if="roleType" class="c-f-item df ai-center mt25")
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
        //- 门店列表
        view(class="p25lr")
            view(class="fs28 cor fwb5") 门店列表
            view(class="list")
                view(class="item" v-for="(item,index) in list" :key="index" @tap="toAdd('edit',item.storeId)")
                    view(class="df jcsb")
                        view(class="df ai-center")
                            image(class="store-icon mr5" src="../../static/image/other/store.png")
                            view(class="fs28 cor textFlow store-name") {{item.storeName}}
                        view(class="fs24 cor_9") 距离{{item.distance}}
                    view(class="df jcsb ai-end")
                        view(class="fs24 cor_9")
                            view(class="df ai-center")
                                view(class="df jcc ai-center mr5" style="width:40rpx;height:40rpx")
                                    image(class="time-icon" src="../../static/image/other/person.png")
                                view() {{item.contacts}} {{item.mobile}}
                            view(class="df ai-center")
                                view(class="df jcc ai-center mr5" style="width:40rpx;height:40rpx")
                                    image(class="time-icon" src="../../static/image/other/addr.png")
                                view() {{item.address}}
                        view(class="df")
                            image(@tap.stop="toCall(item.mobile)" class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                            image(@tap.stop="toMap(item)" class="btn-img" src="../../static/image/other/latent-addr.png")
                view(v-if="showLoadMoreLoading")
                    bottom-bar(bottomType="loading")
                view(v-if="isReachBottom")
                    bottom-bar(bottomType="noMore")
                view(v-if="!list.length" class="no-list") 暂无数据


</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import bottomBar from "../../components/template/bottom-bar/bottom-bar";
export default {
    data() {
        return {
            hasData: false,
            data: {},
            list: [],
            count: 0,
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
            roleType: pd.getRoleType(),
            // 参数
            page: 1,
            keywords: "",
            startTime: "",
            endTime: "",
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
            cityList: []
        };
    },
    components: {
        "bottom-bar": bottomBar
    },
    onLoad() {
        if (pd.getRoleType()) {
            this.getSalesman();
            this.getArea();
        }
    },
    onShow() {
        pd.getPosition().then(res => {
            this.lat = res.latitude;
            this.lng = res.longitude;
            this.loadPage();
        });
    },
    onPullDownRefresh() {
        this.page = 1;
        this.keywords = "";
        this.loadPage();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading) {
            return;
        }
        if (this.page >= this.pageTotal) {
            this.isReachBottom = true;
            return;
        }
        this.page += 1;
        this.loadPage();
    },
    methods: {
        clear() {
            this.keywords = "";
        },
        toAdd(type, id = "") {
            util.linkto("latent-custom-add", `type=${type}&id=${id}`);
        },
        toSearch() {
            this.page = 1;
            this.loadPage();
        },
        loadPage() {
            let params = {
                lat: this.lat,
                lng: this.lng,
                page: this.page
            };
            if (this.keywords) {
                params.keywords = this.keywords;
            }
            if (this.startTime) {
                params.startTime = this.startTime;
            }
            if (this.endTime) {
                params.endTime = this.endTime;
            }
            if (this.roleType) {
                // 省区经理 销售支持所需数据
                params.salesmanId = this.salesmanId;
                params.provinceId = this.provinceId;
                params.cityId = this.cityId;
            }
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.CUSTOMER, "GET", params)
                .then(data => {
                    if (this.page == 1) {
                        this.count = data.count;
                        this.pageTotal = data.pageTotal;
                        this.list = data.list;
                        this.hasData = true;
                        util.hideLoadingDialog();
                    } else {
                        this.list = [...this.list, ...data.list];
                    }
                })
                .finally(() => {
                    this.showLoadMoreLoading = false;
                    util.hideTopLoadingStopRefresh();
                });
        },
        toCall(phone) {
            wx.makePhoneCall({
                phoneNumber: phone
            });
        },
        toMap(item) {
            wx.openLocation({
                latitude: item.lat * 1,
                longitude: item.lng * 1,
                scale: 18
            });
        },
        // 时间选择
        chooseStart(e) {
            this.startTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadPage();
            }
        },
        chooseEnd(e) {
            this.endTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadPage();
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
            this.loadPage();
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
            this.loadPage();
        },
        cityChange(e) {
            let i = e.detail.value * 1;
            this.cityName = this.cityList[i].cityName;
            this.cityId = this.cityList[i].cityCode;
            this.page = 1;
            this.loadPage();
        },
        // 重置（全部条件）
        resetAll() {
            this.page = 1;
            this.startTime = "";
            this.endTime = "";
            this.keywords = "";
            this.salesmanId = 0;
            this.provinceId = 0;
            this.cityId = 0;
            this.salesman = "";
            this.provinceName = "";
            this.cityName = "";
            this.loadPage();
        }
    }
};
</script>
<style lang="stylus">
@import './latent-custom'
</style>
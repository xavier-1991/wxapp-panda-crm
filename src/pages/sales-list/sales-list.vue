<template lang="pug">
    view(class="wrap re" v-if="hasData")
        view(class="top-wrap")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入业务员手机号或姓名" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(v-if="keywords" @tap="clear" class="search-del" src="../../static/image/search/del.png")
                view(class="add" @tap="toAdd('add')") 新增
            //- 其他过滤条件
            //- 时间
            view(class="c-f-item df ai-center mt25")
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
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l fls0" style="width:72rpx;") 区域
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
                view(class="ml10 fs28 cor_blue p20 fls0" @tap="resetAll") 重置 
        view(class="gray_bar" style="height:25rpx;")
        view()
            view(class="bb1 title") 业务员列表
            view(class="item fs24 cor re" v-for="(item,index) in list" :key="index")
                view(class="bb1" style="padding:24rpx 0;")
                    view(class="df fs28")
                        view() {{item.realName}}
                        view(class="ml30") {{item.mobile}}
                    view(class="df ai-center mt15")
                        image(src="../../static/image/other/time.png" class="time-img")
                        view(class="ml15") {{item.createTime}}
                    view(class="df ai-center mt10" v-if="item.area.length")
                        image(src="../../static/image/other/addr.png" class="time-img")
                        view(class="ml15") 
                            text {{item.area[0].provinceName}} {{' : '}} 
                            text(v-for="(subItem,subIndex) in item.area" :key="subIndex") {{subItem.cityName}}{{item.area.length==subIndex+1?'':'、'}}
                view(class="item-btn df")
                    view(@tap="toAdd('edit',item.id)") 编辑
                    view(class="ml25" @tap="toDelete(item.id,index)") 删除
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
            list: [],
            count: 0,
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
            // 参数
            page: 1,
            keywords: "",
            startTime: "",
            endTime: "",
            provinceId: 0,
            cityId: 0,
            // 时间选择
            showTime: false,
            dateNow: pd.dateNowStr(),
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
        this.getArea();
    },
    onShow(){
        this.page=1;
        this.loadPage();
    },
    onPullDownRefresh() {
        this.page = 1;
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
        toAdd(type,id){
            let params;
            if(type=="add"){
                params=`type=${type}`;
            }else{
                params=`type=${type}&id=${id}`;
            }
            util.linkto('sales-add',params);
        },
        toDelete(id,index){
            util.showConfirm('','确定','确定删除业务员吗？',()=>{
                util.showLoadingDialog('请稍候');
                http.request(`${urls.SALESMAN_LIST}/${id}`, "DELETE",{type:'delete'}).then(result => {
                    util.showToast('删除成功');
                    setTimeout(() => {
                        this.list.splice(index,1);
                    }, 1000);
                });
            })
        },
        clear() {
            this.keywords = "";
        },
        toSearch() {
            this.page = 1;
            this.loadPage();
        },
        loadPage() {
            let params = {
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
            params.provinceId = this.provinceId;
            params.cityId = this.cityId;
            params.type = 'list';
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.SALESMAN_LIST, "GET", params)
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
            this.provinceId = 0;
            this.cityId = 0;
            this.provinceName = "";
            this.cityName = "";
            this.loadPage();
        }
    }
};
</script>
<style lang="stylus">
@import './sales-list'
</style>
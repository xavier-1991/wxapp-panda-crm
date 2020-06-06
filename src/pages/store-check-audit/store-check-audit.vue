<template lang="pug">
    view(v-if="hasData")
        view(class="top-wrap")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入业务员姓名" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(v-if="keywords" @tap="clear" class="search-del" src="../../static/image/search/del.png")
                view(class="search-btn" @tap="toSearch") 搜索
            //- 区域
            view(v-if="roleType" class="c-f-item df ai-center mt25")
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
        view(class="gray_bar" style="height:20rpx")
        view(class="df bb1 ai-center")
            view(class="t-header") 姓名
            view(class="t-header") 所属区域
            view(class="t-header" style="text-align:left;text-indent:8rpx;") 已开分店
        view(class="df bb1 t-body-wrap ai-center" v-for="(item,index) in list" :key="index" @tap="chooseSalesMan(item)")
            view(class="t-body1") {{item.realName}}
            view(class="t-body2")
                view(v-for="(subItem,subIndex) in area" :key="subIndex") {{item.provinceName}}{{item.cityName}}
            view(class="t-body3 df jcsb ai-center")
                view() {{item.dividedStoreCount}}
                image(v-if="item.isSelect" class="sel-img" src="../../static/image/store/selected.png")
                image(v-else="item.isSelect" class="sel-img" src="../../static/image/store/selected-no.png")
        view(v-if="showLoadMoreLoading")
            bottom-bar(bottomType="loading")
        view(v-if="isReachBottom")
            bottom-bar(bottomType="noMore")
        view(v-if="!list.length" class="no-list") 暂无数据
        view(class="btn_wrap")
            view(class="btn-default" @tap="toAudit") 确定审核
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
            roleType: pd.getRoleType(),

            page: 1,
            keywords: "",
            provinceId: 0,
            cityId: 0,
            salesmanId:0,
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
    onLoad(options) {
        this.id=options.id*1;
        if (pd.getRoleType()) {
            this.getArea();
        }
        this.getSalesmanList();
    },
    onPullDownRefresh() {
        this.page = 1;
        this.keywords = "";
        this.getSalesmanList();
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
        this.getSalesmanList();
    },
    methods: {
        toSearch(){
            this.page = 1;
            this.getSalesmanList();
        },
        // 选择业务员
        chooseSalesMan(item){
            this.list.forEach((ele,i)=>{
                ele.isSelect=false;
            })
            item.isSelect=true;
            this.salesmanId=item.salesmanId;
        },
        // 获取业务员列表
        getSalesmanList(){
            let params = {
                page: this.page
            };
            if (this.keywords) {
                params.keywords = this.keywords;
            }
            if (this.roleType) {
                // 省区经理 销售支持所需数据
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
            http.request(urls.SELECT_SALESMAN, "GET",params).then(data => {
                data.list.forEach((ele,i)=>{
                    ele.isSelect=false;
                })
                if (this.page == 1) {
                    this.count = data.count;
                    this.pageTotal = data.pageTotal;
                    this.list = data.list;
                    this.hasData = true;
                    util.hideLoadingDialog();
                } else {
                    this.list = [...this.list, ...data.list];
                }
                util.hideLoadingDialog();
            }).finally(() => {
                this.showLoadMoreLoading = false;
                util.hideTopLoadingStopRefresh();
            });
        },
        // 审核
        toAudit(){
            if(!this.salesmanId){
                util.showToast('请选择归属业务员');
                return;
            }
            util.showConfirm('','确定','您确定审核通过吗',()=>{
                util.showLoadingDialog('请稍候');
                http.request(
                    urls.COMMON_REVIEW,
                    "POST",
                    {isPass:true,storeId:this.id}
                ).then(data => {
                    util.showToast('审核已退回')
                    setTimeout(() => {
                        util.linkto('store-manage')
                    }, 1500);
                    
                })
            }) 
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
            this.getSalesmanList();
        },
        cityChange(e) {
            let i = e.detail.value * 1;
            this.cityName = this.cityList[i].cityName;
            this.cityId = this.cityList[i].cityCode;
            this.page = 1;
            this.getSalesmanList();
        },
        // 重置（全部条件）
        resetAll() {
            this.page = 1;
            this.keywords = "";
            this.provinceId = 0;
            this.cityId = 0;
            this.provinceName = "";
            this.cityName = "";
            this.getSalesmanList();
        },
        clear() {
            this.keywords = "";
        }
    }
};
</script>
<style lang="stylus">
    @import './store-check-audit'
</style>
<template lang="pug">
    view(v-if="hasData")
        view(class="top-wrap" style="padding-bottom:0;")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入门店名称/订单号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
                image(@tap="toggleTime()" class="time" src="../../static/image/order/time.png")
            //- 其他过滤条件
            //- 时间
            view(v-if="showTime" class="c-f-item df ai-center mt25")
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
            //- 状态导航
            view(class="nav-wrap")
                scroll-view(:scroll-x="true" class="scroll-view") 
                    view(class="df ai-center")
                        view(:class="['nav-item',status==-1?'curr-item':'']" @tap="changeType(-1)") 全部订单
                        view(:class="['nav-item',status==0?'curr-item':'']" @tap="changeType(0)") 待付款
                        view(:class="['nav-item',status==20?'curr-item':'']" @tap="changeType(20)") 待发货/待自提
                        view(:class="['nav-item',status==60?'curr-item':'']" @tap="changeType(60)") 待收货
                        view(:class="['nav-item',status==70?'curr-item':'']" @tap="changeType(70)") 待评价
                        view(:class="['nav-item',status==10?'curr-item':'']" @tap="changeType(10)") 已取消
                        view(:class="['nav-item',status==30?'curr-item':'']" @tap="changeType(30)") 退款中
                        view(:class="['nav-item',status==50?'curr-item':'']" @tap="changeType(50)") 已退款
        view(class="list")
            view(class="item" v-for="(item,index) in list" :key="index")
                view(class="item-top")
                    view(class="df ai-center jcsb")
                        view(class="df ai-center")
                            image(class="store-icon mr5" src="../../static/image/other/store.png")
                            view(class="textFlow s-name") {{item.storeName}}
                        view(:class="['s-state',item.status=='已取消'?'cor_9':'']") {{item.status}}
                    view(class="df ai-center jcsb cor_9 fs24 mt15")
                        view(class="df ai-center")
                            view(class="df jcc ai-center mr5" style="width:40rpx;height:40rpx")
                                image(class="time-icon" src="../../static/image/other/time.png")
                            view() 下单时间
                        view() {{item.createTime}}
                view(class="item-center")
                    view(class="df jcsb ai-center")
                        view(class="df")
                            view(class="ic-left") 订单号
                            view(class="cor fs24") {{item.orderSn}}
                        view(class="copy" @tap="setClipboard(item.orderSn)") 复制
                    view(class="df jcsb ai-center mt-x")
                        view(class="df ai-center")
                            view(class="ic-left") {{item.hasSelfExtract?'卖方信息':'收件人'}}
                            view(class="cor fs24")
                                text {{item.contacts}}
                                text(class="ml15") {{item.mobile}}
                            image(class="phone" src="../../static/image/order/phone.png" @tap="toCall(item.mobile)")
                    view(class="df mt-x" v-if="item.message")
                        view(class="df")
                            view(class="ic-left fls0") 订单备注
                            view(class="cor fs24 textFlow2") {{item.message}}
                    view(class="df jcsb mt-x")
                        view(class="ic-left") {{item.hasSelfExtract?'自提点':'地址'}}
                        view(class="ic-addr df jcsb ai-center bb1")
                            view(class="cor fs24 textFlow w400") {{item.address}}
                            view(v-if="item.displayExpress" class="wuliu" @tap="toLogistics(item.orderId)") 查看物流
                view(class="item-goods")
                    view(class="ig-top df ai-center jcsb pb20" @tap="loadGoods(item)")
                        view(class="df ai-center")
                            view(class="bar")
                            view(class="fs28 cor ml15 fwb4") 商品
                            view(class="fs24 cor ml40") {{item.goodsNum}}件
                        image(v-if="item.showGoods" class="arrow" src="../../static/image/arrow-up.png")
                        image(v-else class="arrow" src="../../static/image/arrow-down.png")
                    //- 展开商品
                    view(v-if="item.showGoods")
                        view(class="pb25")
                            viwe(class="df fs24 cor_9")
                                view() 供货商
                                view(class="w500 textFlow ml40") {{item.goodsData.list[0].shopName}}
                            view(class="df jcsb mt25" v-for="(gItem,idx) in item.goodsData.list" :key="idx")
                                image(:src="gItem.goodsPic" class="good-img bk_gray")
                                view(class="df fldc jcsb good-right")
                                    view()
                                        view(class="fs24 cor fwb5 textFlow w400") {{gItem.goodsName}}
                                        view(class="df jcsb mt15")
                                            view(class="fs24 cor_9 fwb4") {{gItem.goodsSpec}}
                                            view(class="fs24 co fwb4") x{{gItem.goodsNum}}
                                    view(class="good-price fs24") ￥ {{gItem.goodsPrice}}
                        view()
                            view(class="df jcsb")
                                view(class="fs24 cor") 商品金额
                                view(class="fs24 cor") ￥ {{item.goodsData.goodsTotalPrice}}
                            view(class="mt10 df jcsb")
                                view(class="fs24 cor") 红包优惠
                                view(class="fs24 cor") ￥ {{item.goodsData.platformCouponMoney}}
                view(class="df jcfe")
                    view(style="width:606rpx;height:100rpx" :class="['df','jcfe','ai-center',item.showGoods?'':'bt1']")
                        view(class="fs24 cor") 合计金额:
                        view(class="all-money ml10") ￥{{item.totalPrice}}
            view(v-if="showLoadMoreLoading")
                bottom-bar(bottomType="loading")
            view(v-if="isReachBottom")
                bottom-bar(bottomType="noMore")
            view(v-if="!list.length" class="no-list") 暂无此类订单
        //- tabbar 
        tabbar(currTabbar="order-list")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require("../../utils/pd");
import bottomBar from "../../components/template/bottom-bar/bottom-bar"
import tabbar from "../../components/tabbar/tabbar.vue";
export default {
    data(){
        return {
            hasData: false,
            list:[],
            count:0,
            pageTotal:0,
            showLoadMoreLoading:false,
            isReachBottom:false,
            roleType:pd.getRoleType(),
            // 参数
            page:1,
            keywords:'',
            startTime:'',
            endTime:'',
            status:-1,
            provinceId:0, 
            cityId:0,
            // 时间选择
            showTime: false,
            dateNow:pd.dateNowStr(),
            //省市
            provinceName:'',
            cityName:'',
            areaList:[],  //区域数据总表
            cityList:[]
        }
    },
    components:{
        tabbar,
        'bottom-bar': bottomBar
    },
    onLoad(){
        if(pd.getRoleType()){
            this.getArea();
        }
    },
    onShow(){
        // 首页带参数跳转过来
        let tabbarPramas=this.$globalData.tabbarPramas;
        if(tabbarPramas){
            if(tabbarPramas.status){
                this.status=tabbarPramas.status*1
            }
            this.$globalData.tabbarPramas=null;
            // this.status=-1;
            this.startTime='';
            this.endTime='';
            this.keywords='';
            this.loadPage();
        }else{
            if(!this.hasData){

                this.loadPage();
            }
        }
    },
    onPullDownRefresh() {
        this.page=1;
        // this.status=-1;
        // this.startTime='';
        // this.endTime='';
        // this.keywords='';
        // this[this.type]=""; //清除上次时间选择在日历上的样式渲染
        this.loadPage();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading) {
            return;
        }
        if (this.page >= this.pageTotal) {
            this.isReachBottom=true;
            return;
        }
        this.page += 1;
        this.loadPage();
    },
    methods: {
        changeType(type){
            if(this.status===type){
                return;
            }
            this.status=type;
            this.page=1
            this.loadPage()
        },
        toSearch(){
            this.page=1;
            this.loadPage()
        },
        loadPage(){
            /*  status
                0   => '待付款',
                10  => '已取消',
                20  => '待发货',
                30  => '退款中',
                50  => '已退款',
                60  => '待收货',
                70  => '待评价',
            */
            let params={
                page:this.page,
                status:this.status,
            }
            if(this.keywords){
                params.keywords=this.keywords;
            }
            if(this.startTime){
                params.startTime=this.startTime;
            }
            if(this.endTime){
                params.endTime=this.endTime;
            }
            if(this.roleType){
                // 省区经理 销售支持所需数据
                params.provinceId=this.provinceId;
                params.cityId=this.cityId;
            }
            if(this.page==1){
                util.showLoadingDialog('加载中')
                this.isReachBottom=false;
            }else{
                this.showLoadMoreLoading=true;
                util.showTopLoading()
            }
            http.request(
                urls.ORDER,
                "GET",
                params
            ).then(data => {
                if(this.page==1){
                    this.count=data.count;
                    this.pageTotal=data.pageTotal;
                    this.list=data.list;
                    this.hasData=true;
                    util.hideLoadingDialog();
                }else{
                    this.list=[...this.list,...data.list];
                }
            }).finally(()=>{
                this.showLoadMoreLoading=false;
                util.hideTopLoading();
                uni.stopPullDownRefresh()
            })
        },
        loadGoods(item){
            // 展开的给收起
            if(item.showGoods===true){
                item.showGoods=false;
                return;
            }
            //收起的给展开 有数据直接展开 无数据请求数据后展开
            if(item.showGoods===false&&item.goodsData){
                item.showGoods=true;
                return;
            }else{
                util.showTopLoading();
                http.request(
                    urls.ORDER_GOODS.format(item.orderId),
                    "GET"
                ).then(data => {
                    item.goodsData=data;
                    item.showGoods=true;
                    util.hideTopLoading();
                })
            }
        },
        toLogistics(id){
            util.linkto('order-logistics',`id=${id}`);
        },
        toCall(phone){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        },
        setClipboard(orderId){
            wx.setClipboardData({data: `${orderId}`});
        },
        clear(){
            this.keywords="";
        },
        // 时间选择
        toggleTime(){
            this.showTime=!this.showTime;
        },
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
}
</script>
<style lang="stylus">
    @import "./order-list"
</style>
<template lang="pug">
    view(v-if="hasData")
        view(class="top-wrap")
            view(class="top-t")
                view(class="df jcsb ai-center")
                    view(class="df jcsb input-wrap")
                        view(class="df ai-center")
                            image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                            input(class="search-inp" placeholder="请输入门店名称/订单号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                        image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
                    image(@tap="onShowDatePicker('range')" class="time" src="../../static/image/order/time.png")
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
            view(v-if="!list.length" class="no-list") 暂无此类订单
        //- 时间选择器
        <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" color="#1677FE" :showHoliday="false" begin-text="开始" end-text="结束"  @confirm="onSelected" @cancel="onSelected" />
        //- tabbar 
        tabbar(currTabbar="order-list")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
import tabbar from "../../components/tabbar/tabbar.vue";
import MxDatePicker  from "../../components/mx-datepicker/mx-datepicker.vue";
export default {
    data(){
        return {
            hasData: false,
            list:[],
            page:1,
            count:0,
            pageTotal:0,
            showLoadMoreLoading:false,
            keywords:'',
            startTime:'',
            endTime:'',
            status:-1,
            // 时间选择器插件数据
            showPicker: false,
            type: 'range',
            value: ''
        }
    },
    components:{
        tabbar,
        MxDatePicker
    },
    onLoad(){
        
    },
    onShow(){
        // 首页带参数跳转过来
        let tabbarPramas=this.$globalData.tabbarPramas;
        if(tabbarPramas){
            if(tabbarPramas.status){
                this.status=tabbarPramas.status*1
            }
            this.$globalData.tabbarPramas=null;
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
        this.startTime='';
        this.endTime='';
        // this.keywords='';
        this[this.type]=""; //清除上次时间选择在日历上的样式渲染
        this.loadPage();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading) {
            return;
        }
        if (this.page >= this.pageTotal) {
            util.showToast('没有更多了');
            return;
        }
        this.page += 1;
        util.showTopLoading();
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
        onShowDatePicker(type){//显示
            this.type = type;
            this.showPicker = true;
            this.value = this[type];
        },
        onSelected(e) {//选择
            this.showPicker = false;
            if(e) {
                this[this.type] = e.value; 
                this.startTime= e.value[0];
                this.endTime=e.value[1];
                this.loadPage();
            }
        },
        toSearch(){
            this.page=1;
            // this.status=-1;
            this.startTime='';
            this.endTime='';
            this.loadPage()
        },
        loadPage(){
            this.showLoadMoreLoading=true;
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
            if(this.page==1){
                util.showLoadingDialog('加载中')
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
        }
    }
}
</script>
<style lang="stylus">
    @import "./order-list"
</style>
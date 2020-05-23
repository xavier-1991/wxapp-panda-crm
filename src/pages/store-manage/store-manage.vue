<template lang="pug">
    view(v-if="hasData")
        view(class="search-wrap")
            search(@outKeyWord="outKeyWord" @search="toSearch" :kw="keywords")
            view(class="df jcsb mt20")
                view(:class="['nav',state=='all'?'curr-nav':'']" @tap="changeState('all')") 全部
                view(:class="['nav',state=='today'?'curr-nav':'']" @tap="changeState('today')") 今日
                view(:class="['nav',state=='month'?'curr-nav':'']" @tap="changeState('month')") 本月
                view(:class="['nav',state=='custom'?'curr-nav':'']" @tap="changeState('custom')") 自定义
                view(class="nav df jcc ai-center" @tap="toFilter")
                    text 筛选
                    image(v-if="filterShow" class="arrow ml5" src="../../static/image/arrow-up.png")
                    image(v-else class="arrow ml5" src="../../static/image/arrow-down.png")
        //- 门店列表
        view(class="list")
            view(class="item df" v-for="(item,index) in list" :key="index")
                image(:src="item.storeFacedPic" class="store-img" mode="aspectFill" :lazy-load="true")
                view(class="item-main")
                    view(class="df jcsb ai-center")
                        view(class="textFlow store-name") {{item.storeName}}
                        view(class="df")
                            view(:class="['tag',item.storeType?'tag2':'']") {{item.storeType?'连锁':'单体'}}
                            view(:class="['tag','ml15',item.orderOrNot?'tag4':'tag3']") {{item.orderOrNot?'已下单':'未下单'}} 
                    view(class="df jcsb ai-end")
                        view(class="fs24 cor_9")
                            view(class="mt-x") {{item.trueName}} {{item.mobile}}
                            view(class="mt-x textFlow" style="width:380rpx;") {{item.address}}
                        view(class="df")
                            image(@tap="toCall(item.mobile)" class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                            image(@tap="toMap(item)" class="btn-img" src="../../static/image/other/latent-addr.png")
                    view(class="df jcsb mt30")
                        view(class="btn0" @tap="toEdit(item.storeId)") 编辑
                        view(class="btn0 btn1" @tap="toVisit(item)") 拜访
        //- 筛选框
        view(class="mask" v-if="filterShow" @tap.stop="toHideFilter")
            view(class="filter" @tap.stop="emptyFun")
                view(class="f-item")
                    view(class="f-title") 门店类型
                    view(class="df")
                        view(:class="['f-tag','mr-y',storeType==0?'curr-f-tag':'']" @tap.stop="toStoreType(0)") 单体门店
                        view(:class="['f-tag',storeType==1?'curr-f-tag':'']" @tap.stop="toStoreType(1)") 连锁门店
                view(class="f-item")
                    view(class="f-title") 门店状态
                    view(class="df")
                        view(:class="['f-tag','mr-y',storeStatus==0?'curr-f-tag':'']" @tap.stop="toStoreStatus(0)") 正常
                        view(:class="['f-tag',storeStatus==1?'curr-f-tag':'']" @tap.stop="toStoreStatus(1)") 关闭
                view(class="f-item")
                    view(class="f-title") 审核状态
                    view(class="df")
                        view(:class="['f-tag','mr-y',audit==0?'curr-f-tag':'']" @tap.stop="toAudit(0)") 待审核
                        view(:class="['f-tag','mr-y',audit==1?'curr-f-tag':'']" @tap.stop="toAudit(1)") 审核通过
                        view(:class="['f-tag',audit==2?'curr-f-tag':'']" @tap.stop="toAudit(2)") 审核未通过
                view(class="f-item")
                    view(class="f-title") 下单记录
                    view(class="df")
                        view(:class="['f-tag','mr-y',orderOrNot==0?'curr-f-tag':'']" @tap.stop="toOrderOrNot(0)") 注册未下单
                        view(:class="['f-tag',orderOrNot==1?'curr-f-tag':'']" @tap.stop="toOrderOrNot(1)") 已下单
                view(class="f-btn-wrap df")
                    view(class="f-btn f-btn1" @tap.stop="toReset") 重置
                    view(class="f-btn f-btn2" @tap.stop="toSure") 确定
        //- 时间选择器
        <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" color="#1677FE" :showHoliday="false" begin-text="开始" end-text="结束"  @confirm="onSelected" @cancel="onSelected" />
        //- tabbar 
        tabbar(currTabbar="store-manage")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
import search from "../../components/search/search";
import tabbar from "../../components/tabbar/tabbar.vue";
import MxDatePicker  from "../../components/mx-datepicker/mx-datepicker.vue";
export default {
    data(){
        return {
            hasData: false,
            list:[],
            count:0,
            pageTotal:0,
            showLoadMoreLoading:false,
            filterShow:false,
            //请求参数
            page:1,
            keywords:'',
            startTime:'',
            endTime:'',
            state:'all', //类型 all（默认全部）、today （今日）、month（本月）、custom（自定义）
            storeType:-1, //门店类型 0 单体门店 1连锁门店
            storeStatus:-1, //门店状态0正常  1关闭,
            audit:-1, //0  待审核 1 审核通过 2审核未通过
            orderOrNot:-1, //是否下单 0否 1 是
            // 时间选择器插件数据
            showPicker: false,
            type: 'range',
            value: ''
        }
    },
    components:{
        search,
        tabbar,
        MxDatePicker
    },
    onLoad(options){
        
    },
    onShow(){
        // 首页带参数跳转过来
        let tabbarPramas=this.$globalData.tabbarPramas;
        if(tabbarPramas){
            if(tabbarPramas.audit){
                this.paramsReset();
                this.audit=tabbarPramas.audit*1;
            }
            if(tabbarPramas.orderOrNot){
                this.paramsReset();
                this.orderOrNot=tabbarPramas.orderOrNot*1;
            }
            if(tabbarPramas.keywords){
                this.paramsReset();
                this.keywords=tabbarPramas.keywords;
            }
            this.$globalData.tabbarPramas=null;
            if(this.lat){
                this.loadPage();
            }
        }
        if(!this.lat){
            pd.getPosition().then((res)=>{
                this.lat=res.latitude;
                this.lng=res.longitude;
                this.loadPage();
            })
        }
    },
    onPullDownRefresh() {
        this.paramsReset();
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
        loadPage(){
            //参数配置
            let params={
                page:this.page,
                type:this.state,
                lat:this.lat,
                lng:this.lng
            }
            if(this.keywords){
                params.keywords=this.keywords;
            }
            if(this.startTime){
                params.startTime=this.startTime;
                params.endTime=this.endTime;
            }
            if(this.storeType!=-1){
                params.storeType=this.storeType;
            }
            if(this.storeStatus!=-1){
                params.storeStatus=this.storeStatus;
            }
            if(this.audit!=-1){
                params.audit=this.audit;
            }
            if(this.orderOrNot!=-1){
                params.orderOrNot=this.orderOrNot;
            }
            //其他配置
            this.showLoadMoreLoading=true;
            if(this.page==1){
                util.showLoadingDialog('加载中')
            }else{
                util.showTopLoading()
            }
            //发送请求
            http.request(
                urls.STORE,
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
        toFilter(){
            this.filterShow=!this.filterShow;
        },
        changeState(state){
            this.keywords='';
            this.filterShow=false;
            if(this.state===state&&this.state!='custom'){
                return;
            }
            this.state=state;
            if(this.state=='custom'){
                this.onShowDatePicker('range');
            }else{
                this.page=1
                this.loadPage()
            }
        },
        //筛选模块
        toStoreType(data){
            this.storeType=data;
        },
        toStoreStatus(data){
            this.storeStatus=data;
        },
        toAudit(data){
            this.audit=data;
        },
        toOrderOrNot(data){
            this.orderOrNot	=data;
        },
        toReset(){
            this.storeType=-1;
            this.storeStatus=-1;
            this.audit=-1;
            this.orderOrNot=-1;
        },
        toSure(){
            this.page=1;
            this.filterShow=false;
            this.loadPage();
        },
        // 时间选择器
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
        //搜索部分
        toSearch(){
            this.page=1;
            this.state='all';
            this.startTime='';
            this.endTime='';
            this.storeType=-1;
            this.storeStatus=-1;
            this.audit=-1;
            this.orderOrNot=-1;
            this.loadPage()
        },
        outKeyWord(data){
            this.keywords=data;
        },
        //隐藏筛选框，阻止冒泡
        emptyFun(){

        },
        toHideFilter(){
            this.filterShow=false;
        },
        // 编辑门店
        toEdit(id){
            util.linkto('store-add',`type=edit&id=${id}`)
        },
        //拜访门店
        toVisit(item){
            this.$globalData.visitStore=item;
            util.linkto('store-visit');
        },
        // 打电话，打开地图
        toCall(phone){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        },
        toMap(item){
             wx.openLocation({
                latitude:item.lat*1,
                longitude:item.lng*1,
                scale: 18
            })
        },
        paramsReset(){
            this.page=1;
            this.state='all';
            this.startTime='';
            this.endTime='';
            this.keywords='';
            this.storeType=-1;
            this.storeStatus=-1;
            this.audit=-1;
            this.orderOrNot=-1;
            this[this.type]=""; //清除上次时间选择在日历上的样式渲染
        }
    }
}
</script>
<style lang="stylus">
    @import "./store-manage"
</style>
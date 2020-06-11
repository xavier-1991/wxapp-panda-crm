<template lang="pug">
    view(v-if="hasData")
        view(class="top-wrap")
            //- 搜索框
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入门店名称或手机号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(v-if="keywords" @tap="clear" class="search-del" src="../../static/image/search/del.png")
                view(v-if="!roleType" class="add" @tap="toAdd") 新增
                view(v-else class="search-btn" @tap="toSearch") 搜索
            //- 导航栏
            view(class="df jcsb mt20")
                view(:class="['nav',state=='all'?'curr-nav':'']" @tap="changeState('all')") 全部
                view(:class="['nav',state=='today'?'curr-nav':'']" @tap="changeState('today')") 今日
                view(:class="['nav',state=='month'?'curr-nav':'']" @tap="changeState('month')") 本月
                view(:class="['nav',state=='custom'?'curr-nav':'']" @tap="changeState('custom')") 自定义
                view(:class="['nav','df','jcc','ai-center',storeType!=-1||storeStatus!=-1||audit!=-1||orderOrNot!=-1?'curr-nav':'']" @tap="toFilter")
                    text 筛选
                    view(v-if="storeType!=-1||storeStatus!=-1||audit!=-1||orderOrNot!=-1")
                        image(v-if="filterShow" class="arrow ml5" src="../../static/image/arrow-up-blue.png")
                        image(v-else class="arrow ml5" src="../../static/image/arrow-down-blue.png")
                    view(v-else)
                        image(v-if="filterShow" class="arrow ml5" src="../../static/image/arrow-up.png")
                        image(v-else class="arrow ml5" src="../../static/image/arrow-down.png")
            //- 其他过滤条件
            //- 时间
            view(class="c-f-item df ai-center mt25" v-if="showTime")
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
        view(class="list")
            view(class="item df" v-for="(item,index) in list" :key="index")
                view(class="store-img-wrap re")
                    image(:src="item.storeFacedPic" class="store-img" mode="aspectFill" :lazy-load="true")
                    view(:class="['status',item.audit===1?'status2':'']") {{item.auditStr}}
                view(class="item-main")
                    view(class="df ai-center")
                        view(class="textFlow store-name") {{item.storeName}}
                        view(class="df ml15")
                            view(:class="['tag',item.storeType?'tag2':'']") {{item.storeType?'连锁':'单体'}}
                            view(:class="['tag','ml15',item.orderOrNot?'tag3':'tag4']") {{item.orderOrNot?'已下单':'未下单'}} 
                    view(class="df jcsb ai-end")
                        view(class="fs24 cor_9")
                            view(class="mt-x") {{item.trueName}} {{item.mobile}}
                            view(class="mt-x textFlow" style="width:380rpx;") {{item.address}}
                        view(class="df")
                            image(@tap="toCall(item.mobile)" class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                            image(@tap="toMap(item)" class="btn-img" src="../../static/image/other/latent-addr.png")
                    view(class="df jcfe mt30")
                        view(v-if="!roleType" class="btn0" @tap="toEdit(item.storeId)") 编辑
                        view(v-if="!roleType" class="btn0 btn1 ml25" @tap="toVisit(item)") 拜访
                        view(v-if="roleType&&item.audit" class="btn3" @tap="toCheck(item.storeId)") 查看
                        view(v-if="roleType&&!item.audit" class="btn3 btn4" @tap="toStoreAudit(item.storeId)") 审核

            view(v-if="showLoadMoreLoading")
                bottom-bar(bottomType="loading")
            view(v-if="isReachBottom")
                bottom-bar(bottomType="noMore")
        view(v-if="!list.length" class="no-list") 暂无此类门店
        //- 筛选框
        view(class="mask" v-if="filterShow" @tap.stop="toHideFilter" @touchmove.stop='preventTouchMove')
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
        //- tabbar 
        tabbar(currTabbar="store-manage")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
import bottomBar from "../../components/template/bottom-bar/bottom-bar"
import tabbar from "../../components/tabbar/tabbar.vue";
export default {
    data(){
        return {
            hasData: false,
            roleType:pd.getRoleType(),
            list:[],
            count:0,
            pageTotal:0,
            showLoadMoreLoading:false,
            isReachBottom:false,
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
            salesmanId:0, //业务员id
            provinceId:0, 
            cityId:0,

            // 时间选择
            showTime: false,
            dateNow:pd.dateNowStr(),
            //业务员
            salesman:'',//业务员姓名
            salesmanList:[], //展示的业务员列表
            salesmanListAll:[], //全部业务员列表
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
    onLoad(options){
        let tabbarPramas=this.$globalData.tabbarPramas;
        if(!tabbarPramas){
            this.loadPage();
        }
        if(pd.getRoleType()){
            this.getSalesman();
            this.getArea();
        }
        
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
            // if(this.lat){
                this.loadPage();
            // }
        };
        //审核门店后返回刷新
        if(this.$globalData.fromStoreAudit){
            this.$globalData.fromStoreAudit=false;
            this.loadPage();
        }
    },
    onPullDownRefresh() {
        this.paramsReset2();
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
        loadPage(){
            //参数配置
            let params={
                page:this.page,
                type:this.state
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
            if(this.roleType){
                // 省区经理 销售支持所需数据
                params.salesmanId=this.salesmanId;
                params.provinceId=this.provinceId;
                params.cityId=this.cityId;
            }
            //其他配置
            // this.showLoadMoreLoading=true;
            if(this.page==1){
                util.showLoadingDialog('加载中')
                this.isReachBottom=0;
            }else{
                util.showTopLoading();
                this.showLoadMoreLoading=true;
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
            // this.keywords='';
            this.filterShow=false;
            if(this.state===state){
                return;
            }
            this.state=state;
            if(this.state=='custom'){
                this.startTime='';
                this.endTime='';
                this.page=1;
                this.list=[];
                this.showTime=true;
            }else{
                this.page=1
                this.startTime='';
                this.endTime='';
                this.showTime=false;
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
        // 时间选择
        chooseStart(e){
            this.startTime=e.detail.value;
            if(this.startTime&&this.endTime){
                this.page=1;
                this.loadPage();
            }
        },
        chooseEnd(e){
            this.endTime=e.detail.value;
            if(this.startTime&&this.endTime){
                this.page=1;
                this.loadPage();
            }
        },
        //搜索部分
        clear(){
            this.keywords='';
        },
        toAdd(){
            util.linkto('store-add','type=add');
        },
        toSearch(){
            this.page=1;
            this.loadPage()
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
            util.linkto('store-visit',`id=${item.storeId}`);
        },
        //查看门店
        toCheck(id){
            util.linkto('store-check',`type=check&id=${id}`);
        },
        //审核门店
        toStoreAudit(id){
            util.linkto('store-check',`type=audit&id=${id}`);
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
        //参数重置
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

            this.salesmanId=0;
            this.provinceId=0;
            this.cityId=0;
            this.salesman='';
            this.provinceName='';
            this.cityName='';
            this.salesmanList=JSON.parse(JSON.stringify(this.salesmanListAll));
        },
        paramsReset2(){
            this.page=1;
        },
        preventTouchMove(){
            //防止滚动穿透
        },
        // 业务员筛选
        getSalesman(salesman){
            if(!salesman&&this.salesmanListAll.length){
                this.salesmanList=JSON.parse(JSON.stringify(this.salesmanListAll))
                return;
            }
            let params={};
            if(salesman){
                params.keywords=salesman
            }
            http.request(
                urls.SALESMAN_LIST,
                "GET",
                params
            ).then(data => {
                this.salesmanList=data.list;
                if(!salesman){
                    this.salesmanListAll=data.list;
                }
            })
        },
        salesmanChange(e){
            let i=e.detail.value*1;
            this.salesman=this.salesmanList[i].realName;
            this.salesmanId=this.salesmanList[i].id;
            this.page=1
            this.loadPage();

        },
        // salesmanCancel(){
        //     this.salesman='';
        //     this.salesmanId=0;
        //     this.loadPage();
        // },
        // 区域筛选
        getArea(salesman){
            http.request(
                urls.AREA_LIST,
                "GET"
            ).then(data => {
                this.areaList=data.list;
            })
        },
        provinceChange(e){
            let i=e.detail.value*1;
            this.cityList=this.areaList[i].city;
            this.provinceName=this.areaList[i].provinceName;
            this.provinceId=this.areaList[i].provinceCode;
            this.cityId = 0;
            this.cityName = "";
            this.page=1
            this.loadPage();
        },
        cityChange(e){
            let i=e.detail.value*1;
            this.cityName=this.cityList[i].cityName;
            this.cityId=this.cityList[i].cityCode;
            this.page=1
            this.loadPage();
        },
        // 重置（全部条件）
        resetAll(){
            this.page=1;
            this.startTime='';
            this.endTime='';
            this.keywords='';
            this.storeType=-1;
            this.storeStatus=-1;
            this.audit=-1;
            this.orderOrNot=-1;

            this.salesmanId=0;
            this.provinceId=0;
            this.cityId=0;
            this.salesman='';
            this.provinceName='';
            this.cityName='';
            this.salesmanList=JSON.parse(JSON.stringify(this.salesmanListAll));
            this.loadPage();
        }
    }
}
</script>
<style lang="stylus">
    @import "./store-manage"
</style>
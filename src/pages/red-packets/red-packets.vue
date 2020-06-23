<template lang="pug">
    view(class="wrap re" :style="{'padding-bottom':tab===1?'180rpx':'0'}")
        view(class="df jcsba top bk_f bb1")
            view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeNav(1)") 新增红包
            view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeNav(2)") 红包记录
        view(class="main")
            //- 新增红包
            view(v-if="tab==1")
                view(class="fs28 cor bb1 add-top")
                    view(class="df inp-item ai-center")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 用户手机号
                        input(class="i-item-inp" v-model="addParams.mobile" placeholder='输入红包接收者的手机号' placeholder-class='pl' type="number" maxlength='11')
                    view(class="df inp-item ai-center mt30")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 红包名称
                        input(class="i-item-inp" v-model="addParams.name" placeholder='输入1-10位字符' maxlength='10' placeholder-class='pl')
                    view(class="df inp-item ai-center mt30")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 活动开始时间
                        view(class="df ai-center p20lr re time-wrap" @tap="chooseTime(0)")
                            view(:class="[addParams.startTime?'':'pl']") {{addParams.startTime||'请选择开始时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img c-date-img2")
                    view(class="df inp-item ai-center mt30")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 活动结束时间
                        view(class="df ai-center p20lr re time-wrap" @tap="chooseTime(1)")
                            view(:class="[addParams.endTime?'':'pl']") {{addParams.endTime||'请选择结束时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img c-date-img2")
                view(class="pl25 bb1")
                    view(class="df ai-center  fs28 cor mt30" v-for="(item,index) in addParams.coupon" :key="index")
                        view() 满
                        input(placeholder="输入金额" v-model="item.fullMoney" placeholder-class='pl' class="ml15 i-item-inp w150" type="number" maxlength='5')
                        view(class="ml15 mr15") 减
                        input(placeholder="输入金额" placeholder-class='pl' v-model="item.cutMoney" class="i-item-inp w150" type="number" maxlength='3')
                        view(class="ml30 mr15") 发
                        input(placeholder="数量" placeholder-class='pl' class="i-item-inp w96" v-model="item.num" type="number" maxlength='2')
                        view(class="ml15") 张
                        image(v-if="addParams.coupon.length>1" @tap="toDeleteCoupon(index)" src="../../static/image/red-packets/del.png" class="del-img")
                    view(class="add-btn-wrap-top")
                        view(class="df ai-center add-btn-top jcc" @tap="toAddCoupon")
                            image(src="../../static/image/red-packets/add.png")
                            view(class="ml15") 添加一级满减
                view(class="mt30 ml25")
                    view(class="fs28 cor df ")
                        view(class="fls0") 可用活动
                        view(style='margin-left:60rpx' class="df fw")
                            view(class="df ai-center mb20 mr20"  v-for="(item,index) in addParams.availableActivityAll" :key="index" @tap="toChooseActivity(item)")
                                image(v-if="item.isSelected" class="sel-img" src="../../static/image/store/selected.png")
                                image(v-else class="sel-img" src="../../static/image/store/selected-no.png")
                                view(class="ml15 ") {{item.value}}
                    view(class="mt15 df ai-center")
                        image(src="../../static/image/red-packets/tip.png" style="width:24rpx;height:24rpx;")
                        view(class="fs24 cor_9") 勾选表示此张优惠券可与该活动同时使用
                view(class="add-btn-wrap bt1 df jcsb")
                    view(class="add-btn" @tap="toSend(0)") 保存
                    view(class="add-btn add-btn2" @tap="toSend(1)") 保存并发放
                yuDatetimePicker(ref="dateTime" endYear="2035" :isAll="true" :current="true" @confirm="onConfirm")
            //- 红包记录 
            view(v-else)
                view(class="df jcsb ai-center search-box")
                    view(class="df jcsb input-wrap")
                        view(class="df ai-center inp-left")
                            image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                            input(class="search-inp" placeholder="请输入红包名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                        image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
                    view(class="se" @tap="toSearch") 搜索
                view(class="c-f-item df ai-center pl25")
                    view(class="c-f-item-l") 创建时间
                    view(class="df ai-center fs24")
                        view(class="df ai-center jcsb c-date-box")
                            picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        view(class="c-date-line")
                        view(class="df ai-center jcsb c-date-box")
                            picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" :start="startTime" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img")
                view(class="df p25lr ai-center mt25")
                    view(class="c-f-item df ai-center")
                        view(class="c-f-item-l") 状态
                        view(class="c-yewu-box df ai-center")
                            picker(mode='selector' class="c-area-picker df" :range='statusList' range-key="value" @change="statusChange") 
                                view(class="df ai-center jcsb" style="width:256rpx")
                                    view(:class="['c-area-text','pl20',status!=-1?'':'c-area-text-empty']") {{statusName?statusName:'全部'}}
                                    image(class="c-y-down" src="../../static/image/arrow-down.png")
                    view(class="ml10 fs28 cor_blue p10" @tap="resetAll") 重置
                view(class="gray_bar mt25" style="height:25rpx;")
                view(class="pl25")
                    view(class="item bb1 re" v-for="(item,index) in list" :key="index"  @tap.stop="toCheck(item.id)")
                        view(class="df ai-center")
                            view(class="fs28 cor") {{item.name}} 
                            view(:class="['ml25','tag',item.status==2?'tag2':'']") {{item.statusStr}}
                        view(class="df ai-center mt20")
                            image(src='../../static/image/other/time.png' class="time-img")
                            view(class="fs20 cor_9") {{item.startTime}}-{{item.endTime}}
                        view(class="fs20 cor_9 textFlow item-text") 
                            text(v-for="(subItem,subIndex) in item.detail" :key="subIndex") 满{{subItem.fullMoney}}减{{subItem.cutMoney}},{{subItem.num}}张{{subIndex+1==item.detail.length?'':'；'}}
                        view(class="df item-btn-wrap")
                            view(v-if="item.status==2" class="item-btn" @tap.stop="toCheck(item.id)") 查看
                            view(v-if="item.status==1" class="item-btn" @tap.stop="toEdit(item.id)") 编辑
                            view(v-if="item.status==1" class="item-btn item-btn2 ml15" @tap.stop="toDistribute(item)") 发放
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
import yuDatetimePicker from "../../components/yu-datetime-picker/yu-datetime-picker"
import bottomBar from "../../components/template/bottom-bar/bottom-bar";
export default {
    data() {
        return {
            tab:1,
            //新增红包数据
            currentTime: util.formatTime(new Date()),
            addParams:{
                name:'',
                mobile:'',
                availableActivityAll:[],
                startTime: "",
                endTime: "",
                startTimeNum:"",  //用于比较时间
                endTimeNum:"",    //用于比较时间
                coupon:[
                    {
                        fullMoney:'',
                        cutMoney:'',
                        num:''
                    }
                ]
            },
            // 红包记录
            page:1,
            keywords:'',
            startTime: "",
            endTime: "",
            dateNow:pd.dateNowStr(),
            status:-1,
            statusName:'',

            statusList:[],
            list: [],
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
            fromPage:'',
        };
    },
    components:{
        yuDatetimePicker,
        "bottom-bar": bottomBar
    },
    onLoad() {
        if(this.$globalData.availableActivity.length){
            this.addParams.availableActivityAll=this.$globalData.availableActivity;
        }else{
            this.getActivity();
        }
    },
    onShow(){
        if(this.tab==2&&this.fromPage!="red-packets-check"){
            this.page = 1;
            this.fromPage="";
            this.loadPage();
        }
    },
    onPullDownRefresh() {
        if(this.tab==2){
            this.page = 1;
            this.loadPage();
        }
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
        changeNav(type) {
            if (this.tab == type) {
                return;
            }
            this.tab = type;
            if (this.tab == 2) {
                this.loadPage();
            }
        },
        /*********** 新增红包 **************/
        //可用活动
        getActivity(){
            util.showLoadingDialog("正在加载");
            http.request(urls.RED_PACKET_ACTIVITIES, "GET").then(data => {
                this.addParams.availableActivityAll=data.list;
                this.$globalData.availableActivity=data.list;
                util.hideLoadingDialog();
            });
            
        },
        toChooseActivity(item){
            item.isSelected=!item.isSelected;
        },
        // 时间选择
        onConfirm(val) {
            let sArr = val.selectArr;
            let time = val.selectRes;
            if (this.timeType == 0) {
                this.addParams.startTimeNum=sArr.join('')*1;
                this.addParams.startTime = time;
            } else {
                this.addParams.endTimeNum=sArr.join('')*1;
                this.addParams.endTime = time;
            }
        },
        chooseTime(type) {
            this.timeType = type;
            console.log(this.timeType);
            this.$refs.dateTime.show();
        },
        // 满减操作
        toAddCoupon(){
            let obj={
                fullMoney:'',
                cutMoney:'',
                num:''
            }
            this.addParams.coupon.push(obj);
        },
        toDeleteCoupon(index){
            this.addParams.coupon.splice(index,1);
        },
        toSend(type){
            if(!this.addParams.mobile.trim()){
                util.showToast("请填写手机号");
                return;
            }
            if (!util.checkPhone(this.addParams.mobile)) {
                util.showToast("请填写正确格式的手机号");
                return;
            }
            if(!this.addParams.name.trim()){
                util.showToast("请填写红包名称");
                return;
            }
            if(!this.addParams.startTime){
                util.showToast("请选择开始时间");
                return;
            }
            if(!this.addParams.endTime){
                util.showToast("请选择结束时间");
                return;
            }
            if(this.addParams.startTimeNum>=this.addParams.endTimeNum){
                util.showToast("开始时间应小于结束时间");
                return;
            }
            let onOff=false;
            let couponList=this.addParams.coupon;
            for(let i=0;i<couponList.length;i++){
                if(couponList[i].fullMoney===''||couponList[i].cutMoney===''){
                    util.showToast("请设置满减金额");
                    onOff=true;
                    break;
                }
                if(couponList[i].fullMoney==='0'){
                    util.showToast("满减金额不能为零");
                    onOff=true;
                    break;
                }
                if(!util.checkInteger(couponList[i].fullMoney)||!util.checkInteger(couponList[i].cutMoney)){
                    util.showToast("请输入正确格式满减金额");
                    onOff=true;
                    break;
                }
                if(couponList[i].cutMoney*1>600){
                    util.showToast("优惠金额不能超过600元");
                    onOff=true;
                    break;
                }
                if(couponList[i].num===''){
                    util.showToast("请设置红包数量");
                    onOff=true;
                    break;
                }
                if(couponList[i].num==='0'){
                    util.showToast("红包数量不能为零");
                    onOff=true;
                    break;
                }
                if(!util.checkInteger(couponList[i].num)){
                    util.showToast("请设置正确格的红包数量");
                    onOff=true;
                    break;
                }
                if(couponList[i].num*1>10){
                    util.showToast("红包数量不能超过10个");
                    onOff=true;
                    break;
                }
            }
            if(onOff){
                return;
            }
            let [fullMoney,cutMoney,num,availableActivity]=[[],[],[],[]];
            this.addParams.coupon.forEach((item,i)=>{
                fullMoney.push(item.fullMoney*1);
                cutMoney.push(item.cutMoney*1);
                num.push(item.num*1);
            })
            this.addParams.availableActivityAll.forEach((item,i)=>{
                if(item.isSelected){
                    availableActivity.push(item.key*1);
                }
            })
            let params={
                mobile:this.addParams.mobile,
                name:this.addParams.name.trim(),
                startTime:this.addParams.startTime,
                endTime:this.addParams.endTime,
                hasSent:type,
                fullMoney,
                cutMoney,
                num,
                availableActivity
            }
            console.log(params);
            util.showLoadingDialog("请稍候");
            http.request(urls.RED_PACKET, "POST",params).then(data => {
                if(type===0){
                    util.showToast("保存成功");
                }else{
                    util.showToast("发放成功");
                }
                this.addParams={
                    name:'',
                    mobile:'',
                    availableActivityAll:[],
                    startTime: "",
                    endTime: "",
                    startTimeNum:"", 
                    endTimeNum:"",
                    coupon:[
                        {
                            fullMoney:'',
                            cutMoney:'',
                            num:''
                        }
                    ]
                }
            });
        },
        /*********** 红包记录 **************/
        toSearch() {
            this.page = 1;
            this.loadPage();
        },
        clear() {
            this.keywords = "";
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
        loadPage() {
            let params = {
                page: this.page,
                status:this.status
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
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.RED_PACKET, "GET", params)
                .then(data => {
                    if (this.page == 1) {
                        this.count = data.count;
                        this.pageTotal = data.pageTotal;
                        this.list = data.list;
                        this.hasData = true;
                        this.statusList=data.statusMap;
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
        //发放红包
        toDistribute(item){
            util.showConfirm('','发放','是否发放该红包',()=>{
                util.showLoadingDialog("发放中");
                http.request(urls.RED_PACKET_SEND.format(item.id), "PUT").then(data => {
                    setTimeout(() => {
                        util.showToast('发放成功');
                        item.status=2;
                        item.statusStr="已发放"
                    }, 1500);
                });
            })
        },
        toEdit(id){
            util.linkto('red-packets-edit',`id=${id}`);
        },
        toCheck(id){
            this.fromPage="red-packets-check";
            util.linkto('red-packets-check',`id=${id}`);
        },
        // 状态选择
        statusChange(e) {
            let i = e.detail.value * 1;
            this.statusName = this.statusList[i].value;
            this.status = this.statusList[i].key;
            this.page = 1;
            this.loadPage();
        },
        // 重置（全部条件）
        resetAll() {
            this.page = 1;
            this.startTime = "";
            this.endTime = "";
            this.keywords = "";
            this.statusName = "";
            this.status = -1;
            this.loadPage();
        }
    }
};
</script>
<style lang="stylus">
@import './red-packets'
</style>
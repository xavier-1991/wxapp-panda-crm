<template lang="pug">
    view()
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
                image(v-if="index>0" @tap="toDeleteCoupon(index)" src="../../static/image/red-packets/del.png" class="del-img")
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

                        
                        

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import yuDatetimePicker from "../../components/yu-datetime-picker/yu-datetime-picker"
export default {
    data() {
        return {
            currentTime: util.formatTime(new Date()),
            addParams:{
                name:'',
                mobile:'',
                availableActivityAll:[],
                startTime: "",
                endTime: "",
                startTimeNum:"",  //用于比较时间
                endTimeNum:"",    //用于比较时间
                coupon:[]
            }
        };
    },
    components:{
        yuDatetimePicker
    },
    onLoad(options) {
        this.id=options.id;
        this.getActivity();
        this.getDetail();
    },
    methods: {
        getDetail(){
            util.showLoadingDialog("正在加载");
            http.request(`${urls.RED_PACKET}/${this.id}`, "GET").then(data => {
                this.addParams.name=data.name;
                this.addParams.mobile=data.mobile;
                this.addParams.startTime=data.startTime;
                this.addParams.endTime=data.endTime;

                this.addParams.startTimeNum=data.startTime.replace(/[^0-9]/ig,"")*1;
                this.addParams.endTimeNum=data.endTime.replace(/[^0-9]/ig,"")*1;

                data.fullMoney.forEach((item,i)=>{
                    let obj={
                        fullMoney:item,
                        cutMoney:data.cutMoney[i],
                        num:data.num[i]
                    }
                    this.addParams.coupon.push(obj);
                })
                util.hideLoadingDialog();
            });
        },
        //可用活动
        getActivity(){
            http.request(urls.RED_PACKET_ACTIVITIES, "GET").then(data => {
                this.addParams.availableActivityAll=data.list;
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
            http.request(`${urls.RED_PACKET}/${this.id}`, "PUT",params).then(data => {
                if(type===0){
                    util.showToast("保存成功");
                }else{
                    util.showToast("发放成功");
                }
                uni.navigateBack();
            });
        },
    }
};
</script>
<style lang="stylus">
@import './red-packets-edit'
</style>
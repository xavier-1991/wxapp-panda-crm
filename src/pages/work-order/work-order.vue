<template lang="pug">
    view(class="")
        view(class="df jcsba top bb1")
            view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeNav(1)") 新增工单
            view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeNav(2)") 历史工单
        //- 新增工单
        view(v-if="tab==1")
            view(class="add-w")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 
                        text(class="fs28" style="color:#FF662E;") *
                        text 订单编号
                    input(v-model="orderSn" class="aw-r aw-inp" placeholder="必填，请输入订单编号" placeholder-class="aw-inp-pl")
                view(class="add-item df jcsb ai-center" type="number")
                    view(class="aw-l") 手机号
                    input(v-model="mobile" class="aw-r aw-inp" type="number" maxlength="11" placeholder="选填，请输入手机号" placeholder-class="aw-inp-pl")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 
                        text(class="fs28" style="color:#FF662E;") *
                        text 问题标签
                    view(class="aw-r df jcsb")
                        view(@tap="chooseLabel(item)" :class="['aw-tag',labelId==item.key?'curr-aw-tag':'']" v-for="(item,index) in labelList" :key="index") {{item.value}}
                        //- view(class="aw-tag") 无理由退货
                        //- view(class="aw-tag curr-aw-tag") 其他问题
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 
                        text(class="fs28" style="color:#FF662E;") *
                        text 问题记录
                    view(class="df area-wrap aw-r")
                        image(v-if="!issues" class="edit fls0" src="../../static/image/other/edit.png")
                        textarea(v-model="issues" placeholder-class="pl2" placeholder="请填写问题描述~")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 
                        text(class="fs28" style="color:#FF662E;") *
                        text 上传图片
                    view(class="df p25lr" style="width:514rpx;")
                        view(class="up-img-wrap re" v-for="(item,index) in imageArr" :key="index")
                            image(:src="item" class="storeImg" lazy-load="true" mode="aspectFill" class="up-img bk_")
                            image(@tap="delImage"
                                class="delimg"
                                src="../../static/image/other/del_img.png")
                        view(class="df jcc ai-center fldc up-img-wrap bk_gray" v-if="count>0" @tap="chooseImage")
                            image(class="camera" src="../../static/image/store/camera.png")
                            view(class="mt5 fs20 cor") 上传图片
            view(class="add-btn-wrap bt1 df jcsb")
                view(class="add-btn" @tap="toSend") 保存
                view(class="add-btn add-btn2") 保存并发放
        //- 历史工单
        view(v-else class="his-w")
            view(class="df jcsb ai-center search-box")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入工单单号、订单编号或者手机号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
                //- view(class="se" @tap="toSearch") 搜索
            view(class="c-f-item df ai-center pl25")
                view(class="c-f-item-l") 创建时间
                view(class="df ai-center fs24")
                    view(class="df ai-center jcsb c-date-box")
                        picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                        image(src="../../static/image/other/date.png" class="c-date-img")
                    view(class="c-date-line")
                    view(class="df ai-center jcsb c-date-box")
                        picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                        image(src="../../static/image/other/date.png" class="c-date-img")
            view(class="df jcsb p25lr")
                view(class="c-f-item df ai-center mt25")
                    view(class="c-f-item-l") 标签
                    view(class="c-yewu-box df ai-center" style="width:156rpx;")
                        input(class="c-y-inp" placeholder="全部" placeholder-class='c-y-inp-pl')
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="c-f-item df ai-center mt25")
                    view(class="c-f-item-l" style="width:76rpx;") 状态
                    view(class="c-yewu-box df ai-center" style="width:256rpx;")
                        input(class="c-y-inp" placeholder="全部" placeholder-class='c-y-inp-pl')
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
            view(class="gray-bar")
            view(class="his-list")
                view(class="h-item bb1")
                    view(class="df")
                        view(class="h-l df ai-center")
                            image(class="h-l-img" src="../../static/image/work-order/order.png")
                            view(class="h-l-text") 订单编号
                        view(class="df")
                            view(class="fs28 cor") 12345678900987
                            view(class="h-tag h-tag2") 处理中
                    view(class="df mt30")
                        view(class="h-l df ai-center")
                            image(class="h-l-img" src="../../static/image/work-order/phone-num.png")
                            view(class="h-l-text") 手机号
                        view(class="fs28 cor") 18966552541
                    view(class="df mt30")
                        view(class="h-l df ai-center ai-start")
                            image(class="h-l-img" src="../../static/image/work-order/record.png")
                            view(class="h-l-text") 问题记录
                        view(class="fs28 cor") 问题记录问题记录问题记录问题记录问题记录问题记录问题记录
                    view(class="df mt30 jcfe mt30")
                        view(class="h-btn" @tap="toCheck") 查看
                        view(class="h-btn ml20" @tap="toTrack") 跟踪
                        view(class="h-btn ml20" @tap="toResult") 结果

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            tab:1,
            //新增工单
            orderSn:'',
            mobile:'',
            issues:'',
            labelId:-1,
            labelList:[],
            count: 3, //随着imageArr的length改变而改变,最多传3张图
            imageArr: [], //本地
            photos:[],//线上
            // 历史工单
            keywords:'',
            startTime: "",
            endTime: "",
            dateNow:pd.dateNowStr(),
        };
    },
    onLoad() {
        this.getLabel();
    },
    methods: {
        //切换选项卡
        changeNav(type) {
            if (this.tab == type) {
                return;
            }
            this.tab = type;
            // if (this.tab == 2 && !this.list.length) {
            //     this.loadRecord();
            // }
        },
        /****************   新增工单   *******************/
        // 获取标签
        getLabel(salesman) {
            http.request(urls.LABEL_LIST, "GET").then(data => {
                this.labelList = data.list;
            });
        },
        // 切换标签
        chooseLabel(item){
            console.log(item)
            this.labelId=item.key;
        },
        
        // 图片上传相关
        chooseImage() {
            uni.chooseImage({
                count: this.count,
                sizeType: ["compressed"],
                success: res => {
                    this.imageArr = [...this.imageArr, ...res.tempFilePaths];
                    this.count = 3 - this.imageArr.length;
                }
            });
        },
        delImage(index) {
            this.imageArr.splice(index, 1);
            this.count = 3 - this.imageArr.length;
        },
        toSend() {
            if (!this.orderSn.trim()) {
                util.showToast("请填写订单编号");
                return;
            }
            if (this.labelId===-1) {
                util.showToast("请选择问题标签");
                return;
            }
            if (!this.issues.trim()) {
                util.showToast("请填写问题记录");
                return;
            }
            if (!this.imageArr.length) {
                util.showToast("请上选择图片");
                return;
            }
            let params={
                labelId:this.labelId,
                issues:this.issues,
                orderSn:this.orderSn
            };
            if(this.orderSn.trim()){
                params.orderSn=this.orderSn.trim();
            }
            if (this.mobile && !util.checkPhone(this.mobile)) {
                util.showToast("请输入正确格式的手机号或者不填写手机号");
                return;
            }
            if(this.mobile && util.checkPhone(this.mobile)){
                params.mobile=this.mobile;
            }
            let onlineArr=[]; //线上图片数组
            let underlineArr=[]; //线下图片数组
            this.imageArr.forEach((item,i)=>{
                // if(item.indexOf('wxfile')<0){
                if(item.indexOf('tmp/wx')<0){
                    onlineArr.push(item);
                }else{
                    underlineArr.push(item);
                }
            })
            util.showLoadingDialog("提交中");
            // console.log('underlineArr',underlineArr)
            if(underlineArr.length>0){
                http.uploadFiles(underlineArr,{type:'visit'}, res => {
                    let resArr = res.map(ele => {
                        return ele.imgUrl;
                    });
                    this.photos=[...onlineArr,...resArr];
                    this.imageArr=JSON.parse(JSON.stringify(this.photos));
                    params.photos=this.photos;
                    sendData();
                });
            }else{
                util.showLoadingDialog("提交中");
                params.photos=this.imageArr;
                sendData();
            }
            let that=this;
            function sendData(){
                http.request(urls.WORK_SHEET, "POST", params).then(data => {
                    util.showToast("新增成功");
                    that.orderSn='';
                    that.mobile='';
                    that.issues='';
                    that.labelId=-1;
                    that.count=3;
                    that.labelList=[];
                    that.imageArr=[];
                    that.photos=[];
                });
            }
        },
        /****************   历史工单   *******************/
        toTrack(){
            util.linkto('work-order-track');
        },
        toResult(){
            util.linkto('work-order-result');
        },
        toCheck(){
            util.linkto('work-order-check');
        },
        chooseStart(e){
            this.startTime=e.detail.value;
            // if(this.startTime&&this.endTime){
            //      this.loadData();
            // }
        },
        chooseEnd(e){
            this.endTime=e.detail.value;
            // if(this.startTime&&this.endTime){
            //      this.loadData();
            // }
        }
    }
};
</script>
<style lang="stylus">
@import './work-order';
</style>
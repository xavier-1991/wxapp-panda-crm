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
                            image(:src="item" class="storeImg" lazy-load="true" mode="aspectFill" class="up-img bk_" @tap="previewImg(item,imageArr)")
                            image(@tap="delImage"
                                class="delimg"
                                src="../../static/image/other/del_img.png")
                        view(class="df jcc ai-center fldc up-img-wrap bk_gray" v-if="count>0" @tap="chooseImage")
                            image(class="camera" src="../../static/image/store/camera.png")
                            view(class="mt5 fs20 cor") 上传图片
            view(class="btn_wrap bt1")
                view(class="btn-default" @tap="toSend") 保存
            //- view(class="add-btn-wrap bt1 df jcsb")
            //-     view(class="add-btn" @tap="toSend") 保存
            //-     view(class="add-btn add-btn2") 保存并发放
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
            view(class="df p25lr ai-center mt25")
                view(class="c-f-item df ai-center")
                    view(class="c-f-item-l" style="width:90rpx") 标签
                    view(class="c-yewu-box df ai-center" style="width:200rpx;")
                        picker(mode='selector' class="c-area-picker pl20 df" :range='labelList' range-key="value" @change="hisTagChange") 
                            view(class="df ai-center jcsb" style="width:186rpx")
                                view(:class="['c-area-text',hisLabelId!=-1?'':'c-area-text-empty']") {{hisLabelName?hisLabelName:'全部'}}
                                image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="c-f-item df ai-center")
                    view(class="c-f-item-l" style="width:86rpx;margin-left:35rpx;") 状态
                    view(class="c-yewu-box df ai-center" style="width:200rpx;")
                        picker(mode='selector' class="c-area-picker pl20 df" :range='statusList' range-key="value" @change="statusChange") 
                            view(class="df ai-center jcsb" style="width:186rpx")
                                view(:class="['c-area-text',status!=-1?'':'c-area-text-empty']") {{statusName?statusName:'全部'}}
                                image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="ml10 fs28 cor_blue p10" @tap="resetAll") 重置
            view(class="gray_bar mt25" style="height:25rpx;")
            view(class="his-list")
                view(class="h-item bb1" v-for="(item,index) in list" :key="index")
                    view(class="df ai-center")
                        view(class="fs24 cor" style="font-weight:500") 工单号：{{item.id}}
                        view(class="fs20 cor_blue p20lr" @tap="setClipboard(item.id)") 复制
                    view(class="df mt20")
                        view(class="h-l df ai-center")
                            image(class="h-l-img" src="../../static/image/work-order/order.png")
                            view(class="h-l-text") 订单编号
                        view(class="df")
                            view(class="fs28 cor") {{item.orderSn}}
                            //- status 0 待处理 1 处理中 2 已完结
                            view(v-if="item.status==0" class="h-tag") {{item.statusStr}}
                            view(v-if="item.status==1" class="h-tag h-tag1") {{item.statusStr}}
                            view(v-if="item.status==2" class="h-tag h-tag2") {{item.statusStr}}
                    view(class="df mt20")
                        view(class="h-l df ai-center")
                            image(class="h-l-img" src="../../static/image/work-order/phone-num.png")
                            view(class="h-l-text") 手机号
                        view(class="fs28 cor") {{item.mobile}}
                    view(class="df mt20")
                        view(class="h-l df ai-center ai-start")
                            image(class="h-l-img" src="../../static/image/work-order/record.png")
                            view(class="h-l-text") 问题记录
                        view(class="fs28 cor") {{item.issues}}
                    view(class="df mt30 jcfe mt30")
                        view(class="h-btn" @tap="toTrack('look',item.id)") 查看
                        view(v-if="roleType&&item.status!=2" class="h-btn ml20" @tap="toTrack('track',item.id)") 跟踪
                        view(v-if="roleType&&item.status!=2" class="h-btn ml20" @tap="toResult(item.id)") 结果
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
            page:1,
            keywords:'',
            startTime: "",
            endTime: "",
            dateNow:pd.dateNowStr(),
            status:-1,
            statusName:'',
            hisLabelId:-1,
            hisLabelName:'',

            statusList:[],
            list: [],
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
            roleType: pd.getRoleType(),
            toPageName:'' //前往的页面名称 用于该返回时刷新
        };
    },
    components: {
        "bottom-bar": bottomBar
    },
    onLoad() {
        if(this.$globalData.labelList.length){
            this.labelList=this.$globalData.labelList;
        }else{
            this.getLabel();
        }
    },
    onShow(){
        if(this.tab==2&&this.toPageName=='work-order-result'){
            //完结工单后返回
            this.page = 1;
            this.toPageName='';
            this.loadPage();
        }
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
        //切换选项卡
        changeNav(type) {
            if (this.tab == type) {
                return;
            }
            this.tab = type;
            if(this.tab==2&&!this.list.length){
                this.loadPage();
            }
        },
        /****************   新增工单   *******************/
        // 获取标签
        getLabel(salesman) {
            http.request(urls.LABEL_LIST, "GET").then(data => {
                this.$globalData.labelList=data.list;
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
        previewImg: function(currImg, imgList) {
            uni.previewImage({
                current: currImg,
                urls: imgList
            });
        },
        // 提交工单
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
            // if (!this.imageArr.length) {
            //     util.showToast("请上选择图片");
            //     return;
            // }
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
        toTrack(type,id){
            util.linkto('work-order-track',`type=${type}&id=${id}`);
        },
        toResult(id){
            this.toPageName='work-order-result';
            util.linkto('work-order-result',`id=${id}`);
        },
        toCheck(){
            util.linkto('work-order-check');
        },
        setClipboard(id){
            wx.setClipboardData({data: `${id}`});
        },
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
            if (this.hisLabelId!=-1) {
                params.labelId = this.hisLabelId;
            }
            if (this.status!=-1) {
                params.status = this.status;
            }
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.WORK_SHEET, "GET", params)
            .then(data => {
                if (this.page == 1) {
                    this.pageTotal = data.pageTotal;
                    this.list = data.list;
                    this.hasData = true;
                    this.statusList = data.statusMap;
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
        // 标签选择 
        hisTagChange(e) {
            let i = e.detail.value * 1;
            this.hisLabelName = this.labelList[i].value;
            this.hisLabelId = this.labelList[i].key;
            this.page = 1;
            this.loadPage();
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
            this.hisLabelName = "";
            this.hisLabelId = -1;
            this.statusName = "";
            this.status = -1;
            this.loadPage();
        }
    }
};
</script>
<style lang="stylus">
@import './work-order';
</style>
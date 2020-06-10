<template lang="pug">
    view(class="wrap" v-if="hasData")
        view(class="df jcsba top bk_f")
            view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeNav(1)") 拜访签到
            view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeNav(2)") 拜访记录
        view(class="main")
            //- 拜访签到
            view(v-if="tab==1")
                map(class="map" :longitude="params.lng" :latitude="params.lat" :markers="markers")
                view(class="qiaodao p25lr")
                    view(class="df jcsb ai-center choose-store" @tap="toChooseStore")
                        view(v-if="!storeName")
                            text(class="fs28 cor fwb5") 请选择拜访门店
                            text(class="xing ml5") *
                        view(v-else class="fs28 cor") {{storeName}}
                        image(src="../../static/image/arrow-right.png" class="arrow")
                    view(class="riji")
                        view(class="fs28 cor") 拜访日记
                        view(class="df area-wrap mt15")
                            image(v-if="!params.notes" class="edit" src="../../static/image/other/edit.png")
                            textarea(v-model="params.notes" placeholder-class="pl2" placeholder="请输入此拜访沟通的内容及结果~")
                view(class="df mt15 p25lr")
                    view(class="up-img-wrap re" v-for="(item,index) in imageArr" :key="index")
                        image(:src="item" class="storeImg" lazy-load="true" mode="aspectFill" class="up-img bk_f" @tap="previewImg(item,imageArr)")
                        image(@tap="delImage"
                               class="delimg"
                               src="../../static/image/other/del_img.png")
                    view(class="df jcc ai-center fldc up-img-wrap bk_f" v-if="count>0" @tap="chooseImage")
                        image(class="camera" src="../../static/image/store/camera.png")
                        view(class="mt5")
                            text(class="xing") *
                            text(class="fs24 cor") 上传图片
                view(class="btn_wrap")
                    view(class="btn-default" @tap="toSend") 提交签到
            //- 拜访记录
            view(v-else)
                view(class="df jcsb p25")
                    view(:class="['jilu-nav',state=='all'?'curr-nav':'']" @tap="changType('all')") 全部
                    view(:class="['jilu-nav',state=='today'?'curr-nav':'']" @tap="changType('today')") 今日
                    view(:class="['jilu-nav',state=='month'?'curr-nav':'']" @tap="changType('month')") 本月
                    view(:class="['jilu-nav',state=='custom'?'curr-nav':'']" @tap="changType('custom')") 自定义
                //- 时间
                view(v-if="state=='custom'" class="c-f-item df ai-center pb25 ml25")
                    view(class="c-f-item-l") 创建时间
                    view(class="df ai-center fs24")
                        view(class="df ai-center jcsb c-date-box")
                            picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        view(class="c-date-line")
                        view(class="df ai-center jcsb c-date-box")
                            picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img")
                view(class="jilu-list")
                    view(class="jilu-item bk_f" v-for="(item,index) in list" :key="index")
                        view(class="jl-item-top p25 bb1")
                            view(class="df ai-center")
                                image(class="store-icon mr20" src="../../static/image/other/store.png")
                                view(class="fs28 cor fwb5") {{item.storeName}}
                            view(class="fs24 cor_9 df jcsb mt15")
                                view(class="df ai-center")
                                    view(class="df jcc ai-center mr20" style="width:40rpx;height:40rpx")
                                        image(class="time-icon" src="../../static/image/other/time.png")
                                    view() 拜访时间
                                view() {{item.createTime}}
                        view(class="bf-xq df ai-center jcsb" @tap="showMore(item)")
                            view(class="df ai-center")
                                view(class="bar")
                                view(class="fs28 cor ml15 fwb4") 拜访详情
                            image(v-if="item.showMore" class="arrow" src="../../static/image/arrow-up.png")
                            image(v-else class="arrow" src="../../static/image/arrow-down.png")
                        view(class="pl25 moreMain" v-if="item.showMore")
                            view(class="df")
                                view(class="fs24 cor") 拜访日记
                                view(class="jl-text") {{item.notes}}
                            view(class="df mt25") 
                                view(class="fs24 cor pr15") 门店图片
                                view(class="df" v-for="(ptItem,idx) in item.photos" :key="idx")
                                    image(:src="ptItem" class="bk_gray jl-store-img")
                    view(v-if="showLoadMoreLoading")
                        bottom-bar(bottomType="loading")
                    view(v-if="isReachBottom")
                        bottom-bar(bottomType="noMore")
                    view(v-if="!list.length" class="no-list") 暂无相关数据
                

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
            //拜访记录相关
            state: "all",
            startTime: "",
            endTime: "",
            tab: 1,
            list: [],
            page: 1,
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
            // 签到相关
            lat: "",
            lng: "",
            storeName: "",
            count: 3, //随着imageArr的length改变而改变,最多传3张图
            imageArr: [], //本地
            hasMap:false,
            // 签到参数
            params: {
                storeId: "",
                lat: "",
                lng: "",
                notes: "",
                deviation: "",
                isLeads: 0,
                photos: []
            }          
        };
    },
    components: {
        "bottom-bar": bottomBar
    },
    onLoad(options) {
        if (options.id) {
            this.params.storeId = options.id;
        }
    },
    onPullDownRefresh() {
        if (this.tab == 1) {
            uni.stopPullDownRefresh();
            return;
        }
        this.page = 1;
        this.loadRecord();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading || this.tab == 1) {
            return;
        }
        if (this.page >= this.pageTotal) {
            this.isReachBottom = true;
            return;
        }
        this.page += 1;
        this.loadRecord();
    },
    onShow() {
        if(this.$globalData.visitStore){
            let visitStore=this.$globalData.visitStore;
            this.storeName=visitStore.storeName;
            this.params.storeId=visitStore.storeId;
            this.params.deviation=visitStore.distance;
            this.params.isLeads=visitStore.isLeads||0;
            this.$globalData.visitStore=null;
        }

        if (!this.params.lat) {
            util.showLoadingDialog("加载中...");
            pd.getPosition().then(res => {
                console.log('经纬度',res)
                this.params.lat = res.latitude + "";
                this.params.lng = res.longitude + "";
                this.markers = [
                    {
                        latitude: res.latitude,
                        longitude: res.longitude,
                        iconPath: "../../static/image/other/mark.png",
                        width: "40rpx",
                        height: "40rpx"
                    }
                ];
                this.hasMap=true;
                if (this.params.storeId) {
                    // 从门店管理进入
                    http.request(
                        urls.STORE_DETAIL.format(this.params.storeId),
                        "GET",
                        {
                            type: "visit",
                            lat: this.params.lat,
                            lng: this.params.lng
                        }
                    ).then(data => {
                        this.storeName=data.detail.name;
                        this.params.deviation=data.detail.distance;
                        this.hasData = true;
                        util.hideLoadingDialog();
                    });
                }else{
                    util.hideLoadingDialog();
                    this.hasData = true;
                }

                
            });
        }
    },
    methods: {
        changeNav(type) {
            if (this.tab == type) {
                return;
            }
            this.tab = type;
            if (this.tab == 2 && !this.list.length) {
                this.loadRecord();
            }
        },
        changType(state) {
            if (this.state == state) {
                return;
            }
            this.state = state;
            if (this.state !== "custom") {
                this.startTime = "";
                this.endTime = "";
                this.loadRecord();
            }else{
                this.startTime = "";
                this.endTime = "";
                this.list=[];
            }
        },
        loadRecord() {
            let params = {
                type: this.state,
                page: this.page
            };
            if (this.state == "custom") {
                if(!this.startTime||!this.endTime){
                    util.showToast('请选择时间区间')
                }else{
                    params.startTime = this.startTime;
                    params.endTime = this.endTime;
                }
            }
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.VISITED, "GET", params)
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
        toChooseStore() {
            util.linkto("store-choose");
        },
        // 图片上传相关
        chooseImage() {
            uni.chooseImage({
                count: this.count,
                sourceType: ["camera"],
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
        previewImg(currImg, imgList) {
            uni.previewImage({
                current: currImg,
                urls: imgList
            });
        },
        toSend() {
            if (this.params.storeId === "") {
                util.showToast("请选择需要拜访的门店");
                return;
            }
            if (this.params.notes.trim() === "") {
                util.showToast("请填写拜访日记");
                return;
            }
            if (!this.imageArr.length) {
                util.showToast("请上传门店图片");
                return;
            }
            util.showLoadingDialog("提交中");
            http.uploadFiles(this.imageArr,{type:'visit'}, res => {
                console.log("res", res);
                this.params.photos = res.map(ele => {
                    return ele.imgUrl;
                });
                http.request(urls.VISITED, "POST", this.params).then(data => {
                    util.showToast("拜访成功");
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 1500);
                });
            });
        },
        showMore(item) {
            item.showMore = !item.showMore;
        },
        // 时间选择
        chooseStart(e) {
            this.startTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadRecord();
            }
        },
        chooseEnd(e) {
            this.endTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadRecord();
            }
        }
    }
};
</script>
<style lang="stylus">
@import './store-visit'
</style>
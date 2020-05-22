<template lang="pug">
    view(class="wrap")
        view(class="df jcsba top bk_f")
            view(class="top-item re curr-top") 拜访签到
            view(class="top-item re") 拜访记录
        view(class="main")
            //- 拜访签到
            view(v-if="1")
                map(class="map" :longitude="lng" :latitude="lat")
                view(class="qiaodao p25lr")
                    view(class="df jcsb ai-center choose-store" @tap="toChooseStore")
                        view(v-if="1")
                            text(class="fs28 cor fwb5") 请选择拜访门店
                            text(class="xing ml5") *
                        view(v-else class="fs28 cor") 万象城巴拉巴拉巴拉
                        image(src="../../static/image/arrow-right.png" class="arrow")
                    view(class="riji")
                        view(class="fs28 cor") 拜访日记
                        textarea(placeholder="请输入此拜访沟通的内容及结果~" class="area" placeholder-class='pl')
                view(class="df mt15 p25lr")
                    view(class="up-img-wrap re")
                        image(src="" lazy-load="true" mode="aspectFill" class="up-img bk_f")
                        image(@click="deleteImg"
                               class="delimg"
                               src="../../static/image/other/del_img.png")
                    view(class="df jcc ai-center fldc up-img-wrap bk_f")
                        image(class="camera" src="../../static/image/store/camera.png")
                        view(class="mt5")
                            text(class="xing") *
                            text(class="fs24 cor") 上传图片
                view(class="btn_wrap")
                    view(class="btn-default") 提交签到
            view(v-else)
                view(class="df jcsb p25")
                    view(class="jilu-nav curr-nav") 全部
                    view(class="jilu-nav") 今日
                    view(class="jilu-nav") 本月
                    view(class="jilu-nav") 自定义
                view(class="jilu-list")
                    view(class="jilu-item bk_f")
                        view(class="jl-item-top p25 bb1")
                            view(class="fs28 cor fwb5") 门店名称名称名称
                            view(class="fs24 cor_9 df jcsb mt15")
                                view() 拜访时间
                                view() 2020-05-09 18:30
                        view(class="bf-xq df ai-center jcsb")
                            view(class="df ai-center")
                                view(class="bar")
                                view(class="fs28 cor ml15 fwb4") 商品
                            image(class="arrow" src="../../static/image/arrow-down.png")
                        view(class="pl25")
                            view(class="df")
                                view(class="fs24 cor") 拜访日记
                                view(class="jl-text") 内容文案文案文案文案文案文案文案文案文案备内容文案文案文案文案文案文案文案文案文案备内容文案文案文案文案文案文案文案文案文案备
                            view(class="df mt25") 
                                view(class="fs24 cor") 门店图片
                                view(class="df")
                                    image(src="" class="bg_sky jl-store-img")
                            

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            lat: "",
            lng: "",
            storeData:null
        };
    },
    onLoad() {
        console.log(this.$globalData.visitStore);
        this.storeData=this.$globalData.visitStore
    },
    onShow() {
        if(!this.lat){
            pd.getPosition().then((res)=>{
                this.lat=res.latitude;
                this.lng=res.longitude;
            })
        }
    },
    methods: {
        toChooseStore() {
            util.linkto("store-choose");
        },
        getPosition() {
            let that = this;
            new Promise((reslove, reject) => {
                uni.authorize({
                    scope: "scope.userLocation",
                    success() {
                        reslove();
                    },
                    fail() {
                        reject();
                    }
                });
            })
                .then(() => {
                    wx.getLocation({
                        type: "wgs84",
                        success(res) {
                            that.latitude = res.latitude;
                            that.longitude = res.longitude;
                            // that.mapShow = true;
                        },
                        fail(e) {
                            reauthorization();
                        }
                    });
                })
                .catch(() => {
                    reauthorization();
                });
            function reauthorization() {
                uni.showModal({
                    title: "提示",
                    content: "您未授权获取地理位置,请授权后使用",
                    showCancel: true,
                    confirmText: "授权",
                    confirmColor: "#52a2d8",
                    success: function(res) {
                        if (res.confirm) {
                            //确认则打开设置页面
                            uni.openSetting();
                        }
                    }
                });
            }
        }
    }
};
</script>
<style lang="stylus">
@import './store-visit'
</style>
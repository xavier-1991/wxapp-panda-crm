<template>
    <view>
        <!--地图容器-->
        <!-- <map id="myMap"
             :markers="markers"
             style="width:100%;height:750rpx;"
             :longitude="latitude"
             :latitude="longitude"
             :scale='16'
             :show-location="true"
             :include-points="true"
             @regionchange="regionChange">
            <cover-view class="center-img">
                <cover-image src="../../static/image/arrow-down.png"></cover-image>
            </cover-view>
        </map> -->
        <!-- <view class="item-title">
            <view>address:{{chooseAddress}}</view>
            <view>recommend:{{chooseRecommend}}</view>
            <view>
                chooseLat:{{chooseLat}}
            </view>
            <view>
                chooseLng:{{chooseLng}}
            </view>
        </view> -->
    </view>

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
// var QQMapWX = require("../../libs/qqmap-wx-jssdk.js");
// var qqmapsdk = new QQMapWX({
//     key: "KEDBZ-HWS3P-GYSDE-L76MN-7W2DJ-J5FY4" // 必填
// });
export default {
    data() {
        return {
            // markers:{
            //     id: 1,
            //     width: 25,
            //     height: 25,
            //     iconPath: "../../static/image/arrow-down.png",
            //     longitude:16.323459711,
            //     latitude:  39.89631551,
            //     title: "111111111"
            // },
            // latitude: 39.89631551,
            // longitude: 11.323459711,
            // key: "KEDBZ-HWS3P-GYSDE-L76MN-7W2DJ-J5FY4",
            // referer: "",
            // location: JSON.stringify({
            //     latitude: 39.89631551,
            //     longitude: 116.323459711
            // })
        };
    },
    onShow() {},
    onLoad() {
        wx.getLocation({
            type: 'gcj02 ',
            success (res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                 wx.chooseLocation({
                     latitude,
                     longitude,
                     success(e){
                         console.log(e)
                     }
                 })
            }
        })
    },
    methods: {
        // 视野发生变化时触发
        // regionChange(e) {   
        //     let that = this;
        //     console.log("视野发生变化时触发===", that);
        //     return;
        //     that.mpCtx = wx.createMapContext("myMap");
        //     that.mpCtx.getScale({
        //         //获取当前地图的缩放级别
        //         success: res => {
        //             console.log("地图缩放级别", res.scale);
        //             that.mpCtx.getCenterLocation({
        //                 //获取当前地图中心的经纬度。返回的是 gcj02 坐标系
        //                 success: res => {
        //                     console.log(res);
        //                     that.setData(
        //                         {
        //                             markers: [
        //                                 {
        //                                     id: 1,
        //                                     width: 25,
        //                                     height: 25,
        //                                     iconPath: "/images/tx-map-l2.png",
        //                                     longitude: res.longitude,
        //                                     latitude: res.latitude,
        //                                     title: res.address
        //                                 }
        //                             ]
        //                         },
        //                         () => {
        //                             qqmapsdk.reverseGeocoder({
        //                                 //逆地址解析
        //                                 location: {
        //                                     latitude: res.latitude,
        //                                     longitude: res.longitude
        //                                 },
        //                                 success: res1 => {
        //                                     let res = res1.result;
        //                                     console.log(
        //                                         "逆地址解析res===",
        //                                         res
        //                                     );
        //                                     that.setData({
        //                                         chooseLat: res.location.lat,
        //                                         chooseLng: res.location.lng,
        //                                         chooseAddress: res.address,
        //                                         chooseRecommend:
        //                                             res.formatted_addresses
        //                                                 .recommend
        //                                     });
        //                                 }
        //                             });
        //                         }
        //                     );
        //                 }
        //             });
        //         },
        //         fail: function() {
        //             console.log("获取当前地图的缩放级别失败===");
        //         }
        //     });
        // }
    }
}
</script>
<style lang="stylus">
    @import './map-choose-address'
</style>
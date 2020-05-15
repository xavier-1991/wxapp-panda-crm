<template lang="pug">
    view()
        view(class="map_container")
  
                    


        
   
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
const amapFile  = require("../../libs/amap-wx");

export default {
    data() {
        return {
            aa:'0c023032ccd5eef67484fcbad5730ce2'
        };
    },

    onLoad() {
        var myAmapFun = new amapFile.AMapWX({key:'143668535142679748af31e8caeb6766'});
        myAmapFun.getRegeo({
            success: function(data){
                //成功回调
                console.log(data)
            },
            fail: function(info){
                //失败回调
                console.log(info)
            }
        })
        wx.getSystemInfo({
            success: function(data){
                var height = data.windowHeight;
                var width = data.windowWidth;
                var size = width + "*" + height;
                myAmapFun.getStaticmap({
                    zoom: 8,
                    size: size,
                    scale: 2,
                    markers: "mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437",
                    success: function(data){
                        that.setData({
                        src: data.url
                        })
                    },
                    fail: function(info){
                            wx.showModal({title:info.errMsg})
                        }
                })
            }
        })
    },
    methods: {
        chooseAddress() {
            // wx.getLocation({
            //     type: "gcj02", //返回可以用于wx.openLocation的经纬度
            //     success(res) {
            //         const latitude = res.latitude;
            //         const longitude = res.longitude;
            //     }
            // });
        }
    }
};
</script>
<style lang="stylus">
@import './map-choose-address'
</style>
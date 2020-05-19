<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                input(class="inp" placeholder="必填2-20字" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                input(class="inp" placeholder="必填(经营多个品牌 “，” 隔开)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系人
            view(class="item-right")
                input(class="inp" placeholder="必填" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                input(class="inp" placeholder="必填，11位手机号" placeholder-class='pl' maxlength='11' type='number')
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re" @tap="chooseAddress")
                input(class="inp" :disabled="true" placeholder="必填" placeholder-class='pl')
                image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="item-right re")
                input(class="inp" placeholder="必填(小区门派号)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店类型
            view(class="item-right df ai-center")
                view(class="df ai-center select")
                    image(src="../../static/image/store/selected-no.png")
                    view 单体门店
                view(class="df ai-center select")
                    image(src="../../static/image/store/selected.png")
                    view 连锁门店
        view
            view(class="fs28 cor" style="margin:30rpx 0 0 24rpx") 资质信息
            textarea()
        view(style="padding:68rpx 108rpx 0;")
            view(class="btn-default") 保存
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");

export default {
    data() {
        return {};
    },

    onLoad() {},
    methods: {
        chooseAddress() {
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
            }).then(() => {
                   wx.getLocation({
                        type: 'gcj02 ',
                        success (res) {
                            wx.chooseLocation({
                                latitude:res.latitude,
                                longitude:res.longitude,
                                success(e){
                                    console.log(e)
                                }
                            })
                        }
                    })
                })
                .catch(() => {
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
                });
        }
    }
};
</script>
<style lang="stylus">
@import './latent-custom-add'
</style>
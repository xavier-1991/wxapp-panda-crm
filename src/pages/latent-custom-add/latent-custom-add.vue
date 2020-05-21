<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                input(v-model="params.storeName" class="inp" placeholder="必填2-20字" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                input(v-model="params.brands" class="inp" placeholder="必填(经营多个品牌 “，” 隔开)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系人
            view(class="item-right")
                input(v-model="params.contacts" class="inp" placeholder="必填" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                input(v-model="params.mobile" class="inp" placeholder="必填，11位手机号" placeholder-class='pl' maxlength='11' type='number')
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re" @tap="chooseAddress")
                input(v-model="params.locationAddr" class="inp" :disabled="true" placeholder="必填" placeholder-class='pl')
                image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="item-right re")
                input(v-model="params.address" class="inp" placeholder="必填(小区门牌号)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店类型
            view(class="item-right df ai-center")
                view(class="df ai-center select" @tap="changeType(0)")
                    image(v-if="params.storeType===0" src="../../static/image/store/selected.png")
                    image(v-else src="../../static/image/store/selected-no.png")
                    view 单体门店
                view(class="df ai-center select"  @tap="changeType(1)")
                    image(v-if="params.storeType===1" src="../../static/image/store/selected.png")
                    image(v-else src="../../static/image/store/selected-no.png")
                    view 连锁门店
        view(class="p20lr")
            view(class="fs28 cor mt30") 资质信息
            view(class="df area-wrap mt15")
                image(class="edit" src="../../static/image/other/edit.png")
                textarea(v-model="params.unregisteredReason" placeholder-class='pl2')
        view(style="padding:68rpx 108rpx 0;" @tap="toSubmit")
            view(class="btn-default") 保存
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");

export default {
    data() {
        return {
            params: {
                storeName: "",
                brands: "",
                contacts: "",
                mobile: "",
                locationAddr: "",
                address:"",
                unregisteredReason: "",
                lat: "",
                lng: "",
                storeType: 0
            }
        };
    },

    onLoad() {},
    onShow() {},
    methods: {
        changeType(type) {
            this.params.storeType = type;
            
        },
        chooseAddress() {
            let that = this;
            pd.getPosition().then((res)=>{
                wx.chooseLocation({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    success(e) {
                        that.params.locationAddr = e.address;
                        that.params.lat = e.latitude + "";
                        that.params.lng = e.longitude + "";
                    }
                });
            })
            // return;
            // new Promise((reslove, reject) => {
            //     uni.authorize({
            //         scope: "scope.userLocation",
            //         success() {
            //             reslove();
            //         },
            //         fail() {
            //             reject();
            //         }
            //     });
            // })
            //     .then(() => {
            //         wx.getLocation({
            //             type: "gcj02 ",
            //             success(res) {
            //                 wx.chooseLocation({
            //                     latitude: res.latitude,
            //                     longitude: res.longitude,
            //                     success(e) {
            //                         console.log(e)
            //                         that.params.locationAddr = e.address;
            //                         that.params.lat = e.latitude + "";
            //                         that.params.lng = e.longitude + "";
            //                     }
            //                 });
            //             }
            //         });
            //     })
            //     .catch(() => {
            //         uni.showModal({
            //             title: "提示",
            //             content: "您未授权获取地理位置,请授权后使用",
            //             showCancel: true,
            //             confirmText: "授权",
            //             confirmColor: "#52a2d8",
            //             success: function(res) {
            //                 if (res.confirm) {
            //                     //确认则打开设置页面
            //                     uni.openSetting();
            //                 }
            //             }
            //         });
            //     });
        },
        toSubmit(){
            let params=this.params;
            if(!params.storeName.trim()||!params.brands.trim()||!params.contacts.trim()||!params.locationAddr.trim()||!params.unregisteredReason.trim()){
                util.showToast('请完善必填信息')
                return;
            }
            if (!util.checkPhone(params.mobile)) {
                util.showToast("请输入正确的手机号");
                return;
            }
            util.showLoadingDialog("加载中");
            http.request(
                urls.CUSTOMER,
                "POST",
                params
            ).then(data => {
                util.showToast('新增成功');
                setTimeout(() => {
                    uni.navigateBack();
                }, 1500);
            }).finally(()=>{
                uni.stopPullDownRefresh();
            })
        }
    }
};
</script>
<style lang="stylus">
@import './latent-custom-add'
</style>
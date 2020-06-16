<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                view(class="item-right-text textFlow") {{params.storeName}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                view(class="item-right-text textFlow") {{params.brands}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系人
            view(class="item-right")
                view(class="item-right-text textFlow") {{params.contacts}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                view(class="item-right-text textFlow") {{params.mobile}}
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re" @tap="chooseAddress")
                view(class="item-right-text textFlow") {{params.locationAddr}}
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="item-right re")
                view(class="item-right-text textFlow") {{params.address}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店类型
            view(class="item-right")
                view(class="item-right-text textFlow") {{params.storeType===0?'单体门店':'连锁门店'}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 未注册原因
            view(class="item-right df jcc fldc")
                view(class="item-right-text2") {{params.unregisteredReason}}
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");

export default {
    data() {
        return {
            type:"",
            id:"",
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

    onLoad(options) {
        this.id=options.id;
        this.getCustomDetail();
    },
    onShow() {},
    methods: {
        getCustomDetail(){
            util.showLoadingDialog('加载中');
            http.request(
                urls.CUSTOMER_DETAIL.format(this.id),
                "GET"
            ).then(data => {
                this.params=data.detail;
                if(!data.detail.lat){
                    delete this.params['lat'];
                    delete this.params['lng'];
                }
                util.hideLoadingDialog();
            })
        },
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
        },
        toSubmit(){
            let params=this.params;
            if(!params.storeName.trim()){
                util.showToast('门店名称不能为空')
                return;
            }
            if(!params.brands.trim()){
                util.showToast('经营品牌不能为空')
                return;
            }
            if(!params.contacts.trim()){
                util.showToast('联系人不能为空')
                return;
            }
            if(!params.mobile.trim()){
                util.showToast('联系电话不能位空')
                return;
            }
            if (!util.checkPhone(params.mobile)) {
                util.showToast("请输入正确的手机号");
                return;
            }
            if(!params.locationAddr.trim()){
                util.showToast('门店地址不能为空')
                return;
            }
            if(!params.address.trim()){
                util.showToast('详细地址不能为空')
                return;
            }
            if(!params.unregisteredReason.trim()){
                util.showToast('未注册原因不能为空')
                return;
            }
            util.showLoadingDialog("请稍候");
            if(this.type=="add"){
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
            }else{
                http.request(
                    urls.CUSTOMER_DETAIL.format(this.id),
                    "PUT",
                    params
                ).then(data => {
                    util.showToast('编辑成功');
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 1500);
                }).finally(()=>{
                    uni.stopPullDownRefresh();
                })
            }
            
        }
    }
};
</script>
<style lang="stylus">
@import './latent-custom-check'
</style>
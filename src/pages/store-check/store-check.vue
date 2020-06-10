<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                view( class="inp") {{params.name}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 证件信息
            view(class="item-right")
                view( class="inp") {{params.organizationCode||'无'}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                view( class="inp") {{params.brands}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系人
            view(class="item-right")
                view( class="inp") {{params.trueName}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                view( class="inp") {{params.mobile}}
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re")
                view( class="inp") {{params.locationAddr}}
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="fs28 cor item-right" style="padding:24rpx 0;height:auto;") {{params.address}}
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店类型
            view(class="fs28 cor item-right" style="padding:24rpx 0;height:auto;") {{params.storeType==0?'单体门店':'连锁门店'}}
        view(class="item df ai-center jcsb re" v-if="params.hasSalesman")
            view(class="item-left") 业务员
            view(class="fs28 cor item-right" style="padding:24rpx 0;height:auto;") {{params.salesmanName}}
        view
            view(class="fs28 cor" style="margin:30rpx 0 0 24rpx") 资质信息
            view(class="camara-list df jcsb fw")
                view(class="camara-item")
                    image(:src="params.storeFacedPic" mode="aspectFill" class="bk_gray c-item-top" @tap="previewImg(params.storeFacedPic,[params.storeFacedPic])")
                    view(class="fs28 cor mt15 tac") 门脸照
                view(class="camara-item" )
                    image(:src="params.storeEnvironPic" mode="aspectFill" class="bk_gray c-item-top" @tap="previewImg(params.storeEnvironPic,[params.storeEnvironPic])")
                    view(class="fs28 cor mt15 tac") 店内环境照
                view(class="camara-item")
                    image(:src="params.licensePic" mode="aspectFill" class="bk_gray c-item-top" @tap="previewImg(params.licensePic,[params.licensePic])")
                    view(class="fs28 cor mt15 tac") 营业执照
                view(class="camara-item")
                    image(:src="params.userIdPic" mode="aspectFill" class="bk_gray c-item-top" @tap="previewImg(params.userIdPic,[params.userIdPic])")
                    view(class="fs28 cor mt15 tac") 手持身份证照
        view(v-if="pageType=='audit'" class="add-btn-wrap bt1 df jcsb")
            view(class="add-btn" @tap='toAudit(false)') 审核不通过
            view(class="add-btn add-btn2" @tap='toAudit(true)') 审核通过
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
                name: "",
                organizationCode: "",
                brands: "",
                trueName: "",
                mobile: "",
                // lat: "",
                // lng: "",
                address: "", //详细地址
                locationAddr:'',  //定位详细地址
                // storeFacedPic:'',   //门脸照
                // storeEnvironPic:'', //环境照
                // licensePic:'',  //营业执照
                // userIdPic: "", //手持身份证照片
                storeType: 0 //门店类型 0单体门店 1 连锁门店
            },
            pageType:''
        };
    },

    onLoad(options) {
        if (options.type == "check") {
            this.pageType="check";
            uni.setNavigationBarTitle({
                title: "查看门店"
            });
        } else {
            this.pageType="audit";
            uni.setNavigationBarTitle({
                title: "审核门店"
            });
        }
        this.params.id=options.id;
        this.getStoreDetail();
    },
    methods: {
        getStoreDetail(){
            util.showLoadingDialog('加载中');
            http.request(
                urls.STORE_DETAIL.format(this.params.id),
                "GET",
                {type:'edit'}
            ).then(data => {
                this.params=data.detail;
                this.params.locationAddr=data.detail.storeAddress;
                util.hideLoadingDialog();
            })
        },
        toAudit(status){
            if(!this.params.hasSalesman){
                //门店没有业务员，去选择业务员
                util.linkto('store-check-audit',`id=${this.params.id}`);
                return
            }
            let tipStr=status?"您确定审核通过吗":"您确定不通过审核吗"
            util.showConfirm('','确定',tipStr,()=>{
                util.showLoadingDialog('请稍候');
                http.request(
                    urls.COMMON_REVIEW,
                    "POST",
                    {isPass:status,storeId:this.params.id}
                ).then(data => {
                    if(status){
                        util.showToast('审核成功')
                    }else{
                        util.showToast('审核已退回')
                    }
                    setTimeout(() => {
                        this.$globalData.fromStoreAudit = true;
                        uni.navigateBack();
                    }, 1500);
                })
            })
        },
        previewImg: function(currImg, imgList) {
            uni.previewImage({
                current: currImg,
                urls: imgList
            });
        }
       
    }
};
</script>
<style lang="stylus">
@import './store-check'
</style>
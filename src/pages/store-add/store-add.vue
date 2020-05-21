<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                input(v-model="params.name" class="inp" placeholder="必填2-20字" placeholder-class='pl')
        //- view(class="item df ai-center jcsb")
        //-     view(class="item-left") 店铺logo
        //-     view(class="item-right re df ai-center")
        //-         image(src="" class="bg_sky" class="logo_img")
        //-         image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb")
            view(class="item-left") 证件信息
            view(class="item-right")
                input(v-model="params.organizationCode" class="inp" placeholder="统一社会信用代码 (组织机构代码)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                input(v-model="params.brands" class="inp" placeholder="必填(经营多个品牌 “，” 隔开)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 姓名
            view(class="item-right")
                input(v-model="params.trueName" class="inp" placeholder="必填" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                input(v-model="params.mobile" class="inp" placeholder="请输入号码" placeholder-class='pl' type="number" maxlength='11')
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re" @tap="chooseAddress")
                input(v-model="params.locationAddr" class="inp" :disabled="true" placeholder="请选择地址" placeholder-class='pl')
                image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="item-right re")
                input(v-model="params.address" class="inp" placeholder="请输入详细地址" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店类型
            view(class="item-right df ai-center")
                view(class="df ai-center select" @tap="changStoreType(0)")
                    image(v-if="params.storeType==0" src="../../static/image/store/selected.png")
                    image(v-else src="../../static/image/store/selected-no.png")
                    view 单体门店
                view(class="df ai-center select" @tap="changStoreType(1)")
                    image(v-if="params.storeType==1" src="../../static/image/store/selected.png")
                    image(v-else src="../../static/image/store/selected-no.png")
                    view 连锁门店
        view
            view(class="fs28 cor" style="margin:30rpx 0 0 24rpx") 资质信息
            view(class="camara-list df jcsb fw")
                view(class="camara-item" @tap="chooseImage('storeFacedPic')")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 门脸照
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 店内环境照
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 营业执照
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 手持身份证照
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
        return {
            params:{
                name:'',
                organizationCode:'',
                brands:'',
                trueName:'',
                mobile:'',
                lat:'',
                lng:'',
                address:'',         //详细地址
                locationAddr:'',  //定位详细地址
                storeFacedPic:'',   //门脸照
                storeEnvironPic:'', //环境照
                licensePic:'',  //营业执照
                userIdPic:'',  //手持身份证照片
                storeType:0  //门店类型 0单体门店 1 连锁门店
            }
        };
    },

    onLoad(options) {
        if(options.type=='add'){
            uni.setNavigationBarTitle({
                title: '新增门店'
            });
        }else{
            uni.setNavigationBarTitle({
                title: '编辑门店'
            });
        }
    },
    methods: {
        changStoreType(type){
            this.params.storeType=type;
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
        }
    }
};
</script>
<style lang="stylus">
@import './store-add'
</style>
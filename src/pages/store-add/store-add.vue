<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                input(v-model="params.name" class="inp" placeholder="必填2-20字" placeholder-class='pl')
        //- view(class="item df ai-center jcsb")
        //-     view(class="item-left") 店铺logo
        //-     view(class="item-right re df ai-center")
        //-         image(src="" class="bk_gray" class="logo_img")
        //-         image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb")
            view(class="item-left") 证件信息
            view(class="item-right")
                input(v-model="params.organizationCode" class="inp" placeholder="必填，统一社会信用代码 (组织机构代码)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                input(v-model="params.brands" class="inp" placeholder="必填(经营多个品牌 “，” 隔开)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系人
            view(class="item-right")
                input(v-model="params.trueName" class="inp" placeholder="必填" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                input(v-model="params.mobile" class="inp" placeholder="必填，11位手机号" placeholder-class='pl' type="number" maxlength='11')
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re" @tap="chooseAddress")
                input(v-model="params.locationAddr" class="inp" :disabled="true" placeholder="必填" placeholder-class='pl')
                image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="item-right re")
                input(v-model="params.address" class="inp" placeholder="必填（小区门牌号等）" placeholder-class='pl')
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
                    view(class="c-item-top re" v-if="!localSrc.storeFacedPic")
                        image(src="../../static/image/store/camera.png")
                    image(v-else :src="localSrc.storeFacedPic" class="bk_gray c-item-top")
                    view(class="fs28 cor mt15 tac") 门脸照
                view(class="camara-item" @tap="chooseImage('storeEnvironPic')")
                    view(class="c-item-top re" v-if="!localSrc.storeEnvironPic")
                        image(src="../../static/image/store/camera.png")
                    image(v-else :src="localSrc.storeEnvironPic" class="bk_gray c-item-top")
                    view(class="fs28 cor mt15 tac") 店内环境照
                view(class="camara-item" @tap="chooseImage('licensePic')")
                    view(class="c-item-top re" v-if="!localSrc.licensePic")
                        image(src="../../static/image/store/camera.png")
                    image(v-else :src="localSrc.licensePic" class="bk_gray c-item-top")
                    view(class="fs28 cor mt15 tac") 营业执照
                view(class="camara-item" @tap="chooseImage('userIdPic')")
                    view(class="c-item-top re" v-if="!localSrc.userIdPic")
                        image(src="../../static/image/store/camera.png")
                    image(v-else :src="localSrc.userIdPic" class="bk_gray c-item-top")
                    view(class="fs28 cor mt15 tac") 手持身份证照
            view(class="baocun")
                view(class="btn-default" @tap="toSend") 保存
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
                lat: "",
                lng: "",
                address: "", //详细地址
                locationAddr:'',  //定位详细地址
                // storeFacedPic:'',   //门脸照
                // storeEnvironPic:'', //环境照
                // licensePic:'',  //营业执照
                // userIdPic: "", //手持身份证照片
                storeType: 0 //门店类型 0单体门店 1 连锁门店
            },
            // 存放本地临时路径
            localSrc: {
                storeFacedPic: "", //门脸照
                storeEnvironPic: "", //环境照
                licensePic: "", //营业执照
                userIdPic: "" //手持身份证照片
            }
        };
    },

    onLoad(options) {
        if (options.type == "add") {
            this.pageType="add";
            uni.setNavigationBarTitle({
                title: "新增门店"
            });
        } else {
            this.pageType="edit";
            uni.setNavigationBarTitle({
                title: "编辑门店"
            });
            this.params.id=options.id;
            this.getStoreDetail();
        }
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
                this.localSrc.storeFacedPic=this.params.storeFacedPic;
                this.localSrc.storeEnvironPic=this.params.storeEnvironPic;
                this.localSrc.licensePic=this.params.licensePic;
                this.localSrc.userIdPic=this.params.userIdPic;
                util.hideLoadingDialog();
            })
        },
        changStoreType(type) {
            this.params.storeType = type;
        },
        chooseAddress() {
            let that = this;
            pd.getPosition().then(res => {
                wx.chooseLocation({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    success(e) {
                        that.params.locationAddr = e.address;
                        that.params.lat = e.latitude + "";
                        that.params.lng = e.longitude + "";
                    }
                });
            });
        },
        chooseImage(type) {
            uni.chooseImage({
                count: 1,
                sizeType: ["compressed"],
                success: res => {
                    this.localSrc[type] = res.tempFilePaths[0];
                }
            });
        },
        toSend() {
            // for (let attr in this.params) {
            //     if (this.params[attr] === "") {
            //         util.showToast("请完善以上信息");
            //         return;
            //     }
            // }
            if(!this.params.name.trim()){
                util.showToast("门店名称不能为空");
                return;
            }
             if(this.params.name.length<2||this.params.name.length>16){
                util.showToast("门店名称为2至16个字");
                return;
            }
            if(!this.params.organizationCode.trim()){
                util.showToast("证件信息不能为空");
                return;
            }
            if(!this.params.brands.trim()){
                util.showToast("经营品牌不能为空");
                return;
            }
            if(!this.params.trueName.trim()){
                util.showToast("联系人不能为空");
                return;
            }
            if(!this.params.mobile.trim()){
                util.showToast("联系电话不能为空");
                return;
            }
            if (!util.checkPhone(this.params.mobile)) {
                util.showToast("请输入正确格式的手机号");
                return;
            }
            if(!this.params.locationAddr.trim()){
                util.showToast("门店地址不能为空");
                return;
            }
            if(!this.params.address.trim()){
                util.showToast("详细地址不能为空");
                return;
            }
            let phoneEmpty = false
            for (let attr in this.localSrc) {
                if (this.localSrc[attr]) {
                    phoneEmpty=true
                }
            }
            if(!phoneEmpty){
                util.showToast("必须上传门店资质信息");
                return;
            }
            for (let attr in this.localSrc) {
                if (this.localSrc[attr] === "") {
                    util.showToast("门店信息图片不足");
                    return;
                }
            }
           
            // if(this.pageType=='add'){
            //     // 新增门店
            //     let localSrc = this.localSrc;
            //     let localArr = [
            //         localSrc.storeFacedPic,
            //         localSrc.storeEnvironPic,
            //         localSrc.licensePic,
            //         localSrc.userIdPic
            //     ];
            //     util.showLoadingDialog('上传中');
            //     http.uploadFiles(localArr, res => {
            //         this.params.storeFacedPic = res[0].imgUrl;
            //         this.params.storeEnvironPic = res[1].imgUrl;
            //         this.params.licensePic = res[2].imgUrl;
            //         this.params.userIdPic = res[3].imgUrl;
            //         http.request(
            //             urls.STORE,
            //             "POST",
            //             this.params
            //         ).then(data => {
            //             util.showToast('新增成功');
            //             setTimeout(() => {
            //                 uni.navigateBack();
            //             }, 1500);
            //         })
            //     });
            // }

            // 新增、编辑
            let arr=[];
            let upArr=[];
            for (let attr in this.localSrc) {
                console.log(attr,this.localSrc[attr])
                console.log(attr,this.params[attr])
                console.log(this.localSrc[attr] != this.params[attr])
                if (this.localSrc[attr] != this.params[attr]) {
                    upArr.push(this.localSrc[attr])
                    arr.push({
                        type:attr,
                        imgSrc:this.localSrc[attr]
                    })
                }
            };
            console.log('upArr',upArr);
            if(upArr.length){
                util.showLoadingDialog('上传中');
            }else{
                util.showLoadingDialog('保存中');
            }
            http.uploadFiles(upArr,{type:'store'}, result => {
                result.forEach((ele,i) => {
                    let type = arr[i].type;
                    this.params[type]=ele.imgUrl;
                    this.localSrc[type]=ele.imgUrl;
                });
                let reUrl,method;
                if(this.pageType=='add'){
                    reUrl=urls.STORE;
                    method='POST';
                }else{
                    reUrl=urls.STORE_EDIT.format(this.params.id);
                    method='PUT';
                }
                http.request(
                    reUrl,
                    method,
                    this.params
                ).then(data => {
                    if(this.pageType=='add'){
                        util.showToast('新增成功');
                    }else{
                        util.showToast('编辑成功');
                    }
                    setTimeout(() => {
                        uni.navigateBack();
                    }, 1500);
                })
            });
        }
    }
};
</script>
<style lang="stylus">
@import './store-add'
</style>
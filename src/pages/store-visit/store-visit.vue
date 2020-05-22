<template lang="pug">
    view(class="wrap" v-if="hasData")
        view(class="df jcsba top bk_f")
            view(class="top-item re curr-top") 拜访签到
            view(class="top-item re") 拜访记录
        view(class="main")
            //- 拜访签到
            view(v-if="hasData")
                map(class="map" :longitude="params.lng" :latitude="params.lat")
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
                        image(:src="item" class="storeImg" lazy-load="true" mode="aspectFill" class="up-img bk_f")
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
            hasData:false,
            storeName:'',
            // 图片上传相关
            count: 3, //随着imageArr的length改变而改变,最多传3张图
            imageArr: [], //本地
            // 参数
            params:{
                storeId:'',
                lat:'',
                lng:'',
                notes:'',
                deviation:'',
                isLeads:0,
                photos:[]
            }
        };
    },
    onLoad() {
       
    },
    onShow() {
        if(!this.params.lat){
            pd.getPosition().then((res)=>{
                this.params.lat=res.latitude+'';
                this.params.lng=res.longitude+'';
                 if(this.$globalData.visitStore){
                    let visitStore=this.$globalData.visitStore;
                    this.storeName=visitStore.storeName;
                    this.params.storeId=visitStore.storeId;
                    this.params.deviation=visitStore.distance;
                    this.$globalData.visitStore=null;
                }
                this.hasData=true;
            })
        }
    },
    methods: {
        toChooseStore() {
            util.linkto("store-choose");
        },
        chooseImage() {
            uni.chooseImage({
                count: this.count,
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
        toSend(){
            if(this.params.storeId===''){
                util.showToast("请选择需要拜访的门店");
                return;
            }
            if(this.params.notes.trim()===''){
                util.showToast("请填写拜访日记");
                return;
            }
            if(!this.imageArr.length){
                util.showToast("请上传门店图片");
                return;
            }
            util.showLoadingDialog('提交中');
            http.uploadFiles(this.imageArr, res => {
                console.log('res',res)
                this.params.photos=res.map((ele)=>{
                    return ele.imgUrl
                })
                http.request(
                    urls.VISITED,
                    "POST",
                    this.params
                ).then(data => {
                    util.showToast('拜访成功');
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
@import './store-visit'
</style>
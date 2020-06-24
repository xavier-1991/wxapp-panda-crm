<template lang="pug">
    view(class="fs28 cor")
        view(class="item df jcsb ai-center")
            view()
                text 姓名
                text(class="xing") *
            view(class="item-r bb1")
                input(v-model="name" placeholder='请输入业务员姓名' placeholder-class="pl")
        view(class="item df jcsb ai-center")
            view()
                text 手机号
                text(class="xing") *
            view(class="item-r bb1")
                input(v-model="mobile" placeholder='请输入手机号' placeholder-class="pl" type="number" maxlength="11")
        view(class="item df jcsb ai-center mt20")
            view()
                text 服务区域
                text(class="xing") *
            view(class="df ai-center" )
                view(class="c-yewu-box df ai-center" style="width:226rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='areaList' range-key="provinceName" @change="provinceChange") 
                        view(class="df ai-center jcsb" style="width:206rpx")
                            view(:class="['textFlow','c-area-text',provinceId?'':'c-area-text-empty']") {{provinceName?provinceName:'选择省区'}}
                            image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="c-yewu-box df ai-center ml25" style="width:226rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='cityList' range-key="cityName" @change="cityChange") 
                        view(class="df ai-center jcsb" style="width:206rpx")
                            view(:class="['textFlow','c-area-text',cityId?'':'c-area-text-empty']") {{cityName?cityName:'选择城市'}}
                            image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="fs28 cor_blue p20 fls0" @tap="addCity") 确定
        view(class="df pl25 mt60 fw")
            view(class="tag df ai-center" v-for="(item,index) in serviceAreaList" :key="index")
                view(class="city-name textFlow") {{item.cityName}}
                image(src="../../static/image/other/del-sale.png" class="del-img" @tap="toDelete(index)")  
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
            pageType:'add',
            name:'',
            mobile:'',
            //省市
            provinceName: "",
            cityName: "",
            provinceId: 0,
            cityId: 0,
            areaList: [], //区域数据总表
            cityList: [],
            serviceAreaList:[]
        };
    },
    onLoad(options) {
        if (options.type == "add") {
            this.pageType="add";
            uni.setNavigationBarTitle({
                title: "新增业务员"
            });
        } else {
            this.pageType="edit";
            this.sales
            uni.setNavigationBarTitle({
                title: "编辑业务员"
            });
            this.id=options.id;
            this.getSalesmanDetail();
        }
        this.getArea()
    },
    methods: {
        getSalesmanDetail(){
            util.showLoadingDialog('加载中');
            http.request(`${urls.SALESMAN_LIST}/${this.id}`, "GET").then(data => {
                this.name=data.name;
                this.mobile=data.mobile;
                data.provinceIds.forEach((item,i)=>{
                    let obj={
                        provinceName:item.name,
                        provinceId:item.code,
                        cityName:data.cityIds[i].name,
                        cityId:data.cityIds[i].code
                    };
                    this.serviceAreaList.push(obj);
                });
                util.hideLoadingDialog()
            });
        },
        // 区域筛选
        getArea(salesman) {
            http.request(urls.AREA_LIST, "GET").then(data => {
                this.areaList = data.list;
            });
        },
        provinceChange(e) {
            let i = e.detail.value * 1;
            this.cityList = this.areaList[i].city;
            this.provinceName = this.areaList[i].provinceName;
            this.provinceId = this.areaList[i].provinceCode;
            this.cityId = 0;
            this.cityName = "";
        },
        cityChange(e) {
            let i = e.detail.value * 1;
            this.cityName = this.cityList[i].cityName;
            this.cityId = this.cityList[i].cityCode;
        },
        //确认添加城市
        addCity(){
            if(this.provinceId==0){
                util.showToast('请选择省份');
                return;
            }
            if(this.cityId==0){
                util.showToast('请选择城市');
                return;
            }
            if(this.serviceAreaList.length){
                if(this.provinceId!=this.serviceAreaList[0].provinceId){
                    util.showToast('请选择同一省份');
                    return;
                }
                let onOff=false;
                this.serviceAreaList.forEach((item,i)=>{
                    if(item.cityId==this.cityId){
                        onOff=true;
                    }
                });
                if(onOff){
                    util.showToast('不能选择同一城市');
                    return;
                }
            }
            let obj={
                provinceName:this.provinceName,
                cityName:this.cityName,
                provinceId:this.provinceId,
                cityId:this.cityId
            }
            this.serviceAreaList.push(obj);
            this.cityName = '';
            this.cityId = 0;
        },
        toDelete(i){
            this.serviceAreaList.splice(i,1);
        },
        toSend(){
            if(!this.name.trim()){
                util.showToast("请填写业务员姓名");
                return;
            }
            if(!this.mobile.trim()){
                util.showToast("请填写手机号码");
                return;
            }
            if (!util.checkPhone(this.mobile)) {
                util.showToast("请输入正确格式的手机号");
                return;
            }
            if(!this.serviceAreaList.length){
                util.showToast("请选择服务区域");
                return;
            }
            let provinceIds=[],cityIds=[];
            this.serviceAreaList.forEach((item,i)=>{
                provinceIds.push(item.provinceId+'');
                cityIds.push(item.cityId+'');
            });
            let params={
                name:this.name,
                mobile:this.mobile,
                provinceIds,
                cityIds
            }
            util.showLoadingDialog('请稍候');
            let reUrl,method;
            if(this.pageType=='add'){
                reUrl=urls.SALESMAN_LIST;
                method='POST';
            }else{
                reUrl=`${urls.SALESMAN_LIST}/${this.id}`;
                method='PUT';
            }
            http.request(
                reUrl,
                method,
                params
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

        }
    }
};
</script>
<style lang="stylus">
@import './sales-add'
</style>
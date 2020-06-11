<template lang="pug">
    view(class="fs28 cor")
        view(class="item df jcsb ai-center")
            view()
                text 姓名
                text(class="xing") *
            view(class="item-r bb1")
                input(placeholder='请输入业务员姓名' placeholder-class="pl")
        view(class="item df jcsb ai-center")
            view()
                text 手机号
                text(class="xing") *
            view(class="item-r bb1")
                input(placeholder='请输入手机号' placeholder-class="pl" type="number")
        //- view(class="item df jcsb ai-center")
        //-     view()
        //-         text 服务区域
        //-         text(class="xing") *
        //-     view(class="item-r bb1")
        //-         input(placeholder='请输入手机号' placeholder-class="pl" type="number")
        //- 区域
        view(class="item df jcsb ai-center mt20")
            view()
                text 服务区域
                text(class="xing") *
            view(class="df ai-center" )
                view(class="c-yewu-box df ai-center" style="width:226rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='areaList' range-key="provinceName" @change="provinceChange") 
                        view(class="df ai-center jcsb" style="width:206rpx")
                            view(:class="['c-area-text',provinceId?'':'c-area-text-empty']") {{provinceName?provinceName:'选择省区'}}
                            image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="c-yewu-box df ai-center ml25" style="width:226rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='cityList' range-key="cityName" @change="cityChange") 
                        view(class="df ai-center jcsb" style="width:206rpx")
                            view(:class="['c-area-text',cityId?'':'c-area-text-empty']") {{cityName?cityName:'选择城市'}}
                            image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="fs28 cor_blue p20 fls0" @tap="") 确定
        view(class="df pl25 mt60 fw")
            view(class="tag df ai-center")
                view(class="city-name textFlow") 齐齐哈尔齐齐哈市
                image(src="../../static/image/other/del-sale.png" class="del-img")  
            view(class="tag df ai-center")
                view(class="city-name textFlow") 齐齐哈尔齐齐哈市
                image(src="../../static/image/other/del-sale.png" class="del-img")
            view(class="tag df ai-center")
                view(class="city-name textFlow") 齐齐哈尔齐齐哈市
                image(src="../../static/image/other/del-sale.png" class="del-img")    
            view(class="tag df ai-center")
                view(class="city-name textFlow") 齐齐哈尔齐齐哈市
                image(src="../../static/image/other/del-sale.png" class="del-img")


</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
           pageType:''
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
            uni.setNavigationBarTitle({
                title: "编辑业务员"
            });
            // this.params.id=options.id;
        }
    },
    methods: {
        
    }
};
</script>
<style lang="stylus">
@import './sales-add'
</style>
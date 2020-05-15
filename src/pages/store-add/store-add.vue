<template lang="pug">
    view()
        view(class="item df ai-center jcsb")
            view(class="item-left") 门店名称
            view(class="item-right")
                input(class="inp" placeholder="必填2-20字" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 店铺logo
            view(class="item-right re df ai-center")
                image(src="" class="bg_sky" class="logo_img")
                image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb")
            view(class="item-left") 证件信息
            view(class="item-right")
                input(class="inp" placeholder="统一社会信用代码 (组织机构代码)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 经营品牌
            view(class="item-right")
                input(class="inp" placeholder="必填(经营多个品牌 “，” 隔开)" placeholder-class='pl')
        view(class="item df ai-center jcsb")
            view(class="item-left") 联系电话
            view(class="item-right")
                input(class="inp" placeholder="请输入号码" placeholder-class='pl')
        view(class="item df ai-center jcsb re")
            view(class="item-left") 门店地址
            view(class="item-right re" @tap="chooseAddress")
                input(class="inp" :disabled="true" placeholder="请选择地址" placeholder-class='pl')
                image(src="../../static/image/arrow-right.png" class="arrow-right")
        view(class="item df ai-center jcsb re")
            view(class="item-left") 详细地址
            view(class="item-right re")
                input(class="inp" placeholder="请输入详细地址" placeholder-class='pl')
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
            view(class="camara-list df jcsb fw")
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 门头照
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 陈列照
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 营业执照
                view(class="camara-item")
                    view(class="c-item-top re" v-if="1")
                        image(src="../../static/image/store/camera.png")
                    image(v-else src="" class="bg_sky c-item-top")
                    view(class="fs28 cor mt15 tac") 陈列照
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
            util.linkto('map-choose-address');
        }
    }
};
</script>
<style lang="stylus">
@import './store-add'
</style>
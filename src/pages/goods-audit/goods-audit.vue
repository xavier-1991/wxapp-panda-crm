<template lang="pug">
    view(class="wrap fs28 cor")
        view(class="df jcsb ai-center")
            view(class="item-l") 门店名称
            view(class="item-r") 星巴克
        view(class="df jcsb ai-center")
            view(class="item-l") 经营简介
            view(class="item-r") 
                textarea(class="area" value="最多3行，超过3行内容框内滑动案文案文案最多3行，超过3行内容框内滑动案文案文案最多3行，超过3行内容框内滑动案文案文案最多3行，超过3行内容框内滑动案文案文案" :disabled='true')
        view(class="df jcsb ai-center")
            view(class="item-l") 计量单位
            view(class="item-r") 罐
        view(class="df jcsb ai-center")
            view(class="item-l") 分类
            view(class="item-r") 奶粉-婴幼儿奶粉
        view(class="df jcsb ai-center")
            view(class="item-l") 库存
            view(class="item-r") 100
        view(class="df jcsb ai-center")
            view(class="item-l") 最底起购数
            view(class="item-r") 12
        view(class="df jcsb ai-center")
            view(class="item-l") 商城价格
            view(class="item-r") ￥12
        view(class="df jcsb ai-center")
            view(class="item-l") 市场价格
            view(class="item-r") ￥123
        view(class="df jcsb ai-center")
            view(class="item-l") 品牌
            view(class="item-r") 爱他美
        view(class="df jcsb ai-center")
            view(class="item-l") 商品状态
            view(class="item-r") 下架
        view(class="df jcsb ai-center")
            view(class="item-l") 渠道
            view(class="item-r") 控货
        view(class="df jcsb ai-center")
            view(class="item-l") 渠道
            view(class="item-r") 控货
        view(class="df jcsb ai-center")
            view(class="item-l") 商品图片
            view(class="item-r df") 
                image(src="" class="bk_gray item-img")
        view(class="df jcsb ai-center")
            view(class="item-l") 商品轮播图
            view(class="item-r df") 
                image(src="" class="bk_gray item-img")
                image(src="" class="bk_gray item-img")
                image(src="" class="bk_gray item-img")
        view(class="df jcsb ai-center")
            view(class="item-l") 商品详情
            view(class="item-r" style="border:none;") 
                textarea(class="area" value="最多3行，超过3行内容框内滑动案文案文案最多3行，超过3行内容框内滑动案文案文案最多3行，超过3行内容框内滑动案文案文案最多3行，超过3行内容框内滑动案文案文案" :disabled='true')
        view(class="add-btn-wrap bt1 df jcsb")
            view(class="add-btn" @tap='toAudit(false)') 审核不通过
            view(class="add-btn add-btn2" @tap='toAudit(true)') 审核通过
        //- 审核不通过遮罩
        view(class="mask" @touchmove.stop="preventTouchMove")
            view(class="mask-main")
                view(class="area-wrap df")
                    image(v-if="1" class="edit" src="../../static/image/other/edit.png")
                    textarea(v-model="params.notes" placeholder-class="pl2" placeholder="请填写不通过原因~")
                view(class="df bt1 m-btn-w")
                    view(class="br1") 取消
                    view(class="m-btn-sure") 确认
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            
        };
    },
    onLoad() {
        
    },
    methods: {
        preventTouchMove(){
            //防止滚动穿透
        },
    }
};
</script>
<style lang="stylus">
    @import './goods-audit';
</style>
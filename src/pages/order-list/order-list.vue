<template lang="pug">
    view
        view(class="top-wrap")
            view(class="top-t")
                view(class="df jcsb ai-center")
                    view(class="df jcsb input-wrap")
                        view(class="df ai-center")
                            image(class="search-img" src="../../static/image/search/search.png")
                            input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keyWord" @input="inputKeyWrod")
                        image(@tap="clear" class="search-del" src="../../static/image/search/del.png")
                    image(class="time" src="../../static/image/order/time.png")
            view(class="nav-wrap")
                scroll-view(:scroll-x="true" class="scroll-view") 
                    view(class="df ai-center")
                        view(class="nav-item curr-item") 全部订单
                        view(class="nav-item") 待付款
                        view(class="nav-item") 待发货
                        view(class="nav-item") 待收货
                        view(class="nav-item") 待评价
                        view(class="nav-item") 已评价
        view(class="list")
            view(class="item")
                view(class="item-top")
                    view(class="df ai-center jcsb")
                        view(class="textFlow s-name") 门店名称名称名称门店名称名称名称
                        view(class="s-state") 已完成
                    view(class="df ai-center jcsb cor_9 fs24 mt15")
                        view() 下单时间
                        view() 2019-01-09 18:09
                view(class="item-center")
                    view(class="df jcsb ai-center")
                        view(class="df")
                            view(class="ic-left") 订单号
                            view(class="cor fs24") 45666666666
                        view(class="copy") 复制
                    view(class="df jcsb ai-center mt-x")
                        view(class="df ai-center")
                            view(class="ic-left") 收件人
                            view(class="cor fs24")
                                text 王小二
                                text(class="ml15") 1810222222
                            image(class="phone" src="../../static/image/order/phone.png")
                    view(class="df jcsb mt-x")
                        view(class="ic-left pt10") 地址
                        view(class="ic-addr df jcsb ai-center bb1")
                            view(class="cor fs24 textFlow w400") 安徽省合肥市西红柿麻辣串安徽省合肥市西红柿麻辣串
                            view(class="wuliu") 查看物流
                view(class="item-goods")
                    view(class="ig-top df ai-center jcsb pb20")
                        view(class="df ai-center")
                            view(class="bar")
                            view(class="fs28 cor ml15 fwb4") 商品
                            view(class="fs24 cor ml40") 20件
                        image(class="arrow" src="../../static/image/arrow-down.png")
                    view(class="pb25")
                        viwe(class="df fs24 cor_9")
                            view() 供货商
                            view(class="w500 textFlow ml40") 南京雨宝巴拉巴拉巴拉圭公司
                        view(class="df jcsb mt25" v-for="(item,index) in 2")
                            image(src="" class="good-img bg_sky")
                            view(class="df fldc jcsb good-right")
                                view()
                                    view(class="fs24 cor fwb5 textFlow w400") 内容文案文案文案文案文案文案文案
                                    view(class="df jcsb")
                                        view(class="fs24 cor_9 fwb4") 黑色、L
                                        view(class="fs24 co fwb4") x2
                                view(class="good-price fs24") ￥ 1900
                    view()
                        view(class="df jcsb")
                            view(class="fs24 cor") 商品金额
                            view(class="fs24 cor") ￥ 1234
                        view(class="mt10 df jcsb")
                            view(class="fs24 cor") 红包优惠
                            view(class="fs24 cor") ￥ 1234
                view(class="df jcfe")
                    view(style="width:606rpx;height:100rpx" class="bt1 df jcfe ai-center")
                        view(class="fs24 cor") 合计金额:
                        view(class="all-money ml10") ￥9990.10
                        
        //- 时间选择器
        <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" color="#1677FE" :showHoliday="false" begin-text="开始" end-text="结束"  @confirm="onSelected" @cancel="onSelected" />
        //- tabbar 
        tabbar(currTabbar="order-list")


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
import tabbar from "../../components/tabbar/tabbar.vue";
import MxDatePicker  from "../../components/mx-datepicker/mx-datepicker.vue";
export default {
    data(){
        return {
            // 时间选择器插件
            showPicker: false,
            type: 'range',
            value: '',
            aaa:''
        }
    },
    components:{
        tabbar,
        MxDatePicker
    },
    onLoad(){

    },
    methods: {
        outKeyWord(e){
            console.log(e);
        },
        onShowDatePicker(type){//显示
            this.type = type;
            this.showPicker = true;
            this.value = this[type];
        },
        onSelected(e) {//选择
            this.showPicker = false;
            if(e) {
                this[this.type] = e.value;
                this.aaa=e.value.join('至')
            }
        }
    }
}
</script>
<style lang="stylus">
    @import "./order-list"
</style>
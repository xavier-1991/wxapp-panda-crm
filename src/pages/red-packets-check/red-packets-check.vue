<template lang="pug">
    view(v-if="hasData")
        view(class="item df ai-center jcsb")
            view(class="item-left") 用户手机号
            view(class="item-right")
                view( class="inp") {{data.mobile}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 红包名称
            view(class="item-right")
                view( class="inp") {{data.name}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 活动开始时间
            view(class="item-right")
                view( class="inp") {{data.startTime}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 活动结束时间
            view(class="item-right")
                view( class="inp") {{data.endTime}}
        view(class="item df ai-center jcsb")
            view(class="item-left") 创建时间
            view(class="item-right")
                view( class="inp") {{data.createTime}}
        view(class="item df ai-center jcsb bb1")
            view(class="item-left") 状态
            view(class="item-right" style="border:none;")
                view( class="inp") {{data.statusStr}}
        view(class="df ai-center  fs28 cor mt30 pl25" v-for="(item,index) in coupon" :key="index")
            view() 满
            view(class="ml15 i-item-inp w150") {{item.fullMoney}}
            view(class="ml15 mr15") 减
            view(class="ml15 i-item-inp w150") {{item.cutMoney}}
            view(class="ml30 mr15") 发
            view(class="i-item-inp w96") {{item.num}}
            view(class="ml15") 张
        view(class="mt30 ml25" v-if="data.availableActivity.length")
            view(class="fs28 cor df ")
                view(class="fls0") 可用活动
                view(style='margin-left:60rpx' class="df fw")
                    view(v-for="(item,index) in data.availableActivity" :key="index")
                        view(class="df ai-center mb20 mr20" v-if="item.isSelected")
                            image(v-if="item.isSelected" class="sel-img" src="../../static/image/store/selected.png")
                            image(v-else class="sel-img" src="../../static/image/store/selected-no.png")
                            view(class="ml15 ") {{item.value}}
            view(class="mt15 df ai-center")
                image(src="../../static/image/red-packets/tip.png" style="width:24rpx;height:24rpx;")
                view(class="fs24 cor_9") 勾选表示此张优惠券可与该活动同时使用
</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
export default {
    data() {
       return {
           hasData:false,
           data:{},
           coupon:[]
       }
    },
    onLoad(options) {
       this.id=options.id;
        this.getDetail();
    },
    methods: {
        getDetail(){
            util.showLoadingDialog("正在加载");
            http.request(`${urls.RED_PACKET}/${this.id}`,"GET").then(data => {
                this.data=data;
                data.fullMoney.forEach((item,i)=>{
                    let obj={
                        fullMoney:item,
                        cutMoney:data.cutMoney[i],
                        num:data.num[i]
                    }
                    this.coupon.push(obj);
                })
                this.hasData=true;
                util.hideLoadingDialog();
            });
        },
    }
};
</script>
<style lang="stylus">
@import './red-packets-check'
</style>
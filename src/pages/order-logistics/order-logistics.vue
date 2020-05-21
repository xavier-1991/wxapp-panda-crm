<template lang="pug">
    view(v-if="hasData")
        view(class="bk_f p25")
            view(class="df")
                view(class="top-left") 发货方式
                view(class="top-right") {{data.deliveryWay}}
            view(class="df mt15")
                view(class="top-left") 快递公司
                view(class="top-right") {{data.expressCompany}}
            view(class="df mt15")
                view(class="top-left") 快递单号
                view(class="top-right df jcsb" style="width:560rpx") 
                    text {{data.logistics}}
                    text(class="copy" @tap="toCopy(data.logistics)") 复制
        view(class="bk_f p25 mt25" )
            //- 收货地址
            view(class="item df")
                view(class="item-l re")
                    view(class="line")
                    image(class="shou" src="../../static/image/other/shou.png")
                view(class="item-r fs24 cor") 收货地址:{{data.address}}
            //- 已签收
            view(v-for="(item,index) in data.logisticsInfo" :key="index")
                view(class="item df" v-if="item.status=='签收'")
                    view(class="item-l re")
                        view(class="line")
                        image(class="shou" src="../../static/image/other/qian.png")
                    view(class="item-r cor") 
                        view(class="fs28") 已签收
                        view(class="fs24 mt5") {{item.context}}
                        view(class="fs24 mt5") {{item.time}}
                view(class="item df" v-else)
                    view(class="item-l re")
                        view(class="line" v-if="index<data.logisticsInfo.length-1")
                        view(:class="['dot',index===0?'curr-dot':'']")
                    view(:class="['item-r',index===0?'cor':'cor_9']") 
                        view(class="fs28") {{item.status}}
                        view(class="fs24 mt5") {{item.context}}
                        view(class="fs24 mt5") {{item.time}}


                

</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
    export default {
        data(){
            return {
                hasData:false,
                data:null
            }
        },
        onLoad(options){
            this.loadData(options.id);
        },
        methods: {
            loadData(id){
                util.showLoadingDialog('加载中');
                http.request(
                    urls.EXPRESS_INFO.format('177566'),
                    "GET"
                ).then(data => {
                    this.data=data;
                    this.hasData=true;
                    util.hideLoadingDialog();
                })
            },
            toCopy(str){
                wx.setClipboardData({data: str});
            }
        }
    }
</script>
<style lang="stylus">
    @import "./order-logistics"
</style>
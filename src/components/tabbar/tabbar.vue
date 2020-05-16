<template lang="pug">
    view
        view(class="tabbar df jcsba ai-center" :style="{bottom:isipx?'68rpx':'0'}")
            view(v-for="(item,index) in limit" :key="index" @tap="toTabbar(item.page)")
                view(class="df jcc")
                    image(v-if="currTabbar===item.page" class="tabbar-img" :src="'../../static/image/tabbar/'+item.page+'-01.png'")
                    image(v-else class="tabbar-img" :src="'../../static/image/tabbar/'+item.page+'-02.png'")
                view(:class="['text',currTabbar===item.page?'curr-text':'']") {{item.name}}
        ipx(v-if="isipx")
        
                


</template>

<script>
import ipx from "../template/ipx.vue";
const util = require('../../utils/util');
export default {
    props: {
        currTabbar: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isipx: false,
            limit: [
                {
                    page: "index",
                    name: "首页"
                },
                {
                    page: "store-manage",
                    name: "门店管理"
                },
                {
                    page: "order-list",
                    name: "订单列表"
                },
                {
                    page: "account-set",
                    name: "账号设置"
                },
            ]
        };
    },
    components: {
        ipx
    },
    created: function() {
        this.isipx = this.$globalData.isipx;
    },
    watch: {},
    methods: {
        toTabbar(page){
            console.log(page)
            util.linkto(page);
        }
       
    }
};
</script>

<style lang="stylus">
@import './tabbar.styl'
</style>

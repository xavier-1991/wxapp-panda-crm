<template lang="pug">
    view
        view(class="main")
            view()
                text(class="xing") *
                text(class="fs28 cor") 工单处理结果
            textarea(class='area' placeholder='请输入工单处理结果' placeholder-class='area-pl')
        view(class="btn_wrap mt30")
            view(class="btn-default" @tap="toOver") 完结工单
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
        
    }
};
</script>
<style lang="stylus">
@import './work-order-result'
</style>
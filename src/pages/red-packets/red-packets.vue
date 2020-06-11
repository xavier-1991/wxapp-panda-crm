<template lang="pug">
    view(class="wrap re")
        view(class="df jcsba top bk_f bb1")
            view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeNav(1)") 新增红包
            view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeNav(2)") 红包记录
        view(class="main")
            //- 新增红包
            view(v-if="tab==1")
                

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            tab:1
        };
    },
    onLoad() {
       
    },
    methods: {
        changeNav(type) {
            if (this.tab == type) {
                return;
            }
            this.tab = type;
            if (this.tab == 2 && !this.list.length) {
                this.loadRecord();
            }
        },
    }
};
</script>
<style lang="stylus">
@import './red-packets'
</style>
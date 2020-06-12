<template lang="pug">
    view(class="wrap re")
        view(class="df jcsba top bk_f bb1")
            view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeNav(1)") 新增红包
            view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeNav(2)") 红包记录
        view(class="main")
            //- 新增红包
            view(v-if="tab==1")
                view(class="fs28 cor bb1 add-top")
                    view(class="df inp-item ai-center")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 用户手机号
                        input(class="i-item-inp" placeholder='输入红包接收者的手机号' placeholder-class='pl' type="number" maxlength='11')
                    view(class="df inp-item ai-center mt30")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 红包名称
                        input(class="i-item-inp" placeholder='输入1-100位字符' placeholder-class='pl')
                    view(class="df inp-item ai-center mt30")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 有效期
                        view(class="df ai-center fs24")
                            view(class="df ai-center jcsb c-date-box")
                                picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                                image(src="../../static/image/other/date.png" class="c-date-img")
                            
                            view(class="df ai-center jcsb c-date-box ml20")
                                picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                                image(src="../../static/image/other/date.png" class="c-date-img")
                view()
                    view(class="df")
                        view() 满
                        input(placeholder="输入金额" placeholder-class='pl' class="i-item-inp w150")
                        view() 减
                        input(placeholder="输入金额" placeholder-class='pl' class="i-item-inp w150")
                        view() 每人
                        input(placeholder="数量" placeholder-class='pl' class="i-item-inp w96")
                        view() 张
                        
                        

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
            // if (this.tab == 2 && !this.list.length) {
            //     this.loadRecord();
            // }
        },
    }
};
</script>
<style lang="stylus">
@import './red-packets'
</style>
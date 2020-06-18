<template lang="pug">
    view(class="wrap re")
        view(class="top-wrap")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(v-if="keywords" @tap="clear" class="search-del" src="../../static/image/search/del.png")
                view(class="add" @tap="toAdd('add')") 新增
            //- 其他过滤条件
            //- 时间
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l") 创建时间
                view(class="df ai-center fs24")
                    view(class="df ai-center jcsb c-date-box")
                        picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                        image(src="../../static/image/other/date.png" class="c-date-img")
                    view(class="c-date-line")
                    view(class="df ai-center jcsb c-date-box")
                        picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                        image(src="../../static/image/other/date.png" class="c-date-img")
            //- 区域
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l fls0" style="width:72rpx;") 区域
                view(class="c-yewu-box df ai-center" style="width:256rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='areaList' range-key="provinceName" @change="provinceChange") 
                        view(class="df ai-center jcsb" style="width:236rpx")
                            view(:class="['c-area-text',provinceId?'':'c-area-text-empty']") {{provinceName?provinceName:'选择省区'}}
                            image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="c-yewu-box df ai-center ml25" style="width:256rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='cityList' range-key="cityName" @change="cityChange") 
                        view(class="df ai-center jcsb" style="width:236rpx")
                            view(:class="['c-area-text',cityId?'':'c-area-text-empty']") {{cityName?cityName:'选择城市'}}
                            image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="ml10 fs28 cor_blue p20 fls0" @tap="resetAll") 重置 
        view(class="gray_bar" style="height:25rpx;")
        view()
            view(class="bb1 title") 业务员列表
            view(class="item fs24 cor re" v-for="(item,index) in 5" :key="index")
                view(class="bb1" style="padding:24rpx 0;")
                    view(class="df fs28")
                        view() 张三
                        view(class="ml30") 18912341234
                    view(class="df ai-center mt15")
                        image(src="../../static/image/other/time.png" class="time-img")
                        view(class="ml15") 2019-09-09
                    view(class="df ai-center mt10")
                        image(src="../../static/image/other/addr.png" class="time-img")
                        view(class="ml15") 合肥市、苏州市、阜阳市、滁州市
                view(class="item-btn df")
                    view(@tap="toAdd('edit')") 编辑
                    view(class="ml25") 删除

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
        toAdd(type){
            util.linkto('sales-add',`type=${type}`);
        }
    }
};
</script>
<style lang="stylus">
@import './sales-list'
</style>
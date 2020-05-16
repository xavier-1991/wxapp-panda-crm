<template lang="pug">
    view
        view(class="search-wrap")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center")
                        image(class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keyWord" @input="inputKeyWrod")
                    image(@tap="clear" class="search-del" src="../../static/image/search/del.png")
                image(class="time" src="../../static/image/order/time.png")
            view()
                view() 全部











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
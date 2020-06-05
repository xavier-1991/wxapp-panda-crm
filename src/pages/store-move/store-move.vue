<template lang="pug">
    view()
        view(class="df jcsb ai-center search-box")
            view(class="df jcsb input-wrap")
                view(class="df ai-center inp-left")
                    image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                    input(class="search-inp" placeholder="请输入门店名称/订单号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
            view(class="se" @tap="toSearch") 搜索
        //- 其他条件筛选
        view(class="c-filter")
            //- 时间
            view(class="c-f-item df ai-center")
                view(class="c-f-item-l") 创建时间
                view(class="df ai-center fs24")
                    view(class="df ai-center jcsb c-date-box")
                        picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                        image(src="../../static/image/other/date.png" class="c-date-img")
                    view(class="c-date-line")
                    view(class="df ai-center jcsb c-date-box")
                        picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'结束时间'}}
                        image(src="../../static/image/other/date.png" class="c-date-img")
            //- 区域
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l") 区域
                view(class="c-yewu-box df ai-center" style="width:256rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='range' range-key="name" @change="provinceChange") 
                        view(class="df ai-center jcsb" style="width:236rpx")
                            view(class="c-area-text") 选择省区
                            image(class="c-y-down" src="../../static/image/arrow-down.png" @tap="qqq")
                view(class="c-yewu-box df ai-center ml25" style="width:256rpx;")
                    picker(mode='selector' class="c-area-picker pl20 df" :range='range' range-key="name" @change="provinceChange") 
                        view(class="df ai-center jcsb" style="width:236rpx")
                            view(class="c-area-text") 选择城市
                            image(class="c-y-down" src="../../static/image/arrow-down.png" @tap="qqq")
            //- 业务员
            view(class="c-f-item df ai-center mt25")
                view(class="c-f-item-l") 业务员
                view(class="c-yewu-box df ai-center")
                    input(class="c-y-inp" @input="getSalesman(salesman)" v-model="salesman" placeholder="全部" placeholder-class='c-y-inp-pl')
                    picker(mode='selector' class="c-yewu-picker" :range='range' range-key="name")
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="ml10 fs28 cor_blue p20") 重置
           
        //- 门店列表
        view(class="list mt25")
            view(class="l-title bb1 p25lr df jcsb ai-center")
                view(class="df ai-center")
                    image(class="sel-img" src="../../static/image/store/selected-no.png")
                    view(class="fs28 cor ml20") 全选
                view(class="fs28 cor_blue" @tap="toStoreMovePeople") 批量转移 
            view(class="item pt20 df" v-for="(item,index) in 5" :key="index")
                image(class="sel-img p25lr fls0" src="../../static/image/store/selected-no.png")
                view(class="item-r bb1")
                    view(class="df jcsb")
                        view(class="fs28 cor textFlow i-s-name") 门店名称门店名称门店名称
                        view(class="fs28 cor_blue mr25") 转移
                    view(class="mt-x fs24 cor_9")
                        text() 王小二
                        text(class="ml5") 16999999993
                    view(class="mt-x fs24 cor_9 textFlow i-s-addr") 安徽省地址安徽省地址安徽省地址安徽省地址安徽省地址
                        
                
               
            



</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            keywords:"",
            startTime: "",
            endTime: "",
            salesmanId:0, //业务员id
            provinceId:0, 
            cityId:0,

            // 时间选择
            showTime: false,
            dateNow:pd.dateNowStr(),
            //业务员
            salesman:'',//业务员姓名
            salesmanList:[], //展示的业务员列表
            salesmanListAll:[], //全部业务员列表
            //省市
            range:[{
                name:'安徽',
                id:'111'
            },
            {
                name:'江苏',
                id:'222'
            }]
        };
    },
    onLoad() {
        
    },
    methods: {
        toStoreMovePeople(){
            util.linkto("store-move-people");
        },
        getSalesman(){

        }
    }
};
</script>
<style lang="stylus">
    @import './store-move'
</style>
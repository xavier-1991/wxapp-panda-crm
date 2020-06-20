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
                            text() 活动开始时间
                        view(class="df ai-center p20lr re time-wrap" @tap="chooseTime(0)")
                            view(:class="[addParams.startTime?'':'pl']") {{addParams.startTime||'请选择开始时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img c-date-img2")
                    view(class="df inp-item ai-center mt30")
                        view(class="i-item-l")
                            text(class="xing") *
                            text() 活动结束时间
                        view(class="df ai-center p20lr re time-wrap" @tap="chooseTime(0)")
                            view(:class="[addParams.endTime?'':'pl']") {{addParams.endTime||'请选择结束时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img c-date-img2")
                view(class="pl25 bb1")
                    view(class="df ai-center  fs28 cor mt30" v-for="(item,index) in 2" :key="index")
                        view() 满
                        input(placeholder="输入金额" placeholder-class='pl' class="ml15 i-item-inp w150")
                        view(class="ml15 mr15") 减
                        input(placeholder="输入金额" placeholder-class='pl' class="i-item-inp w150")
                        view(class="ml30 mr15") 每人
                        input(placeholder="数量" placeholder-class='pl' class="i-item-inp w96")
                        view(class="ml15") 张
                        image(src="../../static/image/red-packets/del.png" class="del-img")
                    view(class="add-btn-wrap-top")
                        view(class="df ai-center add-btn-top jcc")
                            image(src="../../static/image/red-packets/add.png")
                            view(class="ml15") 添加一级满减
                view(class="mt30 ml25")
                    view(class="fs28 cor df ai-center")
                        view() 可用活动
                        view(class="df ai-center" style='margin-left:60rpx')
                            image(class="sel-img" src="../../static/image/store/selected.png")
                            view(class="ml15 ") 秒杀活动
                    view(class="mt15 df ai-center")
                        image(src="../../static/image/red-packets/tip.png" style="width:24rpx;height:24rpx;")
                        view(class="ml15 fs24 cor_9") 勾选表示此张优惠券可与改活动同时使用
                view(class="add-btn-wrap bt1 df jcsb")
                    view(class="add-btn" @tap="toSend") 保存
                    view(class="add-btn add-btn2") 保存并发放
                yuDatetimePicker(ref="dateTime" endYear="2035" :isAll="true" :current="true" @confirm="onConfirm")
            view(v-else)
                view(class="df jcsb ai-center search-box")
                    view(class="df jcsb input-wrap")
                        view(class="df ai-center inp-left")
                            image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                            input(class="search-inp" placeholder="请输入工单单号、订单编号或者手机号" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                        image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
                    //- view(class="se" @tap="toSearch") 搜索
                view(class="c-f-item df ai-center pl25")
                    view(class="c-f-item-l") 创建时间
                    view(class="df ai-center fs24")
                        view(class="df ai-center jcsb c-date-box")
                            picker(:class="['c-date-picker',!startTime?'c-date-picker-empty':'']" :value="startTime" :end="endTime||dateNow" mode="date" @change="chooseStart") {{startTime?startTime:'开始时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        view(class="c-date-line")
                        view(class="df ai-center jcsb c-date-box")
                            picker(:class="['c-date-picker',!endTime?'c-date-picker-empty':'']" :value="endTime" :end="dateNow" :start="startTime" mode="date" @change="chooseEnd") {{endTime?endTime:'结束时间'}}
                            image(src="../../static/image/other/date.png" class="c-date-img")
                view(class="df p25lr ai-center mt25")
                    view(class="c-f-item df ai-center")
                        view(class="c-f-item-l") 状态
                        view(class="c-yewu-box df ai-center")
                            picker(mode='selector' class="c-area-picker df" :range='statusList' range-key="value" @change="statusChange") 
                                view(class="df ai-center jcsb" style="width:256rpx")
                                    view(:class="['c-area-text','pl20',status!=-1?'':'c-area-text-empty']") {{statusName?statusName:'全部'}}
                                    image(class="c-y-down" src="../../static/image/arrow-down.png")
                    view(class="ml10 fs28 cor_blue p10" @tap="resetAll") 重置
                view(class="gray_bar mt25" style="height:25rpx;")
                view(class="pl25")
                    view(class="item bb1 re" v-for="(item,index) in 3" :key="index")
                        view(class="df ai-center")
                            view(class="fs28 cor") 红包名称名称 
                            view(class="ml25 tag") 未发放
                        view(class="df ai-center mt20")
                            image(src='../../static/image/other/time.png' class="time-img")
                            view(class="fs20 cor_9") 2015-02-03
                        view(class="fs20 cor_9 textFlow item-text") 满 100减10每个人一张文案文案文案案文案文案
                        view(class="df item-btn-wrap")
                            view(class="item-btn") 编辑
                            view(class="item-btn item-btn2 ml25") 发放

                        
                        

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import yuDatetimePicker from "../../components/yu-datetime-picker/yu-datetime-picker"
export default {
    data() {
        return {
            tab:2,
            //新增红包数据
            currentTime: util.formatTime(new Date()),
            addParams:{
                startTime: "",
                endTime: "",
                startTimeNum:"",  //用于比较时间
                endTimeNum:"",    //用于比较时间
            },
            // 红包记录
            page:1,
            keywords:'',
            startTime: "",
            endTime: "",
            dateNow:pd.dateNowStr(),
            status:-1,
            statusName:'',

            statusList:[],
            list: [],
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
        };
    },
    components:{
        yuDatetimePicker
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
        /*********** 新增红包 **************/
        onConfirm(val) {
            console.log(val);
            let sArr = val.selectArr;
            let time = val.selectRes;
            if (this.timeType == 0) {
                this.addParams.startTimeNum=sArr.join('')*1;
                this.addParams.startTime = time;
            } else {
                this.addParams.endTimeNum=sArr.join('')*1;
                this.addParams.endTime = time;
            }
        },
        chooseTime(type) {
            this.timeType = type;
            console.log(this.timeType);
            this.$refs.dateTime.show();
        },

        /*********** 红包记录 **************/
        toSearch() {
            this.page = 1;
            this.loadPage();
        },
        clear() {
            this.keywords = "";
        },
         // 时间选择
        chooseStart(e) {
            this.startTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadPage();
            }
        },
        chooseEnd(e) {
            this.endTime = e.detail.value;
            if (this.startTime && this.endTime) {
                this.page = 1;
                this.loadPage();
            }
        },
    }
};
</script>
<style lang="stylus">
@import './red-packets'
</style>
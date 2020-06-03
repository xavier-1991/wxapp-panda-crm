<template lang="pug">
    view(class="")
        view(class="df jcsba top bb1")
            view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeNav(1)") 新增工单
            view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeNav(2)") 历史工单
        //- 新增工单
        view(v-if="tab==1")
            view(class="add-w")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 订单编号
                    input(class="aw-r aw-inp" placeholder="选填，请输入订单编号" placeholder-class="aw-inp-pl")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 手机号
                    input(class="aw-r aw-inp" type="number" maxlength="11" placeholder="选填，请输入手机号" placeholder-class="aw-inp-pl")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 问题标签
                    view(class="aw-r df jcsb")
                        view(class="aw-tag") 破损/发错货
                        view(class="aw-tag") 无理由退货
                        view(class="aw-tag curr-aw-tag") 其他问题
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 
                        text(class="fs28" style="color:#FF662E;") *
                        text 问题记录
                    view(class="df area-wrap aw-r")
                        image(v-if="!params.notes" class="edit fls0" src="../../static/image/other/edit.png")
                        textarea(v-model="params.notes" placeholder-class="pl2" placeholder="请填写问题描述~")
                view(class="add-item df jcsb ai-center")
                    view(class="aw-l") 上传图片
                    view(class="df p25lr")
                        view(class="up-img-wrap re" v-for="(item,index) in imageArr" :key="index")
                            image(:src="item" class="storeImg" lazy-load="true" mode="aspectFill" class="up-img bk_")
                            image(@tap="delImage"
                                class="delimg"
                                src="../../static/image/other/del_img.png")
                        view(class="df jcc ai-center fldc up-img-wrap bk_gray" v-if="count>0" @tap="chooseImage")
                            image(class="camera" src="../../static/image/store/camera.png")
                            view(class="mt5 fs20 cor") 上传图片
            view(class="add-btn-wrap bt1 df jcsb")
                view(class="add-btn") 保存
                view(class="add-btn add-btn2") 保存并发放
        //- 历史工单
        view(v-else class="his-w")
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
                    view(class="re")
                        view(class="df ai-center jcsb c-date-box")
                            input(class="c-date-inp" v-model="startTime" placeholder='开始时间' :disabled='true' placeholder-class='c-date-pl')
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        picker(class="c-date-picker" :value="startTime" :end="dateNow" mode="date" @change="chooseStart") 11
                    view(class="c-date-line")
                    view(class="re")
                        view(class="df ai-center jcsb c-date-box")
                            input(class="c-date-inp" v-model="endTime" placeholder='结束时间' :disabled='true' placeholder-class='c-date-pl')
                            image(src="../../static/image/other/date.png" class="c-date-img")
                        picker(class="c-date-picker" :value="endTime" :end="dateNow" mode="date" @change="chooseEnd") 12
            view(class="df jcsb p25lr")
                view(class="c-f-item df ai-center mt25")
                    view(class="c-f-item-l") 标签
                    view(class="c-yewu-box df ai-center" style="width:156rpx;")
                        input(class="c-y-inp" placeholder="全部" placeholder-class='c-y-inp-pl')
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
                view(class="c-f-item df ai-center mt25")
                    view(class="c-f-item-l" style="width:76rpx;") 状态
                    view(class="c-yewu-box df ai-center" style="width:256rpx;")
                        input(class="c-y-inp" placeholder="全部" placeholder-class='c-y-inp-pl')
                        image(class="c-y-down" src="../../static/image/arrow-down.png")
            view(class="gray-bar")
            view(class="his-list")
                view(class="h-item bb1")
                    view(class="df")
                        view(class="h-l df ai-center")
                            image(class="bk_gray h-l-img" src="")
                            view(class="h-l-text") 订单编号
                        view(class="df")
                            view(class="fs28 cor") 12345678900987
                            view(class="h-tag h-tag2") 处理中
                    view(class="df mt30")
                        view(class="h-l df ai-center")
                            image(class="bk_gray h-l-img" src="")
                            view(class="h-l-text") 手机号
                        view(class="fs28 cor") 18966552541
                    view(class="df mt30")
                        view(class="h-l df ai-center ai-start")
                            image(class="bk_gray h-l-img" src="")
                            view(class="h-l-text") 问题记录
                        view(class="fs28 cor") 问题记录问题记录问题记录问题记录问题记录问题记录问题记录
                    view(class="df mt30 jcsb mt30")
                        view(class="h-btn") 查看
                        view(class="h-btn") 跟踪
                        view(class="h-btn") 结果

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            tab:2,
            count: 3, //随着imageArr的length改变而改变,最多传3张图
            imageArr: ['1','2'], //本地
            keywords:''
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
@import './work-order';
</style>
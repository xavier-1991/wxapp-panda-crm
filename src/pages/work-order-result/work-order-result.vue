<template lang="pug">
    view
        view(class="main")
            view()
                text(class="xing") *
                text(class="fs28 cor") 工单处理结果
            view(class="df area-wrap mt25")
                image(v-if="!traceRecord" class="edit" src="../../static/image/other/edit.png")
                textarea(v-model="traceRecord" placeholder-class="pl2" placeholder="请输入工单处理结果~")
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
            id:0,
            traceRecord:''
        };
    },
    onLoad(options) {
       this.id=options.id*1;
    },
    methods: {
        toOver(){
            if(!this.traceRecord.trim()){
                util.showToast('请填写工单处理结果')
                return;
            }
            if(this.traceRecord.trim().length<2){
                util.showToast('工单处理结果最少两个字')
                return;
            }
            let params={
                type:'over',
                traceRecord:this.traceRecord
            }
            util.showLoadingDialog('加载中');
            http.request(
                urls.WORK_SHEET_TRACING.format(this.id),
                "PUT",
                params
            ).then(data => {
                util.showToast('保存成功');
                setTimeout(() => {
                    uni.navigateBack();
                }, 1500);
            })
        }
    }
};
</script>
<style lang="stylus">
@import './work-order-result'
</style>
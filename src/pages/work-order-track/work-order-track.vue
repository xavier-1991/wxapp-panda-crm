<template lang="pug">
    view(v-if="hasData")
        view(class="add-w")
            view(class="df jcsb ai-center")
                view(class="aw-l") 
                    text 订单编号
                view(class="aw-r bb1") {{data.orderSn}}
            view(class="df jcsb ai-center" v-if="data.mobile")
                view(class="aw-l") 
                    text 手机号
                view(class="aw-r bb1") {{data.mobile}}
            view(class="df jcsb")
                view(class="aw-l") 
                    text 问题记录
                view(class="aw-r bb1" style="padding-right:24rpx;box-sizing:border-box;") {{data.issues}}
            view(class="df jcsb" v-if="data.photos.length")
                view(class="aw-l") 图片
                view(class="df aw-r")
                    image(class="up-img bk_gray" v-for="(item,index) in data.photos" :key="index" :src="item" lazy-load="true" mode="aspectFill" @tap="previewImg(item, data.photos)")
        view(class="gray_bar" style="height:25rpx;")
        view(class="record")
            view(class="r-title") 工单跟踪记录
            view(class="fs24 cor r-list bb1" v-for="(item,index) in data.traceLogs" :key="index")
                view(class="df jcsb")
                    view()
                        text(class="cor_9") 处理人：
                        text() {{item.name}}
                    view(class="df ai-center")
                        image(class="time-img" src="../../static/image/other/time.png")
                        view() {{item.createTime}}
                view(class="mt15") {{item.traceRecord}}
            view(v-if="!data.traceLogs.length" class="no-list") 暂无跟踪记录　　　　
        view(v-if="data.status==2")
            view(class="gray_bar" style="height:25rpx;")
            view(class="record record2")
                view(class="r-title") 工单已完结
                view(class="fs24 cor r-list")
                    view(class="df jcsb")
                        view()
                            text(class="cor_9") 处理人：
                            text() {{data.result.name}}
                        view(class="df ai-center")
                            image(class="time-img" src="../../static/image/other/time.png")
                            view() {{data.result.createTime}}
                    view(class="mt15") {{data.result.traceRecord}}
        view(v-if="roleType&&type=='track'" class="add-item df jcsb ai-center p25")
            view(class="aw-l" style="width:200rpx;") 
                text(class="fs28" style="color:#FF662E;") *
                text 填写跟踪记录
            view(class="df area-wrap aw-r")
                image(v-if="!traceRecord" class="edit fls0" src="../../static/image/other/edit.png")
                textarea(v-model="traceRecord" maxlength='255' placeholder-class="pl2" placeholder="请填写跟踪记录~")
        view(v-if="roleType&&type=='track'" class="add-btn-wrap bt1 df jcsb")
            view(class="add-btn" @tap="toBack") 取消
            view(class="add-btn add-btn2" @tap="toSend") 确定

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
export default {
    data() {
        return {
            type:'look',
            hasData:false,
            data:null,
            roleType: pd.getRoleType(),
            traceRecord:'',
            id:0
        };
    },
    onLoad(options) {
       if(options.type=='look'){
           uni.setNavigationBarTitle({
               title: '工单信息'
           });
       }else{
           uni.setNavigationBarTitle({
               title: '工单跟踪'
           });
           this.type="track"
       };
       this.id=options.id * 1;
       this.loadData();
    },
    methods: {
        loadData(){
            util.showLoadingDialog('加载中');
            http.request(
                urls.WORK_SHEET_DETAIL.format(this.id),
                "GET"
            ).then(data => {
                this.data=data;
                this.hasData=true;
                util.hideLoadingDialog();
            })
        },
        previewImg: function(currImg, imgList) {
            uni.previewImage({
                current: currImg,
                urls: imgList
            });
        },
        toBack(){
            uni.navigateBack();
        },
        toSend(){
            if(!this.traceRecord.trim()){
                util.showToast('请填写跟踪记录')
                return;
            }
            if(this.traceRecord.trim().length<2){
                util.showToast('跟踪记录最少两个字')
                return;
            }
            let params={
                type:'trace',
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
@import './work-order-track'
</style>
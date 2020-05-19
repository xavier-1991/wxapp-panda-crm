<template>
    <view>
        <view v-if="bottomType==='loading'"
              class="df jcc ai-center fs26 cor_3"
              style="height: 80rpx;">
            <image style="width: 30rpx;height: 30rpx;"
                   src="../../../static/image/loading.gif"></image>
            <view class="ml10">加载中</view>
        </view>
        <view v-if="bottomType==='noMore'"
              class="tac fs26 cor_3"
              style="height: 80rpx;line-height:80rpx;">没有更多了</view>
    </view>
</template>
<script>
export default {
    props: {
        bottomType: {
            type: String,
            default: ""
        }
    }
};
</script>
<style>
</style>
<template>
    <view class="ipxBar" :style="{background:bgcolor}"></view>
</template>
<script>
    export default {
        props:{
            bgcolor:{
                default:'#fff',
                type:String
            }
        }
    }
</script>
<style>
    .ipxBar{
        height:68upx;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
    }
</style>
<template lang="pug">
    view(class="df jcsb ai-center")
        view(class="df jcsb input-wrap")
            view(class="df ai-center")
                image(class="search-img" src="../../static/image/search/search.png")
                input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keyWord" @input="inputKeyWrod")
            image(@tap="clear" class="search-del" src="../../static/image/search/del.png")
        view(class="add" @tap="toAdd") 新增
        
                


</template>

<script>
const util = require('../../utils/util');
export default {
    props: {
        currTabbar: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            keyWord:''            
        };
    },
    created: function() {
        this.isipx = this.$globalData.isipx;
    },
    watch: {},
    methods: {
        clear(){
            this.keyWord='';
            this.$emit("outKeyWord",'');
        },
        inputKeyWrod(){
            this.$emit("outKeyWord", this.keyWord);
        },
        toAdd(){
            
        }
       
    }
};
</script>

<style lang="stylus">
    @import './search'
</style>

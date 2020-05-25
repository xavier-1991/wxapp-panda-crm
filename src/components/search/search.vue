<template lang="pug">
    view(class="df jcsb ai-center")
        view(class="df jcsb input-wrap")
            view(class="df ai-center")
                image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keyWord" @input="inputKW" confirm-type="search" @confirm="toSearch")
            image(v-if="showClear" @tap="clear" class="search-del" src="../../static/image/search/del.png")
        view(class="add" @tap="toAdd") 新增
</template>

<script>
const util = require('../../utils/util');
export default {
    props: {
        btnType: {
            type: String,
            default: ""
        },
        kw: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            keyWord:''            
        };
    },
    computed:{
        showClear(){
            return this.kw?false:true;
        }
    },
    created() {
        this.keyWord=this.kw;
    },
    methods: {
        clear(){
            this.keyWord='';
            this.$emit("outKeyWord",'');
        },
        toAdd(){
            if(this.btnType=='latent'){
                util.linkto('latent-custom-add');
            }else{
                util.linkto('store-add','type=add');
            }
        },
        inputKW(){
            this.$emit("outKeyWord", this.keyWord);
        },
        toSearch(){
            this.$emit("search");
        }
    }
};
</script>

<style lang="stylus">
    @import './search'
</style>

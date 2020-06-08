<template lang="pug">
    view(v-if="hasData")
        view(class="df jcsb ai-center search-box")
            view(class="df jcsb input-wrap")
                view(class="df ai-center inp-left")
                    image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                    input(class="search-inp" placeholder="请输入业务员名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
            view(class="se" @tap="toSearch") 搜索
        view(class="list bk_f pl25")
            view(class="fs24 cor_9") 转移门店给其他业务员
            view(class="item bb1 df jcsb ai-center" v-for="(item,index) in list" :key="index" @tap="chooseSalesMan(item)")
                view(class="fs28 cor") {{item.realName}}
                image(v-if="item.isSelect" class="sel-img" src="../../static/image/store/selected.png")
                image(v-else class="sel-img" src="../../static/image/store/selected-no.png")
        view(v-if="showLoadMoreLoading")
            bottom-bar(bottomType="loading")
        view(v-if="isReachBottom")
            bottom-bar(bottomType="noMore")
        view(v-if="!list.length" class="no-list") 暂无数据

        view(class="btn_wrap bt1")
            view(class="btn-default" @tap="toSend") 确定转移

</template>
<script>
const urls = require("../../utils/urls");
const util = require("../../utils/util");
const http = require("../../utils/http");
const pd = require("../../utils/pd");
import bottomBar from "../../components/template/bottom-bar/bottom-bar";
export default {
    data() {
        return {
            hasData: false,
            list: [],
            page:1,
            count: 0,
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
            params:{

            }
        };
    },
    components: {
        "bottom-bar": bottomBar
    },
    onPullDownRefresh() {
        this.page = 1;
        this.keywords = "";
        this.getSalesmanList();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading) {
            return;
        }
        if (this.page >= this.pageTotal) {
            this.isReachBottom = true;
            return;
        }
        this.page += 1;
        this.getSalesmanList();
    },
    onLoad() {
       this.params=JSON.parse(JSON.stringify(this.$globalData.moveParams));
       this.getSalesmanList();
    },
    methods: {
        toSearch(){
            this.page = 1;
            this.getSalesmanList();
        },
        // 选择业务员
        chooseSalesMan(item){
            this.list.forEach((ele,i)=>{
                ele.isSelect=false;
            })
            item.isSelect=true;
            this.salesmanId=item.salesmanId;
        },
        // 获取业务员列表
        getSalesmanList(){
            let params = {
                page: this.page,
                type:'transfer',
                limit:15
            };
            if (this.keywords) {
                params.keywords = this.keywords;
            }
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.SELECT_SALESMAN, "GET",params).then(data => {
                data.list.forEach((ele,i)=>{
                    ele.isSelect=false;
                })
                if (this.page == 1) {
                    this.count = data.count;
                    this.pageTotal = data.pageTotal;
                    this.list = data.list;
                    this.hasData = true;
                    util.hideLoadingDialog();
                } else {
                    this.list = [...this.list, ...data.list];
                }
                util.hideLoadingDialog();
            }).finally(() => {
                this.showLoadMoreLoading = false;
                util.hideTopLoadingStopRefresh();
            });
        },
    }
};
</script>
<style lang="stylus">
@import './store-move-people';
</style>
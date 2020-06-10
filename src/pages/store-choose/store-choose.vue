<template lang="pug">
    view(class="wrap" v-if="hasData")
        view(class="top")
            view(class="df jcsba top-nav bk_f")
                view(:class="['top-item','re',tab==1?'curr-top':'']" @tap="changeTab(1)") 门店列表
                view(:class="['top-item','re',tab==2?'curr-top':'']" @tap="changeTab(2)") 潜在客户
            view(class="search1")
                view(class="df jcsb ai-center")
                    view(class="df jcsb input-wrap")
                        view(class="df ai-center inp-left")
                            image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                            input(class="search-inp" placeholder="请输入门店名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                        image(@tap="clear" v-if="keywords" class="search-del" src="../../static/image/search/del.png")
                    view(v-if="tab==1" class="se" @tap="toSearch") 搜索
                    view(v-else class="add" @tap="toAdd('add')") 新增
        view(class="main")
            view(class="p25lr" style="margin-top:114rpx;")
                view(class="fs28 cor fwb5") 门店列表
                //- 门店列表
                view(class="list" v-if="tab==1")
                    view(class="item" v-for="(item,index) in store.list" :key="index" @tap="chooseStore(item)")
                        view(class="df jcsb ai-center")
                            view(class="df ai-center")
                                image(class="store-icon mr5" src="../../static/image/other/store.png")
                                view(class="fs28 cor textFlow store-name") {{item.storeName}}
                            view(class="fs24 cor_9") 距离{{item.distance}}
                        view(class="df jcsb ai-end")
                            view(class="fs24 cor_9 df ai-center")
                                view(class="df jcc ai-center mr5" style="width:40rpx;height:40rpx")
                                    image(class="time-icon" src="../../static/image/other/addr.png")
                                view(class="textFlow address") {{item.address}}
                    view(v-if="showLoadMoreLoading")
                        bottom-bar(bottomType="loading")
                    view(v-if="isReachBottom")
                        bottom-bar(bottomType="noMore")
                    view(v-if="!store.list.length" class="no-list") 暂无相关数据
                //- 潜在客户
                view(class="list" v-else)
                    view(class="item" v-for="(item,index) in latent.list" :key="index" @tap="chooseStore(item)")
                        view(class="df jcsb")
                            view(class="df ai-center")
                                image(class="store-icon mr5" src="../../static/image/other/store.png")
                                view(class="fs28 cor textFlow store-name") {{item.storeName}}
                            view(class="fs24 cor_9") 距离{{item.distance}}
                        view(class="df jcsb ai-end")
                            view(class="fs24 cor_9")
                                view(class="df ai-center")
                                    view(class="df jcc ai-center mr5" style="width:40rpx;height:40rpx")
                                        image(class="time-icon" src="../../static/image/other/person.png")
                                    view() {{item.contacts}} {{item.mobile}}
                                view(class="df ai-center")
                                    view(class="df jcc ai-center mr5" style="width:40rpx;height:40rpx")
                                        image(class="time-icon" src="../../static/image/other/addr.png")
                                    view(class="textFlow address") {{item.address}}
                            view(class="df")
                                image(@tap.stop="toCall(item.mobile)" class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                                image(@tap.stop="toMap(item)" class="btn-img" src="../../static/image/other/latent-addr.png")
                    view(v-if="showLoadMoreLoading")
                        bottom-bar(bottomType="loading")
                    view(v-if="isReachBottom")
                        bottom-bar(bottomType="noMore")
                    view(v-if="!latent.list.length" class="no-list") 暂无相关数据
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
            hasData:false,
            store: {
                page: 1,
                list: [],
                count: 0,
                pageTotal: 0,
                hasGet:false  //是否已请求过数据
            },
            latent: {
                page: 1,
                list: [],
                count: 0,
                pageTotal: 0,
                hasGet:false 
            },
            showLoadMoreLoading: false,
            isReachBottom: false,
            tab: 1,
            lat: "",
            lng: "",
            keywords: "",
            tabStr:"store"
        };
    },
    components: {
        "bottom-bar": bottomBar
    },
    onLoad() {
        
    },
    onShow(){
        if(!this.lat){
            pd.getPosition().then((res)=>{
                this.lat=res.latitude+'';
                this.lng=res.longitude+'';
                this.loadList();
            })
        }else{
            this[this.tabStr].page=1;
            this.keywords="";
            this.loadList();
        }
      
    },
    onPullDownRefresh() {
        this[this.tabStr].page=1;
        this.loadList();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading) {
            return;
        }
        if (this[this.tabStr].page >= this[this.tabStr].pageTotal) {
            this.isReachBottom = true;
            return;
        }
        this[this.tabStr].page += 1;
        this.loadList();
    },
    methods: {
        changeTab(tab) {
            if (this.tab == tab) {
                return;
            }
            this.keywords="";
            this.tabStr=tab==1?'store':'latent';
            this.tab = tab;
            this.isReachBottom = false;
            if(!this[this.tabStr].hasGet){
                this.loadList();
            }
        },
        loadList() {
            if (this[this.tabStr].page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            let reUrl, tabStr, params;
            params = {
                lat: this.lat,
                lng: this.lng
            };
            if (this.keywords) {
                params.keywords = this.keywords;
            }
            if (this.tab == 1) {
                reUrl = urls.SELECT_STORE;
            } else {
                reUrl = urls.CUSTOMER;
            }
            tabStr=this.tabStr;
            params.page = this[tabStr].page;
            http.request(reUrl, "GET", params)
                .then(data => {
                    if (this[tabStr].page == 1) {
                        this[tabStr].count = data.count;
                        this[tabStr].pageTotal = data.pageTotal;
                        this[tabStr].list = data.list;
                        this[tabStr].hasGet = true;
                        this.hasData = true;
                        util.hideLoadingDialog();
                    } else {
                        this[tabStr].list = [...this[tabStr].list, ...data.list];
                    }
                })
                .finally(() => {
                    this.showLoadMoreLoading = false;
                    util.hideTopLoadingStopRefresh();
                });
        },
        toCall(phone){
            wx.makePhoneCall({
                phoneNumber: phone
            })
        },
        toMap(item){
            wx.openLocation({
                latitude:item.lat*1,
                longitude:item.lng*1,
                scale: 18
            })
        },
        clear(){
            this.keywords="";
        },
        toSearch(){
            this[this.tabStr].page=1;
            this.loadList();
        },
        chooseStore(item){
            if(this.tab==2){
                item.isLeads=1;
            }
            this.$globalData.visitStore=item;
            uni.navigateBack();
        },
        toAdd(type,id=''){
            util.linkto('latent-custom-add',`type=${type}&id=${id}`);
        }
    }
};
</script>
<style lang="stylus">
@import './store-choose'
</style>
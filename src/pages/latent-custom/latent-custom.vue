<template lang="pug">
    view(v-if="hasData")
        view(class="search-wrap")
            search(@outKeyWord="outKeyWord" @search="toSearch" btnType="latent")
        view(class="p25lr" style="margin-top:114rpx;")
            view(class="fs28 cor fwb5") 门店列表
            view(class="list")
                view(class="item" v-for="(item,index) in list" :key="index")
                    view(class="df jcsb")
                        view(class="fs28 cor textFlow store-name") {{item.storeName}}
                        view(class="fs24 cor_9") 距离{{item.distance}}
                    view(class="df jcsb ai-end")
                        view(class="fs24 cor_9")
                            view(class="mt-x") {{item.contact}} {{item.mobile}}
                            view(class="mt-x") {{item.address}}
                        view(class="df")
                            image(@tap="toCall(item.mobile)" class="btn-img phone-img" src="../../static/image/other/latent-phone.png")
                            image(@tap="toMap(item)" class="btn-img" src="../../static/image/other/latent-addr.png")
                view(v-if="!list.length" class="no-list") 暂无数据


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
import search from "../../components/search/search"
export default {
    data() {
        return {
            hasData: false,
            data:{},
            list:[],
            page:1,
            count:0,
            pageTotal:0,
            showLoadMoreLoading:false,
            keywords:''
        };
    },
    components:{
        search
    },
    onShow(){
        pd.getPosition().then((res)=>{
            this.lat=res.latitude;
            this.lng=res.longitude;
            this.loadPage();
        })
    },
    onPullDownRefresh() {
        this.page=1;
        this.loadPage();
    },
    onReachBottom() {
        if (this.showLoadMoreLoading) {
            return;
        }
        if (this.page >= this.pageTotal) {
            util.showToast('没有更多了');
            return;
        }
        this.page += 1;
        this.loadPage();
    },
    methods: {
        outKeyWord(kw){
            this.keywords=kw
        },
        toSearch(){
            this.page=1;
            this.loadPage()
        },
        loadPage(){
            util.showTopLoading();
            let params={
                lat:this.lat,
                lng:this.lng,
                page:this.page
            }
            if(this.keywords){
                params.keywords=this.keywords;
            }
            http.request(
                urls.CUSTOMER,
                "GET",
                params
            ).then(data => {
                if(this.page==1){
                    this.count=data.count;
                    this.pageTotal=data.pageTotal;
                    this.list=data.list;
                    this.hasData=true;
                }else{
                    this.list=[...this.list,...data.list];
                }
            }).finally(()=>{
                util.hideTopLoading();
            })
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
        }
        
    }
}
</script>
<style lang="stylus">
    @import "./latent-custom"
</style>
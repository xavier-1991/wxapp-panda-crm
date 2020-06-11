<template lang="pug">
    view(v-if="hasData")
        view(class="search-wrap bb1")
            view(class="df jcsb ai-center")
                view(class="df jcsb input-wrap")
                    view(class="df ai-center inp-left")
                        image(@tap="toSearch" class="search-img" src="../../static/image/search/search.png")
                        input(class="search-inp" placeholder="请输入商品名称" placeholder-class="pl" v-model="keywords" confirm-type="search" @confirm="toSearch")
                    image(v-if="keywords" @tap="clear" class="search-del" src="../../static/image/search/del.png")
                view(class="search-btn" @tap="toSearch") 搜索
        view(style="margin-top:114rpx;")
            view(class="df jcsb item")
                image(src="" class="bk_gray good-img")
                view(class="itme-r bb1 re")
                    view(class="fs28 cor textFlow w406") 商品名称名称
                    view(class="fs24 cor_9 textFlow mt10 w406") 经销商:合肥万象城母婴批发
                    view(class="fs32 mt15" style="color:#FF662E") ￥1234
                    view(class="item-btn" @tap="toAudit") 审核
        

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
            hasData:1,
            list: [],
            pageTotal: 0,
            showLoadMoreLoading: false,
            isReachBottom: false,
             // 参数
            page: 1,
            keywords: "",
        };
    },
    onLoad() {
      
    },
    onPullDownRefresh() {
        this.page = 1;
        this.loadPage();
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
        this.loadPage();
    },
    methods: {
        clear() {
            this.keywords = "";
        },
        toSearch() {
            this.page = 1;
            this.loadPage();
        },
        toAudit(){
            util.linkto('goods-audit');
        },
        loadPage() {
            let params = {
                lat: this.lat,
                lng: this.lng,
                page: this.page
            };
            if (this.keywords) {
                params.keywords = this.keywords;
            }
            if (this.startTime) {
                params.startTime = this.startTime;
            }
            if (this.endTime) {
                params.endTime = this.endTime;
            }
            if (this.roleType) {
                // 省区经理 销售支持所需数据
                params.salesmanId = this.salesmanId;
                params.provinceId = this.provinceId;
                params.cityId = this.cityId;
            }
            if (this.page == 1) {
                util.showLoadingDialog("加载中");
                this.isReachBottom = false;
            } else {
                this.showLoadMoreLoading = true;
                util.showTopLoading();
            }
            http.request(urls.CUSTOMER, "GET", params)
                .then(data => {
                    if (this.page == 1) {
                        this.count = data.count;
                        this.pageTotal = data.pageTotal;
                        this.list = data.list;
                        this.hasData = true;
                        util.hideLoadingDialog();
                    } else {
                        this.list = [...this.list, ...data.list];
                    }
                })
                .finally(() => {
                    this.showLoadMoreLoading = false;
                    util.hideTopLoadingStopRefresh();
                });
        },
    }
};
</script>
<style lang="stylus">
    @import './goods-list'
</style>
<template lang="pug">
    view(class="wrap")
        view(class="top df ai-center re bk_f")
            view(class="top-item")
                view(class="fs40 cor fwb5") 2019
                view(class="fs24 cor fwb4 mt10") 全部门店
            view(class="top-item")
                view(class="fs40 cor fwb5") 223316
                view(class="fs24 cor fwb4 mt10") 全部潜在客户
        view(class="df jcsb nav-wrap")
            view(class="nav curr-nav") 今日
            view(class="nav") 昨日
            view(class="nav") 本月
            view(class="nav") 上月
            view(class="nav") 选择时间
        view(class="df ai-center fs24 pb10" v-if="1")
            view() 2019/09/09 - 2020/02/09
            view(class="reChoose") 重新选择
        view()
            view(class="fwb5 cor fs28 mt10") 数据统计
            view(class="data re mt30")
                image(src="../../static/image/index/bg-data.png")
                view(class="data-main")
                    view(class="data-main-sec df")
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") 2019
                            view(class="fs24 cor fwb4 mt10") 全部门店
                        view(class="data-item tac")
                            view(class="fs40 cor fwb5") 19
                            view(class="fs24 cor fwb4 mt10") 新增拜访
                    view(class="data-main-sec df")
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") 2
                            view(class="fs24 cor fwb4 mt10") 新增下单门店
                        view(class="data-item data-item2 tac")
                            view(class="fs40 cor fwb5") 20
                            view(class="fs24 cor fwb4 mt10") 新增潜在客户
        view()
            view(class="fwb5 cor fs28 mt30") 订单分析
            view(class="order mt30")
                view(class="df jcfe")
                    view(class="order-top") 
                        text 客单价格：
                        text 1800元
                view(class="df jcc")
                    canvas(canvas-id="canvas2" style="width:340rpx;height:340px;border:1px solid #ccc;margin-top:30rpx;")
                view()
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot1")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot2")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 已经付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot3")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot4")
                        view(class="order-r bb1 df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
                    view(class="df ai-center")
                        view(class="dot-wrap df jcc")
                            view(class="dot dot5")
                        view(class="order-r df ai-center jcsb fs28 cor")
                            view(class="df ai-center")
                                view(class="or-1") 待付款订单
                                view(class="or-2") 8888笔
                            view(class="or-3") ￥980000.00
        

            


</template>
<script>
const urls = require('../../utils/urls');
const util = require('../../utils/util');
const http = require('../../utils/http');
const pd = require('../../utils/pd');
    export default {
        data(){
            return {

            }
        },
        onLoad(){
           this.creatCanvas();
        },
        methods: {
            creatCanvas(){
                var context = wx.createContext();
                // 画饼图
                //  数据源
                var array = [20, 30, 40, 40];
                var colors = ["#ff0000", "#ffff00", "#0000ff", "#00ff00"];
                var total = 0;
                //  计算问题
                for (let index = 0; index < array.length; index++) {
                    total += array[index];
                }
                //  定义圆心坐标
                var point = {x: 100, y: 100};
                //  定义半径大小
                var radius = 60;
                
                /*  循环遍历所有的pie */
                for (let i = 0; i < array.length; i++) {
                    context.beginPath();
                //    起点弧度
                    var start = 0;
                    if (i > 0) {
                //      计算开始弧度是前几项的总和，即从之前的基础的上继续作画
                    for (let j = 0; j < i; j++) {
                        start += array[j] / total * 2 * Math.PI; 
                    }
                    }
                    console.log("i:" + i);
                    console.log("start:" + start);
                //   1.先做第一个pie
                //    2.画一条弧，并填充成三角饼pie，前2个参数确定圆心，第3参数为半径，第4参数起始旋转弧度数，第5参数本次扫过的弧度数，第6个参数为时针方向-false为顺时针
                context.arc(point.x, point.y, radius, start, array[i] / total * 2 * Math.PI, false);
                //   3.连线回圆心
                context.lineTo(point.x, point.y);
                //   4.填充样式
                context.setFillStyle(colors[i]);
                //   5.填充动作
                context.fill();
                context.closePath();
                }
                
                wx.drawCanvas({
                    canvasId: 'canvas2',
                    actions: context.getActions()
                });
            }
        }
    }
</script>
<style lang="stylus">
    @import "./data-analysis"
</style>
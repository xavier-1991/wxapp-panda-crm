<script>
const http = require('./utils/http');
const urls = require('./utils/urls');
export default {
    onLaunch() {
        this.$globalData.lowestVersion = "2.3.0"; //低于该基础库提示更新微信 支持 录音，npm等
        this.$globalData.windowHeight = uni.getSystemInfoSync().windowHeight; //低于该基础库提示更新微信 支持 录音，npm等
        this.$globalData.tabbarPramas = null; // 首页跳转其他tabbar页面
        this.$globalData.visitStore = null; // 门店拜访页面 门店详情数据
        this.build();
        this.isIpx();
        this.checkVersion();
    },
    methods: {
        isIpx() {
            //是否iphonx
            uni.getSystemInfo({
                success: res => {
                    if (res.model.indexOf("iPhone X") !== -1||res.model.indexOf("iPhone11") !== -1||res.model.indexOf("iPhone12") !== -1) {
                        this.$globalData.isipx = true;
                    } else {
                        this.$globalData.isipx = false;
                    }
                    console.log(this.$globalData.isipx);
                }
            });
        },
        update() {
            //小程序版本更新
            if (typeof uni.getUpdateManager == "function") {
                const updateManager = uni.getUpdateManager();
                updateManager.onCheckForUpdate(function(res) {
                    if (res.hasUpdate) {
                        updateManager.onUpdateReady(function() {
                            // uni.showModal({
                            //     title: "更新提示",
                            //     content:
                            //         "新版本已经准备好，是否重新打开小程序？",
                            //     success: function(res) {
                            //         if (res.confirm) {
                                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                        updateManager.applyUpdate();
                            //         }
                            //     }
                            // });
                        });
                    }
                });
            }
        },
        checkVersion() {
            //微信版本检测及提示更新
            const version = uni.getSystemInfoSync().SDKVersion;
            if (compareVersion(version, this.$globalData.lowestVersion) >= 0) {
                this.update();
            } else {
                uni.showModal({
                    title: "重要提示",
                    content:
                        "当前微信版本过低，部分功能无法使用，请升级到最新微信版本后重试。",
                    showCancel: false,
                    confirmText: "知道了"
                });
            }

            function compareVersion(v1, v2) {
                v1 = v1.split(".");
                v2 = v2.split(".");
                const len = Math.max(v1.length, v2.length);

                while (v1.length < len) {
                    v1.push("0");
                }
                while (v2.length < len) {
                    v2.push("0");
                }

                for (let i = 0; i < len; i++) {
                    const num1 = parseInt(v1[i]);
                    const num2 = parseInt(v2[i]);

                    if (num1 > num2) {
                        return 1;
                    } else if (num1 < num2) {
                        return -1;
                    }
                }

                return 0;
            }
        },
        onHide() {
           
        },
        build() {
            (function() {
                "use strict";
                /**
                 * 用于格式化字符串
                 * repository: https://github.com/yarrem/stringFormat.js
                 * Formats string in c#-like way.
                 * Example: '{0} {1}'.format('Hello', 'world')
                 * @this {String}
                 * @param {any} Arguments that string will be replaced with. Each {n} will be raplaced with n-th argument
                 * @return {string} Formated string.
                 */
                String.prototype.format = function() {
                    var str = this.valueOf(),
                        cons = console && console.warn; // for IE8
                    if (!arguments.length) {
                        if (cons) {
                            console.warn(
                                str +
                                    ".format(args[]) was invoked without any arguments"
                            );
                        }
                        return str;
                    }
                    var tokens = str.match(/{\d+}/gi),
                        i = 0,
                        l = tokens.length;
                    for (; i < l; i++) {
                        var token = tokens[i],
                            index = token.match(/\d+/);
                        if (index >= arguments.length) {
                            if (cons) {
                                console.warn(
                                    '"' +
                                        this.valueOf() +
                                        '".format(args[]): there is no argument for token: ' +
                                        token +
                                        ". You may missed it"
                                );
                            }
                            continue;
                        }
                        str = str.replace(token, arguments[index]);
                    }
                    return str;
                };

                /*
                 *用于兼容 ES2018的Promise.prototype.finally()方法
                 */
                Promise.prototype.finally = function(callback) {
                    let P = this.constructor;
                    return this.then(
                        value => P.resolve(callback()).then(() => value),
                        reason =>
                            P.resolve(callback()).then(() => {
                                throw reason;
                            })
                    );
                };
            })();
        }
    }
};
</script>

<style>
    @import "./App.css"
</style>

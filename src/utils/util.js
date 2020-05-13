const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function linkto(pageName, params, success, need_login = false) {
    // console.log(pageName)
    // if (pageName.startWith("https")||pageName.startWith("http")) {
    //   console.log(pageName)
    //   uni.navigateTo({url: "/pages/browser/browser?url=" + encodeURIComponent(pageName) + "&need_login=" + need_login});
    //   return;
    // }
    let tmp = pageName.split('?');
    let url = '';
    let nativeUrl = '';
    nativeUrl = pageName = tmp[0];
    params = params || (tmp.length >= 2) && tmp[1];
    if (pageName.indexOf('/') >= 0) {
        url = pageName;
        pageName = pageName.substr(pageName.lastIndexOf('/') + 1);
    } else {
        url = `/pages/${pageName}/${pageName}`;
    }

    //tabBar 页面
    let nativeUrls = [
        "/pages/index/index",
        "/pages/usercenter/usercenter",
    ];
    if (nativeUrls.join('').indexOf(url) >= 0) {
        uni.switchTab({ url: url + (!params ? '' : `?${params}`) });
    } else {
        uni.navigateTo({
            url: url + (!params ? '' : `?${params}`), success: res => {
                console.log(res);
            }, fail: res => {
                console.log(res);
            }
        });
    }

}
function reLaunch(pageName, params) {
    let tmp = pageName.split('?');
    let url = '';
    let nativeUrl = '';
    nativeUrl = pageName = tmp[0];
    params = params || (tmp.length >= 2) && tmp[1];
    if (pageName.indexOf('/') >= 0) {
        url = pageName;
        pageName = pageName.substr(pageName.lastIndexOf('/') + 1);
    } else {
        url = `/pages/${pageName}/${pageName}`;
    }
    uni.reLaunch({ url: url + (!params ? '' : `?${params}`) });

}
function redirectTo(pageName, params) {
    let url = `/pages/${pageName}/${pageName}`;
    uni.redirectTo({ url: url + (!params ? '' : `?${params}`) });
}
function showToast(msg, callback, duration) {
    uni.showToast({
        title: msg,
        icon: 'none',
        mask: true,
        duration: duration || 2000,
        success: function (res) {
            if (callback) {
                callback(res)
            }
        },
        fail: (res) => {
            console.log(res);
        }
    })
}
function showModal(msg) {
    uni.showModal({
        title: '提示',
        content: msg,
        showCancel: false,
        confirmText: "知道了",
    });
}
function showApiError(msg, callback) {
    uni.showModal({
        content: msg || '请求出错了',
        showCancel: false,
        confirmText: "确定",
        confirmColor: '#EF4343',
        success: function (res) {
            if (callback) {
                callback(res)
            }
        }
    });

}
function showConfirm(title, confirmText,msg, succ, fail) {
    uni.showModal({
        title: title || '提示',
        content: msg,
        confirmColor: '#FF5500',
        confirmText: confirmText,
        success: function (res) {
            if (res.confirm) {
                if (succ) {
                    succ();
                }
            } else if (res.cancel) {
                if (fail) {
                    fail();
                }
            }
        }
    })
}
function showLoadingDialog(title, duration) {
    uni.showLoading({
        title: title || '加载中',
        // icon: "loading",
        duration: duration || 20000,
        mask: true
    });
}
function hideLoadingDialog() {
    uni.hideLoading();
}
function showTopLoading() {
    uni.showNavigationBarLoading();
}
function hideTopLoading() {
    uni.hideNavigationBarLoading();
}
function hideTopLoadingStopRefresh() {
    uni.hideNavigationBarLoading({
        success: function () {
            uni.stopPullDownRefresh();
        }
    });
}
function addZero(num) {
    return Number(num) < 10 ? `0${num}` : num
}
function toTop(duration) {
    uni.pageScrollTo({
        scrollTop: 0,
        duration: duration || 0
    })
}
function checkPhone(str) {
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return reg.test(str)
}
function checkPassword(str) {
    let reg = /^[0-9a-zA-Z]{6,16}$/;
    return reg.test(str)
}
function checkWithdrawPassword(str) {
    let reg = /^[0-9]{6}$/;
    return reg.test(str)
}
function checkPrice(str) {
    let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; //最多两位小数的正实数
    return reg.test(str)
}
module.exports = {
    formatTime,
    linkto,
    redirectTo,
    reLaunch,
    showToast,
    showModal,
    showApiError,
    showTopLoading,
    showConfirm,
    hideTopLoading,
    hideTopLoadingStopRefresh,
    addZero,
    toTop,
    checkPhone,
    checkPassword,
    checkWithdrawPassword,
    checkPrice,
    showLoadingDialog,
    hideLoadingDialog


}

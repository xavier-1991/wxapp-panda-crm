function getUserInfo() {
    return uni.getStorageSync('userinfo');
}
function storeUserInfo(userinfo) {
    uni.setStorageSync('userinfo', userinfo);
}
function isLogin() {
    let userInfo = getUserInfo();
    if (userInfo && userInfo.token) {
        return true;
    }
    return false;
}
function getPosition() {
    return uni.authorize({scope: "scope.userLocation"}).then((resArr)=>{
        if (resArr[1]){
            return Promise.resolve();
        }else{
            return Promise.reject('refuse');
        }
    }).then(()=>{
        return uni.getLocation({
            type: "wgs84"
            // highAccuracyExpireTime:3500,
            // isHighAccuracy:true,
        }).then((resArr)=>{
            console.log('位置获取成功', resArr)
            if (resArr[1]) {
                resArr[1].latitude = formatNumber(resArr[1].latitude);
                resArr[1].longitude = formatNumber(resArr[1].longitude);
                return Promise.resolve(resArr[1])
            } else {
                return Promise.reject('error');
            }
        })
    }).catch((err)=>{
        console.log('位置获取失败',err)
        if (err =='refuse'){
            uni.showModal({
                title: "重要提示",
                content: "请允许授权地理信息，定位您当前拜访门店的位置",
                showCancel: false,
                confirmText: "去授权",
                confirmColor: "#52a2d8",
                success: function (res) {
                    if (res.confirm) {
                        //确认则打开设置页面
                        uni.openSetting();
                    }
                }
            });
        }
        return Promise.reject(err)
    })
}
function formatNumber(num){
    return Math.round(num * 10000) / 10000
}

module.exports={
    getUserInfo,
    storeUserInfo,
    getPosition,
    isLogin
}

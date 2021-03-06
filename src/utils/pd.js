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
            type: "gcj02",
            isHighAccuracy:true,
            highAccuracyExpireTime:3000
        }).then((resArr)=>{
            console.log('位置获取成功', resArr)
            if (resArr[0]){
                uni.hideLoading();
                uni.showModal({
                    content: "请允许微信访问位置信息",
                    showCancel: false,
                    confirmText: "确定",
                    confirmColor: "#52a2d8",
                    success(){
                        uni.navigateBack();
                    }
                });
                console.log('位置获取失败00', err);
            }
            console.log('resArr[1]',resArr[1])
            if (resArr[1]) {
                resArr[1].latitude = formatNumber(resArr[1].latitude);
                resArr[1].longitude = formatNumber(resArr[1].longitude);
                return Promise.resolve(resArr[1])
            } else {
                return Promise.reject('error');
            }
        }).catch((err)=>{
           
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
    return Math.round(num * 1000000) / 1000000
}
function dateNowStr(){
    let now=new Date();
    let y=now.getFullYear();
    let m = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : '' + (now.getMonth() + 1);
    let d=now.getDate();
    return `${y}-${m}-${d}`;
}
function getRoleType(){
    //0 业务员 1 省区经理 2 销售支持
    return uni.getStorageSync('userinfo').roleType||0;
}

module.exports={
    getUserInfo,
    storeUserInfo,
    getPosition,
    isLogin,
    dateNowStr,
    getRoleType
}

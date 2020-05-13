function getUserInfo() {
    return uni.getStorageSync('userinfo');
}
function storeUserInfo(userinfo) {
    uni.setStorageSync('userinfo', userinfo);
}
function getLoginInfo() {
    return uni.getStorageSync('logininfo');
}
function storeLoginInfo(logininfo) {
    uni.setStorageSync('logininfo', logininfo);
}
function getCardInfo() {
    return uni.getStorageSync('cardinfo');
}
function storeCardInfo(cardinfo) {
    uni.setStorageSync('cardinfo', cardinfo);
}
function isLogin() {
    let userInfo = getUserInfo();
    if (userInfo && userInfo.token) {
        return true;
    }
    return false;
}
module.exports={
    getUserInfo,
    storeUserInfo,
    getLoginInfo,
    storeLoginInfo,
    getCardInfo,
    storeCardInfo,
    isLogin
}


const HOST = "ly.pandamuying.com/";
const HTTPS = "https://"; 
const URL_API_BASE = HTTPS.concat(HOST);
var urls = {
    LOGIN: 'api/auth/login',
    FORGOT_LOGIN_PASSWORD: 'api/auth/forget-password',
    LOGIN_OUT: 'api/auth/logout',
    CHANGE_PASSWORD: 'api/personal/change-password',
    SEND_CODE: 'api/common/sent-verification-code',
    INDEX: 'api/index',
    GOODS: 'api/index/goods',
    USER_CENTER: 'api/personal',
    CHANGE_PAY_PASSWORD: 'api/personal/change-pay-password',
    FORGOT_PAY_PASSWORD: 'api/personal/forget-pay-password',
    BANK_CARD: 'api/card',
    APPLY: 'api/apply',
    APPLY_DETAIL: 'api/apply/detail',
    APPLY_PAGE: 'api/apply/page',
    GET_BANK_NAME: 'api/common/bank-card-info',
   
};



urls.HTTPS = HTTPS;
urls.HOST = HOST;
urls.URL_API_BASE=URL_API_BASE;


module.exports = urls;

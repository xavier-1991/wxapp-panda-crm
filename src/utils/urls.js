
const HOST = "crm.pandamuying.com/";
const HTTPS = "https://"; 
const URL_API_BASE = HTTPS.concat(HOST);
var urls = {
    LOGIN: 'api/auth/login',
    FORGOT_LOGIN_PASSWORD: 'api/auth/forget-password',
    LOGIN_OUT: 'api/auth/logout',
    CHANGE_PASSWORD: 'api/auth/change-password',
    SEND_CODE: 'api/common/sent-verification-code',
    SALESMAN: 'api/salesman',
    STORE: 'api/store',
    STORE_EDIT: 'api/store/{0}',
    STORE_LIST: 'api/salesman/store-list',
    CUSTOMER: 'api/customer',
    ORDER: 'api/order',
    ORDER_GOODS: 'api/order/related-goods/{0}',
    EXPRESS_INFO: 'api/order/express-info/{0}',
    STATISTICS: 'api/statistics',
    UPLOADS: 'api/common/uploads',
    STORE_DETAIL: 'api/store/{0}',
    VISITED: 'api/visited/',
};



urls.HTTPS = HTTPS;
urls.HOST = HOST;
urls.URL_API_BASE=URL_API_BASE;


module.exports = urls;

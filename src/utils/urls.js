
const HOST = "crm.pandamuying.com/";
// const HOST = "crm-test.pandamuying.com/";
// const HOST = "crm-new.pandamuying.com/";
const HTTPS = "https://";
const URL_API_BASE = HTTPS.concat(HOST);
var urls = {
    LOGIN: 'api/auth/login',
    FORGOT_LOGIN_PASSWORD: 'api/auth/forget-password',
    LOGIN_OUT: 'api/auth/logout',
    CHANGE_PASSWORD: 'api/auth/change-password',
    SEND_CODE: 'api/common/sent-verification-code',
    SALESMAN: 'api/index',
    STORE: 'api/store',
    STORE_EDIT: 'api/store/{0}',
    STORE_LIST: 'api/index/store-list',
    CUSTOMER: 'api/customer',
    CUSTOMER_DETAIL: 'api/customer/{0}',
    ORDER: 'api/order',
    ORDER_GOODS: 'api/order/related-goods/{0}',
    EXPRESS_INFO: 'api/order/express-info/{0}',
    STATISTICS: 'api/statistics',
    UPLOADS: 'api/common/uploads',
    STORE_DETAIL: 'api/store/{0}',
    VISITED: 'api/visit/',
    SELECT_STORE: 'api/visit/select-store',
    SALESMAN_LIST: 'api/salesman',
    AREA_LIST: 'api/common/area-list',
    COMMON_REVIEW: 'api/store/review',
    SELECT_SALESMAN: 'api/salesman/select-salesman',
    LABEL_LIST: 'api/worksheet/label-list',
    WORK_SHEET: 'api/worksheet',
    STORE_TRANSFER: 'api/store/transfer',
    WORK_SHEET: 'api/worksheet',
    WORK_SHEET_DETAIL: 'api/worksheet/{0}',
    WORK_SHEET_TRACING: 'api/worksheet/tracing/{0}',
    RED_PACKET_ACTIVITIES: 'api/red-packet/available-activities',
    RED_PACKET: 'api/red-packet',
    RED_PACKET_SEND: 'api/red-packet/send/{0}',
};



urls.HTTPS = HTTPS;
urls.HOST = HOST;
urls.URL_API_BASE=URL_API_BASE;


module.exports = urls;

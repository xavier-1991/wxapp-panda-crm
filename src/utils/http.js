
const urls = require('./urls');
const pd = require('./pd');
const util = require('./util');

const HTTP_METHODS = ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT","PATCH"];
/**
 *
 * @param apiUrl 访问的 url
 * @param methodName 方法名 GET, POST 等
 * @param params 参数
 * @param withToken 是否需要携带用户登录信息
 * @returns {Promise.<*>} 返回 promise
 */
function request(apiUrl, methodName, params = {}, withToken = true) {
    let targetUrl = `${urls.URL_API_BASE}${apiUrl}`;
    if (!isHttpMethodSupport(methodName)) {
        return Promise.reject({ code: -1, msg: 'method not support' });
    }
    let header = getCommonHeader(methodName) || {};

    if (withToken) {
        let userInfo = pd.getUserInfo();
        let token = userInfo ? userInfo.token:'';
        let nowTime=Math.ceil(new Date().getTime()/1000);
        if (userInfo && userInfo.token && nowTime < userInfo.tokenExpireTime){
            header['Authorization'] = `Bearer ${userInfo.token}`;
            return realRequest(targetUrl, methodName, params, header).then(data => {
                //这里重新返回一个promise 是防止在这里需要做一些公用的东西

                return Promise.resolve(data);
            }).catch(err => {
                return Promise.reject(err);
            })
        }else{
            util.reLaunch('login');
            return Promise.reject('ApiError');
        } 
    } else {
        return realRequest(targetUrl, methodName, params, header).then(data => {
            //这里重新返回一个promise 是防止在这里需要做一些公用的东西,否则直接 return realRequest(targetUrl, methodName, params, header);即可
            return Promise.resolve(data);
        }).catch(err => {
            return Promise.reject(err);
        })
    }


}

/**
 *数据请求
 * @param apiUrl
 * @param methodName
 * @param params
 * @param header
 * @returns {Promise.<TResult>}
 */
function realRequest(apiUrl, methodName, params, header) {
    return uni.request({ url: apiUrl, method: methodName, data: params, header: header }).then(res => {
        if (res[0]) {
            //请求出错，例如超时
            return Promise.reject(res[0]);
        }
        let result = res[1];
        // return;
        if (result.statusCode === 200) {
            if (result.data.error === 0) {
                return Promise.resolve(result.data.data);
            } else if (result.data.error === 401) {
                //token过期，或者授权后二次登录接口api/we/mini/getAuthorization报错
                util.reLaunch('login');
                return Promise.reject('ApiError');
            } else {
                util.hideLoadingDialog();
                util.showApiError(result.data.message);
                return Promise.reject('ApiError');
            }
        } else {
            return Promise.reject(result.data);
        }
    }).catch(err => {
        util.hideLoadingDialog();
        if (err === 'ApiError') {
            return Promise.reject({ code: -1, msg: err.msg ? err.msg : '数据请求失败' });
        }
        return uni.getNetworkType().then(res => {
            let result=res[1];
            if (result.networkType === 'none') {
                util.showToast('网络不可用');
                return Promise.reject({ code: 400, msg: '网络不可用' });
            } else {
                console.log(result)
                let msg = /(timeout)|(超时)/.test(err.errMsg) ? '您的网络不给力，请稍后再试~' : '网络开小差了，请稍后再试~';
                util.showModal(msg);
                return Promise.reject({ code: -1, msg: err.msg ? err.msg : '数据请求失败' });
            }   
        });

    }).finally(() => {
        util.hideTopLoadingStopRefresh();
    });

}


/**
 * 设置通用header
 */
function getCommonHeader(methodName) {
    let header = {};
    if (methodName === "POST") {
        header['content-type'] = 'application/json';

        return header;
    } else {
        header['content-type'] = 'application/x-www-form-urlencoded';
        return header;
    }
}
/**
 * 判断http method 是否支持
 */
function isHttpMethodSupport(methodName) {
    for (var i = 0; i < HTTP_METHODS.length; i++) {
        if (HTTP_METHODS[i] === methodName) {
            return true;
        }
    }
    return false;
}
//文件上传
function uploadFiles(filePathArr, success,fail) {
    loginRequest().then(result => {
        let header = {};
        header['token'] = result.token;        
        //header['content-type'] = 'multipart/form-data';
        //header['content-type'] = 'application/x-www-form-urlencoded';
        // header['content-type'] = 'application/json';
        let uploadFilePromises = [];
        filePathArr.forEach((path, index) => {
            let promise = new Promise((resolve, reject) => {
                let param = {
                    url: `${urls.URL_API_BASE}${urls.UPLOAD_FILES}`,
                    header: header,
                    filePath: path,
                    name: 'file',
                    success: (res) => {
                        console.log(res);
                        if (res.statusCode === 200) {
                            let result = JSON.parse(res.data);
                            if (result.status == 1) {
                                resolve(result.data);
                            } else if (result.status == -4) {
                                util.reLaunch('login');
                                reject('uploadError');
                            }else{
                                reject('uploadError');
                            }
                        } else {
                            reject('uploadError');
                        }
                    },
                    fail: (res) => {
                        reject(res);
                    }
                };
                uni.uploadFile(param)
            });
            uploadFilePromises.push(promise);
        });
        Promise.all(uploadFilePromises).then((res) => {
            success(res);
        }).catch(res => {
            fail(res);
            console.error(res);
            util.showToast('上传失败，请重新上传')
        });
    }).catch(err => {
        return Promise.reject(err);
    })
    
}


module.exports = {
    request,
    uploadFiles
}

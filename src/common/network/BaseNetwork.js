import React from 'react';
import {Toast} from "native-base";
import Timeout from "./Timeout";

/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = url => params => {
    if (params) {
        let paramsArray = []
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if (url.search(/\?/) === -1) {
            typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return url
};

class BaseNetwork {

    constructor() {}

    /**
     * 基于fetch 封装的GET 网络请求
     * @param url 请求URL
     * @param params 请求参数
     * @returns {Promise}
     */
     getRequest = (url, params = {}) => {
        return Timeout(fetch(handleUrl(url)(params), {
            method: 'GET',
            headers: header
        })).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                Toast.show({text:'服务器开小差了，请稍后再试...',buttonText:'好的',type:'warning'});
            }
        }).then(response => {
            // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
            if (response) {
                return response
            } else {
                // 非 200，错误处理
                // alert(response.message)
                return response
            }
        }).catch(error => {
            Toast.show({text:'服务器开小差了，请稍后再试...',buttonText:'好的',type:'warning'});
        })
    }

    /**
     * 基于fetch 的 POST 请求
     * @param url 请求的URL
     * @param params 请求参数
     * @returns {Promise}
     */
     postRequest = (url, params = {}) => {
        return timeoutFetch(fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(params)
        })).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                Toast.show({text:'服务器开小差了，请稍后再试...\r\nCode:' + response.status,buttonText:'好的',type:'warning'});
            }
        }).then(response => {
            // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
            if (response && response.code === 200) {
                return response
            } else {
                // alert(response.message)
                return response
            }
        }).catch(error => {
            Toast.show({text:'服务器开小差了，请稍后再试...',buttonText:'好的',type:'warning'});
        })
    }

}

export default BaseNetwork();



// this.method = 'POST';
// this.header = null;       // request header. format {a:'1'} or {b:['1','2','3']}
// // this.redirect = null;   // set to `manual` to extract redirect headers, `error` to reject redirect
// // this.follow = null;      // maximum redirect count. 0 to not follow redirect
// this.timeout = 30;      // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
// this.compress = true;   // support gzip/deflate content encoding. false to disable
// // this.size = 0;          // maximum response body size in bytes. 0 to disable
// this.body = '';         // request body. can be a string, buffer, readable stream
// this.agent = null;      // http.Agent instance, allows custom proxy, certificate etc.

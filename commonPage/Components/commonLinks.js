/**
 * Created by supervons on 2019/2/21.
 */
let hostUrl = 'http://localhost:8080/commonProject/';//app外网测试环境

const commonLinks = {
    /**
     * 用户登录接口
     * @returns {string}
     */
    fetchLoginIn(){
        const subUrl = 'user/loginAction';
        return hostUrl + subUrl;
    },
    /**
     * 用户注销
     * @returns {string}
     */
    fetchLogOut(){
        const subUrl = 'logon/manager/logout';
        return hostUrl + subUrl;
    },
};
module.exports = commonLinks;
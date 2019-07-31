/**
 * Created by supervons on 2019/2/21.
 */
let hostUrl = 'http://47.93.31.98:8080/commonProject/';//app外网测试环境
// let hostUrl = 'http://localhost:8080/commonProject/';//app外网测试环境

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
     * 用户注册接口
     * @returns {string}
     */
    fetchRegister(){
        const subUrl = 'user/addUser';
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
    /**
     * 获取服务器地址
     * @returns {string}
     */
    getHostUri(){
        return hostUrl;
    }
};
module.exports = commonLinks;

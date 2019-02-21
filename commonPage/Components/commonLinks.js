/**
 * Created by supervons on 2019/2/21.
 */
let hostUrl = '';//app外网测试环境

const commonLinks = {
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
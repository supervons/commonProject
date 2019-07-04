/**
 * Created by supervons on 2019/03/02.
 * 新闻相关接口
 */
import CommonLinks from '../commonLinks';

const newsUrlLink = {
    /**
     * 新闻列表
     * @returns {string}
     */
    getNewsListUrl(){
        const subUrl = 'news/queryNewsInfo';
        return CommonLinks.getHostUri() + subUrl;
    },
};

module.exports = newsUrlLink;
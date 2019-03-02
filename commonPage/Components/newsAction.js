/**
 * Created by supervons on 2019/2/21.
 */
import NewsUrlLink from './newsUrlLink';
import HttpUtils from '../Fetch/HttpUtils';

const _getNewsList = (param, callback, failure) => {
    const requestUrl = NewsUrlLink.getNewsListUrl();
    return HttpUtils.postRequest(requestUrl, param)
        .then((responseData) => {
            callback(responseData);
        }, (errorData) => {
            failure(errorData);
        });
};

const newsActions = {
    getNewsList: (param, callback, failure) => _getNewsList(param, callback, failure),
};

module.exports = newsActions;
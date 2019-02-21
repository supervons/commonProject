/**
 * Created by supervons on 2019/2/21.
 */
import CommonLink from './commonLinks';
import HttpUtils from '../Fetch/HttpUtils';

const _getTestAction = (param, callback, failure) => {
    const requestUrl = CommonLink.fetchLogOut();
    return HttpUtils.getRequest(requestUrl, param)
        .then((responseData) => {
            callback(responseData);
        }, (errorData) => {
            failure(errorData);
        });
};

const operationActions = {
    getTestAction: (param, callback, failure) => _getTestAction(param, callback, failure),
};

module.exports = operationActions;
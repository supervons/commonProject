/**
 * Created by supervons on 2019/3/13.
 * 新的测试 Redux combineReducers 合并 Reducer
 */
import { setTestText, SET_TEST_TEXT  } from '../action/testTextAction';

const testReducer = (state = setTestText('Redux') , action) => {
    const newState = state;
    console.log('newState' + JSON.stringify(newState) + ' -- ' + action.text);
    // 判断 action 类型
    switch (action.type) {

        case SET_TEST_TEXT:
            return {
                ...newState,
                text: action.text
            };

        default:
            return {
                ...newState,
                text:state.text
            }

    }
};
export default testReducer;
/**
 * Created by supervons on 2019/3/3.
 * Redux Reducer设置
 */
import { combineReducers  } from 'redux';
import { ADD_TEXT, subtractText, SUBTRACT_TEXT, RESET_TEXT  } from '../action/action';
import testReducer from './testReducer';

const mainReducer = (state = subtractText(0), action) => {

    const newState = state;
    const text = action.text;
    console.log('newState' + JSON.stringify(newState) + ' -- ' + text);
    // 判断 action 类型
    switch (action.type) {

        case ADD_TEXT:
            return {
                ...newState,
                text: state.text + text
            };

        case SUBTRACT_TEXT:
            return {
                ...newState,
                text: state.text - text
            };

        case RESET_TEXT:
            return {
                ...newState,
                text: text
            };

        default:
            return {
                ...newState,
                text:state.text
            }
    }
};
const reducer = combineReducers({mainReducer, testReducer});
export default reducer;
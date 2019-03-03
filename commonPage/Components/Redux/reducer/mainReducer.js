/**
 * Created by supervons on 2019/3/3.
 * Redux Reducer设置
 */
import { ADD_TEXT, addText, SUBTRACT_TEXT, resetText, RESET_TEXT  } from '../action/action';

const mainReducer = (state = addText(0), action) => {

    const newState = state;
    const text = action.text;
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

export default mainReducer;
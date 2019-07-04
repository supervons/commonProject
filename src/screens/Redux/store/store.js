/**
 * Created by edz on 2019/3/3.
 * store，初始化reducer
 */
import Reducer from '../reducer/mainReducer';
import { createStore } from 'redux';

export default () => {

    // 根据 reducer 初始化 store
    const store = createStore(Reducer);

    return store;
}

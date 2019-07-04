/**
 * Created by supervons on 2019/3/13.
 * Redux action 设置
 */
export const SET_TEST_TEXT = 'SET_TEST_TEXT';

// 新的Redux 测试 action
// 初始化 SET_TEST_TEXT 对象
export const setTestText = (text) => {
    return {
        type: SET_TEST_TEXT,
        text,
    }
};
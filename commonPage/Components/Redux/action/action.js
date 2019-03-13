/**
 * Created by supervons on 2019/3/3.
 * Redux action 设置
 */
export const ADD_TEXT = 'ADD_TEXT';
export const SUBTRACT_TEXT = 'SUBTRACT_TEXT';
export const RESET_TEXT = 'RESET_TEXT';

// 初始化 ADD_TEXT 对象
export const addText = (text) => {
    return {
        type: ADD_TEXT,
        text
    }
};

// 初始化 SUBTRACT_TEXT 对象
export const subtractText = (text) => {
    return {
        type: SUBTRACT_TEXT,
        text,
    }
};

// 初始化 Reset_TEXT 对象
export const resetText = (text) => {
    return {
        type: RESET_TEXT,
        text,
    }
};
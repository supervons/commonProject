/**
 * Created by edz on 2019/3/3.
 * Redux 外层组件 <Provider store={store}> 嵌套 Redux
 */
import React, {Component} from 'react';
import { Provider } from 'react-redux';

import configureStore from '../Redux/store/store'
import ReduxTest from './ReduxTest';

const store = configureStore();
export default class ReduxTestIndex extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Redux测试界面',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    }

    render() {
        return (
            <Provider store={store}>
                <ReduxTest/>
            </Provider>
        );
    }
}
/**
 * Created by supervons on 2018/12/20.
 * 入口界面，控制路由
 * app entrance interface page
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/screens/redux/store/store'
import RootStack from './src/routers/index'
import {Root, Icon} from "native-base";
import Loading from './src/components/loading/Loading'

import {Sentry} from 'react-native-sentry';

Sentry.config('').install();

const store = configureStore();

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Root>
                    <RootStack/>
                    <Loading/>
                </Root>
            </Provider>
        )
    }
}

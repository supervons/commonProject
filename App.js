/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";
import LoginPage from './commonPage/Login/loginPage'
import MainPage from './commonPage/MainPage';

const RootStack = createStackNavigator({
        Login: {
            screen: LoginPage
        },
        MainPage: {
            screen: MainPage
        }
    },
    {//定义配置
        initialRouteName: 'Login',     //设置初始路由为登录界面
    }
)

export default class App extends Component {

    render() {
        return(
            <RootStack/>
        )
    }
}
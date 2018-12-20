/**
 * Created by supervons on 2018/12/20.
 * 入口界面，控制路由
 * app entrance interface page
 */

import React, {Component} from 'react';
import {createStackNavigator} from "react-navigation";
import LoginPage from './commonPage/Login/loginPage'
import MainPage from './commonPage/MainPage';
import PersonalCenter from './commonPage/personalCenter/personalCenter';

const RootStack = createStackNavigator({
        Login: { //登录界面
            screen: LoginPage
        },
        MainPage: { //主界面
            screen: MainPage
        },
        PersonalCenter: { //我的（个人中心）
            screen: PersonalCenter
        }
    },
    {//定义配置
        initialRouteName: 'Login',     //设置初始路由为登录界面
        navigationOptions: {           //导航栏通用设置
            headerStyle: {
                backgroundColor: '#7276ff',
            },
        }
    }
)

export default class App extends Component {

    render() {
        return (
            <RootStack/>
        )
    }
}
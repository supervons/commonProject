import React from 'react';
import {createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import MainPage from "../screens/MainPage";
import {Image} from "react-native";
import News from "../screens/news/news";
import PersonalCenter from "../screens/personalCenter/personalCenter";
import LoginPage from "../screens/login/loginPage";
import Register from "../screens/registered/register";
import SpinnerShows from "../screens/spinner/spinnerShows";
import ReduxTest from "../screens/redux/ReduxTest";
import ImagePickerComponents from "../screens/imagePicker/imagePickerComponents";
import Animatable from "../screens/animatable/Animatable";
import TouchIdView from "../screens/touchId/touchIdView";
import CodePushScreen from "../screens/codePush/CodePushScreen";
import EchartsView from "../components/sEchartsTest/EchartsView";
import CalendarsDemo from "../components/calendars/CalendarsDemo";
import StackViewStyleInterpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";

const Tabs = createMaterialTopTabNavigator({
    MainPage: {
        screen: MainPage,
        navigationOptions: ({navigation}) => ({
            title: '首页',
            tabBarLabel: '主页',
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require(`../resource/image/icon/tabBarIcon/index_select.png`)}/> :
                    <Image source={require(`../resource/image/icon/tabBarIcon/index_unselect.png`)}/>;
            },
        })
    },
    News: {
        screen: News,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '新闻',
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require(`../resource/image/icon/tabBarIcon/news_select.png`)}/> :
                    <Image source={require(`../resource/image/icon/tabBarIcon/news_unselect.png`)}/>;
            },
        })
    },
    PersonalCenter: {
        screen: PersonalCenter,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused}) => {
                return focused ? <Image source={require(`../resource/image/icon/tabBarIcon/user_select.png`)}/> :
                    <Image source={require(`../resource/image/icon/tabBarIcon/user_unselect.png`)}/>;
            },
        })
    }
}, {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否可以左右滑动切换tab
    lazy: true,
    tabBarOptions: {
        tabStyle: {
            minWidth: 50,
            maxHeight: 50,
        },
        activeTintColor: '#0094ed', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        pressOpacity: 0.8,
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 13,
            marginTop: 3,
            marginBottom: 0,
        },
    },
});
const RootStack = createStackNavigator({
        Login: { //登录界面
            screen: LoginPage
        },
        MainPage: { //主界面
            screen: Tabs
        },
        PersonalCenter: { //我的（个人中心）
            screen: PersonalCenter
        },
        Register: {// 注册页面
            screen: Register
        },
        SpinnerShows: {// 加载动画页面
            screen: SpinnerShows
        },
        News: {
            screen: News
        },
        ReduxTest: {
            screen: ReduxTest
        },
        ImagePickerComponents: {// 图片选择器
            screen: ImagePickerComponents
        },
        Animatable: {// 动画页面
            screen: Animatable
        },
        TouchIdView: {// 指纹测试页面
            screen: TouchIdView
        },
        CodePushScreen: { // 热更新展示页
            screen: CodePushScreen
        },
        EchartsView: { // 图表展示页
            screen: EchartsView
        },
        CalendarsDemo: { // 图表展示页
            screen: CalendarsDemo
        }
    },
    {//定义配置
        initialRouteName: 'Login',     //设置初始路由为登录界面
        navigationOptions: {           //导航栏通用设置
            headerStyle: {
                backgroundColor: '#7276ff',
            },
            headerMode: 'screen',
        },
        transitionConfig: () => ({
            /**
             * 1、从右向左：  forHorizontal；
             * 2、从下向上：  forVertical；
             * 3、安卓那种的从下向上： forFadeFromBottomAndroid；
             * 4、无动画：  forInitial。
             */
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        })
    },
)

module.exports = RootStack;
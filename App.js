/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
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
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
    handleViewRef = ref => this.view = ref;

    wobble = () => this.view.wobble(800).then(endState => console.log(endState.finished ? 'wobble finished' : 'wobble cancelled'));

    rubberBand = () => this.view.rubberBand(800).then(endState => console.log(endState.finished ? 'rubberBand finished' : 'rubberBand cancelled'));

    bounce = () => this.view.wobble(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    render() {
        return(
            <RootStack/>
        )
        // return (
        //     <View style={styles.container}>
        //         <Text style={styles.welcome}>
        //             Welcome to React Native!
        //         </Text>
        //         <TouchableWithoutFeedback onPress={this.rubberBand}>
        //             <Animatable.View ref={this.handleViewRef}>
        //                 <Text style={styles.instructions}>
        //                     To get started, edit App.js
        //                 </Text>
        //             </Animatable.View></TouchableWithoutFeedback>
        //         <Text style={styles.instructions}>
        //             {instructions}
        //         </Text>
        //     </View>
        // );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

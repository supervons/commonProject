/**
 * Created by supervons on 2018/12/19.
 * 动画示例页面
 * react-native-animatable test page
 * 更多请查看 https://github.com/oblador/react-native-animatable
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { Thumbnail, Toast} from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class App extends Component {

    static navigationOptions = {
        title: 'Animatable动画',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };

    handleViewRef = ref => this.view = ref;

    wobble = () => this.view.wobble(800).then(endState => console.log(endState.finished ? 'wobble finished' : 'wobble cancelled'));

    rubberBand = () => this.view.rubberBand(800).then(endState =>
        Toast.show({text:endState.finished ? '弹完了' : '连点',type:'success'}));

    bounce = () => this.view.wobble(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.rubberBand}>
                    <Animatable.View ref={this.handleViewRef}>
                        <Thumbnail
                            style={{width:150,height:150}}
                            source={require('../../resource/image/titleImage/alita.jpeg')}/>
                    </Animatable.View>
                </TouchableWithoutFeedback>
            </View>
        );
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

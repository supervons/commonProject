/**
 * Created by supervons on 2018/12/19.
 * 动画示例页面
 * react-native-animatable test page
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class App extends Component {

    handleViewRef = ref => this.view = ref;

    wobble = () => this.view.wobble(800).then(endState => console.log(endState.finished ? 'wobble finished' : 'wobble cancelled'));

    rubberBand = () => this.view.rubberBand(800).then(endState => console.log(endState.finished ? 'rubberBand finished' : 'rubberBand cancelled'));

    bounce = () => this.view.wobble(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.rubberBand}>
                    <Animatable.View ref={this.handleViewRef}>
                        <Text style={styles.welcome}>
                            点击我看效果
                        </Text>
                    </Animatable.View></TouchableWithoutFeedback>
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

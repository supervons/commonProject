/**
 * 网络请求 Loading
 * 结合 Spinner 使用
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Dimensions} from 'react-native';
import Spinner from '../../screens/spinner/spinner';

const {width, height} = Dimensions.get('window')
let _this = null;

class Loading extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            show: false,
            type: ['CircleFlip', 'Bounce', 'Wave', 'FadingCircle', 'FadingCircleAlt',
                'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid']
        };
    }

    static show = () => {
        _this.setState({show: true})
    };
    static hide = () => {
        _this.setState({show: false})
    };

    render() {
        // 随机动画
        const random = (Math.random().toFixed(1) * 11).toFixed(0) % 11;
        // 随机颜色
        const color = '#' + Math.floor( Math.random() * 0xffffff ).toString(16);
        if (this.state.show) {
            return (
                <View style={styles.LoadingPage}>
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        opacity: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 7,
                        zIndex: 999
                    }}>
                        <Spinner
                            showSpinner={this.state.show}
                            spinkerSize={50}
                            spinkerType={this.state.type[random]}
                            spinkerColor={color}/>
                        <Text style={{marginLeft: 10, color: "#FFF", marginTop: 10}}>努力加载中...</Text>
                    </View>
                </View>
            );
        } else {
            return <View/>
        }
    }
}

export default Loading;
const styles = StyleSheet.create({
    LoadingPage: {
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0)",
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
});

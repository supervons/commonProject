/**
 * Created by supervons on 2019/2/22.
 * loading 动画组件
 */

import Spinkiter from 'react-native-spinkit';
import {Modal,View} from 'react-native';
import React, {Component} from 'react';
/**
 *
 * List of available spinkerType
 * CircleFlip
 * Bounce
 * Wave
 * WanderingCubes
 * Pulse
 * ChasingDots
 * ThreeBounce
 * Circle
 * 9CubeGrid
 * WordPress (IOS only)
 * FadingCircle
 * FadingCircleAlt
 * Arc (IOS only)
 * ArcAlt (IOS only)

 */
export default class Spinner extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            //<Modal
             //   visible={this.props.showSpinner}
               // transparent={true}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Spinkiter isVisible={this.props.showSpinner} size={this.props.spinkerSize} type={this.props.spinkerType} color={this.props.spinkerColor}/>
                </View>
           // </Modal>
        );
    }
}
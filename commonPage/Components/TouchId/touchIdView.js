/**
 * Created by supervons on 2019/3/20.
 * 指纹选择器
 * 模拟器无法使用
 * Warning!!! Simulator is not available
 */
import React, {Component} from 'react';
import {
    Container,
    View,
    Text,
    Toast
} from 'native-base';
import { Button,} from 'native-base';
import TouchID from 'react-native-touch-id';

export default class TouchIdView extends Component {

    constructor(props) {
        super(props);
        this.AuthenticatedTest = this.AuthenticatedTest.bind(this);
    }

    static navigationOptions = {
        title: '指纹识别',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    }

    AuthenticatedTest() {
        const optionalConfigObject = {
            title: '指纹认证', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: '请触摸传感器', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: '取消', // Android
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false,
        };
        TouchID.authenticate('指纹演示', optionalConfigObject)
            .then(success => {
                Toast.show({text: '认证成功 Authenticated Successfully', type: 'success'});
                // Success code
            })
            .catch(error => {
                Toast.show({text: '认证失败 Authentication Failed', type: 'success'});
                // Failure code
            });
    }

    render() {
        return (
            <Container style={{height:1000}}>
                <View style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: 'center',}}>
                    <Button style={{alignSelf:'flex-end',marginBottom:35}} onPress={() => this.AuthenticatedTest()}>
                        <Text>指纹测试</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}
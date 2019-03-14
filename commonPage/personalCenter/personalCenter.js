/**
 * Created by supervons on 2018/12/20.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {TouchableNativeFeedback,Alert} from 'react-native';
import {Container, Header, Content,Badge, Footer, FooterTab, Button, Icon, Text} from 'native-base';
export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.toLoginPage = this.toLoginPage.bind(this);
    }

    static navigationOptions = {
        title: '我的',
        gesturesEnabled: false,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
        headerRight:<Icon name="ios-settings-outline"></Icon>,
    };

    toLoginPage() {
        Alert.alert('提示', '确认退出吗？',
            [{
                text: "取消", onPress: ()=> {
                }
            },
                {
                    text: "确定", onPress: ()=> {
                    this.props.navigation.replace('Login')
                }
                }
            ]
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <Button block onPress={this.toLoginPage}>
                        <Text>退出</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
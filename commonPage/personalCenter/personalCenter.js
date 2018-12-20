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
        this.toPersonalCenter = this.toPersonalCenter.bind(this);
        this.toMainPage = this.toMainPage.bind(this);
        this.toLoginPage = this.toLoginPage.bind(this);
    }

    static navigationOptions = {
        title: '个人中心',
        gesturesEnabled: false,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
        headerRight:<Icon name="ios-settings-outline"></Icon>,
    };

    toMainPage() {
        this.props.navigation.replace('MainPage');
    }

    toPersonalCenter() {
        this.props.navigation.replace('PersonalCenter');
    }

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
                <Footer>
                    <FooterTab>
                        <Button vertical
                                onPress={this.toMainPage}>
                            <Icon name="apps"/>
                            <Text>应用</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera"/>
                            <Text>相机</Text>
                        </Button>
                        <Button vertical>
                            <Icon active name="navigate"/>
                            <Text>导航</Text>
                        </Button>
                        <Button vertical active>
                            <Icon name="ios-person"/>
                            <Text>我的</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
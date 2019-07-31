/**
 * Created by supervons on 2018/12/20.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {Linking, Alert, StyleSheet} from 'react-native';
import {Container, Content, Button, Icon, Text} from 'native-base';
import * as WeChat from 'react-native-wechat';
import Realm from "realm";
export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.toLoginPage = this.toLoginPage.bind(this);
        this.toShareWeixin = this.toShareWeixin.bind(this);
    }

    componentDidMount() {
        WeChat.registerApp('')
    }

    static navigationOptions = {
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
        headerRight: <Icon name="ios-settings-outline"></Icon>,
    };

    toLoginPage() {
        Alert.alert('提示', '确认退出吗？',
            [{
                text: "取消", onPress: ()=> {
                }
            },
                {
                    text: "确定", onPress: ()=> {
                        let realm = new Realm();
                        realm.write(() => {
                            // 退出删除该表所有数据
                            let allBooks = realm.objects('UserLocalData');
                            realm.delete(allBooks);
                        });
                        this.props.navigation.replace('Login')
                }
                }
            ]
        );
    }

    toShareWeixin() {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title: '快来看看啊',
                        description: '这是一个测试的分享内容',
                        thumbImage: '../image/loginPage/login.jpeg',
                        type: 'news',
                        webpageUrl: 'github.com/supervons/commonProject'
                    })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                } else {
                    Alert.alert('请安装微信');
                }
            });
    }

    toProjectUrl(){
        Linking.openURL("https://github.com/supervons/commonProject")
    }

    render() {
        return (
            <Container>
                <Content>
                    <Button full light style={styles.buttonStyle} onPress={this.toShareWeixin}>
                        <Text>微信分享</Text>
                    </Button>
                    <Button full light style={styles.buttonStyle} onPress={this.toProjectUrl}>
                        <Text>项目地址</Text>
                    </Button>
                    <Button full light style={styles.buttonStyle} onPress={this.toLoginPage}>
                        <Text>退出</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 5
    },
});

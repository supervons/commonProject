/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Content, Form, Item, Input, Toast, Label, Button, Text, Thumbnail} from 'native-base';
import CommonStyle from '../CommonProperties/CommonStyle';
import OperationActions from '../Components/operationActions';
import Spinner from '../Spinner/spinner';
import {Modal, View, NetInfo, Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Realm from 'realm';
import JPushModule from 'jpush-react-native';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.toRegisterPage = this.toRegisterPage.bind(this);
        this.codePushAction = this.codePushAction.bind(this);
        this.state = ({
            loginId: '',
            passWord: '',
            loginSpinner: false,
            isConnected: false,
            connectionInfo: '',
        });
    }

    static navigationOptions = {
        headerTransparent: true,
        headerStyle: {},
    };

    handleUserName = ref => this.userName = ref;

    handlePassWord = ref => this.passWord = ref;

    rubberBandUserName = () => this.userName.rubberBand(800).then(endState => console.log(endState.finished ? 'wobble finished' : 'wobble cancelled'));

    rubberBandPassWord = () => this.passWord.rubberBand(800).then(endState => console.log(endState.finished ? 'wobble finished' : 'wobble cancelled'));

    componentDidMount() {
        if (Platform.OS !== 'ios') {
            JPushModule.initPush();
            JPushModule.getRegistrationID(registrationId => {
            })
            JPushModule.addReceiveCustomMsgListener((message) => {
            });
            JPushModule.addReceiveNotificationListener((message) => {
                console.log("receive notification: " + message);
            })
        }
        //检测网络是否连接
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({isConnected: isConnected});
        });

        //监听网络变化事件
        NetInfo.addEventListener('connectionChange', (networkType) => {
            const netType = networkType.type;
            if (netType === 'none') {
                Toast.show({text: '貌似没网哦，请检查当前网络状态', type: 'warning'});
            } else if (netType === 'wifi') {
                Toast.show({text: '使用wifi访问... ', type: 'warning'});
            } else {
                Toast.show({text: '使用流量中，请确保流量充足哦.', type: 'danger'});
            }
        })
    }

    loginAction() {
        const loginId = this.state.loginId;
        const passWord = this.state.passWord;
        if (loginId === '') {
            Toast.show({text: '请输入用户名', buttonText: '好的', type: 'danger'});
            this.rubberBandUserName();
            return;
        } else if (passWord === '') {
            Toast.show({text: '请输入密码', buttonText: '好的', type: 'danger'});
            this.rubberBandPassWord();
            return;
        }
        this.setState({
            loginSpinner: true,
        })
        OperationActions.getUserLoginAction({
            loginId: loginId,
            passWord: passWord
        }, (response) => {
            if (response === undefined) {
                this.setState({
                    loginSpinner: false,
                })
                return;
            }
            if (response.code !== 'fail') {
                this.setState({
                    loginSpinner: false,
                })
                const param = response.data;
                console.log(JSON.stringify(param));
                let realm = new Realm();
                let jwtToken = response.auxiliaryData.jwtToken;
                realm.write(() => {
                    /**
                     * 存储用户基本数据
                     * realm.create('表名','数据','是否更新')
                     * 若携带第三个参数，则会更新该主键参数，没有就创建
                     * realm.create('table name', 'data', 'updated')
                     * If the third parameter is carried, the primary key parameter will be updated, and no one will be created.
                     */
                    realm.create(
                        'UserLocalData',
                        {
                            id: 0,
                            userId: param.id,
                            loginId: param.loginId,
                            passWord: param.passWord,
                            userAddress: param.userAddress,
                            userCellPhone: param.userCellPhone,
                            userSex: param.userSex,
                            name: param.userName,
                            jwtToken: jwtToken
                        }
                        , true);
                });
                this.props.navigation.replace('MainPage', {param: param});
            } else {
                this.setState({
                    loginSpinner: false,
                })
                Toast.show({text: response.msg, buttonText: '好的', type: 'danger'});
            }
        }, (error) => {
            this.setState({
                loginSpinner: false,
            })
        });
    }

    codePushAction() {
        this.props.navigation.navigate('CodePushScreen');
    };

    toRegisterPage() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{marginTop: 220}}>
                        <View style={CommonStyle.centerViewStyle}>
                            <Thumbnail large source={require('../image/loginPage/login2.jpeg')}/>
                        </View>
                        <Animatable.View ref={this.handleUserName}>
                            <Item floatingLabel>
                                <Label style={{marginTop: 5}}>用户名/Username</Label>
                                <Input onChangeText={(text) => this.setState({loginId: text})}
                                       autoCorrect={false}
                                       autoCapitalize="none"
                                       value={this.state.loginId}/>
                            </Item>
                        </Animatable.View>
                        <Animatable.View ref={this.handlePassWord}>
                            <Item floatingLabel>
                                <Label style={{marginTop: 5}}>密码/Password</Label>

                                <Input secureTextEntry={true}
                                       onChangeText={(text) => this.setState({passWord: text})}
                                       vauel={this.state.passWord}/>
                            </Item>
                        </Animatable.View>
                        <Spinner
                            showSpinner={this.state.loginSpinner}
                            spinkerSize={50}
                            spinkerType='Wave'
                            spinkerColor='#3B77FF'/>
                        <Button block
                                style={CommonStyle.buttonStyle}
                                onPress={this.loginAction}><Text>登录</Text></Button>

                        <View style={CommonStyle.textStyle}>
                            <View>
                                <Text onPress={this.codePushAction}>版本热更新</Text>
                            </View>
                            <View>
                                <Text onPress={this.toRegisterPage}>免费注册></Text>
                            </View>
                        </View>

                    </Form>
                </Content>
            </Container>
        );
    }
}

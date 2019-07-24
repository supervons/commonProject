/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Content, Form, Item, Input, Toast, Label, Button, Text, Thumbnail} from 'native-base';
import CommonStyle from '../../common/CommonProperties/CommonStyle';
import OperationActions from '../../common/actions/operationActions';
import {Modal, View, NetInfo, Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Realm from 'realm';
import JPushModule from 'jpush-react-native';
import TouchID from 'react-native-touch-id';
import Toaster from '../../components/toast/toast';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.toRegisterPage = this.toRegisterPage.bind(this);
        this.codePushAction = this.codePushAction.bind(this);
        this.loginActionByTouchId = this.loginActionByTouchId.bind(this);
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
        console.disableYellowBox = true;
        let realm = new Realm();
        try{
            // 判断本地缓存数据库中，是否有登录数据
            let userLocalData = realm.objects('UserLocalData');
            if(userLocalData.length>0){
                // 如果数据大于 0 则直接跳转到登录页
                this.props.navigation.replace('MainPage', {param: {}});
            }
        }catch (e) {

        }
        if (Platform.OS !== 'ios') {
            JPushModule.initPush();
            JPushModule.notifyJSDidLoad((resultCode) => {
                if (resultCode === 0) {
                }
            });
            JPushModule.addReceiveNotificationListener((map) => {
                console.log("alertContent: " + map.alertContent);
                console.log("extras: " + map.extras);
            });
            JPushModule.addReceiveOpenNotificationListener((map) => {
                this.props.navigation.replace('MainPage', {param: {}});
            });
        }
        //检测网络是否连接
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({isConnected: isConnected});
        });

        if (this.props.navigation.state.params !== undefined) {
            this.setState({
                loginId: this.props.navigation.state.params.loginId
            })
        }

        //监听网络变化事件
        NetInfo.addEventListener('connectionChange', (networkType) => {
            const netType = networkType.type;
            if (netType === 'none') {
                Toaster.showToast('貌似没网哦，请检查当前网络状态');
            } else if (netType === 'wifi') {
                Toaster.showToast('使用wifi访问... ', 'SHORT', 'BOTTOM');
            } else {
                Toaster.showToast('使用流量中，请确保流量充足哦.', 'SHORT', 'BOTTOM');
            }
        })
    }

    loginActionByTouchId() {
        const optionalConfigObject = {
            title: '身份认证', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: '请触摸传感器', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: '取消', // Android
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false,
        };
        TouchID.authenticate('指纹登录', optionalConfigObject)
            .then(success => {
                this.setState({loginId: '456', passWord: '123123'});
                this.loginAction();
            })
            .catch(error => {
                Toast.show({text: '认证失败 Authentication Failed', type: 'danger'});
            });
    }

    loginAction() {
        const loginId = this.state.loginId;
        const passWord = this.state.passWord;
        if (loginId === '') {
            Toaster.showToast('请输入用户名');
            this.rubberBandUserName();
            return;
        } else if (passWord === '') {
            Toaster.showToast('请输入密码');
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
                            <Thumbnail large source={require('../../resource/image/loginPage/login2.jpeg')}/>
                        </View>
                        <Animatable.View ref={this.handleUserName}>
                            <Item floatingLabel>
                                <Label>用户名/Username</Label>
                                <Input onChangeText={(text) => this.setState({loginId: text})}
                                       autoCorrect={false}
                                       autoCapitalize="none"
                                       value={this.state.loginId}/>
                            </Item>
                        </Animatable.View>
                        <Animatable.View ref={this.handlePassWord}>
                            <Item floatingLabel>
                                <Label>密码/Password</Label>

                                <Input secureTextEntry={true}
                                       onChangeText={(text) => this.setState({passWord: text})}
                                       vauel={this.state.passWord}/>
                            </Item>
                        </Animatable.View>
                        <Button block
                                style={CommonStyle.buttonStyle}
                                onPress={this.loginAction}><Text>登录</Text></Button>
                        <Button block
                                style={CommonStyle.buttonStyle}
                                onPress={this.loginActionByTouchId}><Text>指纹登录</Text></Button>

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

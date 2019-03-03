/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input,Toast, Icon, Label, Button, Text,} from 'native-base';
import CommonStyle from '../CommonProperties/CommonStyle';
import OperationActions from '../Components/operationActions';
import Spinner from '../Spinner/spinner';
import {Modal, View, NetInfo} from 'react-native';
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.toRegisterPage = this.toRegisterPage.bind(this);
        this.state = ({
            loginId: '',
            passWord: '',
            loginSpinner: false,
            isConnected:false,
            connectionInfo:'',
        });
    }

    static navigationOptions = {
        headerTransparent: true,
        headerStyle: {},
    };

    componentDidMount() {
        //检测网络是否连接
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({isConnected:isConnected});
        });

        //监听网络变化事件
        NetInfo.addEventListener('change', (networkType) => {
            if(networkType.toString().toLowerCase() === 'none'){
                Toast.show({text:'貌似没网哦，请检查当前网络状态',type:'warning'});
            }else if(networkType.toString().toLowerCase() === 'wifi'){
                Toast.show({text:'使用wifi访问... ',type:'warning'});
            }else{
                Toast.show({text:'使用流量中，请确保流量充足哦.',type:'danger'});
            }
        })
    }

    loginAction() {
        const loginId = this.state.loginId;
        const passWord = this.state.passWord;
        if (loginId === '') {
            Toast.show({text:'请输入用户名',buttonText:'好的',type:'danger'});
            return;
        } else if (passWord === '') {
            Toast.show({text:'请输入密码',buttonText:'好的',type:'danger'});
            return;
        }
        this.setState({
            loginSpinner: true,
        })
        OperationActions.getUserLoginAction({
            loginId: loginId,
            passWord: passWord
        }, (response) => {
            if(response === undefined){
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
                this.props.navigation.replace('MainPage', {param: param});
            } else {
                this.setState({
                    loginSpinner: false,
                })
                Toast.show({text:response.msg,buttonText:'好的',type:'danger'});
            }
        }, (error) => {
            this.setState({
                loginSpinner: false,
            })
        });
    }

    toRegisterPage() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{marginTop: 220}}>
                        <Item floatingLabel>
                            <Label>用户名/Username</Label>
                            <Input onChangeText={(text) => this.setState({loginId: text})}
                                   autoCorrect={false}
                                   autoCapitalize="none"
                                   value={this.state.loginId}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>密码/Password</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(text) => this.setState({passWord: text})}
                                   vauel={this.state.passWord}/>
                        </Item>
                        <Spinner
                            showSpinner={this.state.loginSpinner}
                            spinkerSize={50}
                            spinkerType='Wave'
                            spinkerColor='#3B77FF'/>
                        <Button block
                                style={CommonStyle.buttonStyle}
                                onPress={this.loginAction}><Text>登录</Text></Button>
                        <Text style={CommonStyle.textStyle}
                              onPress={this.toRegisterPage}>
                            <Text >免费注册></Text>
                        </Text>
                    </Form>
                </Content>
            </Container>
        );
    }
}
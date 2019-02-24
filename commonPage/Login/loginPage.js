/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input,Toast, Icon, Label, Button, Text,} from 'native-base';
import CommonStyle from '../CommonProperties/CommonStyle';
import OperationActions from '../Components/operationActions';
import Spinner from '../Spinner/spinner';
import {Modal, View} from 'react-native';
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.toRegisterPage = this.toRegisterPage.bind(this);
        this.state = ({
            loginId: '',
            passWord: '',
            loginSpinner: false,
        });
    }

    static navigationOptions = {
        headerTransparent: true,
        headerStyle: {},
    };

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
                alert(response.msg);
            }
        }, (error) => {
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
/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Icon, Label, Button, Text,} from 'native-base';
import CommonStyle from '../CommonProperties/CommonStyle';
import OperationActions from '../Components/operationActions';
import Spinner from '../Spinner/spinner';
import {Modal,View} from 'react-native';
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.toRegisterPage = this.toRegisterPage.bind(this);
        this.state = ({
            userName: '',
            passWord: '',
            loginSpinner:false,
        });
    }
    static navigationOptions = {
        headerTransparent:true,
        headerStyle: {
        },
    };

    loginAction(){
        const userName = this.state.userName;
        const passWord = this.state.passWord;
        this.setState({
            loginSpinner:true,
        })
        OperationActions.getTestAction({
            pageId: '95000001',
        }, (response) => {
            this.setState({
                loginSpinner:false,
            })
            this.props.navigation.replace('MainPage');
        }, (error) => {
            alert(JSON.stringify(error));
        });
    }

    toRegisterPage(){
        this.props.navigation.navigate('Register');
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form style={{marginTop: 220}}>
                        <Item floatingLabel>
                            <Label>用户名/Username</Label>
                            <Input onChangeText={(text) => this.setState({ userName: text })}
                                   autoCorrect={false}
                                   autoCapitalize="none"/>
                        </Item>
                        <Item floatingLabel>
                            <Label>密码/Password</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(text) => this.setState({ passWord: text })}/>
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
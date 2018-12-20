/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Label, Button, Text,} from 'native-base';
import CommonStyle from '../CommonProperties/CommonStyle';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.state = ({
            userName: '',
            passWord: '',
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
        if(userName === "" || passWord === ""){
            alert('用户名和密码都必须输入噢');
        }
        else if(userName === "admin" && passWord === "123"){
            this.props.navigation.replace('MainPage');
        }else{
            alert('用户名或者密码错误');
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{marginTop: 120}}>
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
                        <Button block
                                style={CommonStyle.buttonStyle}
                                onPress={this.loginAction}><Text>登录</Text></Button>
                        <Button block style={CommonStyle.buttonStyle}><Text>去注册</Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
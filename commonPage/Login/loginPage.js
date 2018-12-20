/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Label, Button, Text, Card, CardItem, Body} from 'native-base';
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

    loginAction(){
        const userName = this.state.userName;
        const passWord = this.state.passWord;
        if(userName === "" || passWord === ""){
            alert('用户名和密码都必须输入噢');
        }
        else if(userName === "admin" && passWord === "123"){
            alert('sussced');
        }else{
            alert('用户名或者密码错误');
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card style={{marginTop: 50}}>
                        <CardItem header>
                            <Text>CommonProject</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                这是一个用于累积功能的轮子项目
                            </Text>
                            <Text>
                                This is a wheel project for cumulative functions
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>GitHub:https://github.com/supervons/commonProject</Text>
                        </CardItem>
                    </Card>
                    <Form style={{marginTop: 50}}>
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
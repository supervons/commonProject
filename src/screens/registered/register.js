/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import {createForm} from 'rc-form';
import {Container, Content, Form, Item, Input, Label, Button, Text,} from 'native-base';
import CommonStyle from '../../common/CommonProperties/CommonStyle';
import FormItem from './formItem';
import Toast from '../../components/toast/toast';
import OperationActions from '../../common/actions/operationActions';

const {width} = Dimensions.get('window');

class Register extends Component {

    static propTypes = {
        form: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = ({
            loginId: '',
            passWord: ''
        });
    }

    static navigationOptions = {
        title: '账号注册',
        headerTransparent: true,
        gesturesEnabled: true,
        headerStyle: {},
    };

    checkLoginId = (value, callback) => {
        this.setState({
            loginId: value,
        });
    };

    submit() {
        const loginId = this.state.loginId;
        const passWord = this.state.passWord;
        if (this.state.loginId === '' || this.state.passWord === '') {
            Toast.showToast('请完善注册信息');
        } else {
            // 用户注册
            OperationActions.userRegisterAction({
                loginId: loginId,
                passWord: passWord
            }, (response) => {
                if (response.code === 'success') {
                    Toast.showToast(response.data.resultMsg);
                    this.props.navigation.navigate('Login', {loginId: this.state.loginId});
                } else {
                    Toast.showToast(response.msg);
                }
            });
        }
    };

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        return (
            <Container>
                <Content>
                    <Form style={{marginTop: 120}}>
                        {getFieldDecorator('loginId', {
                            validateFirst: true,
                            rules: [
                                {required: true, message: '请输入手机号!'},
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '请输入正确的手机号!',
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        this.checkLoginId(value, callback);
                                    },
                                    message: '手机号已经被注册!',
                                },
                            ],
                        })(
                            <FormItem
                                label="手机号"
                                autoFocus
                                placeholder="手机号"
                                error={getFieldError('loginId')}
                                secureTextEntry={false}
                            />
                        )}
                        <Item floatingLabel>
                            <Label>密码/Password</Label>
                            <Input secureTextEntry={true}
                                   onChangeText={(text) => this.setState({passWord: text})}/>
                        </Item>
                        <Button block style={CommonStyle.buttonStyle}
                                onPress={this.submit}>
                            <Text>注册</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 50,
        justifyContent: 'center',
    },
    inputView: {
        width: width - 100,
        paddingLeft: 10,
    },
    input: {
        height: 42,
        fontSize: 16,
    },
    errorinfo: {
        marginTop: 10,
    },
    errorinfoText: {
        color: 'red',
    },
});
export default createForm()(Register);
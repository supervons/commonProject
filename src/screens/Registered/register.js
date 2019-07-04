/**
 * Created by supervons on 2018/12/20.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Dimensions,
    TextInput,
    View,
    Alert,
} from 'react-native';

import {createForm} from 'rc-form';
import {Container, Content, Form, Item, Input, Label, Button, Text,} from 'native-base';
import CommonStyle from '../../common/CommonProperties/CommonStyle';
import FormItem from './formItem';
import Toast from '../../components/toast/toast';

const {width} = Dimensions.get('window');
class Register extends Component {

    static propTypes = {
        form: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = ({
            userCount: '',
            passWord: ''
        });
    }

    static navigationOptions = {
        title: '账号注册',
        headerTransparent: true,
        gesturesEnabled: true,
        headerStyle: {},
    };

    checkUserCount = (value, callback) => {
        this.setState({
            userCount: value,
        });
    };

    checkUserName = (value, callback) => {
        this.setState({
            userName: value,
        });
    };

    submit() {
        if(this.state.userCount === '' || this.state.userName === ''){
            Toast.showToast('请完善注册信息');
        }
        console.log(JSON.stringify(this.state.userCount + ' - ' + this.state.userName));
    };

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        return (
            <Container>
                <Content>
                    <Form style={{marginTop: 120}}>
                        {getFieldDecorator('usercount', {
                            validateFirst: true,
                            rules: [
                                {required: true, message: '请输入手机号!'},
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '请输入正确的手机号!',
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        this.checkUserCount(value, callback);
                                    },
                                    message: '手机号已经被注册!',
                                },
                            ],
                        })(
                            <FormItem
                                label="手机号"
                                autoFocus
                                placeholder="手机号"
                                error={getFieldError('usercount')}
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
                            <Text >注册</Text>
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
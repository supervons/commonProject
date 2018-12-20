/**
 * Created by supervons on 2018/12/20.
 * 用户主界面
 * user main page
 */
import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class MainPage extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content />
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="apps" />
                            <Text>应用</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="camera" />
                            <Text>相机</Text>
                        </Button>
                        <Button vertical active>
                            <Icon active name="navigate" />
                            <Text>导航</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" />
                            <Text>我的</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
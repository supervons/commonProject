/**
 * Created by supervons on 2018/12/20.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Toast,
    Button,
    Icon,
    Text,
    Card,
    CardItem,
    Body
} from 'native-base';
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';
import CommonStyles from './CommonProperties/CommonStyle';
import configureStore from './Components/Redux/store/store';
import {connect} from 'react-redux';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.toSpinnerShows = this.toSpinnerShows.bind(this);
        this.toReduxTest = this.toReduxTest.bind(this);
        this.toImageCropPicker = this.toImageCropPicker.bind(this);
        this.toNewFunction = this.toNewFunction.bind(this);
        this.toTouchView = this.toTouchView.bind(this);
        this.toAnimatable = this.toAnimatable.bind(this);
    }

    static navigationOptions = {
        title: '首页',
        gesturesEnabled: false,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };

    toSpinnerShows() {
        this.props.navigation.push('SpinnerShows');
    }

    toReduxTest() {
        this.props.navigation.push('ReduxTest');
    }

    toImageCropPicker() {
        this.props.navigation.push('ImagePickerComponents');
    }

    toAnimatable() {
        this.props.navigation.push('Animatable');
    }

    toTouchView() {
        this.props.navigation.push('TouchIdView');
    }

    toNewFunction() {
        Toast.show({text:'新功能开发中',type:'success'});
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card style={{marginTop: 50}}>
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
                        <CardItem style={CommonStyles.centerStyle}>
                            <Text>
                                以下为功能模块
                            </Text>
                        </CardItem>
                        <CardItem style={CommonStyles.centerStyle}>
                            <Text style={{color:'red'}}>Redux 中 value = {this.props.text}</Text>
                        </CardItem>
                    </Card>

                    <Card style={{marginTop: 30}}>
                        <CardItem style={CommonStyles.centerStyle}>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toSpinnerShows}><Text>Loading动画</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toImageCropPicker}><Text>多图选择器</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toAnimatable}><Text>Animatable动画</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toReduxTest}><Text>Redux 示例</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toTouchView}><Text>指纹识别</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toNewFunction}><Text>日期选择器</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toNewFunction}><Text>地址选择器</Text></Button>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // 获取 state 变化
        text:state.testReducer.text,
    }
};
export default connect(mapStateToProps,null)(MainPage)
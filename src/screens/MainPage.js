/**
 * Created by supervons on 2018/12/20.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native'
import {
    Container,
    Content,
    Toast,
    Button,
    Text,
    Card,
    CardItem
} from 'native-base';

import CommonStyles from '../common/CommonProperties/CommonStyle';
import Realm from 'realm';
import Orientation from 'react-native-orientation';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

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
        this.toChangeOrientation = this.toChangeOrientation.bind(this);
        this.showLocalUserData = this.showLocalUserData.bind(this);
        this.toEchartsView = this.toEchartsView.bind(this);
        this.toCalendarsDemo = this.toCalendarsDemo.bind(this);
        this.state=({
            orientation:'PORTRAIT',
        });
    }

    static navigationOptions = {
        title: '首页',
        gesturesEnabled: false,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };

    componentDidMount() {
        Orientation.addOrientationListener((orientation) =>this.setState({orientation:orientation}));
    }

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

    toEchartsView() {
        this.props.navigation.push('EchartsView');
    }

    toChangeOrientation() {
        const initial = this.state.orientation;
        if (initial === 'PORTRAIT') {
            //竖屏转横屏
            Orientation.lockToLandscape();
            // do something
        } else {
            //横屏转竖屏
            Orientation.lockToPortrait();
            // do something else
        }
    }

    toCalendarsDemo() {
        this.props.navigation.push('CalendarsDemo');
    }

    showLocalUserData(){
        let realm = new Realm();
        let userLocalData = realm.objects('UserLocalData');
        let userData = Object.keys(userLocalData).length == 0? "" : userLocalData;
        Toast.show({text:JSON.stringify(userData),type:'success'});
    }

    toNewFunction() {
        Toast.show({text:'新功能开发中',type:'success'});
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <View style={{flex:1}}>
                            <IndicatorViewPager
                                style={{height:200}}
                                indicator={this._renderDotIndicator()}
                            >
                            <ImageBackground source={require("../resource/image/titleImage/alita.jpeg")}
                                             style={{resizeMode: 'contain'}}/>
                            <ImageBackground source={require("../resource/image/titleImage/title.jpg")}
                                             style={{resizeMode: 'contain'}}/>
                            <ImageBackground source={require("../resource/image/titleImage/alita.jpeg")}
                                             style={{resizeMode: 'contain'}}/>
                        </IndicatorViewPager>
                        </View>
                        <CardItem style={CommonStyles.centerStyle}>
                            <Text style={{color:'red'}}>Redux 中 value = {this.props.text}</Text>
                        </CardItem>
                    </View>

                    <Card style={{marginTop: 30}}>
                        <CardItem style={CommonStyles.centerStyle}>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toSpinnerShows}><Text>Loading动画</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toImageCropPicker}><Text>多图选择器</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toAnimatable}><Text>Animatable动画</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toReduxTest}><Text>Redux 示例</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toTouchView}><Text>指纹识别</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toChangeOrientation}><Text>横竖屏切换</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.showLocalUserData}><Text>缓存用户数据</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toEchartsView}><Text>图表Echarts</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary onPress={this.toCalendarsDemo}><Text>日期选择器</Text></Button>
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

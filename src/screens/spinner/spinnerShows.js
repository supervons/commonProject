/**
 * Created by supervons on 2019/2/22.
 */
import React, {Component} from 'react';
import {Container, Header, View, Button, Icon, Fab, Text} from 'native-base';
import CommonStyle from '../../common/CommonProperties/CommonStyle';
import Spinner from './spinner';
/**
 *
 * List of available spinkerType
 * CircleFlip
 * Bounce
 * Wave
 * WanderingCubes
 * Pulse
 * ChasingDots
 * ThreeBounce
 * Circle
 * 9CubeGrid
 * WordPress (IOS only)
 * FadingCircle
 * FadingCircleAlt
 * Arc (IOS only)
 * ArcAlt (IOS only)

 */
export default class SpinnerShows extends Component {
    constructor(props) {
        super(props);
        this.loginAction = this.loginAction.bind(this);
        this.state = ({
            loginSpinner: true,
            spinkerType: 'Wave',
            active: 'true'
        });
    }

    loginAction() {
        this.setState({
            loginSpinner: true,
        })
    }

    static navigationOptions = {
        title: 'Loading加载动画展示',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };

    render() {
        return (
            <Container>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                    <Spinner
                        showSpinner={this.state.loginSpinner}
                        spinkerSize={50}
                        spinkerType={this.state.spinkerType}
                        spinkerColor='#3B77FF'/>
                    <Text style={{color: "#3B77FF"}}>{this.state.spinkerType}</Text>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => this.setState({active: !this.state.active})}>
                        <Icon name="share"/>
                        <Button style={{backgroundColor: '#34A34F'}}
                                onPress={()=>this.setState({spinkerType: 'Wave'})}><Text>W</Text></Button>
                        <Button style={{backgroundColor: '#3B5998'}}
                                onPress={()=>this.setState({spinkerType: 'CircleFlip'})}><Text>C</Text></Button>
                        <Button style={{backgroundColor: '#DD5144'}}
                                onPress={()=>this.setState({spinkerType: 'Bounce'})}><Text>B</Text></Button>
                        <Button style={{backgroundColor: '#9A32CD'}}
                                onPress={()=>this.setState({spinkerType: 'WanderingCubes'})}><Text>W</Text></Button>
                        <Button style={{backgroundColor: '#40E0D0'}}
                                onPress={()=>this.setState({spinkerType: 'Pulse'})}><Text>P</Text></Button>
                        <Button style={{backgroundColor: '#63B8FF'}}
                                onPress={()=>this.setState({spinkerType: 'ChasingDots'})}><Text>C</Text></Button>
                        <Button style={{backgroundColor: '#6CA6CD'}}
                                onPress={()=>this.setState({spinkerType: 'ThreeBounce'})}><Text>T</Text></Button>
                        <Button style={{backgroundColor: '#7AC5CD'}}
                                onPress={()=>this.setState({spinkerType: 'Circle'})}><Text>C</Text></Button>
                        <Button style={{backgroundColor: '#8EE5EE'}}
                                onPress={()=>this.setState({spinkerType: '9CubeGrid'})}><Text>9</Text></Button>
                        <Button style={{backgroundColor: '#A2CD5A'}}
                                onPress={()=>this.setState({spinkerType: 'FadingCircle'})}><Text>F</Text></Button>
                        <Button style={{backgroundColor: '#B2DFEE'}}
                                onPress={()=>this.setState({spinkerType: 'FadingCircleAlt'})}><Text>F</Text></Button>
                    </Fab>
                </View>
            </Container>
        );
    }
}
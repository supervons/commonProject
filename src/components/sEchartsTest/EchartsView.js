/**
 * 图表展示组件
 * Created by supervons on 2019/4/6.
 */
import React, { Component } from 'react';
import Echarts from 'native-echarts';
import EchartsTypeJson from './EchartsTypeJson';
import {
    Content,
    Container,
    Button,
    Text,
    CardItem,
    Card
} from 'native-base';
import CommonStyles from '../../../commonPage/CommonProperties/CommonStyle';

export default class EchartsView extends Component {
    constructor(props) {
        super(props);
        this.state=({
            chartsType:'line',
            option:EchartsTypeJson.LineOption,
        });
    }

    static navigationOptions = {
        title: '图表',
        gesturesEnabled: true,
        headerStyle: {                                 //导航栏样式设置
            backgroundColor: '#8bc9ff',
        },
    };

    render() {
        return (
            <Content>
                <Container>
                    <Echarts option={this.state.option} height={300}/>

                    <Card>
                        <CardItem style={CommonStyles.centerStyle}>
                            <Button style={CommonStyles.mainPageButtonStyle} primary
                                    onPress={()=>this.setState({option: EchartsTypeJson.LineOption})}><Text>折线图</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary
                                    onPress={()=>this.setState({option: EchartsTypeJson.BarOption})}><Text>条形图</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary
                                    onPress={()=>this.setState({option: EchartsTypeJson.PieOption})}><Text>饼图</Text></Button>
                            <Button style={CommonStyles.mainPageButtonStyle} primary
                                    onPress={()=>this.setState({option: EchartsTypeJson.funnelOption})}><Text>漏斗图</Text></Button>
                        </CardItem></Card>
                </Container>
            </Content>
        )
            ;
    }
}